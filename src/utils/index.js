/**
 * 判断是否是微信浏览器环境
 * @returns  {Boolean} 返回布尔值
 * @values true or false
 */
 export const isWechatBrowser = () => {
  var isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(
    navigator.userAgent
  )
  var ua = navigator.userAgent.toLowerCase()
  var isWx = !!/micromessenger/.test(ua)
  return isMobile && isWx
}
