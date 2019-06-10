const { stringify, parse } = require('./')
const { expect } = require('chai')

describe('json-with-typed-arrays', () => {
  it('works without typed arrays', () => {
    const input = '{"foo":"bar"}'
    const output = parse(input)
    expect(output).to.eql({ foo: 'bar' })
    expect(stringify(output)).to.eql(input)

    const nested = {
      foo: {
        bar: {
          baz: {
            qux: true,
            zug: false,
          },
        },
      },
    }

    expect(parse(stringify(nested))).to.eql(nested)
  })

  const types = [
    Uint8ClampedArray,
    Uint8Array,
    Int8Array,
    Uint16Array,
    Int16Array,
    Uint32Array,
    Int32Array,
    Float32Array,
    Float64Array,
  ]
  for (const type of types) {
    it('can round-trip ' + type.name, () => {
      const typed = type.from([1, 2, 3, 4])
      const input = { typed, bar: true }
      const str = stringify(input)
      const output = parse(str)
      expect(input.typed).to.be.a(type.name)
      expect(output.typed).to.be.a(type.name)
      expect(output.typed).to.eql(typed)
      expect(output.bar).to.be.true
      expect(parse(stringify(input))).to.eql(input)
    })

    it('works with top level ' + type.name, () => {
      expect(parse(stringify(type.from([1, 2])))).to.eql(type.from([1, 2]))
    })
  }

  it('round-trips floats', () => {
    expect(parse(stringify(Float32Array.from([1.1, 2.2])))).to.eql(Float32Array.from([1.1, 2.2]))
    expect(parse(stringify(Float64Array.from([1.1, 2.2])))).to.eql(Float64Array.from([1.1, 2.2]))
  })
})
