/**
 * 模板创建命令
 * yarn new [模板名]
 * 注：模板名不可用“-”字符连接
*/
require('colors')
const { template } = require('yargs').argv
const fs = require('fs')
const { join, win32 } = require('path')

const getFiles = filePath => {
  let files = []
  function findFile(path) {
    let _files = fs.readdirSync(path)
    _files.forEach(function(item, index) {
      let fPath = join(path, item)
      let stat = fs.statSync(fPath) // 获取文件或目录的详细信息
      if (stat.isDirectory()) { // 判断是否是目录
        findFile(fPath)
      }
      if (stat.isFile()) {
        files.push(fPath)
      }
    })
  }
  findFile(filePath)
  return files
}

const repeatBool = fs.readdirSync(join(__dirname, '../../src/template')).some(x => x === template.toString())

if (template === true || !template) {
  console.log('请输入模板名'.red)
  process.exit(1)
} else if (repeatBool) {
  console.log('模板名已重复'.red)
  process.exit(1)
} else if (template.toString().includes('-')) {
  console.log('模板名不能包含“-”字符串'.red)
  process.exit(1)
} else {
  const dir = join(__dirname, '../template')
  const newDir = join(__dirname, `../../src/template/${template}`)
  fs.mkdirSync(newDir)
  getFiles(dir).forEach(file => {
    fs.readFile(
      file,
      {
        flag: 'r+',
        encoding: 'utf8'
      },
      (err, data) => {
        if (err) throw err
        fs.writeFileSync(
          join(newDir, `/${win32.basename(file)}`),
          data.replace(/{{ template }}/gi, template),
          {
            flag: 'w+',
            encoding: 'utf8'
          }
        )
      }
    )
  })
  console.log(`${template}新建成功`.green)
}