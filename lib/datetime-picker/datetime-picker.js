(function () {
  Polymer({
    is: 'datetime-picker',
    properties: {
      dateString: { observer: 'setFullStr' },
      label: { notify: true },
      showPicker: {
        type: Boolean,
        value: false
      },
      timeString: { observer: 'setFullStr' }
    },
    ready: function () {
      this.addEventListener('close-popup', this.closePopup);
      this.addEventListener('new-date-str', this.setDateStr);
      this.addEventListener('new-time-str', this.setTimeStr);
      var listenEvent;
      listenEvent = bowser.ios ? 'touchstart' : 'click';
      this.handleClick = function (_this) {
        return function () {
          return _this.async(function () {
            var clickedInput, clickedPopup, popup;
            popup = Polymer.dom(this.shadowRoot).querySelector('#popup');
            clickedPopup = popup && popup.clickedLocally;
            clickedInput = this.$.input.clickedLocally;
            console.log('clickedInput: ' + clickedInput);
            console.log('clickedPopup: ' + clickedPopup);
            if (clickedPopup || clickedInput) {
              return this.showPicker = true;
            } else {
              return this.showPicker = false;
            }
          });
        };
      }(this);
      return document.addEventListener(listenEvent, this.closePopup);
    },
    detached: function () {
      return document.removeEventListener(this);
    },
    setDateStr: function (e, str, sender) {
      return this.dateString = e.detail;
    },
    setTimeStr: function (e, str, sender) {
      return this.timeString = e.detail;
    },
    setFullStr: function () {
      var str;
      if (this.dateString) {
        if (this.timeString) {
          str = this.dateString + ' ' + this.timeString;
        } else {
          str = this.dateString;
        }
      } else {
        str = '';
      }
      return this.fullStr = str;
    },
    selectInput: function () {
      this.showPicker = !this.showPicker;
      return true;
    },
    closePopup: function () {
      this.showPicker = !this.showPicker;
    }
  });
}.call(this));
