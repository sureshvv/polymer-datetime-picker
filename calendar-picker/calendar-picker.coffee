Array::chunk = (chunkSize) ->
  R = []
  i = 0

  while i < @length
    R.push @slice(i, i + chunkSize)
    i += chunkSize
  R

monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

# method jacked from angular ui bootstrap datepicker
getDaysInMonth = (year, month) ->
  (if ((month is 1) and (year % 4 is 0) and ((year % 100 isnt 0) or (year % 400 is 0))) then 29 else DAYS_IN_MONTH[month])

getMonthName = (date) -> monthNames[date.getMonth()]

Polymer "calendar-picker",
  onCurrentMonth: true

  observe: {
    shownDate: "shownDateChanged"
    selectedDate: "selectedDateChanged"
  }
    
  ready: ->
    @date =  new Date()
    @currentDay = @date.getDate()

    @shownDate = new Date()
    @selectedDate = new Date()

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

    @fireNewDateString()

  fireNewDateString: ->
    str = "#{@selectedMonthName}-#{@selectedDay}-#{@selectedYear}"
    @fire('new-date-str', str)

  clickPrevious: -> @goMonth(-1)

  clickNext: -> @goMonth(1)

  clickDay: (event, detail, el) ->
    if !el.classList.contains('dead-date')
      @selectDay(el.getAttribute('day'))

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


