(function() {
  var DAYS_IN_MONTH, getDaysInMonth, getMonthName, months,
    __slice = [].slice;

  Array.prototype.chunk = function(chunkSize) {
    var R, i;
    R = [];
    i = 0;
    while (i < this.length) {
      R.push(this.slice(i, i + chunkSize));
      i += chunkSize;
    }
    return R;
  };

  months = [
    {
      name: 'January'
    }, {
      name: 'February'
    }, {
      name: 'March'
    }, {
      name: 'April'
    }, {
      name: 'May'
    }, {
      name: 'June'
    }, {
      name: 'July'
    }, {
      name: 'August'
    }, {
      name: 'September'
    }, {
      name: 'October'
    }, {
      name: 'November'
    }, {
      name: 'December'
    }
  ];

  DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  getDaysInMonth = function(year, month) {
    if ((month === 1) && (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0))) {
      return 29;
    } else {
      return DAYS_IN_MONTH[month];
    }
  };

  getMonthName = function(date) {
    return months[date.getMonth()].name;
  };

  Polymer("datetime-picker", {
    hidePicker: true,
    onCurrentMonth: true,
    observe: {
      shownDate: "shownDateChanged",
      selectedDate: "selectedDateChanged",
      hidePicker: "pickerHidden"
    },
    handleClick: function(e, fn) {
      console.log('handleClick');
      console.log('clickedLocally');
      console.log(this.clickedLocally);
      if (!this.clickedLocally) {
        this.hidePicker = true;
        document.removeEventListener('click', fn);
      }
      return this.clickedLocally = false;
    },
    pickerHidden: function() {
      var fn;
      if (!this.hidePicker) {
        fn = (function(_this) {
          return function() {
            var args;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            console.log('fn');
            args.push(fn);
            return _this.handleClick.apply(_this, args);
          };
        })(this);
        return document.addEventListener('click', fn);
      }
    },
    ready: function() {
      this.date = new Date();
      this.currentDay = this.date.getDate();
      this.shownDate = new Date();
      this.selectedDate = new Date();
      return this.addEventListener('click', (function(_this) {
        return function() {
          console.log('yo');
          return _this.clickedLocally = true;
        };
      })(this));
    },
    onBlur: function() {
      return this.hidePicker = true;
    },
    adjustDays: function() {
      var days, firstDay, _i, _results;
      this.shownDate.setDate(1);
      firstDay = 1 - this.shownDate.getDay();
      days = getDaysInMonth(this.shownDate.getFullYear(), this.shownDate.getMonth());
      return this.weeks = (function() {
        _results = [];
        for (var _i = firstDay; firstDay <= days ? _i <= days : _i >= days; firstDay <= days ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this).chunk(7);
    },
    isOnCurrentMonth: function() {
      return this.onCurrentMonth = this.date.getYear() === this.shownDate.getYear() && this.date.getMonth() === this.shownDate.getMonth();
    },
    shownDateChanged: function() {
      this.adjustDays();
      this.isOnCurrentMonth();
      this.shownMonthName = getMonthName(this.shownDate);
      this.shownMonth = this.shownDate.getMonth();
      return this.shownYear = this.shownDate.getFullYear();
    },
    selectedDateChanged: function() {
      this.selectedMonthName = getMonthName(this.selectedDate);
      this.selectedMonth = this.selectedDate.getMonth();
      this.selectedDay = this.selectedDate.getDate();
      return this.selectedYear = this.selectedDate.getFullYear();
    },
    clickInput: function() {
      var bounds, picker;
      bounds = this.$.input.getBoundingClientRect();
      console.log('bounds');
      console.log(bounds);
      picker = this.$.picker;
      picker.style.top = (bounds.top + 30) + 'px';
      picker.style.left = bounds.left + 'px';
      return this.hidePicker = false;
    },
    clickPrevious: function() {
      return this.goMonth(-1);
    },
    clickNext: function() {
      return this.goMonth(1);
    },
    clickDay: function(event, detail, el) {
      if (!el.classList.contains('dead-date')) {
        return this.selectDay(el.getAttribute('day'));
      }
    },
    pickTime: function() {
      return console.log('pickTime');
    },
    selectDay: function(day) {
      day = parseInt(day);
      this.selectedDay = day;
      this.selectedDate.setDate(day);
      this.selectedDate.setMonth(this.shownDate.getMonth());
      this.selectedDate.setFullYear(this.shownDate.getFullYear());
      return this.changeDate('selectedDate');
    },
    goMonth: function(dir) {
      this.shownDate.setMonth(this.shownDate.getMonth() + dir);
      return this.changeDate('shownDate');
    },
    changeDate: function(dateStr) {
      return this[dateStr] = new Date(this[dateStr].getTime());
    }
  });

}).call(this);
