(function() {
  Polymer("picker-popup", {
    showCalendar: true,
    bottomLabel: 'time picker',
    observe: {
      showCalendar: 'showCalendarChanged'
    },
    ready: function() {
      this.listenEvent = 'click';
      if (bowser.ios) {
        this.listenEvent = 'touchstart';
      }
      this.addListeners();
      return this.setupSizing();
    },
    detached: function() {
      return this.removeListeners();
    },
    checkTopLeft: function() {
      var left, num, top;
      top = this.inputTop;
      if (this.isMobile) {
        left = 0;
      } else {
        left = this.inputLeft;
      }
      num = bowser.webkit ? 55 : 30;
      this.style.top = (top + num) + 'px';
      return this.style.left = left + 'px';
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
          return _this.style.width = width;
        };
      })(this);
      return this.onresize();
    },
    addListeners: function() {
      window.addEventListener('resize', (function(_this) {
        return function() {
          _this.fire('window-resized');
          return _this.onresize();
        };
      })(this));
      this.docClickListener = (function(_this) {
        return function() {
          if (!_this.clickedLocally) {
            console.log('fire hidePicker');
            _this.fire('hide-picker');
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
    storeHeight: function() {
      this.height = this.clientHeight - 20 + 'px';
      return this.width = this.clientWidth - 20 + 'px';
    },
    toggleShowCalendar: function() {
      if (this.showCalendar) {
        this.storeHeight();
      }
      return this.showCalendar = !this.showCalendar;
    },
    showCalendarChanged: function() {
      var height, width;
      if (this.showCalendar) {
        height = '';
        width = '';
        this.bottomLabel = 'time picker';
      } else {
        height = this.height;
        width = this.width;
        this.bottomLabel = 'date picker';
      }
      this.style.height = height;
      if (!this.isMobile) {
        return this.style.width = width;
      }
    }
  });

}).call(this);
