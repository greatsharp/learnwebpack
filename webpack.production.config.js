//一个常见的Webpack配置文件
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var HelloWorldPlugin = require('./app/HelloWorldPlugin');
//console.log(process);

module.exports = {
  devtool: 'eval-source-map', //配置生成Source Maps，选择合适的选项

  //“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
  //entry: __dirname + "/app/main.js",  //已经多次提及的唯一入口文件
  entry: {
    app: __dirname + "/app/main.js",
    vendors: ['react', 'react-dom']
  },
  output: {
    path: __dirname + "/build", //打包后的文件的存放地方
    filename: "[name]-[hash].js" //打包后输出文件的文件名
  },

  module: {
    rules: [{
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
      test: /\.(css|scss)$/,
      //感叹号！的作用在于使同一文件能够使用不同的loader, 通常css会和js打包到同一个文件中，并不会打包为一个单独的css文件
      //loader: "style-loader!css-loader",
      //或者使用数组的形式
      //loader: ['style-loader', 'css-loader', 'sass-loader'],
      //打包到单独的css文件，
      loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader'] })
    }, {
      //url-loader是对file-loader的上层封装，比如webpack中对图片的加载器配置, 这样在小于8K的图片将直接以base64的形式内联在代码中，可以减少一次http请求
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader',
      query: {
        limit: 8000,
        name: 'assets/images/[name].[ext]?[hash:5]'
      }
    }]    
  },

  plugins: [
    //版权声明的插件
    new webpack.BannerPlugin('Copyright of Ruckus wirreless inc.'),
    new HtmlWebpackPlugin({
      filename: 'index.html', //生成的文件
      template: __dirname + '/app/index.tmpl.html', //使用的模板
      inject: true  //是否插入js/css等引用
    }),

    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true
      }
    }),
    
    //分离第三方库的插件,name属性会自动指向entry中的vendors属性
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendors',
      minChunks: 2  //公共代码的判断标准,某个js模块被多少个chunk加载了才算是公共代码      
    }),
    new ExtractTextPlugin("style.css"),  //把各个chunk加载的css代码合并成一个css
    new HelloWorldPlugin({options: true})
  ],

  resolve: {
    //对模块后缀名的简写, 配置后，原本是require('./components/app.jsx') 可以简写为require('./components/app')
    extensions: [ '.js', '.jsx', '.json'],
    //alias是别名,配置后,比如原本是require('./src/components/nav.jsx')可以简写为require('components/nav.jsx')
    alias: {
      'src': path.resolve(__dirname, './src'),
      'assets': path.resolve(__dirname, './src/assets'),
      'components': path.resolve(__dirname, './src/components')
    }
  }

}