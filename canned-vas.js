function _toArray (arrayLike) {
    return Array.prototype.slice.call(arrayLike)
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = CannedVas
}

var PI = Math.PI
var TAU = PI * 2

function CannedVas (ctx) {
    // Other than storing a reference to the rendering context, the CannedVas
    // object is stateless.  Methods should all return `this` if applicable

    this.ctx = (ctx instanceof HTMLCanvasElement) ? ctx.getContext('2d') : ctx
    this.vas = this.ctx.canvas
}

CannedVas.can = function (ctxOrCanvas) {
    return new CannedVas(ctxOrCanvas)
}

// Get / Set methods

CannedVas.prototype.globalCompositeOperation =
CannedVas.prototype.compositeOperation = function (type) {
    // Get or set the `globalCompositeOperation` attribute

    if (type === undefined)
        return this.ctx.globalCompositeOperation
    this.ctx.globalCompositeOperation = type
    return this
}

CannedVas.prototype.globalAlpha =
CannedVas.prototype.alpha = function (alpha) {
    // Get or set the `globalAlpha` attribute

    if (alpha === undefined)
        return this.ctx.globalAlpha
    this.ctx.globalAlpha = alpha
    return this
}

CannedVas.prototype.fillStyle = function (style) {
    // Get or set the `fillStyle` attribute

    if (style === undefined)
        return this.ctx.fillStyle
    this.ctx.fillStyle = style
    return this
}

CannedVas.prototype.strokeStyle = function (style, width) {
    // Get or set the `strokeStyle` attribute; Optionally set the `lineWidth`

    if (style === undefined)
        return this.ctx.strokeStyle
    this.ctx.strokeStyle = style

    if (width !== undefined)
        this.lineWidth(width)

    return this
}

CannedVas.prototype.paintStyle = function (style) {
    // Set the fill and stroke style, or get the fill style

    if (style === undefined)
        return this.ctx.fillStyle
    this.ctx.fillStyle = style
    this.ctx.strokeStyle = style
    return this
}

CannedVas.prototype.lineWidth = function (width) {
    // Get or set the `lineWidth` attribute

    if (width === undefined)
        return this.ctx.lineWidth = width
    this.ctx.lineWidth = width
    return this
}

CannedVas.prototype.width = function (w) {
    // Get or set the `width` attribute of the canvas

    if (w === undefined)
        return this.vas.width
    this.vas.width = w
    return this
}

CannedVas.prototype.height = function (h) {
    // Get or set the `height` attribute of the canvas

    if (h === undefined)
        return this.vas.height
    this.vas.height = h
    return this
}

CannedVas.prototype.getLineDash = function () {
    // Get the lineDash as a array

    return this.ctx.getLineDash()
}

CannedVas.prototype.setLineDash = function (sequence) {
    // Set the lineDash with an array of non-negative numbers

    this.ctx.setLineDash(sequence)
    return this
}

CannedVas.prototype.lineDash = function (sequence) {
    // Convenience method to get or set the line dash

    if (sequence === undefined)
        return this.ctx.getLineDash()
    return this.ctx.setLineDash(sequence)
}

CannedVas.prototype.imageSmoothing =
CannedVas.prototype.imageSmoothingEnabled = function (bool) {
    // Sets the `imageSmoothingEnabled` attribute

    if (bool === undefined)
        return this.ctx.imageSmoothingEnabled
    this.ctx.imageSmoothingEnabled = bool
    return this
}

/*
    Build generic functions for the less commonly used methods
 */
RENDERING_CONTEXT_2D_PROPERTIES = [
    'font',
    'textAlign',
    'textBaseLine',
    'lineCap',
    'lineDashOffset',
    'lineJoin',
    'miterLimit',
    'shadowBlur',
    'shadowColor',
    'shadowOffsetX',
    'shadowOffsetY'
]

RENDERING_CONTEXT_2D_PROPERTIES.forEach(function (property) {
    CannedVas.prototype[property] = function (val) {
        // Get or set the css property

        if (val === undefined)
            return this.ctx[property]

        this.ctx[property] = val
        return this
    }
})

