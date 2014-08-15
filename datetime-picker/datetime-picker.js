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
    ready: function() {
      var body;
      this.checkSize();
      if (bowser.ios) {
        body = document.querySelector('body');
        if (!body.getAttribute('style')) {
          body.setAttribute('style', '');
        }
        return body.style.cursor = 'pointer';
      }
    },
    checkSize: function() {
      var onresize;
      onresize = (function(_this) {
        return function() {
          var width;
          console.log('onresize');
          width = window.innerWidth;
          if (width < 400) {
            width = (width - 60) + 'px';
          } else {
            width = 'auto';
          }
          return _this.$.picker.style.width = width;
        };
      })(this);
      window.addEventListener('resize', onresize);
      return onresize();
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
    selectInput: function() {
      var left, num, picker, top;
      console.log('@hidePicker');
      console.log(this.hidePicker);
      if (this.hidePicker) {
        top = this.offsetTop;
        left = this.offsetLeft;
        picker = this.$.picker;
        num = bowser.webkit ? 55 : 30;
        picker.style.top = (top + num) + 'px';
        picker.style.left = left + 'px';
        this.hidePicker = false;
        return this.$.calendar.pickerShown = true;
      }
    },
    toggleShowCalendar: function() {
      var height, width;
      if (this.showCalendar) {
        height = this.$.picker.clientHeight - 20 + 'px';
        width = this.$.picker.clientWidth - 20 + 'px';
      } else {
        height = '';
        width = '';
      }
      this.$.picker.style.height = height;
      this.$.picker.style.width = width;
      return this.showCalendar = !this.showCalendar;
    }
  });

}).call(this);
