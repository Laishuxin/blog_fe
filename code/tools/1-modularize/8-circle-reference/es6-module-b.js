import { done as ADone } from './es6-module-a.js';
export let done = false;

console.log('moduleB: start loading...');
console.log('moduleB: ADone = ', ADone());

done = true;
console.log('moduleB: b.done = ', done);
