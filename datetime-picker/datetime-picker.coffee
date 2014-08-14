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

  checkSize: ->
    onresize = =>
      console.log 'onresize'
      width = window.innerWidth
      if width < 400
        @$.calendar
        @$.picker.style.width = (width - 60) + 'px'

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
    @showCalendar = !@showCalendar
