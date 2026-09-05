use rusqlite::{params, Connection, Result};
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use std::sync::Mutex;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SettingItem {
    pub key: String,
    pub value: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ModelProvider {
    pub id: String,
    pub name: String,
    pub api_key_masked: String,
    pub base_url: Option<String>,
    pub default_model: Option<String>,
    pub is_connected: bool,
    pub updated_at: i64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ChatMessage {
    pub id: String,
    pub role: String,
    pub content: String,
    pub created_at: i64,
}

pub struct DbState {
    pub conn: Mutex<Connection>,
}

pub fn init_db(app_data_dir: Option<PathBuf>) -> Result<Connection> {
    let db_path = match app_data_dir {
        Some(dir) => {
            let kanf_dir = dir.join("kanf-v0");
            let _ = fs::create_dir_all(&kanf_dir);
            kanf_dir.join("kanf_v0.db")
        }
        None => {
            let home = std::env::var("HOME")
                .or_else(|_| std::env::var("USERPROFILE"))
                .unwrap_or_else(|_| ".".to_string());
            let kanf_dir = PathBuf::from(home).join(".kanf");
            let _ = fs::create_dir_all(&kanf_dir);
            kanf_dir.join("kanf_v0.db")
        }
    };

    let conn = Connection::open(&db_path)?;

    // Enable WAL mode for high performance & reliability
    let _ = conn.execute_batch("PRAGMA journal_mode=WAL; PRAGMA synchronous=NORMAL;");

    // Create Tables
    conn.execute(
        "CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
        )",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS model_providers (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            api_key_masked TEXT NOT NULL,
            base_url TEXT,
            default_model TEXT,
            is_connected INTEGER NOT NULL DEFAULT 0,
            updated_at INTEGER NOT NULL
        )",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS chat_messages (
            id TEXT PRIMARY KEY,
            role TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at INTEGER NOT NULL
        )",
        [],
    )?;

    // Seed default settings if not exists
    let default_settings = [
        ("theme", "system"),
        ("lightweight_mode", "true"),
        ("reduce_animations", "false"),
        ("start_on_boot", "false"),
        ("minimize_to_tray", "true"),
        ("run_in_background", "false"),
        ("debug_logs", "false"),
        ("show_runtime_status", "true"),
    ];

    for (k, v) in default_settings.iter() {
        let _ = conn.execute(
            "INSERT OR IGNORE INTO settings (key, value) VALUES (?1, ?2)",
            params![k, v],
        );
    }

    Ok(conn)
}

// Database helper operations
impl DbState {
    pub fn get_setting(&self, key: &str) -> Result<Option<String>> {
        let conn = self.conn.lock().unwrap();
        let mut stmt = conn.prepare("SELECT value FROM settings WHERE key = ?1")?;
        let mut rows = stmt.query(params![key])?;

        if let Some(row) = rows.next()? {
            Ok(Some(row.get(0)?))
        } else {
            Ok(None)
        }
    }

    pub fn set_setting(&self, key: &str, value: &str) -> Result<()> {
        let conn = self.conn.lock().unwrap();
        conn.execute(
            "INSERT INTO settings (key, value) VALUES (?1, ?2)
             ON CONFLICT(key) DO UPDATE SET value = excluded.value",
            params![key, value],
        )?;
        Ok(())
    }

    pub fn get_all_settings(&self) -> Result<Vec<SettingItem>> {
        let conn = self.conn.lock().unwrap();
        let mut stmt = conn.prepare("SELECT key, value FROM settings")?;
        let items = stmt
            .query_map([], |row| {
                Ok(SettingItem {
                    key: row.get(0)?,
                    value: row.get(1)?,
                })
            })?
            .filter_map(|r| r.ok())
            .collect();
        Ok(items)
    }

    pub fn get_model_providers(&self) -> Result<Vec<ModelProvider>> {
        let conn = self.conn.lock().unwrap();
        let mut stmt = conn.prepare(
            "SELECT id, name, api_key_masked, base_url, default_model, is_connected, updated_at FROM model_providers ORDER BY name ASC",
        )?;
        let items = stmt
            .query_map([], |row| {
                let is_conn_int: i32 = row.get(5)?;
                Ok(ModelProvider {
                    id: row.get(0)?,
                    name: row.get(1)?,
                    api_key_masked: row.get(2)?,
                    base_url: row.get(3)?,
                    default_model: row.get(4)?,
                    is_connected: is_conn_int != 0,
                    updated_at: row.get(6)?,
                })
            })?
            .filter_map(|r| r.ok())
            .collect();
        Ok(items)
    }

    pub fn save_model_provider(&self, provider: &ModelProvider) -> Result<()> {
        let conn = self.conn.lock().unwrap();
        conn.execute(
            "INSERT INTO model_providers (id, name, api_key_masked, base_url, default_model, is_connected, updated_at)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
             ON CONFLICT(id) DO UPDATE SET
                name = excluded.name,
                api_key_masked = excluded.api_key_masked,
                base_url = excluded.base_url,
                default_model = excluded.default_model,
                is_connected = excluded.is_connected,
                updated_at = excluded.updated_at",
            params![
                provider.id,
                provider.name,
                provider.api_key_masked,
                provider.base_url,
                provider.default_model,
                if provider.is_connected { 1 } else { 0 },
                provider.updated_at,
            ],
        )?;
        Ok(())
    }

    pub fn delete_model_provider(&self, id: &str) -> Result<()> {
        let conn = self.conn.lock().unwrap();
        conn.execute("DELETE FROM model_providers WHERE id = ?1", params![id])?;
        Ok(())
    }

    pub fn get_chat_messages(&self, limit: i64) -> Result<Vec<ChatMessage>> {
        let conn = self.conn.lock().unwrap();
        let mut stmt = conn.prepare(
            "SELECT id, role, content, created_at FROM chat_messages ORDER BY created_at ASC LIMIT ?1",
        )?;
        let items = stmt
            .query_map(params![limit], |row| {
                Ok(ChatMessage {
                    id: row.get(0)?,
                    role: row.get(1)?,
                    content: row.get(2)?,
                    created_at: row.get(3)?,
                })
            })?
            .filter_map(|r| r.ok())
            .collect();
        Ok(items)
    }

    pub fn save_chat_message(&self, msg: &ChatMessage) -> Result<()> {
        let conn = self.conn.lock().unwrap();
        conn.execute(
            "INSERT OR REPLACE INTO chat_messages (id, role, content, created_at)
             VALUES (?1, ?2, ?3, ?4)",
            params![msg.id, msg.role, msg.content, msg.created_at],
        )?;
        Ok(())
    }

    pub fn clear_chat_history(&self) -> Result<()> {
        let conn = self.conn.lock().unwrap();
        conn.execute("DELETE FROM chat_messages", [])?;
        Ok(())
    }
}
