function initIntervals() {
  var firstDelay = 300 // first interval between executions
  var timeoutDelay = 10000 // time after which the first interval turns off and the second turns on
  var secondDelay = 10000 // second interval between executions
  let firstInterval = setInterval(initMediaSession, firstDelay);
  setTimeout(function(){
    clearInterval(firstInterval);
    setInterval(initMediaSession, secondDelay);
  }, timeoutDelay);
}

function initMediaSession() {  

  navigator.mediaSession.setActionHandler('play', function() {space(document)});

  navigator.mediaSession.setActionHandler('pause', function() {space(document)});

  var nexttime = 0;

  navigator.mediaSession.setActionHandler('nexttrack', function() {
      if (new Date().getTime() - 48 > nexttime) { // if a single click occurs
        setTimeout(function(){
          if (new Date().getTime() - 48 > nexttime) {
            forward(document); 
          }
        }, 50);
      } else { // if there is a long press
          nextMedia(document);
      }
      nexttime = new Date().getTime();
  });

  navigator.mediaSession.setActionHandler('previoustrack', function() {
      if (new Date().getTime() - 48 > nexttime) {// if a single click occurs
        setTimeout(function(){
          if (new Date().getTime() - 48 > nexttime) {
          backward(document);
          }
        }, 50);
      } else { // if there is a long press
          prevMedia(document);
      }
      nexttime = new Date().getTime();
  });
}

function space(element) { // Simulate quick Space tap (keydown + keyup)
  try {
    const d = element || document;
    const target = (d.querySelector('.html5-video-player') || d.querySelector('video') || d.body || d);
    const evInit = {
      key: ' ',
      code: 'Space',
      keyCode: 32,
      which: 32,
      bubbles: true,
      cancelable: true,
      composed: true,
      location: 0,
      repeat: false,
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      metaKey: false
    };
    target.dispatchEvent(new KeyboardEvent('keydown', evInit));
    console.log('space')
    // Release quickly so YouTube doesn't interpret as a hold
    setTimeout(() => {
      target.dispatchEvent(new KeyboardEvent('keyup', evInit));
    }, 10);
  } catch (_) {}
}

function forward(element) { // ArrowRight
  let evt = new KeyboardEvent("keydown", {
    key: "ArrowRight",
    keyCode: 39
  });
  document.dispatchEvent(evt);
}

// function forward(element) { // 5 seconds forward
//   element.querySelectorAll('video').forEach(function(item) {item.currentTime += 5; });
//   element.querySelectorAll('audio').forEach(function(item) {item.currentTime += 5; });
// }
  
function backward(element) { // ArrowLeft
  let evt = new KeyboardEvent("keydown", {
    key: "ArrowLeft",
    keyCode: 37
  });
  document.dispatchEvent(evt);
}

// function backward(element) { // 5 seconds backward
//   element.querySelectorAll('video').forEach(function(item) {item.currentTime -= 5; });
//   element.querySelectorAll('audio').forEach(function(item) {item.currentTime -= 5; });
// }

function nextMedia( element ) {
  element.querySelectorAll('iframe').forEach(function(item) {
    try {
      if ( iframe.contentWindow ) {
        nextMedia(iframe.contentWindow.document);
      }
    } catch(err) {}
  });
  if ( document.querySelector('[class*="ytp-next-button"]') ) {
    document.querySelector('[class*="ytp-next-button"]').click();
  } else {
    window.history.forward();
  }
};

function prevMedia( element ) {
  element.querySelectorAll('iframe').forEach(function(item) {
    try {
      if ( iframe.contentWindow ) {
        prevMedia(iframe.contentWindow.document);
      }
    } catch(err) {}
  });
  if ( document.querySelector('[class*="ytp-prev-button"]') && document.querySelector('[class*="ytp-prev-button"]').getAttribute('aria-disabled') == 'false' ) {
    document.querySelector('[class*="ytp-prev-button"]').click();
  } else {
    window.history.back();
  }
};

window.onload = function() {
  initIntervals();
}
