import { done as BDone } from './es6-module-b.js';
console.log('moduleA: start loading...');

// export let done = false;
export function done() { return false; }
// done = true;
console.log('moduleA: moduleA.done = ', done());
console.log('moduleA: moduleB.done = ', BDone);
