// Background service worker for media key handling

const YT_URL_PATTERNS = [
  "*://www.youtube.com/*",
  "*://music.youtube.com/*",
];

async function getTargetYouTubeTab() {
  // Prefer an audible YouTube tab (likely the one currently playing)
  const audible = await chrome.tabs.query({ audible: true, url: YT_URL_PATTERNS });
  if (audible && audible.length) {
    // Pick the most recently accessed audible YouTube tab
    audible.sort((a, b) => (b.lastAccessed || 0) - (a.lastAccessed || 0));
    return audible[0];
  }

  // Otherwise, pick the most recently accessed YouTube tab
  const all = await chrome.tabs.query({ url: YT_URL_PATTERNS });
  if (all && all.length) {
    all.sort((a, b) => (b.lastAccessed || 0) - (a.lastAccessed || 0));
    return all[0];
  }

  return null;
}

chrome.commands.onCommand.addListener(async (command) => {
  try {
    const tab = await getTargetYouTubeTab();
    if (!tab || !tab.id) return;

    if (command === "toggle-play-pause") {
      await chrome.tabs.sendMessage(tab.id, { type: "toggle" });
    } else if (command === "seek-back-5s") {
      await chrome.tabs.sendMessage(tab.id, { type: "seek", delta: -5 });
    } else if (command === "seek-forward-5s") {
      await chrome.tabs.sendMessage(tab.id, { type: "seek", delta: 5 });
    }
  } catch (err) {
    // In MV3 SW, avoid noisy logs unless debugging is needed
    // console.error("Command handling failed", err);
  }
});

