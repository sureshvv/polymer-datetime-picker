(function() {
  Polymer("datetime-picker", {
    showCalendar: true,
    hidePicker: true,
    observe: {
      timeString: 'setFullStr',
      dateString: 'setFullStr'
    },
    ready: function() {
      return this.updateTopLeft();
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
      if (this.hidePicker) {
        return this.hidePicker = false;
      }
    },
    onHidePicker: function() {
      return this.hidePicker = true;
    }
  });

}).call(this);
