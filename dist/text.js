(function() {
  var CannedVasBlock, CannedVasSpan, max, _can;

  max = Math.max;

  _can = new CannedVas(document.createElement('canvas'));

  CannedVas.extend({
    createTextBlock: function() {
      return new CannedVasBlock;
    },
    drawTextBlock: function(block) {
      block.draw(this);
      return this;
    }
  });

  CannedVasBlock = (function() {
    function CannedVasBlock() {
      this.empty();
    }

    CannedVasBlock.prototype.empty = function() {
      this.currentFontSize = 0;
      this.currentLineHeight = 0;
      this.rows = [];
      this.newLine();
      return this;
    };

    CannedVasBlock.prototype.newLine = function() {
      this.rows.push([]);
      this.newSpan();
      this.cursor.lineHeight = this.currentLineHeight;
      this.cursor.maxFontSize = this.currentFontSize;
      return this;
    };

    CannedVasBlock.prototype.newSpan = function() {
      this.cursor = new CannedVasSpan;
      this.pushSpan(this.cursor);
      return this;
    };

    CannedVasBlock.prototype.pushSpan = function(span) {
      return this.getLastRow().push(span);
    };

    CannedVasBlock.prototype.getLastRow = function() {
      return this.rows[this.rows.length(-1)];
    };

    CannedVasBlock.prototype.font = function(val) {
      var firstSpan, fontSize, lineHeight;
      if (!val) {
        return this.cursor.font;
      } else {
        if (this.cursor.text != null) {
          this.newSpan();
        }
        firstSpan = this.getLastRow()[0];
        can.font(val);
        fontSize = this.can.getFontSize('');
        lineHeight = this.cal.getLineHeight('');
        this.cursor.fontSize = fontSize;
        firstSpan.lineHeight = max(firstSpan.lineHeight, lineHeight);
        firstSpan.maxFontSize = max(firstSpan.maxFontSize, fontSize);
        this.currentFontSize = fontSize;
        this.currentLineHeight = lineHeight;
        this.cursor.font = val;
        return this;
      }
    };

    CannedVasBlock.prototype.color = function(val) {
      if (!val) {
        return this.cursor.color;
      } else {
        if (this.cursor.text != null) {
          this.newSpan();
        }
        this.cursor.color = val;
        return this;
      }
    };

    CannedVasBlock.prototype.text = function(val) {
      if (!val) {
        return this.cursor.text;
      } else {
        if (this.cursor.text != null) {
          this.cursor.text += ' ' + val;
        } else {
          this.cursor.text = val;
        }
      }
      return this;
    };

    CannedVasBlock.prototype.getSize = function() {
      var row, rowHeight, rowWidth, size, span, _i, _j, _len, _len1, _ref;
      size = {
        width: 0,
        height: 0
      };
      _ref = this.rows;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        if (!row.length) {
          continue;
        }
        rowWidth = 0;
        rowHeight = row[0].lineHeight;
        for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
          span = row[_j];
          span.applyStyles(_can, this);
          rowWidth += span.getWidth(_can);
        }
        size.width = max(size.width, rowWidth);
        size.height += rowHeight;
      }
      return size;
      return {
        draw: function(can) {
          var lineHeight, lineHeightOffset, maxFontSize, _k, _l, _len2, _len3, _ref1;
          can.save();
          can.textAlign('left');
          _ref1 = this.rows;
          for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
            row = _ref1[_k];
            if (!row.length) {
              continue;
            }
            lineHeight = row[0].lineHeight;
            maxFontSize = row[0].maxFontSize;
            lineHeightOffset = lineHeight - ((lineHeight - maxFontSize) / 2) - (maxFontSize / 5);
            can.translate(0, lineHeightOffset);
            for (_l = 0, _len3 = row.length; _l < _len3; _l++) {
              span = row[_l];
              span.applyStyles(can, this);
              if (span.text != null) {
                can.fillText(span.text, rowWidth, 0);
                rowWidth += span.getWidth(can);
              }
            }
            can.translate(0, lineHeight - lineHeightOffset);
          }
          can.restore();
          return this;
        }
      };
    };

    return CannedVasBlock;

  })();

  CannedVasSpan = (function() {
    function CannedVasSpan() {
      this.font = null;
      this.color = null;
      this.text = null;
      this.fontSize = 14;
      this.lineHeight = 20;
    }

    CannedVasSpan.prototype.applyStyles = function(can, block) {
      if (this.font != null) {
        can.font(this.font);
      }
      if (this.color != null) {
        can.fillStyle(this.color);
      }
      return this;
    };

    CannedVasSpan.prototype.getWidth = function(can) {
      if (this.text == null) {
        return 0;
      } else {
        return can.getTextWidth(this.text + ' ');
      }
    };

    return CannedVasSpan;

  })();

}).call(this);
