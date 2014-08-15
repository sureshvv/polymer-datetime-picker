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
    @checkSize()
    # hack to get click events to bubble up, see:
    # http://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

    if bowser.ios
      body = document.querySelector('body')
      if not body.getAttribute('style')
        body.setAttribute('style', '')

      body.style.cursor = 'pointer'

  checkSize: ->
    onresize = =>
      console.log 'onresize'
      width = window.innerWidth
      if width < 400
        width = (width - 60) + 'px'
      else
        width = 'auto'

      @$.picker.style.width = width

    window.addEventListener 'resize', onresize
    onresize()

  addListeners: ->
    @docClickListener = =>
      if not @clickedLocally
        @hidePicker = true

      @clickedLocally = false

    @localClickListener = => @clickedLocally = true

    document.addEventListener 'click', @docClickListener
    @addEventListener 'click', @localClickListener

  removeListeners: ->
    @removeEventListener 'click', @localClickListener
    document.removeEventListener 'click', @docClickListener

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

  selectInput: ->
    console.log '@hidePicker'
    console.log @hidePicker
    if @hidePicker
      top = @offsetTop
      left = @offsetLeft

      picker = @$.picker

      num = if bowser.webkit then 55 else 30

      picker.style.top = (top + num) + 'px'
      picker.style.left = left + 'px'

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
    @$.picker.style.width = width

    @showCalendar = !@showCalendar
