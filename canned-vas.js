if (typeof 'require' === 'function')
    var _ = require('lodash')

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    exports.can = function (ctx) {
        // Simple wrapper utility for canvas drawing, allows for method chaining

        return new CannedVas(ctx)
    }
}

var PI = Math.PI
var TAU = PI * 2

function CannedVas (ctx) {
    // Other than storing a reference to the rendering context, the CannedVas
    // object is stateless.  Methods should all return `this` if applicable

    this.ctx = (ctx instanceof HTMLCanvasElement) ? ctx.getContext('2d') : ctx
    this.vas = this.ctx.canvas
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

// Methods

CannedVas.prototype.save = function () {
    // Save the context

    this.ctx.save()
    return this
}

CannedVas.prototype.restore = function () {
    // Restore a saved context

    this.ctx.restore()
    return this
}

// Shape drawing methods
/*
    Each shape has 5 possible forms:
    <shape>() - Add the shape to the current path
    clear<Shape>() - Clear the shape
    clip<Shape>() - Set the shape as the clipping path
    fill<Shape>() - Fill the shape
    stroke<Shape>() - Stroke the shape
    paint<Shape>() - Fill and stroke the shape

    Shapes available are:
    rect - a rectangle, anchored top-left
    box - a rectangle, anchored center
    circle - anchored center
    text - some text
    canvas - a rectangle, full size of canvas
 */

CannedVas.prototype.rect = function (x, y, w, h) {
    // Adds a rectangle to the path?

    this.ctx.rect(x, y, w, h)
    return this
}

CannedVas.prototype.clearRect = function (x, y, w, h) {
    // Clear a portion of the canvas

    this.ctx.clearRect(x, y, w, h)
    return this
}

CannedVas.prototype.clipRect = function (x, y, w, h) {
    // Set a rectanglular clipping region

    return this.beginPath().rectangle(x, y, w, h).clip()
}

CannedVas.prototype.fillRect = function (x, y, w, h) {

    // Fill a portion of the canvas

    this.ctx.fillRect(x, y, w, h)
    return this
}

CannedVas.prototype.strokeRect = function (x, y, w, h) {
    // Stroke a rectangle

    this.ctx.strokeRect(x, y, w, h)
    return this
}

CannedVas.prototype.paintRect = function (x, y, w, h) {
    // Fill and stroke a rectangle

    this.ctx.fillRect(x, y, w, h)
    this.ctx.strokeRect(x, y, w, h)
    return this
}

CannedVas.prototype.box = function (x, y, w, h) {
    // Adds a rectangle centered at (x, y)

    this.ctx.rect(x - (w/2), y - (h/2), w, h)
    return this
}

CannedVas.prototype.clearBox = function (x, y, w, h) {
    // Clears a rectangle centered at (x, y)

    this.ctx.clearRect(x - (w/2), y - (h/2), w, h)
    return this
}

CannedVas.prototype.clipBox = function (x, y, w, h) {
    // Set a box clipping region

    return this.beginPath().box(x, y, w, h).clip()
}

CannedVas.prototype.fillBox = function (x, y, w, h) {
    // Fills a rectangle centered at (x, y)

    this.ctx.fillRect(x - (w/2), y - (h/2), w, h)
    return this
}

CannedVas.prototype.strokeBox = function (x, y, w, h) {
    // Stokes a rectangle centered at (x, y)

    this.ctx.strokeRect(x - (w/2), y - (h/2), w, h)
    return this
}

CannedVas.prototype.paintBox = function (x, y, w, h) {
    // Fliis and strokes a rectangle centered at (x, y)

    this.ctx.fillRect(x - (w/2), y - (h/2), w, h)
    this.ctx.strokeRect(x - (w/2), y - (h/2), w, h)
    return this
}

CannedVas.prototype.circle = function (x, y, radius) {
    // Add a circular path at x, y

    this.ctx.arc(x, y, radius, 0, TAU)
    return this
}

CannedVas.prototype.clearCircle = function (x, y, radius) {
    // Clear a circular area

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
    // Set a circular clipping region

    return this.beginPath().circle(x, y, radius).closePath().clip()
}


CannedVas.prototype.fillCircle = function (x, y, radius) {
    // Fill a circle

    return this.beginPath().circle(x, y, radius).fill()
}

CannedVas.prototype.strokeCircle = function (x, y, radius) {
    // Stroke a circle

    return this.beginPath().circle(x, y, radius).stroke()
}

CannedVas.prototype.paintCircle = function (x, y, radius) {
    // Fill and stroke a circle

    return this.beginPath().circle(x, y, radius).fill().stroke()
}

CannedVas.prototype.text = function (text, x, y, maxWidth) {
    // Add text to the subpath
    // stub
    // not sure if this one is possible...
}

CannedVas.prototype.clearText = function (text, x, y, maxWidth) {
    // Clear area using text

    var alpha = this.ctx.globalAlpha
    var composite = this.ctx.globalCompositeOperation

    this.ctx.globalAlpha = 1
    this.ctx.globalCompositeOperation = 'destination-out'
    this.ctx.fillText(text, x, y, maxWidth)
    this.ctx.globalCompositeOperation = composite
    this.ctx.globalAlpha = alpha
    return this
}

CannedVas.prototype.clipText = function (text, x, y, maxWidth) {
    // Make text the clipping path
    // stub
    // relies on `text` method being doable
}

CannedVas.prototype.fillText = function (text, x, y, maxWidth) {
    // Draws text

    this.ctx.fillText(text, x, y, maxWidth)
    return this
}

CannedVas.prototype.strokeText = function (text, x, y, maxWidth) {
    // Stroke some text

    this.ctx.strokeText(text, x, y, maxWidth)
    return this
}

CannedVas.prototype.paintText = function (text, x, y, maxWidth) {
    // Fill and stroke some text

    this.ctx.fillText(text, x, y, maxWidth)
    this.ctx.strokeText(text, x, y, maxWidth)
    return this
}

CannedVas.prototype.canvas = function () {
    // Add a rect the size of the canvas to the subpath

    this.rect(0, 0, this.vas.width, this.vas.height)
    return this
}

CannedVas.prototype.clearCanvas = function () {
    // Erase the entire canvas

    var ctx = this.ctx
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    return this
}

CannedVas.prototype.clipCanvas = function () {
    // Set the clipping path to the full canvas size
    // stub
    // not sure this even ever makes sense
}

CannedVas.prototype.fillCanvas = function () {
    // Fill the entire canvas

    this.ctx.fillRect(0, 0, this.vas.width, this.vas.height)
    return this
}

CannedVas.prototype.strokeCanvas = function () {
    // Stroke the entire canvas

    this.ctx.strokeRect(0, 0, this.vas.width, this.vas.height)
    return this
}

CannedVas.prototype.paintCanvas = function () {
    // Fill and stroke the entire canvas

    this.ctx.fillRect(0, 0, this.vas.width, this.vas.height)
    this.ctx.strokeRect(0, 0, this.vas.width, this.vas.height)
    return this
}

// Image drawing methods

CannedVas.prototype.drawImage = function (/* too many */) {
    // Draw an image, supports too many formats to list

    this.ctx.drawImage.apply(this.ctx, _.toArray(arguments))
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

CannedVas.prototype.drawImageCanvas = function (src) {
    // Draw an image (or canvas) to cover the entire canvas

    var ctx = this.ctx
    ctx.drawImage(src, 0, 0, src.width, src.height, 0, 0, ctx.canvas.width, ctx.canvas.height)
    return this
}

CannedVas.prototype.drawImageFromRect = function (rect) {
    // stub

    this.ctx.drawImageFromRect(rect)
    return this
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

// Path drawing methods

CannedVas.prototype.beginPath = function () {
    // Begin a new path

    this.ctx.beginPath()
    return this
}

CannedVas.prototype.moveTo = function (x, y) {
    // Move the context without creating a line

    this.ctx.moveTo(x, y)
    return this
}

CannedVas.prototype.line = function (x1, y1, x2, y2) {
    // Shorthand for `moveTo(x1, y1).lineTo(x2, y2)`

    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    return this
}

CannedVas.prototype.lineTo = function (x, y) {
    // Move the context and create a line from the last location

    this.ctx.lineTo(x, y)
    return this
}

CannedVas.prototype.arc = function (x, y, radius, startAngle, endAngle, anticlockwise) {
    // Adds an arc to the path at (x, y),

    this.ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)
    return this
}

CannedVas.prototype.arcTo = function (x1, y1, x2, y2, radius) {
    // Adds an arc with the given control points, connected to previous point by
    // straight line

    this.ctx.arcTo(x1, y1, x2, y2, radius)
    return this
}

CannedVas.prototype.bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y) {
    // Adds a bezier curve with the given control points?

    this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
    return this
}

CannedVas.prototype.quadraticCurveTo = function (cpx, cpy, x, y) {
    // Adds a quadratic curve with the given control point

    this.ctx.quadraticCurveTo(cpx, cpy, x, y)
    return this
}

CannedVas.prototype.closePath = function () {
    // Close the current path

    this.ctx.closePath()
    return this
}

// Painting methods

CannedVas.prototype.clear = function () {
    // Clears the current path

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
    // Creates a clipping path from the current sub path

    this.ctx.clip()
    return this
}

CannedVas.prototype.fill = function () {
    // Fills the sub path

    this.ctx.fill()
    return this
}

CannedVas.prototype.stroke = function () {
    // Stroke the current path

    this.ctx.stroke()
    return this
}

CannedVas.prototype.paint = function () {
    // Fill and stroke the current path

    this.ctx.fill()
    this.ctx.stroke()
    return this
}

// Context transforms

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

// Constructors and other weird methods

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

CannedVas.prototype.currentPath = function () {
    // stub

    return this.ctx.currentPath
}

CannedVas.prototype.createImageData = function (width, height /* or imageData */) {
    // Creates a new imageData object

    return this.ctx.createImageData.apply(this.ctx, _.toArray(arguments))
}

CannedVas.prototype.getImageData = function (x, y, w, h) {
    // Get an imageData object of the specified rectangle

    return this.ctx.getImageData(x, y, w, h)
}

CannedVas.prototype.putImageData = function (imageData, x, y, sx, sy, sw, sh) {
    // Put image data onto the canvas
    // Note that only x and y are required

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

CannedVas.prototype.copyStyle = function (can) {
    // Copy some context properties from another CannedVas instance

    var copyProps = ['fillStyle', 'strokeStyle', 'lineWidth', 'font',
        'textAlign', 'textBaseLine', 'globalAlpha', 'globalCompositeOperation']

    copyProps.forEach(function (prop) {
        this[prop](can[prop]())
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
        fnc.apply(this, _.toArray(arguments).slice(1))
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

    var rest = _.toArray(arguments).slice(2)
    list.forEach(function (item) {
        fnc.apply(this, [item].concat(rest))
    }, this)
    return this
}