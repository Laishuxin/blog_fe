// 1. 函子（functor）
// - 如果它有map方法可称为Functor(函子)
// - 函子一定有一个静态的of方法，用来生成实例
// - 函子内部会保存一个值value
// - 函子提供map方法，接入各种运算函数，从而引发值的变化
export {}
class Functor<V> {
  private constructor(private value: V) {}
  public static of<V>(value: V): Functor<V> {
    return new Functor(value)
  }
  public map(fn: (v: V) => V) {
    return Functor.of(fn(this.value))
  }
}

function main() {
  const functor = Functor.of(1)
  const newFunctor = functor.map(v => v * 2).map(v => 4 * v)
  console.log(newFunctor)
}

main()
