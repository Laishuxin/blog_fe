require('dotenv').config()
const { config } = require('vuepress-theme-hope')
const head = require('./config/head_config')
const nav = require('./config/nav_config')
const sidebar = require('./config/sidebar_config')
const BLOG_AUTHOR = process.env.BLOG_AUTHOR || 'ru shui'

module.exports = config({
  base: '/blog_fe/',
  lang: 'zh-CN',
  title: 'Ru Shui',
  description: `To Build Amazing Things !`,
  theme: 'vuepress-theme-hope',
  head,
  themeConfig:{
    author: BLOG_AUTHOR,
    logo: '/assets/img/logo.png',
    blog: {
      sidebarDisplay: true,
      roundAvatar:false,
    },
    nav,
    sidebar,
    footer: {
      display: true,
      content: '<h2 style="width:100%; min-width: 100%;">Ru Shui</h2>',
      copyright: `MIT Licensed | Copyright © 2021-present Ru Shui`
    },
    nextLinks: true,
    prevLinks: true,
    breadcrumb: true,
    darkmode: 'switch',
    backToTop: true,
    copyCode: false,
    photoSwipe: true,
    copyright: {
      status: 'local',
      minLength: 200,
    },
    comment: {
      type: 'disable',
    },
    themeColor: { blue: '#2196f3' },
    mdEnhance: {
      tex: true,
      lineNumbers: true,
      presentation: true,
      align: true,
      footnote: true,
    },
    pwa: {
      cacheHTML: false
    }
  },
})
