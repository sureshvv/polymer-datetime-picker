(function() {
  var DAYS_IN_MONTH, getDaysInMonth, getMonthName, monthNames;

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

  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  getDaysInMonth = function(year, month) {
    if ((month === 1) && (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0))) {
      return 29;
    } else {
      return DAYS_IN_MONTH[month];
    }
  };

  getMonthName = function(date) {
    return monthNames[date.getMonth()];
  };

  Polymer("calendar-picker", {
    publish: {
      pickerShown: false
    },
    onCurrentMonth: true,
    observe: {
      pickerShown: 'onPickerShown'
    },
    instanceTemplate: function(template) {
      HTMLTemplateElement.decorate(template);
      return this["super"](arguments);
    },
    ready: function() {
      this.date = new Date();
      this.currentDay = this.date.getDate();
      this.shownDate = new Date();
      return this.shownDateChanged();
    },
    onPickerShown: function() {
      if (this.pickerShown && !this.selectedDate) {
        this.selectedDate = new Date();
        return this.selectedDateChanged();
      }
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
      this.selectedYear = this.selectedDate.getFullYear();
      return this.fireNewDateString();
    },
    fireNewDateString: function() {
      var str;
      str = "" + this.selectedMonthName + "-" + this.selectedDay + "-" + this.selectedYear;
      return this.fire('new-date-str', str);
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
    selectDay: function(day) {
      day = parseInt(day);
      this.selectedDay = day;
      if (!this.selectedDate) {
        this.selectedDate = new Date(this.shownDate.getTime());
      }
      this.selectedDate.setDate(day);
      this.selectedDate.setMonth(this.shownDate.getMonth());
      this.selectedDate.setFullYear(this.shownDate.getFullYear());
      return this.selectedDateChanged();
    },
    goMonth: function(dir) {
      this.shownDate.setMonth(this.shownDate.getMonth() + dir);
      return this.shownDateChanged();
    }
  });

}).call(this);
