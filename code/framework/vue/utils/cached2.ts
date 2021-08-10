export {}
// type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type ParamType<T> = T extends (...args: infer P) => any ? P : never

function cached<Fn extends (...args: any[]) => any>(fn: Fn): Fn {
  const cache = Object.create(null)
  return function(...args: Parameters<Fn>): ReturnType<Fn> {
    const key = JSON.stringify(args);
    return cache[key] || (cache[key] = fn(...args));
  } as any
}


let count = 0;
function test(p1: string, p2: number): string {
  const result = p1 + p2;
  console.log('call test: ', count++);
  return result;
}

function main() {
  const cachedFn = cached(test);
  console.log('result = ', cachedFn('hello', 1));
  console.log('result = ', cachedFn('hello', 2));
  console.log('result = ', cachedFn('hello', 1));
  console.log('result = ', cachedFn('hello', 1));
  console.log('result = ', cachedFn('hello', 2));
  console.log('result = ', cachedFn('hello', 3));
  console.log('count = ', count);
}

main();
const camelizeRE = /-(\w)/g
export const camelize = cached((str: string): string => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})