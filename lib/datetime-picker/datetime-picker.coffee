Polymer "datetime-picker",
  showPicker: false

  observe:
    timeString: 'setFullStr'
    dateString: 'setFullStr'

  ready: ->
    @updateTopLeft()

    listenEvent = if bowser.ios then 'touchstart' else 'click'

    @handleClick = =>
      @async ->
        popup = @shadowRoot.querySelector('#popup')
        clickedPopup = popup and popup.clickedLocally
        clickedInput = @$.input.clickedLocally
        console.log 'clickedInput: ' + clickedInput
        console.log 'clickedPopup: ' + clickedPopup

        if clickedPopup or clickedInput
          @showPicker = true
        else
          @showPicker = false

    document.addEventListener listenEvent, @handleClick

  detached: ->
    document.removeEventListener @

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
    @showPicker = true
