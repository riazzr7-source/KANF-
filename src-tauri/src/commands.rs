use crate::db::{ChatMessage, DbState, ModelProvider, SettingItem};
use serde::{Deserialize, Serialize};
use tauri::State;

#[derive(Debug, Serialize, Deserialize)]
pub struct SystemInfo {
    pub name: String,
    pub version: String,
    pub status: String,
    pub os: String,
    pub arch: String,
}

#[tauri::command]
pub fn get_all_settings(state: State<'_, DbState>) -> Result<Vec<SettingItem>, String> {
    state.get_all_settings().map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_setting(key: String, state: State<'_, DbState>) -> Result<Option<String>, String> {
    state.get_setting(&key).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn save_setting(key: String, value: String, state: State<'_, DbState>) -> Result<(), String> {
    state.set_setting(&key, &value).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_model_providers(state: State<'_, DbState>) -> Result<Vec<ModelProvider>, String> {
    state.get_model_providers().map_err(|e| e.to_string())
}

#[tauri::command]
pub fn save_model_provider(
    provider: ModelProvider,
    state: State<'_, DbState>,
) -> Result<(), String> {
    state.save_model_provider(&provider).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn delete_model_provider(id: String, state: State<'_, DbState>) -> Result<(), String> {
    state.delete_model_provider(&id).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_chat_history(
    limit: Option<i64>,
    state: State<'_, DbState>,
) -> Result<Vec<ChatMessage>, String> {
    let lim = limit.unwrap_or(100);
    state.get_chat_messages(lim).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn save_chat_message(msg: ChatMessage, state: State<'_, DbState>) -> Result<(), String> {
    state.save_chat_message(&msg).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn clear_chat_history(state: State<'_, DbState>) -> Result<(), String> {
    state.clear_chat_history().map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_system_info() -> Result<SystemInfo, String> {
    Ok(SystemInfo {
        name: "KANF V0".to_string(),
        version: "0.1.0".to_string(),
        status: "System Ready".to_string(),
        os: std::env::consts::OS.to_string(),
        arch: std::env::consts::ARCH.to_string(),
    })
}
