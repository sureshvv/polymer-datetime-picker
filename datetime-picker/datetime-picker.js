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
      this.setupSizing();
      this.listenEvent = 'click';
      if (bowser.ios) {
        return this.listenEvent = 'touchstart';
      }
    },
    setupSizing: function() {
      this.onresize = (function(_this) {
        return function() {
          var width;
          width = window.innerWidth;
          if (width < 400) {
            _this.isMobile = true;
            width = width - 20 + 'px';
          } else {
            _this.isMobile = false;
            width = 'auto';
          }
          _this.checkTopLeft();
          return _this.$.picker.style.width = width;
        };
      })(this);
      return this.onresize();
    },
    addListeners: function() {
      window.addEventListener('resize', this.onresize);
      this.docClickListener = (function(_this) {
        return function() {
          console.log('docClickListener');
          if (!_this.clickedLocally) {
            _this.hidePicker = true;
          }
          return _this.clickedLocally = false;
        };
      })(this);
      this.localClickListener = (function(_this) {
        return function() {
          console.log('localClickListener');
          return _this.clickedLocally = true;
        };
      })(this);
      document.addEventListener(this.listenEvent, this.docClickListener);
      return this.addEventListener(this.listenEvent, this.localClickListener);
    },
    removeListeners: function() {
      this.removeEventListener(this.listenEvent, this.localClickListener);
      document.removeEventListener(this.listenEvent, this.docClickListener);
      return window.removeEventListener('resize', this.onresize);
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
    checkTopLeft: function() {
      var left, num, picker, top;
      console.log('checkTopLeft');
      top = this.offsetTop;
      if (this.isMobile) {
        left = 0;
      } else {
        left = this.offsetLeft;
      }
      picker = this.$.picker;
      num = bowser.webkit ? 55 : 30;
      picker.style.top = (top + num) + 'px';
      return picker.style.left = left + 'px';
    },
    selectInput: function() {
      if (this.hidePicker) {
        this.checkTopLeft();
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
      if (!this.isMobile) {
        this.$.picker.style.width = width;
      }
      return this.showCalendar = !this.showCalendar;
    }
  });

}).call(this);
