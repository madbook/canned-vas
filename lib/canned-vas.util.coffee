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
    unless val? then return window.getComputedStyle(@vas)[property]
    @vas.style[property] = val
    return this
}

CannedVas.registerGetMethod 'scrollPathIntoView'
CannedVas.registerGetMethod 'isPointInPath'
CannedVas.registerGetMethod 'isPointInStroke'
CannedVas.registerGetMethod 'drawCustomFocusRing'
CannedVas.registerGetMethod 'drawSystemFocusRing'
CannedVas.registerGetMethod 'currentPath'
