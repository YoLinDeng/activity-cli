export const validate = field => {
  const { type, name, code } = field
  const text = type === 'input' ? '请输入' : '请选择'
  const rules = {
    name: [
      { required: true, message: `${text}${name}` },
      {
        pattern: /^[\u4e00-\u9fa5]{2,10}$/,
        message: `${name}须为2-20个中文（不包含特殊字符）`
      }
    ],
    mobile: [
      { required: true, message: `${text}${name}` },
      {
        pattern: /^0?((13[0-9])|(14[0-9])|(15([0-3]|[5-9]))|(166)|(18[0-9])|(17[0-9])|(19[8-9]))[0-9]{8}$/,
        message: `${name}格式错误`
      }
    ],
    idcard: [
      { required: true, message: `${text}${name}` },
      {
        pattern: /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/,
        message: `${name}格式错误`
      }
    ],
  }
  const a = Object.keys(rules).find(key => code === key)
  return a
    ? rules[a]
    : [{ required: true, message: `${text}${name}` }]
}
