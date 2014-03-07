window.CannedVas = class CannedVas
  @extend: (extendObj) ->
    for key, val of extendObj
      CannedVas::[key] = val

  @alias: (alias, key) ->
    unless CannedVas::[key]?
      throw 'Cannod alias #{alias} to #{key}'
    CannedVas::[alias] = CannedVas::[key]

  @registerGetProperty: (key) ->
    CannedVas::[key] = () -> @ctx[key]

  @registerSetProperty: (key) ->
    CannedVas::[key] = (val) -> @ctx[key] = val; this

  @registerGetSetProperty: (key) ->
    CannedVas::[key] = (val) ->
      return unless val? then @ctx[key] else @ctx[key] = val; this

  @registerGetMethod: (key) ->
    CannedVas::[key] = (args...) -> @ctx[key] args...

  @registerSetMethod: (key) ->
    CannedVas::[key] = (args...) -> @ctx[key] args...; this

  @registerGetSetMethod: (key) ->
    CannedVas::[key] = (args...) ->
      return unless args.length then @ctx[key]() else @ctx[key] args...; this

  @create: () ->
    return new CannedVas document.createElement 'canvas'

  constructor: (ctx) ->
    @ctx = if ctx instanceof HTMLCanvasElement then ctx.getContext '2d' else ctx
    @vas = @ctx.canvas
