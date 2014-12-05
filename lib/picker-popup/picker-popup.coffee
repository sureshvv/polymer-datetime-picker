Polymer "picker-popup",
  showCalendar: true
  bottomLabel: 'time picker'
 
  observe:
    showCalendar: 'showCalendarChanged'

  ready: ->
    @addListeners()
    @setupSizing()

  detached: ->
    @removeListeners()

  checkTopLeft: ->
    top = @inputTop

    if @isMobile
      left = 0
    else
      left = @inputLeft

    num = if bowser.webkit then 65 else 30

    @style.top = (top + num) + 'px'
    @style.left = left + 'px'

  setupSizing: ->
    @onresize = =>
      width = window.innerWidth
      if width < 400
        @isMobile = true
        width = '100%'
        padding = '10px 0'
      else
        @isMobile = false
        width = 'auto'
        padding = '10px'

      @checkTopLeft()
      @style.width = width
      @style.padding = padding

    @onresize()

  addListeners: ->
    window.addEventListener 'resize', =>
      @fire('window-resized')
      @onresize()

  removeListeners: ->
    window.removeEventListener 'resize', @onresize

  storeHeight: ->
    # store height/width so that height/width stays the same when toggling
    # between calendar/time picker
    div = @$.top.children[0]
    div.height =  div.clientHeight + 'px'
    div.width = div.clientWidth + 'px'
    @height =  @clientHeight + 'px'
    @width = @clientWidth + 'px'

  toggleShowCalendar: ->
    if @showCalendar
      @storeHeight()
    @showCalendar = !@showCalendar

  showCalendarChanged: ->
    div = @$.top.children[0]
    if @showCalendar
      height = dheight = ''
      width = ''
      @bottomLabel = 'time picker'
    else
      height = @height
      width = @width
      dheight = div.height
      @bottomLabel = 'date picker'

    div.style.height = dheight
    @style.height = height

    if !@isMobile
      @style.width = width
