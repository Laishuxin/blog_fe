export {}
type Fn = (...args: any[]) => any
// type ReturnType<T> = T extends (...args: any[]) => infer U ? U : never

export function cached<Fn extends (...args: any[]) => any>(
  fn: Fn,
): (key: string) => ReturnType<Fn> {
  const cache = Object.create(null)
  return (key: string) => cache[key] || (cache[key] = fn(key))
}

function test(p: string): string {
  console.log('call test', p)
  return `${p}...`
}

function main() {
  const cachedFn = cached(test)
  cachedFn('hello')
  cachedFn('hello')
  cachedFn('hello1')
}

main()
