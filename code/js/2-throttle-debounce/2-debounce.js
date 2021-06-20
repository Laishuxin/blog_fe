const box = document.querySelector('.box');
let count = 1;
function clickHandler (e) {
  box.innerHTML = count;
  ++count;
  console.log('tagName = ', e.target.tagName);
}

/**
 * @param { Function } fn function wants to be debounced.
 * @param { Object } param1  options
 */
function debounce(fn, { wait = 1000, immediate = false} = {}) {
  /** @type { number | null} */
  var timeout = null;

  function clear() {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
  }
  
  var debouncedFn =  function() {
    var context = this;
    var arg = arguments;
    var callNow = timeout === null;
    var result;
    clear();

    if (immediate) {
      timeout = setTimeout(function () { timeout = null; }, wait);
      callNow && (result = fn.apply(context, arg));
    } else {
      timeout = setTimeout(function() {
        fn.apply(context, arg);
      }, wait);
    }
    return result;
  }
  debouncedFn.cancel = function() { clear; }
  return debouncedFn;
}

const debouncedHandler = debounce(clickHandler, {immediate: true});
box.addEventListener('mousemove', debouncedHandler);