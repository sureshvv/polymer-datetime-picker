Polymer "picker-popup",
  showCalendar: true
  bottomLabel: 'time picker'
 
  observe:
    showCalendar: 'showCalendarChanged'

  ready: ->
    @listenEvent = 'click'
    if bowser.ios
      @listenEvent = 'touchstart'

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

    num = if bowser.webkit then 55 else 30

    @style.top = (top + num) + 'px'
    @style.left = left + 'px'

  setupSizing: ->
    @onresize = =>
      width = window.innerWidth
      if width < 400
        @isMobile = true
        width = width - 20 + 'px'
      else
        @isMobile = false
        width = 'auto'

      @checkTopLeft()
      @style.width = width

    @onresize()

  addListeners: ->
    window.addEventListener 'resize', =>
      @fire('window-resized')
      @onresize()

    @docClickListener = =>
      if not @clickedLocally
        console.log 'fire hidePicker'
        @fire('hide-picker')

      @clickedLocally = false

    @localClickListener = => 
      console.log 'localClickListener'
      @clickedLocally = true

    document.addEventListener @listenEvent, @docClickListener
    @addEventListener @listenEvent, @localClickListener

  removeListeners: ->
    @removeEventListener @listenEvent, @localClickListener
    document.removeEventListener @listenEvent, @docClickListener
    window.removeEventListener 'resize', @onresize

  storeHeight: ->
    # store height/width so that height/width stays the same when toggling
    # between calendar/time picker
    @height =  @clientHeight - 20 + 'px'
    @width = @clientWidth - 20 + 'px'

  toggleShowCalendar: ->
    if @showCalendar
      @storeHeight()
    @showCalendar = !@showCalendar

  showCalendarChanged: ->
    if @showCalendar
      height = ''
      width = ''
      @bottomLabel = 'time picker'
    else
      height =  @height
      width = @width
      @bottomLabel = 'date picker'

    @style.height = height

    if !@isMobile
      @style.width = width
