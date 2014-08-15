Polymer "datetime-picker",
  showCalendar: true
  hidePicker: true

  observe: {
    selectedDate: "selectedDateChanged"
    hidePicker: "pickerShownOrHidden"
    timeString: 'setFullStr'
    dateString: 'setFullStr'
  }

  pickerShownOrHidden: ->
    if @hidePicker
      @removeListeners()
    else
      @addListeners()

  ready: ->
    @setupSizing()

    @listenEvent = 'click'
    if bowser.ios
      @listenEvent = 'touchstart'

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

      @$.picker.style.width = width

    @onresize()

  addListeners: ->
    window.addEventListener 'resize', @onresize

    @docClickListener = =>
      console.log 'docClickListener'
      if not @clickedLocally
        @hidePicker = true

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

  selectedDateChanged: ->
    @selectedMonthName = @$.calendar.getMonthName(@selectedDate)
    @selectedDay = @selectedDate.getDate()
    @selectedYear = @selectedDate.getFullYear()

  setDateStr: (e, str, sender) -> @dateString = str

  setTimeStr: (e, str, sender) -> @timeString = str

  setFullStr: ->
    if @dateString
      if @timeString
        str = @dateString + " " + @timeString
      else
        str = @dateString
    else
      str = ""

    @fullStr = str

  checkTopLeft: ->
    console.log 'checkTopLeft'
    top = @offsetTop

    if @isMobile
      left = 0
    else
      left = @offsetLeft

    picker = @$.picker

    num = if bowser.webkit then 55 else 30

    picker.style.top = (top + num) + 'px'
    picker.style.left = left + 'px'

  selectInput: ->
    if @hidePicker
      @checkTopLeft()

      @hidePicker = false
      @$.calendar.pickerShown = true

  toggleShowCalendar: ->
    if @showCalendar
      height = @$.picker.clientHeight - 20 + 'px'
      width = @$.picker.clientWidth - 20 + 'px'
    else
      height = ''
      width = ''

    @$.picker.style.height = height

    if !@isMobile
      @$.picker.style.width = width

    @showCalendar = !@showCalendar
