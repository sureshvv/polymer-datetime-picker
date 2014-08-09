Array::chunk = (chunkSize) ->
  R = []
  i = 0

  while i < @length
    R.push @slice(i, i + chunkSize)
    i += chunkSize
  R

months =  [
   { name: 'January'}
   { name: 'February'}
   { name: 'March'}
   { name: 'April'}
   { name: 'May'}
   { name: 'June'}
   { name: 'July'}
   { name: 'August'}
   { name: 'September'}
   { name: 'October'}
   { name: 'November'}
   { name: 'December'}
]

DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

# method jacked from angular ui bootstrap datepicker
getDaysInMonth = (year, month) ->
  (if ((month is 1) and (year % 4 is 0) and ((year % 100 isnt 0) or (year % 400 is 0))) then 29 else DAYS_IN_MONTH[month])

getMonthName = (date) -> months[date.getMonth()].name

Polymer "datetime-picker",
  hidePicker: true
  onCurrentMonth: true

  observe: {
    shownDate: "shownDateChanged"
    selectedDate: "selectedDateChanged"
    hidePicker: "pickerHidden"
  }

  handleClick: (e, fn) ->
    console.log 'handleClick'
    console.log 'clickedLocally'
    console.log @clickedLocally
    if not @clickedLocally
      @hidePicker = true
      document.removeEventListener('click', fn)

    @clickedLocally = false
    
  pickerHidden: ->
    if not @hidePicker
      fn = (args...) =>
        console.log 'fn'
        args.push fn
        @handleClick.apply(@, args)

      document.addEventListener 'click', fn

  ready: ->
    @date = new Date()
    @currentDay = @date.getDate()

    @shownDate = new Date()
    @selectedDate = new Date()

    @addEventListener 'click', => console.log('yo'); @clickedLocally = true

  onBlur: -> @hidePicker = true

  adjustDays: ->
    @shownDate.setDate(1)

    firstDay = 1 - @shownDate.getDay()

    days = getDaysInMonth(@shownDate.getFullYear(), @shownDate.getMonth())

    @weeks = [firstDay..days].chunk(7)

  isOnCurrentMonth: ->
    @onCurrentMonth = @date.getYear() == @shownDate.getYear() && @date.getMonth() == @shownDate.getMonth()

  shownDateChanged: ->
    @adjustDays()
    @isOnCurrentMonth()

    @shownMonthName = getMonthName @shownDate
    @shownMonth = @shownDate.getMonth()
    @shownYear = @shownDate.getFullYear()

  selectedDateChanged: ->
    @selectedMonthName = getMonthName(@selectedDate)
    @selectedMonth = @selectedDate.getMonth()
    @selectedDay = @selectedDate.getDate()
    @selectedYear = @selectedDate.getFullYear()

  clickInput: ->
    bounds = @$.input.getBoundingClientRect()

    console.log 'bounds'
    console.log bounds

    picker = @$.picker

    picker.style.top = (bounds.top + 30) + 'px'
    picker.style.left = bounds.left + 'px'

    @hidePicker = false

  clickPrevious: -> @goMonth(-1)

  clickNext: -> @goMonth(1)

  clickDay: (event, detail, el) ->
    if !el.classList.contains('dead-date')
      @selectDay(el.getAttribute('day'))

  pickTime: ->
    console.log 'pickTime'

  selectDay: (day) ->
    day = parseInt(day)
    @selectedDay = day
    @selectedDate.setDate(day)
    @selectedDate.setMonth(@shownDate.getMonth())
    @selectedDate.setFullYear(@shownDate.getFullYear())
    @changeDate 'selectedDate'

  goMonth: (dir) ->
    @shownDate.setMonth @shownDate.getMonth() + dir
    @changeDate 'shownDate'

  changeDate: (dateStr) ->
    @[dateStr] = new Date(@[dateStr].getTime())


