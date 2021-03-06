## cannedvas.util

CannedVas.extend {
  width: (val) ->
    unless val? then return @displayWidth
    @displayWidth = val
    @vas.width = val * @ratio
    @vas.style.width = val + 'px'
    @scale @ratio, @ratio
    return this

  height: (val) ->
    unless val? then return @displayHeight
    @displayHeight = val
    @vas.height = val * @ratio
    @vas.style.height = val + 'px'
    @scale @ratio, @ratio
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

CannedVas::setPixelRatio = (ratio) ->
  if not ratio?
    ratio = defaultPixelRatio
  original = @size()
  unscale = 1 / @ratio
  @ratio = ratio
  @width original.height * unscale
  @height original.height * unscale
  @scale unscale, unscale
  @scale ratio, ratio
  return this


CannedVas.extend {
  snap: -> 
    if not @meta 'snapped'
      snap = 0
      if @lineWidth() % 2
        snap = 0.5
      @translate -snap, -snap
      @meta 'snapped', snap
    return this

  unsnap: -> 
    snap = @meta 'snapped'
    if snap
      @translate snap, snap
      @meta 'snapped', false
    return this
}