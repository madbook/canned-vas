var CannedVas = require('./cannedvas')

var can = new CannedVas(document.createElement('canvas'))
var max = Math.max

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports.createTextLayout = function () {
        return new LayoutBlock()
    }
}

CannedVas.prototype.createTextLayout = function () {
    // Extends CannedVas with a method to generate a new LayoutBlock

    return new LayoutBlock()
}

CannedVas.prototype.drawTextLayout = function (layout) {
    // Extends CannedVas with a method to render a LayoutBlock

    layout.render(this)
    return this
}

function LayoutBlock () {
    // A helper class for formatting text for canvas drawing.  Drawing
    // complex blocks of text with the canvas api is horrible.  This attempts
    // to improve it.

    // Currently only has manual layout mode - manual.  There are no methods
    // (currently) of setting a width and flowing text in so that it
    // automatically wraps to a new line.  All line breaks are manual and all
    // text is aligned left (at the moment). I plan to add in more robust
    // layout options at some point.

    // Also, there are only two supported methods for styling text - font and
    // color. Both of these pass the given values right along to the standard
    // canvas 2d rendering context, so any styles that can be assigned via
    // those properties can be assigned here.  It only supports drawing text
    // with `fillText`.

    this.empty()
}

LayoutBlock.prototype.empty = function () {
    // Clear the layout completely.  All state is reset.

    this.cursor = new LayoutSpan()
    this.rows = [[this.cursor]]
    this.currentTextHeight = 0
    return this
}

LayoutBlock.prototype.newLine = function () {
    // Insert a line break

    this.cursor = new LayoutSpan()
    this.rows.push([this.cursor])

    this.cursor.lineHeight = this.currentTextHeight
    return this
}

LayoutBlock.prototype.newSpan = function () {
    // Adds a new span of text to the last row

    this.cursor = new LayoutSpan()
    this.rows[this.rows.length - 1].push(this.cursor)
    return this
}

LayoutBlock.prototype.font = function (val) {
    // Set the font attribute for any following text.  Updates the row's
    // lineHeight and creates a new span if text already exists at the cursor

    if (typeof this.cursor.text !== 'undefined')
        this.newSpan()

    var firstSpan = this.rows[this.rows.length - 1][0]
    can.font(val)
    this.cursor.textHeight = can.textHeight()
    firstSpan.lineHeight = max(firstSpan.lineHeight, this.cursor.textHeight)

    this.currentTextHeight = this.cursor.textHeight
    this.cursor.font = val
    return this
}

LayoutBlock.prototype.color = function (val) {
    // Set the font color for any following text.  Creates a new span if text
    // already exists at the cursor

    if (typeof this.cursor.text !== 'undefined')
        this.newSpan()
    this.cursor.color = val
    return this
}

LayoutBlock.prototype.text = function (text) {
    // Sets or appends text to the cursor

    if (typeof this.cursor.text !== 'undefined')
        this.cursor.text += ' ' + text
    else
        this.cursor.text = text
    return this
}

LayoutBlock.prototype.getSize = function () {
    // Returns the bounding box size for the current text

    var row, span
    var w, h
    var x, y
    var width, height
    var rowWidth, rowHeight

    width = 0
    height = 0
    h = this.rows.length
    y = 0
    while(y < h) {
        row = this.rows[y++]
        if (!row.length)
            continue
        w = row.length
        x = 0
        rowWidth = 0
        rowHeight = row[0].lineHeight

        while (x < w) {
            span = row[x++]
            span.applyStyles(can, this)
            rowWidth += span.getWidth(can)
        }

        width = max(width, rowWidth)
        height += rowHeight * 1.4
    }

    return { width: width, height: height }
}

LayoutBlock.prototype.flow = function (maxWidth) {
    throw 'Do not use! Not ready!'

    // Loops through layout and breaks any lines that exceed the width into
    // two (or more) lines

    var row, span
    var w, h
    var x, y
    var width, height
    var rowWidth, rowHeight
    var spanWidth
    var newRows

    width = 0
    height = 0
    y = this.rows.length
    while(y--) {
        row = this.rows[y]
        if (!row.length)
            continue
        w = row.length
        x = 0
        rowWidth = 0

        while (x < w) {
            span = row[x++]
            span.applyStyles(can, this)
            spanWidth = span.getWidth(can)
            if (rowWidth + spanWidth <= maxWidth) {
                rowWidth += span.getWidth(can)
                continue
            }

            newRows = this.breakSpan(span, maxWidth - rowWidth, maxWidth)
        }

        width = max(width, rowWidth)
        height += rowHeight * 1.4
    }

    return { width: width, height: height }
}

LayoutBlock.prototype.render = function (can) {
    // Draws the layout

    var row, span
    var w, h
    var x, y
    var rowWidth, rowHeight
    var lineHeight
    var lineHeightOffset

    h = this.rows.length
    y = 0
    can.save().textAlign('left')
    while(y < h) {
        row = this.rows[y++]
        if (!row.length)
            continue
        w = row.length
        x = 0
        rowWidth = 0
        rowHeight = row[0].lineHeight
        lineHeight = rowHeight * 1.4
        lineHeightOffset = lineHeight - ((lineHeight - rowHeight) / 2) - (rowHeight / 5)

        can.translate(0, lineHeightOffset)
        while (x < w) {
            span = row[x++]
            span.applyStyles(can, this)
            if (span.text !== undefined) {
                can.fillText(span.text, rowWidth, 0)
                rowWidth += span.getWidth(can)
            }
        }
        can.translate(0, lineHeight - lineHeightOffset)
    }
    can.restore()

    return this
}

LayoutBlock.prototype.breakSpan = function (span, firstLine, maxWidth) {
    throw 'Do not use! Not ready!'

    var rows = []

    if (span.text === undefined)
        return rows

    var breakText = span.text.split(/\s/g)
    if (!breakText.length)
        return rows

    span.applyStyles(can)

    var testSpan = new LayoutSpan()
    span.text = ''
    return
    while (0) {
        testSpan.text = breakText[i]

        // TODO
    }

}

function LayoutSpan () {
    // An inline block of sorts, stores text and style changes

    this.font = undefined
    this.color = undefined
    this.text = undefined
    this.textHeight = 0
    this.lineHeight = 0
}

LayoutSpan.prototype.applyStyles = function (can, block) {
    // Apply stored style information to the CannedVas

    if (this.font !== undefined) {
        can.font(this.font)
    }

    if (this.color !== undefined)
        can.fillStyle(this.color)
}

LayoutSpan.prototype.getWidth = function (can) {
    // Returns the width of this span's text

    if (this.text === undefined)
        return 0
    return can.textWidth(this.text + ' ')
}

LayoutSpan.prototype.getHeight = function (can) {
    // Returns the height of the CannedVas with the current styles

    if (this.text === undefined)
        return 0
    return can.textHeight()
}