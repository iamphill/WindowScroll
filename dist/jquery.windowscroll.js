(function() {
  var getScrolTop;

  (function() {
    var browserRaf, canceled, targetTime, vendor, w, _i, _len, _ref;
    w = window;
    _ref = ['ms', 'moz', 'webkit', 'o'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      vendor = _ref[_i];
      if (w.requestAnimationFrame) {
        break;
      }
      w.requestAnimationFrame = w["" + vendor + "RequestAnimationFrame"];
      w.cancelAnimationFrame = w["" + vendor + "CancelAnimationFrame"] || w["" + vendor + "CancelRequestAnimationFrame"];
    }
    if (w.requestAnimationFrame) {
      if (w.cancelAnimationFrame) {
        return;
      }
      browserRaf = w.requestAnimationFrame;
      canceled = {};
      w.requestAnimationFrame = function(callback) {
        var id;
        return id = browserRaf(function(time) {
          if (id in canceled) {
            return delete canceled[id];
          } else {
            return callback(time);
          }
        });
      };
      return w.cancelAnimationFrame = function(id) {
        return canceled[id] = true;
      };
    } else {
      targetTime = 0;
      w.requestAnimationFrame = function(callback) {
        var currentTime;
        targetTime = Math.max(targetTime + 16, currentTime = +(new Date));
        return w.setTimeout((function() {
          return callback(+(new Date));
        }), targetTime - currentTime);
      };
      return w.cancelAnimationFrame = function(id) {
        return clearTimeout(id);
      };
    }
  })();

  getScrolTop = function() {
    return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;
  };

  (function() {
    var animationLoop, eventName, lastScroll;
    eventName = "wscroll";
    lastScroll = 0;
    animationLoop = (function(_this) {
      return function() {
        var currentTop, scrollEvent;
        currentTop = getScrolTop();
        if (lastScroll !== currentTop) {
          lastScroll = currentTop;
          if (lastScroll !== void 0) {
            if (document.createEvent) {
              scrollEvent = document.createEvent("HTMLEvents");
              scrollEvent.initEvent(eventName, true, true);
            } else {
              scrollEvent = document.createEventObject();
              scrollEvent.eventType = eventName;
            }
            scrollEvent.eventName = eventName;
            scrollEvent.scrolltop = lastScroll;
            if (document.createEvent) {
              document.dispatchEvent(scrollEvent);
            } else {
              document.fireEvent("on" + scrollEvent.eventType, scrollEvent);
            }
          }
        }
        return requestAnimationFrame(animationLoop);
      };
    })(this);
    return animationLoop();
  })();

}).call(this);
