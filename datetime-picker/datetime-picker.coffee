Polymer "datetime-picker",
  showCalendar: true
  hidePicker: true

  observe: {
    timeString: 'setFullStr'
    dateString: 'setFullStr'
  }

  ready: ->
    @updateTopLeft()

  updateTopLeft: ->
    @inputTop = @offsetTop
    @inputLeft = @offsetLeft

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
    if @hidePicker
      @hidePicker = false

  onHidePicker: ->
    @hidePicker = true
