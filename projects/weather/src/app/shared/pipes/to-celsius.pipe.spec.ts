import { ToCelsiusPipe } from './to-celsius.pipe'

describe('ToCelsiusPipe', () => {
  const pipe = new ToCelsiusPipe()

  it('should convert kelvin to celsius', () => {
    expect(pipe.transform(300)).toBe('26.85 °C')
  })

  it('should handle a missing value', () => {
    expect(pipe.transform(undefined)).toBe('-273.15 °C')
  })
})
