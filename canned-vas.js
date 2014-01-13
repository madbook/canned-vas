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

CannedVas.prototype.font = function (fontType) {
    // Get or set the `font` attribute

    if (fontType === undefined)
        return this.ctx.font
    this.ctx.font = fontType
    return this
}

CannedVas.prototype.textAlign = function (val) {
    // Get or set the `textAlign` attribute

    if (val === undefined)
        return this.ctx.textAlign
    this.ctx.textAlign = val
    return this
}

CannedVas.prototype.textBaseLine = function (val) {
    // Get or set the `textBaseLine` attribute

    if (val === undefined)
        return this.ctx.textBaseLine
    this.ctx.textBaseLine = val
    return this
}

CannedVas.prototype.lineWidth = function (width) {
    // Get or set the `lineWidth` attribute

    if (width === undefined)
        return this.ctx.lineWidth = width
    this.ctx.lineWidth = width
    return this
}

CannedVas.prototype.lineCap = function (style) {
    // Get or set the lineCap style

    if (style === undefined)
        return this.ctx.lineCap
    this.ctx.lineCap = style
    return this
}

CannedVas.prototype.lineDashOffset = function (n) {
    // Get or set the offset for the line dash

    if (n === undefined)
        return this.ctx.lineDashOffset
    this.ctx.lineDashOffset = n
    return this
}

CannedVas.prototype.lineJoin = function (val) {
    // Get or set the `lineJoin` attribute

    if (val === undefined)
        return this.ctx.lineJoin
    this.ctx.lineJoin = val
    return this
}

CannedVas.prototype.miterLimit = function (val) {
    // Get or set the `miterLimit` attribute

    if (val === undefined)
        return this.ctx.miterLimit
    this.ctx.miterLimit = val
    return this
}

CannedVas.prototype.shadowBlur = function (val) {
    // Get or set the `shadowBlur` attribute

    if (val === undefined)
        return this.ctx.shadowBlur
    this.ctx.shadowBlur = val
    return this
}

CannedVas.prototype.shadowColor = function (val) {
    // Get or set the `shadowColor` attribute

    if (val === undefined)
        return this.ctx.shadowColor
    this.ctx.shadowColor = val
    return this
}

CannedVas.prototype.shadowOffsetX = function (val) {
    // Get or set the `shadowOffsetX` attribute

    if (val === undefined)
        return this.ctx.shadowOffsetX
    this.ctx.shadowOffsetX = val
    return this
}

CannedVas.prototype.shadowOffsetY = function (val) {
    // Get or set the `shadowOffsetY` attribute

    if (val === undefined)
        return this.ctx.shadowOffsetY
    this.ctx.shadowOffsetY = val
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

// Drawing methods

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

CannedVas.prototype.clip = function () {
    // Creates a clipping path from the current sub path

    this.ctx.clip()
    return this
}

CannedVas.prototype.closePath = function () {
    // Close the current path

    this.ctx.closePath()
    return this
}

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

CannedVas.prototype.transform = function (m11, m12, m21, m22, dx, dy) {
    // Not sure yet

    this.ctx.transform(m11, m12, m21, m22, dx, dy)
    return this
}

CannedVas.prototype.setTransform = function (m11, m12, m21, m22, dx, dy) {
    // Not sure yet

    this.ctx.setTransform(m11, m12, m21, m22, dx, dy)
    return this
}

CannedVas.prototype.resetTransform = function () {
    // stub

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