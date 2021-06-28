const { getFileNames, getFileNamesByGroups } = require('./utils');
const { resolve } = require('path');
const basePath = resolve(__dirname, '../../');

const cate = ['html', 'css', 'js', 'ts', 'perform', 'framework'];
const getSidebarName = (name) => `/cate/${name}/`;

const sidebar = {
  [ getSidebarName('html') ]: getHtml('interview', '基础'),
  [ getSidebarName('js') ]: getJs(),
  [ getSidebarName('perform') ]: getPerform(),
  [ `${getSidebarName('framework')}vue/`]: getFrameworkVue(),
  [ getSidebarName('framework')]: getFramework(),
  [ getSidebarName('ts')]: getTs(),
  '/cate/': cate,
};

function getHtml(...groups) {
  const path = resolve(basePath, './cate/html/');
  const group = getFileNamesByGroups(path, groups);
  return groups.map((item) => {
    return {
      title: item,
      collapsable: false,
      children: group[item]
    };
  })
}

function getJs() {
  const path = resolve(basePath, './cate/js');
  return getFileNames(path);
}

function getPerform() {
  const path = resolve(basePath, './cate/perform');
  return getFileNames(path);
}

function getFramework() {
  const path = resolve(basePath, './cate/framework');
  return getFileNames(path);
}

function getTs() {
  const path = resolve(basePath, './cate/ts');
  return getFileNames(path);
}

function getFrameworkVue() {
  const path = resolve(basePath, './cate/framework/vue');
  return getFileNames(path);
}

module.exports = sidebar
