(function () {
  var getAmPm, getHours, pad;
  getAmPm = function (hours) {
    if (hours < 12) {
      return 'AM';
    } else {
      return 'PM';
    }
  };
  getHours = function (hours) {
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
  pad = function (num) {
    if (num < 10) {
      return '0' + num;
    } else {
      return num;
    }
  };
  Polymer({
    is: 'time-picker',
    properties: {
      ampm: { observer: 'fireNewTimeString' },
      date: { notify: true },
      hours: { observer: 'fireNewTimeString' },
      minutes: { observer: 'fireNewTimeString' },
      step_size: {
        type: Number,
        value: 10
      }
    },
    incrHours: function () {
      if (Number(this.$.hours.innerText) == 11) {
        if (this.$.amradio.checked) {
          this.setPM();
        } else {
          return;
        }
      } else if (Number(this.$.hours.innerText) == 12) {
        this.set('$.hours.innerText', 0);
      }
      this.set('$.hours.innerText', Number(this.$.hours.innerText) + 1);
      this.hours = this.$.hours.innerText;
    },
    decrHours: function () {
      if (Number(this.$.hours.innerText) == 1) {
        if (this.$.amradio.checked) {
          return;
        } else {
          this.set('$.hours.innerText', 13);
        }
      } else if (Number(this.$.hours.innerText) == 12) {
        if (this.$.amradio.checked) {
          return;
        } else {
          this.setAM();
        }
      }
      this.set('$.hours.innerText', Number(this.$.hours.innerText) - 1);
      this.hours = this.$.hours.innerText;
    },
    incrMins: function () {
      var result = Number(this.$.mins.innerText) + this.step_size;
      if (result >= 59) {
        result = 0;
      }
      this.set('$.mins.innerText', pad(result));
      this.minutes = result;
    },
    decrMins: function () {
      var result = Number(this.$.mins.innerText) - this.step_size;
      if (result <= 0) {
        result = 0;
      }
      this.set('$.mins.innerText', pad(result));
      this.minutes = result;
    },
    setAM: function () {
      this.set('$.amradio.checked', true);
      this.set('$.pmradio.checked', false);
      this.ampm = 'AM';
    },
    setPM: function () {
      this.set('$.pmradio.checked', true);
      this.set('$.amradio.checked', false);
      this.ampm = 'PM';
    },
    ready: function () {
      var d;
      d = this.date || new Date();
      this.minutes = d.getMinutes();
      this.hours = getHours(d.getHours());
      this.ampm = getAmPm(d.getHours());
      // this.$.hours.value = this.hours;
      // this.$.minutes.value = this.minutes;
      return this.fireNewTimeString();
    },
    closePopup: function () {
      return this.fire('close-popup', true);
    },
    attached: function () {
      return this.fire('calendar-shown', false);
    },
    fireNewTimeString: function () {
      var str;
      str = '' + this.hours + ':' + pad(this.minutes) + ' ' + this.ampm;
      return this.fire('new-time-str', str);
    },
    toggleAmPm: function () {
      return this.ampm = this.ampm === 'AM' ? 'PM' : 'AM';
    }
  });
}.call(this));
