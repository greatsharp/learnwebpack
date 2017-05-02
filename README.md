# learnwebpack

1. run webpack cmd, it will run successfully if no 'webpack.config.js' locally
>node_modules\.bin\webpack app/main.js public/bundle.js

2. run webpack cmd with webpack.config.js, 这条命令会自动参考webpack.config.js文件中的配置选项打包你的项目
>node_modules\.bin\webpack

3. run webpack from package.json
package.json中的脚本部分已经默认在命令前添加了node_modules/.bin路径，所以无论是全局还是局部安装的Webpack，你都不需要写前面那指明详细的路径了。
--progress显示进度
>npm start


4. Loaders是webpack中最让人激动人心的功能之一了。通过使用不同的loader，webpack通过调用外部的脚本或工具可以对各种各样的格式的文件进行处理，比如说分析JSON文件并把它转换为JavaScript文件，或者说把下一代的JS文件（ES6，ES7)转换为现代浏览器可以识别的JS文件。或者说对React的开发而言，合适的Loaders可以把React的JSX文件转换为JS文件。

Loaders需要单独安装并且需要在webpack.config.js下的module关键字下进行配置，Loaders的配置选项包括以下几方面：
test：一个匹配loaders所处理的文件的拓展名的正则表达式（必须）
loader：loader的名称（必须）
include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
query：为loaders提供额外的设置选项（可选）

5. Babel其实可以完全在webpack.config.js中进行配置，但是考虑到babel具有非常多的配置选项，在单一的webpack.config.js文件中进行配置往往使得这个文件显得太复杂，因此一些开发者支持把babel的配置选项放在一个单独的名为 ".babelrc" 的配置文件中 (webpack会自动调用.babelrc里的babel配置选项)

6. CSS处理, webpack提供两个工具处理样式表，css-loader 和 style-loader，二者处理的任务不同，css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能,style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。

7. 插件（Plugins）是用来拓展Webpack功能的，它们会在整个构建过程中生效，执行相关的任务。
Loaders和Plugins常常被弄混，但是他们其实是完全不同的东西，可以这么来说，loaders是在打包构建过程中用来处理源文件的（JSX，Scss，Less..），一次处理一个，插件并不直接操作单个文件，它直接对整个构建过程其作用。
loader是在打包前或打包的过程中作用于单个文件。plugin通常在打包过程结束后，作用于包或者chunk级别。

8. HtmlWebpackPlugin
这个插件的作用是依据一个简单的模板，帮你生成最终的Html5文件，这个文件中自动引用了你打包后的JS文件。每次编译都在文件名中插入一个不同的哈希值。


9. UglifyJsPlugin：压缩JS代码

10. ExtractTextPlugin：分离CSS和JS文件

11. CommonsChunkPlugin是将多个入口文件之间共享的块打包成一个独立的js文件。至此，你只需要在每个页面都加载这个公共代码的js文件，就可以既保持代码的完整性，又不会重复下载公共代码了。