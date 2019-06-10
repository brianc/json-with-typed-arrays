const TYPE_KEY = '_$t'
const VAL_KEY = '_$v'
function replacer(key, val) {
  if (ArrayBuffer.isView(val)) {
    const bytes = Array.from(val.values())
    return { [TYPE_KEY]: val.constructor.name, [VAL_KEY]: bytes }
  }
  return val
}

function reviver(key, val) {
  if (val[TYPE_KEY] && val[VAL_KEY]) {
    return global[val[TYPE_KEY]].from(val[VAL_KEY])
  }
  return val
}

function stringify(input) {
  return JSON.stringify(input, replacer)
}

function parse(input) {
  return JSON.parse(input, reviver)
}

module.exports = { stringify, parse }
