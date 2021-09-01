const path = require('path')
const poststylus = require('poststylus')
const pxtorem = require('postcss-pxtorem')
const { template } = require('yargs').argv

const resolve = file => path.resolve(__dirname, file)
module.exports = {
  configureWebpack: {
    entry: template ? `./src/template/${template}/main.js` : './src/main.js'
  },
  chainWebpack: config => {
    if (process.env.use_analyzer) { // 分析
      config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    } 
  },
  css: {
    loaderOptions: {
      stylus: {
        use: [
          poststylus([
            pxtorem({
              rootValue: 100,
              propWhiteList: [],
              minPixelValue: 2
            }),
            'autoprefixer'
          ])
        ],
        import: [
          resolve('./src/assets/theme.custom')
        ]
      },
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 100,
            propWhiteList: [],
            minPixelValue: 2
          }),
          require('autoprefixer')()
        ]
      }
    }
  },
  transpileDependencies: [
    'mand-mobile'
  ],
  productionSourceMap: false,
  devServer: {
    port: 80,
    hot: true,
    open: true,
    proxy: {
      '/': {
        target: '',
        ws: true,
        changeOrigin: true,
        logLevel: 'debug'
      },
    },
    disableHostCheck: true,
  }
}
