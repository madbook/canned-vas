
CannedVas.extend {
  createBrush: (props) ->
    new CannedVasBrush this, props

  useBrush: (brush) ->
    if brush instanceof CannedVasBrush
      brush.applyProps this
    else
      throw 'Invalid brush'
    return this
}

class CannedVasBrush
  ### Store a set of canvas rendering properties for reuse. ###
  constructor: (can, props) ->
    props || (props = @getDefaultProps())
    @props = {}
    @meta = {}
    if can?
      props = @validateProps can, props
      @copyProps can, props
    return this

  getDefaultProps: ->
    return [
      'fillStyle'
      'strokeStyle'
      'lineWidth'
      'alpha'
      'compositeOperation'
    ]

  copyProps: (can, props) ->
    for prop in props
      @setProp prop, can[prop]()
    return this

  applyProps: (can) -> 
    for prop, val in @props
      can[prop](val)

  setProp: (prop, val) ->
    if CannedVas::[prop] instanceof Function
      @props[prop] = val
    else
      console.warn 'Invalid property ' + prop
    return this

  getProp: (prop) ->
    if @props[prop]?
      return @props[prop]
    else 
      return null
      
  setMeta: (prop, val) ->
    @meta[prop] = val
    return this

  getMeta: (prop) ->
    if @meta[prop]? 
      return @meta[prop]
    else
      return null
