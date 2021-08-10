export {}
type CheckFn = (key: string) => boolean;

function makeMap(str: string, expectsLowerCase: boolean = false): CheckFn  {
  const map = Object.create(null);
  str.split(',').forEach(item => map[item] = true)
  return expectsLowerCase ?
    val => !!map[val.toLowerCase()] :
    val => !!map[val];
}

function main() {
  const check = makeMap('key,ref,slot,slot-scope,is');
  ['hello', 'Key', 'ref', 'attr']
    .forEach(item => console.log(`${item} is a reserve attribute ? ${check(item)}`));
  
  const check2 = makeMap('key,ref,slot,slot-scope,is', true);

  ['hello', 'Key', 'ref', 'attr']
    .forEach(item => console.log(`${item} is a reserve attribute(toLowerCase) ? ${check2(item)}`));
}

main();