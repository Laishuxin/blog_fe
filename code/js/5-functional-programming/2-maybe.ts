export {}
class Maybe<V> {
  private value: V | null
  private constructor(value: V | null) {
    this.value = value
  }

  public static of<V>(value: V | null) {
    return new Maybe(value)
  }

  public map(fn: (v: V | null) => V) {
    return this.value ? new Maybe(fn(this.value)) : this
  }
}

function main() {
  const maybe = Maybe.of(1)
    .map(v => null)
    .map(v => 2 * v)
  console.log(maybe)
}

main()
