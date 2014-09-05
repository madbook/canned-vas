## cannedvas.text
# Methods for drawing text

CannedVas.extend {
  textWidth: (text) ->
    return @ctx.measureText(text).width

  textHeight: (text) ->
    d = document.createElement 'div'
    document.body.appendChild d
    d.innerHTML = 'm'
    d.style.font = @font()
    d.style.lineHeight = '1em'
    h = d.offsetHeight
    document.body.removeChild d
    return h

  clearText: (text, x, y) ->
    globals = @globals()
    return @globals(eraser).fillText(text, x, y).globals(globals)

  fillText: (text, x, y) ->
    @ctx.fillText text, x, y
    return this

  strokeText: (text, x, y) ->
    @ctx.strokeText text, x, y
    return this

  paintText: (text, x, y) ->
    return @fillText(text, x, y).strokeText(text, x, y)
}

CannedVas.registerGetMethod 'measureText'
CannedVas.registerGetSetProperty 'font'
CannedVas.registerGetSetProperty 'textAlign'
CannedVas.registerGetSetProperty 'textBaseline'
