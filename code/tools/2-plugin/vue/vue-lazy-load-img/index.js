import { observe, unobserve } from './lazy-load'
import { CLASS_V_LOADED } from './constant'

const plugin = {
  install: (Vue) => {
    Vue.directive('lazyload', {
      bind(el) {
        observe(el)
      },
      // Observe image when component update.
      componentUpdated(el) {
        if (el.classList.contains(CLASS_V_LOADED)) {
          observe(el)
        }
      },
      unbind(el) {
        unobserve(el)
      },
    })
  },
}

export default plugin
