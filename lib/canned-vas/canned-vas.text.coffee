## cannedvas.text
# Methods for drawing text

_div = document.createElement 'div'
_style = window.getComputedStyle _div

applyTestText = (text, can) ->
  _div.innerHTML = text
  _div.style.font = can.font()

CannedVas.extend {
  getTextWidth: (text) ->
    return @ctx.measureText(text).width

  getFontSize: (text) ->
    document.body.appendChild _div
    @_applyTestText text
    height = parseFloat _style.fontSize.slice 0, -2
    document.body.removeChild _div
    return height

  getLineHeight: (text) ->
    document.body.appendChild _div
    @_applyTestText text
    lineHeight = parseFloat _style.lineHeight.slice 0, -2
    document.body.removeChild _div
    return lineHeight

  _applyTestText: (text) ->
    _div.innerHTML = text
    _div.style.font = @font()

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
