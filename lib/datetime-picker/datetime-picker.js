(function() {
  Polymer("datetime-picker", {
    showPicker: false,
    observe: {
      timeString: 'setFullStr',
      dateString: 'setFullStr'
    },
    ready: function() {
      this.addEventListener('close-popup', this.closePopup);
      var listenEvent;
      listenEvent = bowser.ios ? 'touchstart' : 'click';
      this.handleClick = (function(_this) {
        return function() {
          return _this.async(function() {
            var clickedInput, clickedPopup, popup;
            popup = this.shadowRoot.querySelector('#popup');
            clickedPopup = popup && popup.clickedLocally;
            clickedInput = this.$.input.clickedLocally;
            console.log('clickedInput: ' + clickedInput);
            console.log('clickedPopup: ' + clickedPopup);
alert(clickedPopup);
alert(clickedInput);
            if (clickedPopup || clickedInput) {
              return this.showPicker = true;
            } else {
              return this.showPicker = false;
            }
          });
        };
      })(this);
      return document.addEventListener(listenEvent, this.closePopup);
    },
    detached: function() {
      return document.removeEventListener(this);
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
      this.showPicker = !this.showPicker;
      return true;
    },
    closePopup: function() {
alert('you tapped');
        this.showPicker = !this.showPicker
    }
  });

}).call(this);
