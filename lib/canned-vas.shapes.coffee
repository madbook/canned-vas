CannedVas = require './canned-vas'

TAU = Math.PI * 2

## Shapes

## cannedvas.rect
# The rect shape methods draw an axis-aligned box anchored at its top left corner

CannedVas.extend {
  rect: (x, y, w, h) ->
    @ctx.rect x, y, w, h
    return this

  clearRect: (x, y, w, h) ->
    @ctx.clearRect x, y, w, h
    return this

  clipRect: (x, y, w, h) ->
    return @path().rect(x, y, w, h).clip()

  fillRect: (x, y, w, h) ->
    @ctx.fillRect x, y, w, h
    return this

  strokeRect: (x, y, w, h) ->
    @ctx.strokeRect x, y, w, h
    return this

  paintRect: (x, y, w, h) ->
    @ctx.fillRect x, y, w, h
    @ctx.strokeRect x, y, w, h
    return this

  imageRect: (image, x, y, w, h) ->
    @ctx.drawImage image, x, y, w, h
    return this
}

## cannedvas.box
# A box is an axis-aligned rectangle anchored at its center

CannedVas.extend {
  box: (x, y, w, h) ->
    return @rect x - (w / 2), y - (h / 2), w, h

  clearBox: (x, y, w, h) ->
    return @clearRect x - (w / 2), y - (h / 2), w, h

  clipBox: (x, y, w, h) ->
    return @path().box(x, y, w, h).clip()

  fillBox: (x, y, w, h) ->
    return @fillRect x - (w / 2), y - (h / 2), w, h

  strokeBox: (x, y, w, h) ->
    return @strokeRect x - (w / 2), y - (h / 2), w, h

  paintBox: (x, y, w, h) ->
    return @paintRect x - (w / 2), y - (h / 2), w, h

  imageBox: (image, x, y, w, h) ->
    return @imageRect image, x - (w / 2), y - (h / 2), w, h
}

## cannedvas.circle
# A circle is a fully enclosed arc anchored at its center

CannedVas.extend {
  circle: (x, y, radius) ->
    @ctx.arc x, y, radius, 0, TAU
    return this

  clearCircle: (x, y, radius) ->
    return @path().circle(x, y, radius).clear()

  clipCircle: (x, y, radius) ->
    return @beginPath().circle(x, y, radius).clip()

  fillCircle: (x, y, radius) ->
    return @beginPath().circle(x, y, radius).fill()

  strokeCircle: (x, y, radius) ->
    return @beginPath().circle(x, y, radius).stroke()

  paintCircle: (x, y, radius) ->
    return @beginPath().circle(x, y, radius).paint()

  imageCircle: (image, x, y, radius) ->
    w = radius * 2
    @save().clipCircle(x, y, radius).imageBox(image, x, y, w, w).restore()
    return this
}

## cannedvas.ellipse
# An ellipse is an a fully enclosed oval anchored at its center

CannedVas.extend {
    ellipse: (x, y, w, h) ->
      k = 0.5522848
      w2 = w / 2
      h2 = h / 2
      ox = w2 * k
      oy = h2 * k
      x1 = x + w2
      y1 = y + h2
      x2 = x - w2
      y2 = y - h2

      @moveTo x1, y
        .bezierCurveTo x1, y - oy, x - ox, y1, x, y1
        .bezierCurveTo x + ox, y1, x2, y - oy, x2, y
        .bezierCurveTo x2, y + oy, x + ox, y2, x, y2
        .bezierCurveTo x - ox, y2, x1, y + oy, x1, y
      return this

    clearEllipse: (x, y, w, h) ->
      return @path().ellipse(x, y, w, h).clear()

    clipEllipse: (x, y, w, h) ->
      return @path().ellipse(x, y, w, h).clip()

    fillEllipse: (x, y, w, h) ->
      return @path().ellipse(x, y, w, h).fill()

    strokeEllipse: (x, y, w, h) ->
      return @path().ellipse(x, y, w, h).stroke()

    paintEllipse: (x, y, w, h) ->
      return @path().ellipse(x, y, w, h).paint()

    imageEllipse: (img, x, y, w, h) ->
      @save().clipEllipse(x, y, w, h).imageBox(img, x, y, w, h).restore()
      return this
}

## cannedvas.canvas
# The canvas shape is simply the full size of the canvas element

CannedVas.extend {
  canvas: () ->
    return @rect 0, 0, @vas.width, @vas.height

  clearCanvas: () ->
    return @clearRect 0, 0, @vas.width, @vas.height

  fillCanvas: () ->
    return @fillRect 0, 0, @vas.width, @vas.height

  strokeCanvas: () ->
    return @strokeRect 0, 0, @vas.width, @vas.height

  paintCanvas: () ->
    return @paintRect 0, 0, @vas.width, @vas.height

  imageCanvas: (img) ->
    return @imageRect img, 0, 0, @vas.width, @vas.height
}

## cannedvas.lines
# Line drawing methods that follow the "operationShape" convention, only support
# the noop, clear, and stroke operations

CannedVas.extend {
  line: (x1, y1, x2, y2) ->
    return @moveTo(x1, y1).lineTo(x2, y2)

  clearLine: (x1, y1, x2, y2) ->
    globals = @globals()
    return @globals(CannedVas.eraser).strokeLine(x1, y1, x2, y2).globals(globals)

  strokeLine: (x1, y1, x2, y2) ->
    return @path().line(x1, y1, x2, y2).stroke()

  arc: (x, y, radius, start, end, anticlockwise) ->
    @ctx.arc x, y, radius, start, end, anticlockwise
    return this

  clearArc: (x, y, radius, start, end, anticlockwise) ->
    globals = @globals()
    @globals(CannedVas.eraser).strokeLine(x, y, radius, start, end, anticlockwise)
    return @globals(globals)

  strokeArc: (x, y, radius, start, end, anticlockwise) ->
    return @path().arc(x, y, radius, start, end, anticlockwise).stroke()
}
