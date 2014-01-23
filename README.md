CannedVas
=========

A simple wrapper for the HTML `<canvas>` element and `CanvasRenderingContext2d`
that allows for chainable method calls.  Provides aliases for all standard
canvas methods, as well as get/set methods for canvas and context properties.

#### Goals

* Provide more convenient access to the canvas drawing api through _chaining_
* Make the api more _consitent_ by adding "missing" methods
* _Extend_ the api with more useful drawing methods


Method Chaining
--------

Every standard property of the `HTMLCanvasElement` and `CanvasRenderingContext2d` objects have been aliased, and all allow for chaining except where the method must return some other value.

Observe:

```
var cannedVas = require('./canned-vas.js')
var canvas = document.createElement('canvas')
var can = cannedVas.can(canvas)

can.fillStyle('rgb(255, 0, 0)').fillRect(50, 50, 100, 100)

```

Extended API
--------

There are many additional drawing methods available.  All have been added with the goal of making the API more convenient and consistent in mind.

### Attributes

All attributes for both the `canvas` and the `context` can be set or retrieved with the function of the same name.

For example, copying the fill style from one `CannedVas` to another:

```
can1.fillStyle(can2.fillStyle())
```

### Painting

The standard API provides two methods of using a path - `fill`, `stroke`, and `clip`. __CannedVas__ adds two additional painting methods.

- `clear` erases the current path, similar to `clearRect`
- `paint` performs a _fill_ and a _stroke_, for convenience

### Paths

__CannedVas__ adds one additional path-drawing method to the API.

- `line` accepts two points as arguments, and adds a line between them

### Shapes

The standard API only provides one convenience method for drawing a shape (the rectangle).  The `CannedVas` api provides several additional shapes.

- `box` - same as _rect_, but anchored in the middle rather than top-left
- `circle`
- `canvas` - same as _rect_, but automatically the full size of the canvas

Along with `rect`, each of these shapes has a _shape_ method to add it to the current path and a _paint_ method for each of the painting methods listed above.  For example:

```
can
    .save()
    .clearCanvas()
    .fillCanvas()
    .paintCircle(50, 50, 50)
    .clipCircle(50, 50, 50)
    .fillBox(50, 50, 10, 20)
    .restore()
```

### Text

The same methods that exist for each of the shapes listed above exist for rendering text, with the __exception__ of the _shape_ method and a _clear_ method.  If i figure out how to add text to the current path without drawing it then I will add those in.

