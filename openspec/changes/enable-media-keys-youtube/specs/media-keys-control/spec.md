## ADDED Requirements

Requirement: Global media keys control YouTube playback without browser focus.
#### Scenario: Play/Pause toggles playback on audible YouTube tab
- Given at least one audible tab on youtube.com or music.youtube.com
- When the user presses the system MediaPlayPause key
- Then the extension toggles playback on the most recently accessed audible YouTube tab
- And the browser does not need to be focused

#### Scenario: Play/Pause toggles on most-recent YouTube tab when none audible
- Given no audible YouTube tabs
- And at least one tab on youtube.com or music.youtube.com exists
- When the user presses MediaPlayPause
- Then the extension toggles playback on the most recently accessed YouTube tab

Requirement: Previous media key seeks back 5 seconds on YouTube.
#### Scenario: Seek backward 5s
- Given a YouTube player is present
- When the user presses the system MediaPreviousTrack key
- Then playback seeks back by 5 seconds without exiting the page

Requirement: Next media key seeks forward 5 seconds on YouTube.
#### Scenario: Seek forward 5s
- Given a YouTube player is present
- When the user presses the system MediaNextTrack key
- Then playback seeks forward by 5 seconds without exiting the page

Requirement: Extension scope and permissions are minimal.
#### Scenario: Minimal permissions
- Given the extension is installed
- Then it requests only the "tabs" permission and host permissions for youtube.com and music.youtube.com
- And it uses an MV3 background service worker with a content script limited to those hosts