// Even some css attributes!
var CSS_PROPERTIES = [
    'width',
    'height',
    'background',
    'backgroundColor',
    'backgroundImage',
    'backgroundPosition',
    'border',
    'zIndex',
    'position',
    'left',
    'top',
    'display'
    ]

CSS_PROPERTIES.forEach(function (property) {
    CannedVas.prototype[('style' + property[0].toUpperCase() + property.slice(1))] = function (val) {
        // Get or set the css property

        if (val === undefined)
            return window.getComputedStyle(this.vas)[property]

        this.vas.style[property] = val
        return this
    }
})

CannedVas.prototype.style = function (property, val) {
    if (val === undefined)
        return window.getComputedStyle(this.vas)[property]

    this.vas.style[property] = val
    return this
}

// Methods

CannedVas.prototype.save = function () {
    this.ctx.save()
    return this
}

CannedVas.prototype.restore = function () {
    this.ctx.restore()
    return this
}



//  ##   #                             ###                      #
// #  #  #                             #  #
//  #    ###    ###  ###    ##         #  #  ###    ###  #  #  ##    ###    ###
//   #   #  #  #  #  #  #  # ##        #  #  #  #  #  #  #  #   #    #  #  #  #
// #  #  #  #  # ##  #  #  ##          #  #  #     # ##  ####   #    #  #   ##
//  ##   #  #   # #  ###    ##         ###   #      # #  ####  ###   #  #  #
//                   #                                                      ###

// R E C T
// Rectangle, anchored top-left

CannedVas.prototype.rect = function (x, y, w, h) {
    this.ctx.rect(x, y, w, h)
    return this
}

CannedVas.prototype.clearRect = function (x, y, w, h) {
    this.ctx.clearRect(x, y, w, h)
    return this
}

CannedVas.prototype.clipRect = function (x, y, w, h) {
    return this.beginPath().rectangle(x, y, w, h).clip()
}

CannedVas.prototype.fillRect = function (x, y, w, h) {
    this.ctx.fillRect(x, y, w, h)
    return this
}

CannedVas.prototype.strokeRect = function (x, y, w, h) {
    this.ctx.strokeRect(x, y, w, h)
    return this
}

CannedVas.prototype.paintRect = function (x, y, w, h) {
    this.ctx.fillRect(x, y, w, h)
    this.ctx.strokeRect(x, y, w, h)
    return this
}

CannedVas.prototype.imageRect = function (image, x, y, w, h) {
    this.ctx.drawImage(image, x, y, w, h)
    return this
}

// B O X
// Rectangle, anchored center

CannedVas.prototype.box = function (x, y, w, h) {
    this.ctx.rect(x - (w/2), y - (h/2), w, h)
    return this
}

CannedVas.prototype.clearBox = function (x, y, w, h) {
    this.ctx.clearRect(x - (w/2), y - (h/2), w, h)
    return this
}

CannedVas.prototype.clipBox = function (x, y, w, h) {
    return this.beginPath().box(x, y, w, h).clip()
}

CannedVas.prototype.fillBox = function (x, y, w, h) {
    this.ctx.fillRect(x - (w/2), y - (h/2), w, h)
    return this
}

CannedVas.prototype.strokeBox = function (x, y, w, h) {
    this.ctx.strokeRect(x - (w/2), y - (h/2), w, h)
    return this
}

CannedVas.prototype.paintBox = function (x, y, w, h) {
    this.ctx.fillRect(x - (w/2), y - (h/2), w, h)
    this.ctx.strokeRect(x - (w/2), y - (h/2), w, h)
    return this
}

CannedVas.prototype.imageBox = function (image, x, y, w, h) {
    this.ctx.drawImage(image, x - (w/2), y - (h/2), w, h)
    return this
}

// C I R C L E
// 360 degree arc, anchored center

CannedVas.prototype.circle = function (x, y, radius) {
    this.ctx.arc(x, y, radius, 0, TAU)
    return this
}

CannedVas.prototype.clearCircle = function (x, y, radius) {
    var alpha = this.ctx.globalAlpha
    var composite = this.ctx.globalCompositeOperation

    this.ctx.globalAlpha = 1
    this.ctx.globalCompositeOperation = 'destination-out'
    this.beginPath().circle(x, y, radius).fill()
    this.ctx.globalCompositeOperation = composite
    this.ctx.globalAlpha = alpha
    return this
}

