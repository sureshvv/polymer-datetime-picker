(function() {
  Polymer("datetime-picker", {
    showPicker: false,
    observe: {
      timeString: 'setFullStr',
      dateString: 'setFullStr'
    },
    ready: function() {
      var listenEvent;
      this.updateTopLeft();
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
            if (clickedPopup || clickedInput) {
              return this.showPicker = true;
            } else {
              return this.showPicker = false;
            }
          });
        };
      })(this);
      return document.addEventListener(listenEvent, this.handleClick);
    },
    detached: function() {
      return document.removeEventListener(this);
    },
    updateTopLeft: function() {
      this.inputTop = this.offsetTop;
      return this.inputLeft = this.offsetLeft;
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
      return this.showPicker = true;
    }
  });

}).call(this);
