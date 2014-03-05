CannedVas = require './canned-vas'
CannedVas.eraser = alpha: 1, composite: 'destination-out'

# cannedvas.styles
# Methods for setting the drawing style of the rendering context

CannedVas.extend {
  compositeOperation: (val) ->
    unless val? then return @ctx.globalCompositeOperation
    @ctx.globalCompositeOperation = val
    return this

  alpha: (val) ->
    unless val? then return @ctx.globalAlpha
    @ctx.globalAlpha = val
    return this

  fillStyle: (val) ->
    unless val? then return @ctx.fillStyle
    @ctx.fillStyle = val
    return this

  strokeStyle: (val) ->
    unless val? then return @ctx.strokeStyle
    @ctx.strokeStyle = val
    return this

  paintStyle: (fill, stroke) ->
    unless fill? then return [@fillStyle(), @paintStyle()]
    @fillStyle fill
    @strokeStyle if stroke? then stroke else fill
    return this

  lineWidth: (val) ->
    unless val? then return @ctx.lineWidth
    @ctx.lineWidth = val
    return this

  lineDash: (sequence) ->
    unless sequence? then return @ctx.getLineDash()
    @ctx.setLineDash sequence
    return this
}

## cannedvas.draw
# Methods for creating paths and drawing them to the canvas

CannedVas.extend {
  path: () ->
    @ctx.beginPath()
    return this

  close: () ->
    @ctx.closePath()
    return this

  clear: () ->
    globals = @globals()
    return @globals(CannedVas.eraser).fill().globals(globals)

  fill: () ->
    @ctx.fill()
    return this

  stroke: () ->
    @ctx.stroke()
    return this

  paint: () ->
    return @fill().stroke()

  moveTo: (x, y) ->
    @ctx.moveTo x, y
    return this

  lineTo: (x, y) ->
    @ctx.lineTo x, y
    return this

  arcTo: (x1, y1, x2, y2, radius) ->
    @ctx.arcTo x1, y1, x2, y2, radius
    return this

  bezierCurveTo: (cp1x, cp1y, cp2x, cp2y, x, y) ->
    @ctx.bezierCurveTo cp1x, cp1y, cp2x, cp2y, x, y
    return this

  quadraticCurveTo: (cpx, cpy, x, y) ->
    @ctx.quadraticCurveTo cpx, cpy, x, y
    return this

  save: () ->
    @ctx.save()
    return this

  restore: () ->
    @ctx.restore()
    return this
}


## cannedvas.transform
# Context transform methods

CannedVas.extend {
  rotate: (angle) ->
    @ctx.rotate angle
    return this

  scale: (x, y) ->
    @ctx.scale x, y
    return this

  translate: (x, y) ->
    @ctx.translate x, y
    return this

  transform: (m11, m12, m21, m22, dx, dy) ->
    @ctx.transform m11, m12, m21, m22, dx, dy
    return this

  setTransform: (m11, m12, m21, m22, dx, dy) ->
    @ctx.setTransform m11, m12, m21, m22, dx, dy
    return this

  resetTransform: () ->
    @ctx.resetTransform()
    return this

  translateTo: (x, y) ->
    return @translate(x, y).moveTo(0, 0)
}

CannedVas.registerGetSetProperty 'imageSmoothingEnabled'

CannedVas.alias 'globalCompositeOperation', 'composite'
CannedVas.alias 'compositeOperation', 'composite'
CannedVas.alias 'globalAlpha', 'alpha'
CannedVas.alias 'beginPath', 'path'
CannedVas.alias 'closePath', 'close'
CannedVas.alias 'imageSmoothing', 'imageSmoothingEnabled'
