mod commands;
mod db;

use db::{init_db, DbState};
use std::sync::Mutex;
use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(
            tauri_plugin_log::Builder::default()
                .level(log::LevelFilter::Info)
                .build(),
        )
        .setup(|app| {
            let app_data_dir = app.path().app_data_dir().ok();
            let conn = init_db(app_data_dir).expect("Failed to initialize SQLite database");
            app.manage(DbState {
                conn: Mutex::new(conn),
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::get_all_settings,
            commands::get_setting,
            commands::save_setting,
            commands::get_model_providers,
            commands::save_model_provider,
            commands::delete_model_provider,
            commands::get_chat_history,
            commands::save_chat_message,
            commands::clear_chat_history,
            commands::get_system_info
        ])
        .run(tauri::generate_context!())
        .expect("error while running KANF V0 application");
}