CannedVas.prototype.clipCircle = function (x, y, radius) {
    return this.beginPath().circle(x, y, radius).closePath().clip()
}


CannedVas.prototype.fillCircle = function (x, y, radius) {
    return this.beginPath().circle(x, y, radius).fill()
}

CannedVas.prototype.strokeCircle = function (x, y, radius) {
    return this.beginPath().circle(x, y, radius).stroke()
}

CannedVas.prototype.paintCircle = function (x, y, radius) {
    return this.beginPath().circle(x, y, radius).fill().stroke()
}

CannedVas.prototype.imageCircle = function (image, x, y, radius) {
    var w = radius * 2
    this.save().clipCircle(x, y, radius).imageBox(image, x, y, w, w).restore()
    return this
}

// E L L I P S E
// An oval, anchored at center

CannedVas.prototype.ellipse = function (x, y, w, h) {
    var kappa = 0.5522848
    var w2 = w / 2
    var h2 = h / 2
    var ox = w2 * kappa // control point offset horizontal
    var oy = h2 * kappa // control point offset vertical
    var x1 = x + w2     // x
    var y1 = y + h2     // y
    var x2 = x - w2     // xe
    var y2 = y - h2     // ye

    this.moveTo(x1, y)
        .bezierCurveTo(x1, y - oy, x - ox, y1, x, y1)
        .bezierCurveTo(x + ox, y1, x2, y - oy, x2, y)
        .bezierCurveTo(x2, y + oy, x + ox, y2, x, y2)
        .bezierCurveTo(x - ox, y2, x1, y + oy, x1, y)
    return this
}

CannedVas.prototype.clearEllipse = function (x, y, w, h) {
    var alpha = this.ctx.globalAlpha
    var composite = this.ctx.globalCompositeOperation

    this.ctx.globalAlpha = 1
    this.ctx.globalCompositeOperation = 'destination-out'
    this.beginPath().ellipse(x, y, w, h).closePath().fill()
    this.ctx.globalCompositeOperation = composite
    this.ctx.globalAlpha = alpha
    return this
}

CannedVas.prototype.clipEllipse = function (x, y, w, h) {
    return this.beginPath().ellipse(x, y, w, h).closePath().clip()
}

CannedVas.prototype.fillEllipse = function (x, y, w, h) {
    return this.beginPath().ellipse(x, y, w, h).closePath().fill()
}

CannedVas.prototype.strokeEllipse = function (x, y, w, h) {
    return this.beginPath().ellipse(x, y, w, h).closePath().stroke()
}

CannedVas.prototype.paintEllipse = function (x, y, w, h) {
    return this.beginPath().ellipse(x, y, w, h).closePath().paint()
}

CannedVas.prototype.imageEllipse = function (img, x, y, w, h) {
    this.save().beginPath().ellipse(x, y, w, h).closePath().clip()
        .imageBox(img, x, y, w, h).restore()
    return this
}

// C A N V A S
// Draw to the full size of the canvas

CannedVas.prototype.canvas = function () {
    this.rect(0, 0, this.vas.width, this.vas.height)
    return this
}

CannedVas.prototype.clearCanvas = function () {
    var ctx = this.ctx
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    return this
}

CannedVas.prototype.fillCanvas = function () {
    this.ctx.fillRect(0, 0, this.vas.width, this.vas.height)
    return this
}

CannedVas.prototype.strokeCanvas = function () {
    this.ctx.strokeRect(0, 0, this.vas.width, this.vas.height)
    return this
}

CannedVas.prototype.paintCanvas = function () {
    this.ctx.fillRect(0, 0, this.vas.width, this.vas.height)
    this.ctx.strokeRect(0, 0, this.vas.width, this.vas.height)
    return this
}

CannedVas.prototype.imageCanvas = function (src) {
    var ctx = this.ctx
    ctx.drawImage(src, 0, 0, src.width, src.height, 0, 0, ctx.canvas.width, ctx.canvas.height)
    return this
}

// T E X T
// Paint some text, does not support all methods!

