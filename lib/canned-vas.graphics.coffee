CannedVas = require './canned-vas'

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
  image: () ->
  imageAt: () ->
  imageIn: () ->
  imageCrop: () ->
  imageCropIn: () ->
  imageBox: () ->
}

CannedVas.alias 'drawImage', 'image'

CannedVas.registerGetSetProperty 'shadowBlur'
CannedVas.registerGetSetProperty 'shadowColor'
CannedVas.registerGetSetProperty 'shadowOffsetX'
CannedVas.registerGetSetProperty 'shadowOffsetY''
