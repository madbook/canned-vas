
var CannedVas

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    CannedVas = require('./cannedvas')

    module.exports.createBrush = function () {
        return new CannedVasBrush(null)
    }
}
else {
    CannedVas = window.CannedVas
}

CannedVas.prototype.createBrush = function (properties) {
  return new CannedVasBrush(this, properties)
}

CannedVas.prototype.useBrush = function (brush) {
  if (brush instanceof CannedVasBrush)
    brush.pushProperties(can)
  else
    throw 'Invalid brush!'

  return this
}

var defaultProperties = [
  'fillStyle',
  'strokeStyle',
  'lineWidth',
  'alpha',
  'compositeOperation'
]

function CannedVasBrush (can, properties) {
  // Stores some context style settings for applying later.  Useful if you
  // want to pre-define a few sets of drawing styles that you'll be swapping
  // frequently between

  properties || (properties = defaultProperties)
  this.settings = {}
  this.meta = {}

  if (can)
    this.pullProperties(can, properties)
}

CannedVasBrush.prototype.pullProperties = function (can, properties) {
  var i = properties.length
  var prop, val

  while (i--) {
    prop = properties[i]
    console.log(prop)
    if (typeof can[prop] !== 'function')
      throw 'Cannot set property '+property
    val = can[prop]()
    this.set(properties[i], val)
  }

  return this
}

CannedVasBrush.prototype.pushProperties = function (can) {
  var keys = Object.keys(this.settings)
  var settings = this.settings
  var prop
  var i = keys.length
  while (i--) {
    prop = keys[i]
    can[prop](settings[prop])
  }

  return this
}

CannedVasBrush.prototype.set = function (property, val) {
  if (CannedVas.prototype[property] instanceof Function)
    this.settings[property] = val
  else
    throw 'Invalid property!'
  return this
}

CannedVasBrush.prototype.get = function (property) {
  return this.settings[property] || this.meta[property]
}

CannedVasBrush.prototype.setMeta = function (property, val) {
  this.meta[property] = val
  return this
}

CannedVasBrush.prototype.getMeta = function (property, val) {
  return this.meta[property]
}
