export {}
class Either<V> {
  private left: V | null
  private right: V | null
  private constructor(left: V | null, right: V | null) {
    this.left = left
    this.right = right
  }

  public static of<V>(left: V | null, right: V | null) {
    return new Either(left, right)
  }

  get value() {
    return this.left !== null ? this.left : this.right
  }

  public map(fn: (v: V | null) => V) {
    return this.left !== null
      ? Either.of(fn(this.left), this.right)
      : Either.of(this.left, fn(this.right))
  }
}

function main() {
  const user1 = { gender: null }
  const user2 = { gender: 'male' }
  const genderEither1 = Either.of('male', user1.gender)
  const genderEither2 = Either.of('male', user2.gender)
  console.log('gender1: ', genderEither1.value)
  console.log('gender2: ', genderEither2.value)
}

main()
