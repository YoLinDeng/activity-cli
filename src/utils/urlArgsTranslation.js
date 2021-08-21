// urlArgsTranslation.js
// URL 参数转换器
/**
 * 向URL追加参数
 * @function stringifyUrlArgs
 * @param {string} url - URL路径
 * @param {object} params - 参数对象
 * @return {string}
 * @example
 * stringifyUrlArgs('https://www.google.com/', {name: 'john', age: 30})
 * // => 'https://www.google.com/?name=john&age=30'
 *
 * stringifyUrlArgs('https://www.google.com/?name=john', {age: 30})
 * // => 'https://www.google.com/?name=john&age=30'
 */
export const stringifyUrlArgs = (url, params) => {
  url += (/\?/).test(url) ? '&' : '?'
  url += Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
  return url
}

/**
 * 解析URL参数
 * @function parseUrlArgs
 * @param {string} url - 字符串
 * @return {object}
 * @example
 * parseUrlArgs('http://url.com/page?name=Adam&surname=Smith')
 * // => {name: 'Adam', surname: 'Smith'}
 *
 * parseUrlArgs('https://www.google.com/')
 * // => {}
 */
export const parseUrlArgs = url => {
  const arr = url.match(/([^?=&]+)(=([^&]*))/g) || []
  const args = arr.reduce((a, v) => {
    a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)
    return a
  }, {})
  return args
}

export default {
  stringifyUrlArgs,
  parseUrlArgs
}
