import { cached } from './cached'
export {}
// vue2 中的命名管理函数、

const camelizeRE = /-(\w)/g;
const camelize  = cached((str: string) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '');
})

const hyphenateRE = /\B([A-Z])/g
function main() {
  // const names = ['hello-world', 'Hello-11', 'hello0-', 'Hello-Vue', '-vue-hello'];
  // names.forEach(item => console.log(camelize(item)));
  ['HelloVue', 'helloVue', 'hello-vue'].forEach(item => console.log(item.replace(hyphenateRE, '-$1').toLowerCase()));
}

main();