CannedVas.prototype.clearText = function (text, x, y, maxWidth) {
    var alpha = this.ctx.globalAlpha
    var composite = this.ctx.globalCompositeOperation

    this.ctx.globalAlpha = 1
    this.ctx.globalCompositeOperation = 'destination-out'
    this.ctx.fillText(text, x, y, maxWidth)
    this.ctx.globalCompositeOperation = composite
    this.ctx.globalAlpha = alpha
    return this
}

CannedVas.prototype.fillText = function (text, x, y, maxWidth) {
    if (maxWidth === undefined)
        this.ctx.fillText(text, x, y)
    else
        this.ctx.fillText(text, x, y, maxWidth)
    return this
}

CannedVas.prototype.strokeText = function (text, x, y, maxWidth) {
    if (maxWidth === undefined)
        this.ctx.strokeText(text, x, y)
    else
        this.ctx.strokeText(text, x, y, maxWidth)
    return this
}

CannedVas.prototype.paintText = function (text, x, y, maxWidth) {
    return this.fillText(text, x, y, maxWidth).strokeText(text, x, y, maxWidth)
}

// L I N E
// Straight line

CannedVas.prototype.line = function (x1, y1, x2, y2) {
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    return this
}

CannedVas.prototype.clearLine = function (x1, y1, x2, y2) {
    var alpha = this.ctx.globalAlpha
    var composite = this.ctx.globalCompositeOperation

    this.ctx.globalAlpha = 1
    this.ctx.globalCompositeOperation = 'destination-out'
    this.strokeLine(x1, y1, x2, y2)
    this.ctx.globalCompositeOperation = composite
    this.ctx.globalAlpha = alpha
    return this
}

CannedVas.prototype.strokeLine = function (x1, y1, x2, y2) {
    this.ctx.beginPath()
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.stroke()
    return this
}

// A R C
// Arc

CannedVas.prototype.arc = function (x, y, radius, startAngle, endAngle, anticlockwise) {
    this.ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)
    return this
}

CannedVas.prototype.clearArc = function (x, y, radius, startAngle, endAngle, anticlockwise) {
    var alpha = this.ctx.globalAlpha
    var composite = this.ctx.globalCompositeOperation

    this.ctx.globalAlpha = 1
    this.ctx.globalCompositeOperation = 'destination-out'
    this.strokeArc(x, y, radius, startAngle, endAngle, anticlockwise)
    this.ctx.globalCompositeOperation = composite
    this.ctx.globalAlpha = alpha
    return this
}

CannedVas.prototype.strokeArc = function (x, y, radius, startAngle, endAngle, anticlockwise) {
    this.ctx.beginPath()
    this.ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)
    this.ctx.stroke()
    return this
}



// ###                                 ###                      #
//  #                                  #  #
//  #    # #    ###   ###   ##         #  #  ###    ###  #  #  ##    ###    ###
//  #    ####  #  #  #  #  # ##        #  #  #  #  #  #  #  #   #    #  #  #  #
//  #    #  #  # ##   ##   ##          #  #  #     # ##  ####   #    #  #   ##
// ###   #  #   # #  #      ##         ###   #      # #  ####  ###   #  #  #
//                    ###                                                   ###

CannedVas.prototype.drawImage = function (/* too many */) {
    // Draw an image, supports too many formats to list

    this.ctx.drawImage.apply(this.ctx, _toArray(arguments))
    return this
}

CannedVas.prototype.drawImageAt = function (image, x, y) {
    // Format 1: Draw an image at its default size at a location

    this.ctx.drawImage(image, x, y)
    return this
}

CannedVas.prototype.drawImageIn = function (image, dx, dy, dw, dh) {
    // Format 2: Draw an image scaled to fit inside the specified rectangle

    this.ctx.drawImage(image, dx, dy, dw, dh)
    return this
}

CannedVas.prototype.drawImageCrop = function (image, sx, sy, sw, sh, dx, dy) {
    // Format 2.5: Draw a crop of the image at its default size (not standard)

    this.ctx.drawImage(image, sx, sy, sw, sh, dx, dy, sw, sh)
    return this
}

CannedVas.prototype.drawImageCropIn = function (image, sx, sy, sw, sh, dx, dy, dw, dh) {
    // Format 3: Draw a crop of an image, scaled to fit the destination rectangle

    this.ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    return this
}

