import { isHTMLImageElement, isSupportIntersectionObserver } from './utils'
import {
  CLASS_V_ERROR,
  CLASS_V_LOADED,
  CLASS_V_LOADING,
  DATA_ERR_NAME,
  DATA_SRC_NAME,
} from './constant'

/**@type { IntersectionObserver } */
const io = getIntersectionObserver()
const observedSet = new WeakSet()

/**
 * Observe image.
 * @param { HTMLElement} img observed element
 * @returns { boolean } true if success else false
 */
function observe(img) {
  return isSupportIntersectionObserver || !isHTMLImageElement(img)
    ? _observe(img)
    : false
}

/**
 * Unobserve image.
 * @param { HTMLElement} img observed element
 * @returns { boolean } true if success else false
 */
function unobserve(img) {
  return isSupportIntersectionObserver || !isHTMLImageElement(img)
    ? _unobserve(img)
    : false
}

/**
 * Get intersectionObserver instance.
 * @returns { InterSectionObserver | null }
 */
function getIntersectionObserver() {
  if (!isSupportIntersectionObserver) {
    return null
  }

  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target
        lazyImage.classList.add(CLASS_V_LOADING)
        const src = lazyImage.getAttribute('src')
        const dataSrc = lazyImage.getAttribute(DATA_SRC_NAME) || src
        const dataErr = lazyImage.getAttribute(DATA_ERR_NAME) || src

        const newImage = new Image()
        newImage.src = dataSrc

        newImage.onload = function () {
          lazyImage.classList.remove(CLASS_V_LOADING)
          lazyImage.src = dataSrc
          clearAndAdd(lazyImage, CLASS_V_LOADED)
        }

        newImage.onerror = function () {
          lazyImage.classList.remove(CLASS_V_LOADING)
          lazyImage.src = dataErr
          clearAndAdd(lazyImage, CLASS_V_ERROR)
        }

        io.unobserve(lazyImage)
      }
    })
  })
}

/**
 * Performing cleanup operations and add className.
 * @param { HTMLImageElement } lazyImage
 * @param { string } className
 */
function clearAndAdd(lazyImage, className) {
  lazyImage.classList.add(className)
  lazyImage.removeAttribute(DATA_ERR_NAME)
  lazyImage.removeAttribute(DATA_SRC_NAME)
}

/**
 * Observe image.
 * @param { HTMLElement} img observed element
 * @returns { boolean } true if success else false
 */
function _observe(img) {
  io.observe(img)
  observedSet.add(img)
  return true
}

/**
 * Unobserve image.
 * @param { HTMLElement} img observed element
 * @returns { boolean } true if success else false
 */
function _unobserve(img) {
  if (observedSet.has(img)) {
    io.unobserve(img)
    observedSet.delete(img)
  }
  return true
}

export { observe, unobserve }
