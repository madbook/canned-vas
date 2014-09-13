## cannedvas.imagedata
# Methods that get and set imageData

CannedVas.extend {
  createImageData: (width, height) ->
    # can accept another imageData obj to pull width and height from
    if height? and typeof width not 'number'
      return @getImageData width

    unless width? then width = @width()
    unless height? then height = @height()
    @ctx.createImageData width, height
    return this

  getImageData: (x = 0, y = 0, width, height) ->
    unless width? then width = @width()
    unless height? then height = @height()
    return @ctx.getImageData x, y, width, height

  putImageData: (imageData, x = 0, y = 0, sx, sy, sw, sh) ->
    unless sx?
      @ctx.putImageData imageData, x, y
    else
      @ctx.putImageData imageData, x, y, sx, sy, sw, sh
    return this

  imageData: (imageData) ->
    unless imageData? then return @getImageData()
    @putImageData imageData
    return this
}

## cannedvas.filter

CannedVas.extend {
  filter: (fnc) ->
    oldData = @imageData()
    newData = @createImageData oldData
    @open fnc, oldData, newData
    @imageData newData
    return this

  createMatrixFilter: (matrix) ->
    return (input, output) ->
      applyMatrixFilter input, output, matrix
}

CannedVas.applyMatrixFilter = (input, output, matrix) ->
  w = input.width
  h = input.height
  mw = matrix[0].length
  mh = matrix.length
  mw2 = mw // 2
  mh2 = mh // 2
  vals = [0, 0, 0]
  input = input.data
  output = output.data

  ## easier to copy this for now...
  `
  var x, y, i, mx, my, nx, ny, ni, c
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
  `
  return this