CannedVas.prototype.drawImageCentered = function (src) {
    // Draws an image at its normal size, centered around (0, 0)

    var ctx = this.ctx
    ctx.drawImage(src, -src.width/2, -src.height/2, src.width, src.height)
    return this
}



// ###          #    #           ###          #    ##       #   #
// #  #         #    #           #  #               #       #
// #  #   ###  ###   ###         ###   #  #  ##     #     ###  ##    ###    ###
// ###   #  #   #    #  #        #  #  #  #   #     #    #  #   #    #  #  #  #
// #     # ##   #    #  #        #  #  #  #   #     #    #  #   #    #  #   ##
// #      # #    ##  #  #        ###    ###  ###   ###    ###  ###   #  #  #
//                                                                          ###

CannedVas.prototype.beginPath = function () {
    this.ctx.beginPath()
    return this
}

CannedVas.prototype.moveTo = function (x, y) {
    this.ctx.moveTo(x, y)
    return this
}

CannedVas.prototype.lineTo = function (x, y) {
    this.ctx.lineTo(x, y)
    return this
}

CannedVas.prototype.arcTo = function (x1, y1, x2, y2, radius) {
    this.ctx.arcTo(x1, y1, x2, y2, radius)
    return this
}

CannedVas.prototype.bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y) {
    this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
    return this
}

CannedVas.prototype.quadraticCurveTo = function (cpx, cpy, x, y) {
    this.ctx.quadraticCurveTo(cpx, cpy, x, y)
    return this
}

CannedVas.prototype.closePath = function () {
    this.ctx.closePath()
    return this
}



// ###          #           #     #
// #  #                     #
// #  #   ###  ##    ###   ###   ##    ###    ###
// ###   #  #   #    #  #   #     #    #  #  #  #
// #     # ##   #    #  #   #     #    #  #   ##
// #      # #  ###   #  #    ##  ###   #  #  #
//                                            ###

CannedVas.prototype.clear = function () {
    var alpha = this.ctx.globalAlpha
    var composite = this.ctx.globalCompositeOperation

    this.ctx.globalAlpha = 1
    this.ctx.globalCompositeOperation = 'destination-out'
    this.ctx.fill()
    this.ctx.globalCompositeOperation = composite
    this.ctx.globalAlpha = alpha

    return this
}

CannedVas.prototype.clip = function () {
    this.ctx.clip()
    return this
}

CannedVas.prototype.fill = function () {
    this.ctx.fill()
    return this
}

CannedVas.prototype.stroke = function () {
    this.ctx.stroke()
    return this
}

CannedVas.prototype.paint = function () {
    this.ctx.fill()
    this.ctx.stroke()
    return this
}



// ###                              #
//  #                              # #
//  #    ###    ###  ###    ###    #     ##   ###   # #    ###
//  #    #  #  #  #  #  #  ##     ###   #  #  #  #  ####  ##
//  #    #     # ##  #  #    ##    #    #  #  #     #  #    ##
//  #    #      # #  #  #  ###     #     ##   #     #  #  ###

CannedVas.prototype.rotate = function (angle) {
    // Rotate the context around the origin

    this.ctx.rotate(angle)
    return this
}

CannedVas.prototype.scale = function (x, y) {
    // Scales the context, anchored at the origin

    this.ctx.scale(x, y)
    return this
}

CannedVas.prototype.translate = function (x, y) {
    // Move the canvas origin relative to current origin position

    this.ctx.translate(x, y)
    return this
}

CannedVas.prototype.translateToCenter = function () {
    // Convenience for translating to the center of the canvas

    this.ctx.translate(this.vas.width / 2 | 0, this.vas.height / 2 | 0)
    return this
}

CannedVas.prototype.translateFromCenter = function () {
    // Convenience for translating from center back to top left

    this.ctx.translate(this.vas.width / -2 | 0, this.vas.height / -2 | 0)
    return this
}

CannedVas.prototype.transform = function (m11, m12, m21, m22, dx, dy) {
    // Apply a 2x2 matrix transform and a translate, relative to current?

    this.ctx.transform(m11, m12, m21, m22, dx, dy)
    return this
}

