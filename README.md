CannedVas
=========

A simple wrapper for the HTML `<canvas>` element and `CanvasRenderingContext2d`
that allows for chainable method calls.  Provides aliases for all standard
canvas methods, as well as get/set methods for canvas and context properties.

Observe:

```
var cannedVas = require('./canned-vas.js')
var canvas = document.createElement('canvas')
var can = cannedVas.can(canvas)

can.fillStyle('rgb(255, 0, 0)').fillRect(50, 50, 100, 100)

```

Rendering Context
--------

The 2d rendering context object is stored as the `ctx` property for direct access when necessary.

### Methods

`CannedVas` supports all standard canvas api methods, and each method returns the `CannedVas` instance to allow for chaining.

- save
- restore
- rotate
- scale
- translate
- transform
- setTransform
- clearRect
- fillRect
- strokeRect
- fillText
- strokeText
- drawImage
- beginPath
- moveTo
- lineTo
- arc
- arcTo
- bezierCurveTo
- quadraticCurveTo
- clip
- closePath
- stroke
- fill
- rect
- drawCustomFocusRing
- drawSystemFocusRing
- scrollPathIntoView
- isPointInPath
- isPointInStroke
- createImageData
- getImageData
- putImageData
- measureText
- createLinearGradient
- createRadialGradient
- createPattern

### Attributes

`CannedVas` also supports _getting_ and _setting_ all properties with functions.  For all attributes, a function of the same name exists.  If no value is passed, it returns the current value.  If a value is passed, it sets the attribute and returns the `CannedVas` instance for further chaining.

- globalCompositeOperation
- globalAlpha
- fillStyle
- strokeStyle
- font
- textAlign
- textBaseLine
- lineWidth
- lineCap
- lineDashOffset
- lineJoin
- miterLimit
- shadowBlur
- shadowColor
- shadowOffsetX
- shadowOffsetY
- getLineDash
- setLineDash
- lineDash

Canvas Element
--------

The `<canvas>` element is stored in the `can` attribute.  There are a few methods to interact with it directly as well.

- toDataURL
- toBlob
- width
- height

Custom Methods
--------

Finally, there are several non-standard methods included for convenience.

- compositeOperation
- alpha
- drawImageAt
- drawImageIn
- drawImageCrop
- drawImageCropIn
- drawImageCentered
- drawImageFull
- circle
- canvas
- clearCanvas
- strokeCanvas
- fillCanvas
- clearCircle
- clearText
- paintRect
- paintText
- fillCircle
- paintCircle
- strokeCircle
- imageData
- textWidth
- createCanvas
- clone
- open
- cannery

More
--------

There are probably a few methods I forgot to mention, and there is still a lot of work to be done specifically in cross-browser testing and implementing browser-specific methods.  Still, its nice and useable for most cases as-is.