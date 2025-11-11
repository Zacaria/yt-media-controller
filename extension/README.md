YouTube Media Key Controller (Chrome Extension)

What it does
- Maps system media keys to YouTube without requiring Chrome focus:
  - Play/Pause toggles the current YouTube player
  - Previous seeks back 5 seconds
  - Next seeks forward 5 seconds
- Works on youtube.com and music.youtube.com.

How to load
1. Open Chrome and navigate to `chrome://extensions`.
2. Enable "Developer mode" (top right).
3. Click "Load unpacked" and select the `extension/` folder in this repo.
4. Open `chrome://extensions/shortcuts`, find "YouTube Media Key Controller", and bind:
   - `toggle-play-pause` → press your Media Play/Pause key
   - `seek-back-5s` → press your Media Previous key
   - `seek-forward-5s` → press your Media Next key
   - Toggle the shortcut to "Global" if offered so it works without Chrome focus.

Notes
- Defaults for media keys cannot be declared in the manifest. You must assign them under `chrome://extensions/shortcuts`.
- If your OS or another app (e.g., Music/Spotify) captures media keys, you may need to disable that behavior or use alternative keys.
- If multiple YouTube tabs exist, the extension prefers an audible tab; otherwise, it targets the most recently accessed YouTube tab.
