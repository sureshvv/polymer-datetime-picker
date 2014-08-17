(function() {
  var getAmPm, getHours, pad;

  getAmPm = function(hours) {
    if (hours < 12) {
      return 'AM';
    } else {
      return 'PM';
    }
  };

  getHours = function(hours) {
    if (hours <= 12) {
      if (hours < 1) {
        return 12;
      } else {
        return hours;
      }
    } else {
      return hours - 12;
    }
  };

  pad = function(num) {
    if (num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  };

  Polymer("time-picker", {
    observe: {
      minutes: 'fireNewTimeString',
      hours: 'fireNewTimeString',
      ampm: 'fireNewTimeString'
    },
    minChanged: function() {
      return this.minutes = this.$.minutes.immediateValue;
    },
    hoursChanged: function() {
      return this.hours = this.$.hours.immediateValue;
    },
    ready: function() {
      var d;
      d = this.date || new Date();
      this.minutes = d.getMinutes();
      this.hours = getHours(d.getHours());
      this.ampm = getAmPm(d.getHours());
      this.$.hours.value = this.hours;
      this.$.minutes.value = this.minutes;
      return this.fireNewTimeString();
    },
    attached: function() {
      console.log('attached');
      return this.fire('calendar-shown', false);
    },
    fireNewTimeString: function() {
      var str;
      str = "" + this.hours + ":" + (pad(this.minutes)) + " " + this.ampm;
      return this.asyncFire('new-time-str', str);
    },
    toggleAmPm: function() {
      return this.ampm = this.ampm === 'AM' ? 'PM' : 'AM';
    }
  });

}).call(this);
