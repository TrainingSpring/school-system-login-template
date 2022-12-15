const { defineConfig } = require('@vue/cli-service')
const path = require('path');//引入path模块
function resolve(dir){
  return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack(config){
    config.resolve.alias
        //set第一个参数：设置的别名，第二个参数：设置的路径
        .set('@',resolve('./src'))
        .set('utils',resolve('./src/utils'))
    //注意 store 和 router 没必要配置

    // 配置全局scss
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach((item) => {
      item.use('sass-resources-loader')
          .loader('sass-resources-loader')
          .options({
            // 可以使用数组的方式导入,数组里面的文件就可以全局使用了
            resources: ['./src/assets/scss/tools.scss']
          })
          .end()
    })
  }
})
