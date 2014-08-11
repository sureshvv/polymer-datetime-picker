(function() {
  Polymer("datetime-picker", {
    showCalendar: true,
    hidePicker: true,
    observe: {
      selectedDate: "selectedDateChanged",
      hidePicker: "pickerShownOrHidden",
      timeString: 'setFullStr',
      dateString: 'setFullStr'
    },
    pickerShownOrHidden: function() {
      if (this.hidePicker) {
        return this.removeListeners();
      } else {
        return this.addListeners();
      }
    },
    addListeners: function() {
      this.docClickListener = (function(_this) {
        return function() {
          if (!_this.clickedLocally) {
            _this.hidePicker = true;
          }
          return _this.clickedLocally = false;
        };
      })(this);
      this.localClickListener = (function(_this) {
        return function() {
          return _this.clickedLocally = true;
        };
      })(this);
      document.addEventListener('click', this.docClickListener);
      return this.addEventListener('click', this.localClickListener);
    },
    removeListeners: function() {
      this.removeEventListener('click', this.localClickListener);
      return document.removeEventListener('click', this.docClickListener);
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
      if (this.dateString) {
        if (this.timeString) {
          str = this.dateString + " " + this.timeString;
        } else {
          str = this.dateString;
        }
      } else {
        str = "";
      }
      return this.fullStr = str;
    },
    clickInput: function() {
      var left, num, picker, top;
      if (this.hidePicker) {
        top = this.offsetTop;
        left = this.offsetLeft;
        picker = this.$.picker;
        num = bowser.webkit ? 55 : 30;
        picker.style.top = (top + num) + 'px';
        picker.style.left = left + 'px';
        return this.hidePicker = false;
      }
    },
    toggleShowCalendar: function() {
      return this.showCalendar = !this.showCalendar;
    }
  });

}).call(this);
