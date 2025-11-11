# Media Controls for YouTube™ (Chrome Extension)

Improve how your hardware media keys work on YouTube. This lightweight Manifest V3 content script uses the Media Session API to map play/pause, next, and previous hardware keys to consistent actions on youtube.com.

## Features
- Play/Pause maps to YouTube’s toggle reliably (simulated Space key).
- Next/Previous support both short tap and long press:
  - Short tap: seek forward/back (YouTube’s default small step).
  - Long press: jump to next/previous video when available.
- Runs only on `https://www.youtube.com/*` and all frames.
- Zero configuration, zero network calls, no data collection.

## How It Works
The content script (`content.js`) registers `navigator.mediaSession` action handlers:
- `play` and `pause` → dispatches a quick Space keydown/keyup to the player.
- `nexttrack`
  - Short tap → dispatches ArrowRight (seek forward a few seconds on YouTube).
  - Long press → clicks YouTube’s Next button; falls back to browser history forward.
- `previoustrack`
  - Short tap → dispatches ArrowLeft (seek backward a few seconds on YouTube).
  - Long press → clicks YouTube’s Previous button (if enabled); falls back to browser back.

Handlers are re-applied on an interval so they keep working even if the page re-initializes the player.

## Installation (Unpacked)
1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions`.
3. Enable “Developer mode”.
4. Click “Load unpacked” and select the folder containing `manifest.json`.
5. Visit YouTube and try your hardware media keys.

## Usage
- Play/Pause: toggles the current video.
- Next: short tap seeks forward; long press skips to the next video.
- Previous: short tap seeks backward; long press goes to the previous video.

Tip: On YouTube, ArrowRight/ArrowLeft typically seek ~5 seconds.

## Permissions
- `host_permissions`: `https://www.youtube.com/*`
- `content_scripts`: injected on YouTube in all frames.

No additional permissions, storage, or network access are used.

## Compatibility
- Manifest V3; tested in modern Chrome.
- Requires Chrome’s Media Session support (available by default in current Chrome versions).

## Development
- Files: `manifest.json`, `content.js` (no build step).
- To package, use Chrome’s “Pack extension…” on `chrome://extensions`.
- Code uses simple keyboard event dispatching to integrate with YouTube’s built-in shortcuts.

## Troubleshooting
- If keys don’t control Chrome, ensure Chrome is the active player and that “Hardware Media Key Handling” in Chrome is enabled (default) so keys reach Chrome.
- Refresh the YouTube tab after loading the extension.
- Some pages without standard YouTube controls may fall back to browser back/forward for prev/next long press.

## Known Limitations
- Long-press detection relies on event timing and may vary by OS/keyboard.
- Only applies to YouTube; other sites are intentionally not affected.

## License
Licensed under the Apache License, Version 2.0. See `LICENSE` for details.
