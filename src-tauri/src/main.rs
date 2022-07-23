#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[tauri::command]
fn set_wallpaper(path: &str) {
  wallpaper::set_from_path(path).unwrap()
}

#[tauri::command]
fn get_wallpaper() -> String {
  wallpaper::get().unwrap()
}

fn main() {
  println!("{:?}", wallpaper::get());

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![set_wallpaper, get_wallpaper])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
