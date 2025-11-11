// Content script injected on YouTube pages. Listens for messages from the
// background service worker to control the <video> element.

function getPrimaryVideo() {
  // Works for youtube.com and music.youtube.com
  return document.querySelector("video");
}

async function togglePlayback() {
  const video = getPrimaryVideo();
  if (!video) return;
  try {
    if (video.paused) {
      await video.play().catch(() => {});
    } else {
      video.pause();
    }
  } catch (_) {
    // No-op if the play() promise rejects due to autoplay policies, etc.
  }
}

function seekBy(deltaSeconds) {
  const video = getPrimaryVideo();
  if (!video) return;
  try {
    const dur = Number.isFinite(video.duration) ? video.duration : undefined;
    const next = video.currentTime + (deltaSeconds || 0);
    if (dur !== undefined) {
      video.currentTime = Math.max(0, Math.min(dur, next));
    } else {
      video.currentTime = Math.max(0, next);
    }
  } catch (_) {
    // Ignore if not seekable
  }
}

chrome.runtime.onMessage.addListener((msg, _sender, _sendResponse) => {
  if (!msg || !msg.type) return;
  if (msg.type === "toggle") {
    togglePlayback();
  } else if (msg.type === "seek") {
    seekBy(msg.delta);
  }
});

