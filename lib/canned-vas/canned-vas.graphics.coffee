## cannedvas.fills

CannedVas.extend {
  createLinearGradient: (x1, y1, x2, y2) ->
    return @ctx.createLinearGradient x1, y1, x2, y2

  createRadialGradient: (x1, y1, r1, x2, y2, r2) ->
    return @ctx.createRadialGradient x1, y1, r1, x2, y2, r2

  createPattern: (image, repitition) ->
    return @ctx.createPattern image, repitition

  createRGB: (r, g, b) ->
    return 'rgb(#{r},#{g},#{b})'
}

## Image Drawing

CannedVas.extend {
  image: (args...) ->
    @ctx.drawImage args...
    return this

  imageAt: (image, x, y) ->
    @ctx.drawImage image, x, y
    return this

  imageIn: (image, dx, dy, dw, dh) ->
    # draw an image scaled into the specified destination box
    @ctx.drawImage image, dx, dy, dw, dh
    return this

  imageCrop: (image, sx, sy, sw, sh, dx, dy) ->
    # draw the specified crop of an image
    @ctx.drawImage image, sx, sy, sw, sh, dx, dy, sw, sh
    return this

  imageCropIn: (image, sx, sy, sw, sh, dx, dy, dw, dh) ->
    # specify crop box and scale box to draw image into
    @ctx.drawImage image, sx, sy, sw, sh, dx, dy, sw, sh
    return this
}

CannedVas.alias 'drawImage', 'image'

CannedVas.registerGetSetProperty 'shadowBlur'
CannedVas.registerGetSetProperty 'shadowColor'
CannedVas.registerGetSetProperty 'shadowOffsetX'
CannedVas.registerGetSetProperty 'shadowOffsetY'