CannedVas.prototype.setTransform = function (m11, m12, m21, m22, dx, dy) {
    // Set the matrix transform and translate, absolute?

    this.ctx.setTransform(m11, m12, m21, m22, dx, dy)
    return this
}

CannedVas.prototype.resetTransform = function () {
    // Clear any existing transforms

    this.ctx.resetTransform()
    return this
}



// #  #   #
// ####
// ####  ##     ###    ##
// #  #   #    ##     #
// #  #   #      ##   #
// #  #  ###   ###     ##

CannedVas.prototype.scrollPathIntoView = function () {
    // Not sure yet

    this.ctx.scrollPathIntoView()
    return this
}

CannedVas.prototype.isPointInPath = function (x, y) {
    // Returns true if the point is contained in the current path

    return this.ctx.isPointInPath(x, y)
}

CannedVas.prototype.isPointInStroke = function (x, y) {
    // Returns true if the point is contained in the path's stoke

    return this.ctx.isPointInStroke(x, y)
}


// not sure what to make of these yet

CannedVas.prototype.drawCustomFocusRing = function (element) {
    // Not yet sure

    this.ctx.drawCustomFocusRing(element)
    return this
}

CannedVas.prototype.drawSystemFocusRing = function (element) {
    // Not sure yet

    this.ctx.drawSystemFocusRing(element)
    return this
}

CannedVas.prototype.currentPath = function () {
    // stub
    // i think this might not have any support atm

    return this.ctx.currentPath
}

CannedVas.prototype.createImageData = function (width, height /* or imageData */) {
    // Creates a new imageData object
    if (typeof arguments[0] !== 'object') {
        arguments[0] = arguments[0] || this.width()
        arguments[1] = arguments[1] || this.height()
    }

    return this.ctx.createImageData.apply(this.ctx, _toArray(arguments))
}

CannedVas.prototype.getImageData = function (x, y, w, h) {
    // Get an imageData object of the specified rectangle

    x |= 0
    y |= 0
    w = w || this.width()
    h = h || this.height()

    return this.ctx.getImageData(x, y, w, h)
}

CannedVas.prototype.putImageData = function (imageData, x, y, sx, sy, sw, sh) {
    // Put image data onto the canvas
    // Note that only x and y are required

    x |= 0
    y |= 0

    if (sx === undefined)
        this.ctx.putImageData(imageData, x, y)
    else
        this.ctx.putImageData(imageData, x, y, sx, sy, sw, sh)
    return this
}

CannedVas.prototype.imageData = function (imageData) {
    // Get or set an imageData object, assuming the dimensions match the canvas

    if (imageData === undefined)
        return this.ctx.getImageData(0, 0, this.vas.width, this.vas.height)
    this.ctx.putImageData(imageData, 0, 0)
    return this
}

CannedVas.prototype.measureText = function (text) {
    // Get the textMetrics object

    return this.ctx.measureText(text)
}

CannedVas.prototype.textWidth = function (text) {
    // Shortcut to measure text width

    return this.ctx.measureText(text).width
}

CannedVas.prototype.textHeight = function () {
    // A little hacky, but try to get font line height by creating a temporary
    // div and checking its height

    var d = document.createElement('div')
    document.body.appendChild(d)
    d.innerHTML = 'm'
    d.style.font = this.font()
    d.style.lineHeight = '1em'
    var h = d.offsetHeight
    document.body.removeChild(d)
    return h
}

CannedVas.prototype.createLinearGradient = function (x1, y1, x2, y2) {
    // Create a linear gradient object

    return this.ctx.createLinearGradient(x1, y1, x2, y2)
}

CannedVas.prototype.createRadialGradient = function (x1, y1, r1, x2, y2, r2) {
    // Creates a radial gradient object

    return this.ctx.createRadialGradient(x1, y1, r1, x2, y2, r2)
}

CannedVas.prototype.createPattern = function (image, repitition) {
    // Create a pattern object

    return this.ctx.createPattern(image, repitition)
}

CannedVas.prototype.toDataURL = function (type) {
    // Returns a data url representing the canvas

    return this.vas.toDataURL(type)
}

