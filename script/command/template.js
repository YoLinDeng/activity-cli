/**
 * 模板打包命令
 * yarn template [模板名] --activityName=[活动title] --prod(不写则打包测试)
**/ 
require('colors')
const fs = require('fs')
const { join, extname, basename } = require('path')
const inquirer = require('inquirer')
const { template, activityName, prod } = require('yargs').argv
const { exec } = require('child_process')
const generate = require('nanoid/generate')
const dayjs = require('dayjs')

const getFiles = filePath => {
  let files = []
  function findFile(path) {
    let _files = fs.readdirSync(path)
    _files.forEach(item => {
      let fPath = join(path, item)
      let stat = fs.statSync(fPath)
      if (stat.isDirectory() === true) {
        findFile(fPath)
      }
      if (stat.isFile() === true) {
        files.push(fPath)
      }
    })
  }
  findFile(filePath)
  return files
}

const renameAssets = (dir, template) => {
  fs.readdirSync(dir)
    .filter(name => name.includes('.'))
    .forEach(name => {
      const oldPath = `${dir}/${name}`
      // 只获取umd规范文件（可直接给浏览器或AMD loader使用的 UMD 包）
      if (name.includes('umd.min.js') || name.includes('css')) {
        fs.renameSync(
          oldPath,
          `${oldPath
            .replace(extname(oldPath), '')
            .replace('.umd.min', '')}.${generate(
            `${template.replace(/_/gi, '')}${dayjs().format('YYYYMMDD')}`,
            8
          )}.${name.includes('css') ? 'css' : 'js'}`
        )
      } else if (!name.includes('umd.min')) {
        fs.unlinkSync(oldPath)
      }
    })
}

const build = async template => {
  return new Promise(async (resolve, reject) => {
    console.log(`开始生成 ${template}`.green)
    // vue-cli-service build命令把模版构建为一个库（输出js、css）
    exec(
      `yarn ${prod ? 'build' : 'build:test'} --dest ${prod ? 'templateProd' : 'templateTest'}/${template} --target lib --name ${template} src/template/${template}/index.vue`
    ).on('exit', async () => {
      console.log(`编译成功 ${template}`.blue)
      const dir = join(__dirname, `../../${prod ? 'templateProd' : 'templateTest'}/${template}`)
      renameAssets(dir, template)
      createHtml(dir, template)
    })
  })
}

const createHtml = async (dir, template) => {
  let data = fs.readFileSync(join(dir, `../../script/template.html`), {
    flag: 'r+',
    encoding: 'utf8'
  })
  const files = getFiles(dir).map(x => `./${basename(x)}`)
  const reg = new RegExp(`/${template}.[0-9a-z]*.(css|js)$`, 'gi')
  ;['css', 'js'].forEach(x => {
    data = data.replace(
      new RegExp(`{{ ${x} }}`, 'gi'),
      files.filter(c => c.includes(x) && (!c.includes('umd.min')) && c.match(reg))
    )
  })
  data = data.replace(/{{ template }}/gi, template).replace(/{{ title }}/gi, activityName || '')
  fs.writeFileSync(join(dir, 'index.html'), data, {
    flag: 'w+',
    encoding: 'utf8'
  })
}

const deploy = async () => {
  console.log('开始编译'.green)
  const templatePath = join(__dirname, `../../src/template`)
  const choices = fs.readdirSync(templatePath).filter(item => {
    return (
      (template === true || item.includes(template)) &&
      fs.statSync(join(templatePath, item)).isDirectory()
    )
  })
  if (choices.length === 0) {
    console.log(`不存在模板[${template}]`.red)
    process.exit(1)
  } else if (choices.length === 1) {
    // 匹配1个模版时默认执行
    await build(choices[0])
  } else {
    // 匹配多个模版时可供选择（space-选中 a-全选 i-反选）
    const answers = await inquirer.prompt([
      {
        type: 'checkbox',
        message: '请选择模版：',
        name: 'template',
        choices,
        pageSize: choices.length
      }
    ])
    await Promise.all(answers.template.map(item => build(item)))
  }
}
deploy()