/**
 * 模板启动命令
 * yarn serve [模板名]
 */
require('colors')
const { template } = require('yargs').argv
const fs = require('fs')
const { join } = require('path')
const { spawn } = require('child_process')

const repeatBool = fs.readdirSync(join(__dirname, '../../src/template')).some(x => x === template.toString())

if (template === true || !template) {
  console.log('请输入模板名'.red)
  process.exit(1)
} else if (!repeatBool) {
  console.log('模板名不存在'.red)
  process.exit(1)
} else {
  spawn('yarn', ['start', `--template=${template}`], {
    stdio: 'inherit', // 子进程的标准输入输出
    shell: true // 在 shell 内运行 command
  })
}