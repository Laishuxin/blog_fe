const { getFileNames, getFileNamesByGroups } = require('./utils')
const { resolve } = require('path')
const basePath = resolve(__dirname, '../../')

const cate = ['html', 'css', 'js', 'ts', 'perform', 'framework', 'tools']
const getSidebarName = (name) => `/cate/${name}/`

const sidebar = {
  [getSidebarName('tools')]: getTools(
    '模块化',
    '插件',
    '构建工具',
    'mock',
    'http'
  ),
  [getSidebarName('html')]: getHtml('interview', '基础'),
  [getSidebarName('js')]: getJs(),
  [getSidebarName('perform')]: getPerform(),
  [`${getSidebarName('framework')}vue/`]: getFrameworkByName('vue'),
  [`${getSidebarName('framework')}react/`]: getFrameworkByName('react'),
  [getSidebarName('framework')]: getFramework(),
  [getSidebarName('ts')]: getTs(),
  '/cate': cate
}

function getGroups(path, groups) {
  const group = getFileNamesByGroups(path, groups)
  return groups.map((item) => {
    return {
      title: item,
      collapsable: false,
      children: group[item]
    }
  })
}

function getHtml(...groups) {
  const path = resolve(basePath, './cate/html/')
  return getGroups(path, groups)
}

function getJs() {
  const path = resolve(basePath, './cate/js')
  return getFileNames(path)
}

function getPerform() {
  const path = resolve(basePath, './cate/perform')
  return getFileNames(path)
}

function getFramework() {
  const path = resolve(basePath, './cate/framework')
  return getFileNames(path)
}

function getTs() {
  const path = resolve(basePath, './cate/ts')
  return getFileNames(path)
}

function getFrameworkByName(name) {
  return getFileNames(resolve(basePath, './cate/framework/' + name))
}
// function getFrameworkVue() {
//   const path = resolve(basePath, './cate/framework/vue')
//   return getFileNames(path)
// }

function getTools(...groups) {
  const path = resolve(basePath, './cate/tools')
  return getGroups(path, groups)
}

module.exports = sidebar
