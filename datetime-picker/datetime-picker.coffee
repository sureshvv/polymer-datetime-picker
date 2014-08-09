Polymer "datetime-picker",
  showCalendar: true
  hidePicker: true

  observe: {
    hidePicker: "pickerShownOrHidden"
    selectedDate: "selectedDateChanged"
    timeString: 'setFullStr'
    dateString: 'setFullStr'
  }

  handleClick: (e, fn) ->
    if not @clickedLocally
      @hidePicker = true
      document.removeEventListener('click', fn)

    @clickedLocally = false
    
  pickerShownOrHidden: ->
    if not @hidePicker
      fn = (args...) =>
        args.push fn
        @handleClick.apply(@, args)

      document.addEventListener 'click', fn

  ready: ->
    @addEventListener 'click', => console.log('yo'); @clickedLocally = true

  onBlur: -> @hidePicker = true

  selectedDateChanged: ->
    @selectedMonthName = @$.calendar.getMonthName(@selectedDate)
    @selectedDay = @selectedDate.getDate()
    @selectedYear = @selectedDate.getFullYear()

  setDateStr: (e, str, sender) -> @dateString = str

  setTimeStr: (e, str, sender) -> @timeString = str

  setFullStr: ->
    if @timeString
      str = @dateString + " " + @timeString
    else
      str = @dateString

    @fullStr = str

  clickInput: ->
    bounds = @$.input.getBoundingClientRect()

    console.log 'bounds'
    console.log bounds

    picker = @$.picker

    picker.style.top = (bounds.top + 30) + 'px'
    picker.style.left = bounds.left + 'px'

    @hidePicker = false

  toggleShowCalendar: ->
    @showCalendar = !@showCalendar
