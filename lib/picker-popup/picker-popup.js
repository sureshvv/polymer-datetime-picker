(function() {
  Polymer("picker-popup", {
    showCalendar: true,
    bottomLabel: 'time picker',
    observe: {
      showCalendar: 'showCalendarChanged'
    },
    ready: function() {
      return this.addListeners();
    },
    attached: function() {
      return this.setupSizing();
    },
    detached: function() {
      return this.removeListeners();
    },
    checkTopLeft: function() {
      var left, num, picker, top;
      picker = this.parentNode.host;
      top = picker.offsetTop;
      if (this.isMobile) {
        left = 0;
      } else {
        left = picker.offsetLeft;
      }
      num = bowser.webkit ? 65 : 30;
      this.style.top = (top + num) + 'px';
      return this.style.left = left + 'px';
    },
    setupSizing: function() {
      this.onresize = (function(_this) {
        return function() {
          var padding, width;
          width = window.innerWidth;
          if (width < 400) {
            _this.isMobile = true;
            width = '100%';
            padding = '10px 0';
          } else {
            _this.isMobile = false;
            width = 'auto';
            padding = '10px';
          }
          _this.checkTopLeft();
          _this.style.width = width;
          return _this.style.padding = padding;
        };
      })(this);
      return this.onresize();
    },
    addListeners: function() {
      return window.addEventListener('resize', (function(_this) {
        return function() {
          _this.fire('window-resized');
          return _this.onresize();
        };
      })(this));
    },
    removeListeners: function() {
      return window.removeEventListener('resize', this.onresize);
    },
    storeHeight: function() {
      var div;
      div = this.$.top.children[0];
      div.height = div.clientHeight + 'px';
      div.width = div.clientWidth + 'px';
      this.height = this.clientHeight + 'px';
      return this.width = this.clientWidth + 'px';
    },
    toggleShowCalendar: function() {
      if (this.showCalendar) {
        this.storeHeight();
      }
      return this.showCalendar = !this.showCalendar;
    },
    showCalendarChanged: function() {
      var dheight, div, height, width;
      div = this.$.top.children[0];
      if (this.showCalendar) {
        height = dheight = '';
        width = '';
        this.bottomLabel = 'time picker';
      } else {
        height = this.height;
        width = this.width;
        dheight = div.height;
        this.bottomLabel = 'date picker';
      }
      div.style.height = dheight;
      this.style.height = height;
      if (!this.isMobile) {
        return this.style.width = width;
      }
    }
  });

}).call(this);
