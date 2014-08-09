(function() {
  var __slice = [].slice;

  Polymer("datetime-picker", {
    showCalendar: true,
    hidePicker: true,
    observe: {
      hidePicker: "pickerShownOrHidden",
      selectedDate: "selectedDateChanged",
      timeString: 'setFullStr',
      dateString: 'setFullStr'
    },
    handleClick: function(e, fn) {
      if (!this.clickedLocally) {
        this.hidePicker = true;
        document.removeEventListener('click', fn);
      }
      return this.clickedLocally = false;
    },
    pickerShownOrHidden: function() {
      var fn;
      if (!this.hidePicker) {
        fn = (function(_this) {
          return function() {
            var args;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            args.push(fn);
            return _this.handleClick.apply(_this, args);
          };
        })(this);
        return document.addEventListener('click', fn);
      }
    },
    ready: function() {
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
    selectedDateChanged: function() {
      this.selectedMonthName = this.$.calendar.getMonthName(this.selectedDate);
      this.selectedDay = this.selectedDate.getDate();
      return this.selectedYear = this.selectedDate.getFullYear();
    },
    setDateStr: function(e, str, sender) {
      return this.dateString = str;
    },
    setTimeStr: function(e, str, sender) {
      return this.timeString = str;
    },
    setFullStr: function() {
      var str;
      if (this.timeString) {
        str = this.dateString + " " + this.timeString;
      } else {
        str = this.dateString;
      }
      return this.fullStr = str;
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
    toggleShowCalendar: function() {
      return this.showCalendar = !this.showCalendar;
    }
  });

}).call(this);
