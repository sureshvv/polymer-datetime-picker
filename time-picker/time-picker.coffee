getAmPm = (hours) -> if hours <= 12 then 'AM' else 'PM'

getHours = (hours) ->
  if hours <= 12
    hours
    if hours < 1
      12
    end
  else
    hours - 12


pad = (num) -> if num < 10 then "0" + num else num


Polymer "time-picker", 
  observe: {
    minutes: 'fireNewTimeString'
    hours: 'fireNewTimeString'
    ampm: 'fireNewTimeString'
  }

  minChanged: ->
    @minutes = @$.minutes.immediateValue

  hoursChanged: ->
    @hours = @$.hours.immediateValue

  ready: ->
    d = new Date()

    @minutes = d.getMinutes()
    @hours = getHours(d.getHours())
    @ampm = getAmPm(d.getHours())

    @$.hours.value = @hours
    @$.minutes.value = @minutes

    @fireNewTimeString()

  fireNewTimeString: ->
    str = "#{@hours}:#{pad(@minutes)} #{@ampm}"
    @asyncFire('new-time-str', str)

  toggleAmPm: ->
    @ampm = if @ampm is 'AM' then 'PM' else 'AM'
