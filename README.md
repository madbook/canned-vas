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