/**
 * 判断元素是否在可视区范围。
 * @param { HTMLElement } el 待判断的元素节点。
 * @param { HTMLElement } parent 顶层的滚动元素
 * @returns { boolean } true 如果 el 在可视区范围，否则 false
 */
export function isInVisibleArea(el, parent) {
  const cHeight = parent.clientHeight;
  const sTop = parent.scrollTop;
  const oTop = el.offsetTop;
  return oTop < cHeight + sTop;
}
