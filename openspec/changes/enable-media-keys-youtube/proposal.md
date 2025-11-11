# Proposal: Enable Media Keys for YouTube Control

Summary
- Provide a Chrome extension that captures system media keys to control YouTube without requiring browser focus.
- Map keys:
  - Play/Pause -> toggle playback
  - Previous -> seek back 5s
  - Next -> seek forward 5s

Motivation
- Allow quick control of YouTube playback while working in other apps.
- Leverage Chrome's global media key command support in MV3.

Scope
- youtube.com and music.youtube.com
- Chrome Extension MV3: background service worker + content script
- Minimal permissions: tabs + host permissions for youtube domains

Out of Scope
- Advanced tab selection logic (beyond audible/most-recent)
- UI, options pages, or per-site configuration
- Support for browsers other than Chrome/Chromium

Success Criteria
- Media keys operate the intended actions on YouTube without Chrome needing focus.
- Works on both youtube.com and music.youtube.com.
- Minimal, robust implementation with least privileges.

