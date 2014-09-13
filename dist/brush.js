(function() {
  var CannedVasBrush;

  CannedVas.extend({
    createBrush: function(props) {
      return new CannedVasBrush(this, props);
    },
    useBrush: function(brush) {
      if (brush instanceof CannedVasBrush) {
        brush.applyProps(this);
      } else {
        throw 'Invalid brush';
      }
      return this;
    }
  });

  CannedVasBrush = (function() {

    /* Store a set of canvas rendering properties for reuse. */
    function CannedVasBrush(can, props) {
      props || (props = this.getDefaultProps());
      this.props = {};
      this.meta = {};
      if (can != null) {
        props = this.validateProps(can, props);
        this.copyProps(can, props);
      }
      return this;
    }

    CannedVasBrush.prototype.getDefaultProps = function() {
      return ['fillStyle', 'strokeStyle', 'lineWidth', 'alpha', 'compositeOperation'];
    };

    CannedVasBrush.prototype.copyProps = function(can, props) {
      var prop, _i, _len;
      for (_i = 0, _len = props.length; _i < _len; _i++) {
        prop = props[_i];
        this.setProp(prop, can[prop]());
      }
      return this;
    };

    CannedVasBrush.prototype.applyProps = function(can) {
      var prop, val, _i, _len, _ref, _results;
      _ref = this.props;
      _results = [];
      for (val = _i = 0, _len = _ref.length; _i < _len; val = ++_i) {
        prop = _ref[val];
        _results.push(can[prop](val));
      }
      return _results;
    };

    CannedVasBrush.prototype.setProp = function(prop, val) {
      if (CannedVas.prototype[prop] instanceof Function) {
        this.props[prop] = val;
      } else {
        console.warn('Invalid property ' + prop);
      }
      return this;
    };

    CannedVasBrush.prototype.getProp = function(prop) {
      if (this.props[prop] != null) {
        return this.props[prop];
      } else {
        return null;
      }
    };

    CannedVasBrush.prototype.setMeta = function(prop, val) {
      this.meta[prop] = val;
      return this;
    };

    CannedVasBrush.prototype.getMeta = function(prop) {
      if (this.meta[prop] != null) {
        return this.meta[prop];
      } else {
        return null;
      }
    };

    return CannedVasBrush;

  })();

}).call(this);
