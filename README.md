# WindowScroll

A better performant window scroll event listener that uses animation frames and changes in position to send an event.

Most modern browsers come with `requestAnimationFrame` which is only run when the website is visible. On a different tab? Then it isn't run. It also synchronizes with the browsers reflow/repaint schedule so that no code is running when it isn't capable of running. Whilst this is mainly used for animations, this plugin has used it to monitor the scrolling positioning within the browser window. If the browser has a large repaint to do the `requestAnimationFrame` method will understand this and stop until this repaint has done. On websites that need a lot of repainting when scrolling, you may notice events become slow. Optimize the repaints and then check the plugin fire events.

This plugin monitors the current position of the users scroll and depending on its change depends whether the event is thrown. You don't want an event saying the user has scrolled when they haven't actually scrolled anywhere?

Support for `requestAnimationFrame` is IE10+ and a polyfil has been put in that accommodates older browsers. This has been tested on IE9+ and works perfectly fine.

It has also dropped the dependency on jQuery so that this can be used with vanilla JavaScript.

## Installation

Add plugin file to the page

```html```
<script src="dist/jquery.windowscroll.min.js"></script>
```

Listen for the event. All done!

```javascript
if (document.addEventListener) {
    document.addEventListener("wscroll", function (e) {
        console.log(e.scrolltop);
    }, true);
} else {
    document.attachEvent("wscroll", function (e) {
        console.log(e.scrolltop);
    });
}
```
