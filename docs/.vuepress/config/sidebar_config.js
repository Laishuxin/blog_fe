const { getFileNames, getFileNamesByGroups } = require('./utils');
const { resolve } = require('path');
const basePath = resolve(__dirname, '../../');

const cate = ['html', 'css', 'js', 'ts'];
const getSidebarName = (name) => `/cate/${name}/`;

const sidebar = {
  [getSidebarName('html')]: getHtml('interview', '基础'),
  [getSidebarName('js')]: getJs(),
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

module.exports = sidebar
