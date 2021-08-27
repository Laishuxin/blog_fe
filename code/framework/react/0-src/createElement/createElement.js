const symbolFor = Symbol.for
const REACT_ELEMENT_TYPE = symbolFor('react.element')
const RESERVED_PROPS = {
  key: true,
  ref: true,
  _self: true,
  _source: true,
}

var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner,
  }

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {} // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.

    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false,
    }) // self and source are DEV only properties.

    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self,
    }) // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.

    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source,
    })

    if (Object.freeze) {
      Object.freeze(element.props)
      Object.freeze(element)
    }
  }

  return element
}

function createElement(type, props, children) {
  const _props = {}
  let key = props.key ? props.key : null

  const propsKeys = Object.keys(props)
  propsKeys.forEach(key => {
    if (RESERVED_PROPS[key]) return
    _props[key] = props[key]
  })

  const childLength = arguments.length - 2
  if (childLength > 1) {
    _props.children = Array(childLength)
    for (let i = 0; i < childLength; i++) {
      _props[i] = arguments[i + 2]
    }
  } else if (childLength > 0) {
    _props.children = children
  }
  return ReactElement(type, key, null, null, null, null, _props)
}

export { createElement }
