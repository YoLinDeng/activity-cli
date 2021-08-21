// 身份证解析函数
function parseIdentityCard(card) {
  const obj = Object.create(null)

  // 身份证类型：1-1代身份证，2-2代身份证
  obj.type = function () {
    switch (card.length) {
      case 15: return 1
      case 18: return 2
      default: // not do
    }
  }

  // 检查
  obj.check = function () {
    if (typeof card !== 'string') {
      throw new Error('The argument must be a string.')
    }
    return [
      (/^\d{15}$/),
      (/^\d{17}(\d|X|x)$/)
    ].some(re => re.test(card))
  }

  // 生日
  obj.birthday = function () {
    if (obj.type() === 1) {
      return {
        year: '19' + card.slice(6, 8),
        month: card.slice(8, 10),
        date: card.slice(10, 12)
      }
    }

    return {
      year: card.slice(6, 10),
      month: card.slice(10, 12),
      date: card.slice(12, 14)
    }
  }

  /**
   * 性别
   * @params {string} identify 性别辨识，如：男/女、man/women
   */
  obj.sex = function (format = null) {
    const sex = parseInt(card.charAt(obj.type() === 1 ? 14 : 16)) % 2

    if (format) {
      try {
        const arr = format.split('/')
        return sex === 1 ? arr[0] : arr[1]
      } catch (e) {
        throw new Error(e)
      }
    }

    return sex
  }

  /**
   * 年龄
   */
  obj.age = function () {
    const d = new Date()
    const currentYear = d.getFullYear()
    const currentMonth = d.getMonth() + 1
    const currentDate = d.getDate()
    const { year, month, date } = obj.birthday()

    if (Number(month) < currentMonth || (Number(month) === currentMonth && Number(date) <= currentDate)) {
      return currentYear - Number(year)
    }
    return currentYear - Number(year) - 1
  }

  /**
   * 获取任意信息
   * @params {string} fName 方法名称
   */
  obj.get = function (fName, ...args) {
    return obj[fName](...args)
  }

  if (!obj.check()) {
    throw new Error('Identity card is not illegality.')
  }

  return obj
}

export default parseIdentityCard
