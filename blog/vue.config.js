'use strict'
const path = require('path')
// 解析路径
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath:"./",
  outputDir:"blog",
  productionSourceMap:false,
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
