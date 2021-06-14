const { getFileNames, getFileNamesByGroups } = require('./utils');
const { resolve } = require('path');
const basePath = resolve(__dirname, '../../');

const cate = ['html', 'css', 'js', 'ts'];
const getSidebarName = (name) => `/cate/${name}/`;

const sidebar = {
  [getSidebarName('html')]: getHtml('interview'),
  '/cate/': cate,
};

function getHtml(...groups) {
  const path = resolve(basePath, './cate/html/')
  const group = getFileNamesByGroups(path, groups)
  return groups.map((item) => {
    return {
      title: item,
      collapsable: false,
      children: group[item]
    }
  })
}


// const sidebar = {
//   [getSidebarName('csapp')]: getCsapp('Part I: Program Structure and Execution'),
//   [getSidebarName('design-patterns')]: getDesignPatterns(),
//   '/cate/': cate
// }

// function getDesignPatterns() {
//   const path = resolve(basePath, './cate/design-patterns')
//   return getFileNames(path)
// }
module.exports = sidebar
