// 协议分组地图
export const agreeGroupMap = {
  clause: '条款费率',
  notice: '投保须知',
  service: '服务协议',
  health: '健康告知',
  platform: '平台协议'
}

/**
 * 协议文件格式化适配器
 * @param {object} files 文件对象
 * @param {object} groupMap 文件分组地图
 * @returns {array} 格式化后的协议文件数组
 */
export const agreeFilesAdaptor = (files, groupMap = agreeGroupMap) => {
  const data = Object.keys(files).reduce((acc, k) => {
    if (files[k].length === 1) {
      const o = files[k][0]
      acc.push({
        fileName: o.assetName,
        fileUrl: o.assetLink
      })
    }

    if (files[k].length > 1) {
      const children = files[k].map(o => {
        return {
          fileName: o.assetName,
          fileUrl: o.assetLink
        }
      })
      acc.push({
        fileName: groupMap[k],
        children
      })
    }
    return acc
  }, [])
  return data
}

/**
 * 协议转props
 * @param {object} files 文件对象
 * @returns {array} 格式后的数组
 */
export const agreeFilesToProps = (files) => {
  const data = Object.keys(files || {}).reduce((acc, k) => {
    const list = (files[k] || []).map(o => {
      return {
        propName: o.assetName,
        propCode: `${k}_${o.id}`,
        propValue: '1' // 同意该协议
      }
    })
    acc = acc.concat(list)
    return acc
  }, [])
  return data
}

/**
 * props字段适配器
 * @param {array} dims 字段数组
 * @returns {array} 格式化后的props字段数组
 */
export const propsAdaptor = (dims = []) => {
  const data = dims.map(o => {
    return {
      defaultValue: o.defValue,
      code: o.dimCode,
      desc: o.dimDesc,
      name: o.dimName,
      value: o.dimValues
    }
  })
  return data
}

/**
 * props字段提交格式化、赋值
 * @param {array} props 字段数组
 * @param {object} values 通过props的code重新赋值
 * @returns {array} 格式化并重新赋值后的props
 */
export const submitPropsAdaptor = (props, values = {}) => {
  const data = props.map(o => {
    console.log('o:', o, values)
    return {
      propCode: o.code,
      propName: o.name,
      propValue: values[o.code] || o.value
    }
  })
  return data
}
