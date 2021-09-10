export {}

class Functor<T> {
  protected constructor(protected value: T) {}

  public getValue(): T {
    return this.value
  }
  public static of<T>(value: T) {
    return new Functor(value)
  }
  public map(fn: (v: T) => T) {
    return Functor.of(fn(this.value))
  }
}

class Ap<T extends (args: any) => any> {
  protected constructor(protected value: T) {}
  public getValue(): T {
    return this.value
  }
  public static of<T extends (args: any) => any>(value: T) {
    return new Ap(value)
  }
  public ap<V = any>(func: Functor<V>) {
    return Ap.of(this.value(func.getValue()))
  }
}

function main() {
  const ap = Ap.of(num => num + 2)
  const functor = Functor.of(1)
  ap.ap(functor)
}
main()
