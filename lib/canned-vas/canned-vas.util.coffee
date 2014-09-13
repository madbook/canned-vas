## cannedvas.util

CannedVas.extend {
  width: (val) ->
    unless val? then return @vas.width
    @vas.width = val
    return this

  height: (val) ->
    unless val? then return @vas.height
    @vas.height = val
    return this

  size: (dimensionObj) ->
    unless dimensionObj? then return width: @width(), height: @height()
    if dimensionObj.width? then @width dimensionObj.width
    if dimensionObj.height? then @height dimensionObj.height
    return this

  createCanvas: () ->
    can = new CannedVas document.createElement 'canvas'
    return can.size @size()

  copyStyle: (can) ->
    return this

  clone: () ->
    return @createCanvas().image(@vas, 0, 0).copyStyle(this)

  open: (fnc, args...) ->
    unless fnc instanceof Function
      throw 'Cannot open, expecting a function object'
    fnc.bind(this) args...
    return this

  cannery: (fnc, list, args...) ->
    unless Array.isArray list
      throw 'Expecting a list'
    fnc = fnc.bind(this)
    for item in list
      @can fnc item, args...
    return this
}


# cannedvas.encode

CannedVas.extend {
  toDataURL: (type) ->
    return @vas.toDataURL type

  toBlob: (cb, type, jpegQuality) ->
    return @vas.toBlob cb, type, jpegQuality
}

## cannedvas.css

CannedVas.extend {
  style: (prop, val) ->
    unless val? then return window.getComputedStyle(@vas)[prop]
    @vas.style[prop] = val
    return this

  stylePx: (prop, val) ->
    if not val? then return @style(prop).slice(0, -2)
    @style prop, val + 'px'
    return this

  styleSize: (dimensionObj) ->
    if not dimensionObj? 
      return width: @stylePx('width'), height: @stylePx('height')
    if dimensionObj.width? then @stylePx 'width', dimensionObj.width
    if dimensionObj.height? then @stylePx 'height', dimensionObj.height
    return this
}

CannedVas.registerGetMethod 'scrollPathIntoView'
CannedVas.registerGetMethod 'isPointInPath'
CannedVas.registerGetMethod 'isPointInStroke'
CannedVas.registerGetMethod 'drawCustomFocusRing'
CannedVas.registerGetMethod 'drawSystemFocusRing'
CannedVas.registerGetMethod 'currentPath'

getDefaultPixelRatio = () ->
  can = document.createElement 'canvas'
  ctx = can.getContext '2d'
  devicePixelRatio = window.devicePixelRatio || 1
  backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                      ctx.mozBackingStorePixelRatio ||
                      ctx.msBackingStorePixelRatio ||
                      ctx.oBackingStorePixelRatio ||
                      ctx.backingStorePixelRatio || 1
  return devicePixelRatio / backingStoreRatio

defaultPixelRatio = getDefaultPixelRatio()

CannedVas.extend {
  setPixelRatio: (ratio) ->
    if not ratio?
      ratio = defaultPixelRatio
    original = @size()
    scaled = width: original.width * ratio, height: original.height * ratio
    @size scaled
    @styleSize original
    @scale ratio, ratio
    return this
}
