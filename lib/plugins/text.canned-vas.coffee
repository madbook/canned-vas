max = Math.max
_can = new CannedVas document.createElement 'canvas'


CannedVas.extend {
  createTextBlock: ->
    return new CannedVasBlock

  drawTextBlock: (block) ->
    block.draw this
    return this
}


class CannedVasBlock
  constructor: ->
    @empty()

  empty: ->
    @currentFontSize = 0
    @currentLineHeight = 0
    @rows = []
    @newLine()
    return this

  newLine: ->
    @rows.push []
    @newSpan()
    @cursor.lineHeight = @currentLineHeight
    @cursor.maxFontSize = @currentFontSize
    return this

  newSpan: ->
    @cursor = new CannedVasSpan
    @pushSpan(@cursor)
    return this

  pushSpan: (span) ->
    return @getLastRow().push(span)

  getLastRow: () ->
    return @rows[@rows.length -1]

  font: (val) ->
    if not val
      return @cursor.font
    else
      if @cursor.text?
        @newSpan()
      firstSpan = @getLastRow()[0]
      can.font val
      fontSize = @can.getFontSize('')
      lineHeight = @cal.getLineHeight('')
      @cursor.fontSize = fontSize
      firstSpan.lineHeight = max firstSpan.lineHeight, lineHeight
      firstSpan.maxFontSize = max firstSpan.maxFontSize, fontSize
      @currentFontSize = fontSize
      @currentLineHeight = lineHeight
      @cursor.font = val
      return this

  color: (val) -> 
    if not val
      return @cursor.color
    else
      if @cursor.text?
        @newSpan()
      @cursor.color = val
      return this

  text: (val) ->
    if not val
      return @cursor.text
    else
      if @cursor.text?
        @cursor.text += ' ' + val
      else
        @cursor.text = val
    return this

  getSize: ->
    size = width: 0, height: 0
    for row in @rows
      if not row.length
        continue
      rowWidth = 0
      rowHeight = row[0].lineHeight
      for span in row
        span.applyStyles _can, this
        rowWidth += span.getWidth _can
      size.width = max size.width, rowWidth
      size.height += rowHeight
    return size

    draw: (can) ->
      can.save()
      can.textAlign 'left'

      for row in @rows
        if not row.length
          continue
        lineHeight = row[0].lineHeight
        maxFontSize = row[0].maxFontSize
        lineHeightOffset = lineHeight - ((lineHeight - maxFontSize) / 2) - (maxFontSize / 5)
        can.translate(0, lineHeightOffset)
        for span in row
          span.applyStyles can, this
          if span.text?
            can.fillText span.text, rowWidth, 0
            rowWidth += span.getWidth can

        can.translate 0, lineHeight - lineHeightOffset

      can.restore()
      return this


class CannedVasSpan
  constructor: ->
    @font = null
    @color = null
    @text = null
    @fontSize = 14
    @lineHeight = 20

  applyStyles: (can, block) ->
    if @font?
      can.font @font
    if @color?
      can.fillStyle @color
    return this

  getWidth: (can) ->
    if not @text?
      return 0
    else
      return can.getTextWidth @text + ' '
