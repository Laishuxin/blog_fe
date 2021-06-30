// 阿里云的 oss 支持通过链接后面拼参数来作图片的
// 格式转换，尝试写一下，把任意图片格式转换为 webp，
// 需要注意什么

/**
 * Wether supports webp.
 * @returns { boolean } true if supports webp, else false.
 */
function checkWebp() {
  try {
    // "data:image/webp;base64,Uxxx"
    return document.createElement('canvas')
            .toDataURL('image/webp')
            .indexOf('data:image/webp');
  } catch (e) {
    return false;
  }
}

const isSupportWebp = checkWebp();

/**
 * Transform url to support webp.
 * @param { string } url 
 * @returns { string } transformed url.
 */
function transformUrl(url) {
  if (!url) {
    throw new Error(`${url} is invalid.`)
  }
  if (isSupportWebp) { return `${url}?xxxx` }
  return url;
}
