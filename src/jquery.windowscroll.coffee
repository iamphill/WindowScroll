# Polyfil for request animation frame
do ->
    w = window
    for vendor in ['ms', 'moz', 'webkit', 'o']
        break if w.requestAnimationFrame
        w.requestAnimationFrame = w["#{vendor}RequestAnimationFrame"]
        w.cancelAnimationFrame = (w["#{vendor}CancelAnimationFrame"] or
                                  w["#{vendor}CancelRequestAnimationFrame"])

    # deal with the case where rAF is built in but cAF is not.
    if w.requestAnimationFrame
        return if w.cancelAnimationFrame
        browserRaf = w.requestAnimationFrame
        canceled = {}
        w.requestAnimationFrame = (callback) ->
            id = browserRaf (time) ->
                if id of canceled then delete canceled[id]
                else callback time
        w.cancelAnimationFrame = (id) -> canceled[id] = true

    # handle legacy browsers which don’t implement rAF
    else
        targetTime = 0
        w.requestAnimationFrame = (callback) ->
            targetTime = Math.max targetTime + 16, currentTime = +new Date
            w.setTimeout (-> callback +new Date), targetTime - currentTime

        w.cancelAnimationFrame = (id) -> clearTimeout id

getScrolTop = () ->
    window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0

do () ->
    eventName = "wscroll"
    lastScroll = 0

    # Main animation loop
    animationLoop = () =>
        # Get scroll top
        currentTop = getScrolTop()

        if lastScroll isnt currentTop
            lastScroll = currentTop

            if lastScroll isnt undefined
                # Create event to send
                if document.createEvent
                    scrollEvent = document.createEvent "HTMLEvents"
                    scrollEvent.initEvent eventName, true, true
                else
                    scrollEvent = document.createEventObject()
                    scrollEvent.eventType = eventName

                # Give event a name
                scrollEvent.eventName = eventName
                scrollEvent.scrolltop = lastScroll

                # Send event
                if document.createEvent
                    document.dispatchEvent scrollEvent
                else
                    document.fireEvent "on#{scrollEvent.eventType}", scrollEvent

        # Request new frame
        requestAnimationFrame animationLoop

    # Start looping
    animationLoop()
