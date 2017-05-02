//一个常见的Webpack配置文件
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map', //配置生成Source Maps，选择合适的选项

  //“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
  entry: __dirname + "/app/main.js",  //已经多次提及的唯一入口文件
  output: {
    path: __dirname + "/build", //打包后的文件的存放地方
    filename: "bundle.js" //打包后输出文件的文件名
  },
  
  devServer: {
    contentBase: __dirname + "/build", //本地服务器所加载的页面所在的目录
    colors: true, //终端中输出结果为彩色
    historyApiFallback: true, //不跳转
    inline: true  //实时刷新
  },

  module: {
    loaders: [{
      //在配置文件里添加JSON loader
      test: /\.json$/,
      loader: "json-loader"
    }, {
      //配置babel, 就可以开始使用es6/7，JSX的语法了
      test: /\.js$/,
      loader: "babel-loader",
      exclude: /node_modules/,
      query: {
        //也配置在.babelrc里，供webpack自动调用
        //presets: ['es2015','react']
      }
    }, {
      //配置css loader，添加对样式表的处理
      test: /\.css$/,
      //感叹号！的作用在于使同一文件能够使用不同的loader,多个加载器从右往左执行,通常css会和js打包到同一个文件中，并不会打包为一个单独的css文件
      //loader: "style-loader!css-loader",
      //或者使用数组的形式
      //loader: ['css-loader', 'style-loader'],
      //打包到单独的css文件, 跟前面相比就在后面加上了?modules
      loader: 'style-loader!css-loader?modules'
      
    }]    
  },

  plugins: [
    //版权声明的插件
    new webpack.BannerPlugin('Copyright of Ruckus wirreless inc.'),
    new HtmlWebpackPlugin({
      template: __dirname + '/app/index.tmpl.html',
      title: 'Webpack Sample Project',
      scripts: 'bundle.js',
      hash: true
    })
  ]

}