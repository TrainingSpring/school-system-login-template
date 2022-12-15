module.exports={

    dev: {
        env: require('./dev.env'),
        // 开发时候的访问域名。可以通过环境变量自己设置。
        host: 'localhost',
        port: 8080,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/': {
                target: 'http://hh.schoolcms.com',// 目标接口域名
                changeOrigin: true ,// 是否跨域
              // pathRewrite: {
              //   '^/eduadmin': '' // 重写接口
              // }
            }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        // cssSourceMap: false,
        // // 下面两个都是浏览器展示错误的方式
        // //  在浏览器是否展示错误蒙层
        // errorOverlay: true,
        // // 是否展示错误的通知
        // notifyOnErrors: true,
        // // 这个是webpack-dev-servr的watchOptions的一个选项，指定webpack检查文件的方式
        // // 因为webpack使用文件系统去获取文件改变的通知。在有些情况下，这个可能不起作用。例如，当使用NFC的时候，
        // // vagrant也会在这方面存在很多问题，在这些情况下，使用poll选项（以轮询的方式去检查文件是否改变）可以设定为true
        // // 或者具体的数值，指定文件查询的具体周期。
        // poll: false,
        // // 是否使用eslint loader去检查代码
        // useEslint: false,
        // // 如果设置为true，在浏览器中，eslint的错误和警告会以蒙层的方式展现。
        // showEslintErrorsInOverlay: false,
        // /**
        //  * Source Maps
        //  */
        // // source maps的格式
        // devtool: 'cheap-module-eval-source-map',
        // // 指定是否通过在文件名称后面添加一个查询字符串来创建source map的缓存
        // cacheBusting: true
      }



}
