module.exports = {
  publicPath: '/picture/',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Создание картинки по параметрам'
        return args
      })
  },
  
}