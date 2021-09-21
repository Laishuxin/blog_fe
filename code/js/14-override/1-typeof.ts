export const typeOf = (v: any) => {
  return Object.prototype.toString.call(v).slice(8, -1).toLowerCase()
}
function test() {
  console.log(`typeOf(null) = ${typeOf(null)}`)
  console.log(`typeOf([]) = ${typeOf([])}`)
  console.log(`typeOf({}) = ${typeOf({})}`)
  console.log(`typeOf(1) = ${typeOf(1)}`)
  console.log(`typeOf(true) = ${typeOf(true)}`)
  console.log(`typeOf('aa') = ${typeOf('aa')}`)
  console.log(`typeOf(undefined) = ${typeOf(undefined)}`)
  console.log(`typeOf(() => {}) = ${typeOf(() => {})}`)
  console.log(`typeOf(new Date()) = ${typeOf(new Date())}`)
  console.log(`typeOf(Symbol('11')) = ${typeOf(Symbol('11'))}`)
}
test()
