const box = document.querySelector('.box');
let count = 1;
function clickHandler (e) {
  box.innerHTML = count;
  ++count;
  console.log('tagName = ', e.target.tagName);
}

// /**
//  * @param { Function } fn function wants to be debounced.
//  * @param { Object } param1  options
//  * @returns { Function } throttledFn.
//  */
// function throttle(fn, { wait = 1000} = {}) {
//   /** @type { number | null } */
//   var timeout = null;
//   return function() {
//     if (timeout === null) {
//       var context = this;
//       var arg = arguments;
//       timeout = setTimeout(function() {
//         fn.apply(context, arg);
//         timeout = null;
//       }, wait);
//     }
//   }
// }

// /**
//  * @param { Function } fn function wants to be debounced.
//  * @param { Object } param1  options
//  * @returns { Function } throttledFn.
//  */
// function throttle(fn, { wait = 1000} = {}) {
//   var previous = 0;

//   return function() {
//     var now = Date.now();
    
//     if (wait < now - previous) {
//       fn.apply(this, arguments);
//       previous = now;
//     }
//   }
// }

/**
 * @param { Function } fn function wants to be debounced.
 * @param { Object } param1  options
 * @returns { Function } throttledFn.
 */
function throttle(fn, { wait = 1000, leading = true, trailing = false,} = {}) {
  leading = (!leading && !trailing) ? true : leading;
  var previous = 0;
  /** @type { null | number } */
  var timeout = null;
  
  function clear() {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
  }

  return function() {
    var now = Date.now();
    previous = leading ? previous : now;
    var remainder = wait - (now - previous);
    var context = this;
    var arg = arguments;
    
    if (remainder <= 0 || remainder > wait) {
      if (timeout !== null) { clear(); }
      previous = now;
      fn.apply(context, arg);
    } else if (timeout === null && trailing) {
      timeout = setTimeout(function() {
        fn.apply(context, arg);
        timeout = null;
        previous = Date.now();
      }, remainder);
    }
    
  }
}

const throttledFn = throttle(clickHandler, {leading: false, trailing: true});
box.addEventListener('mousemove', throttledFn);