CannedVas.prototype.toBlob = function (callback, type, jpegQuality) {
    // Returns a Blob representing the image.  jpegQuality only applies for 'image/jpeg'

    return this.vas.toBlob(callback, type, jpegQuality)
}

// Special

CannedVas.prototype.size = function (dimensions) {
    // Get or set the width and height of the canvas

    if (dimensions === undefined)
        return { width: this.vas.width, height: this.vas.height }
    this.width(dimensions.width)
    this.height(dimensions.height)
    return this
}

CannedVas.prototype.createCanvas = function () {
    // Get another canvas (wrapped in a CannedVas object) of the same dimensions

    var c = new CannedVas(document.createElement('canvas'))
    c.width(this.width())
    c.height(this.height())

    return c
}

CannedVas.prototype.clone = function () {
    // Clone the given canvas, returning it (wrapped in a CannedVas object)

    return this.createCanvas().drawImage(this.vas, 0, 0)
}

var PROPERTIES_TO_COPY = [
    'fillStyle',
    'strokeStyle',
    'lineWidth',
    'font',
    'textAlign',
    'textBaseLine',
    'globalAlpha',
    'globalCompositeOperation'
]

CannedVas.prototype.copyStyle = function (fromCan) {
    // Copy some context properties from another CannedVas instance

    PROPERTIES_TO_COPY.forEach(function (prop) {
        this[prop](fromCan[prop]())
    }, this)

    return this
}

CannedVas.prototype.open = function (fnc) {
    // Call a function with `this` as its context, passing any additional
    // arguments to the function.  This lets you define custon methods inline or
    // call a custom drawing function inline
    //
    // Named `open` because i think "opening a can" is funny, `call` might be more
    // appropriate

    if (fnc instanceof Function)
        fnc.apply(this, _toArray(arguments).slice(1))
    return this
}

CannedVas.prototype.cannery = function (fnc, list) {
    // Perform iterates over an array, performing a custom function on each
    // item.  Any additional arguments are passed to the function _after_ the
    // list item.
    //
    // Not sure if this is useful, maybe for iterating over an array of points?

    if (!Array.isArray(list))
        throw 'Object must be an array'
    if (typeof fnc !== 'function')
        throw 'Must provide a function'

    var rest = _toArray(arguments).slice(2)
    list.forEach(function (item) {
        fnc.apply(this, [item].concat(rest))
    }, this)
    return this
}

CannedVas.prototype.filter = function (filter) {
    // Run the canvas through a filter function.

    var oldData = this.getImageData()
    var newData = this.createImageData(oldData)
    this.open(filter, oldData, newData)
    this.putImageData(newData)
    return this
}

CannedVas.createMatrixFilter = function (matrix) {
    // Returns a function that can be passed to a CannedVas instance's `filter` method

    return function (input, output) {
        CannedVas.applyMatrixFilter(input, output, matrix)
    }
}

CannedVas.applyMatrixFilter = function (input, output, matrix) {
    // Applies a matrix filter to the `input` imageData object, putting the
    // results into the `output` object

    var w = input.width
    var h = input.height
    var mw = matrix[0].length
    var mh = matrix.length
    var mw2 = mw / 2 | 0
    var mh2 = mh / 2 | 0
    var vals = [0, 0, 0]

    var x, y, i, mx, my, nx, ny, ni, c

    input = input.data
    output = output.data

    // for each x/y value, for each neighbor, for each channel
    y = h
    while ((x = w), y--)
    while (x--, (i = (((y * w) + x) * 4)), (my = mh), x) {
        c = vals.length
        while (c--)
            vals[c] = 0

        while (my--)
        if ((ny = my - mh2 + y) && ny >= 0 && ny < h && (mx = mw))
        while (mx--)
        if ((nx = mx - mw2 + x) && nx >= 0 && nx < w && (ni = (((ny * w) + nx) * 4), c = 3))
        while (c--)
            vals[c] += input[ni + c] * matrix[my][mx]

        c = vals.length
        while (c--)
            output[i + c] = vals[c]
    }

    // straight copy alpha channel
    y = h
    while (x = w, y--)
    while (x--, i = (((y * w) + x) * 4), x)
        output[i + 3] = input[i + 3]

    return this
}