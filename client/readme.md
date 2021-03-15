# webpack5搭建react

## 源代码

如果不会配置可参考以下代码

高级

> https://github.com/wuhaohao1234/udms-webapp/blob/main/webpack.config.js

入门

> https://gitee.com/wuhaohao1234/webpack-react

## 安装依赖

`yarn add webpack webpack-cli -D`

编写src/index.js

```javascript
console.log('hello react')
```

然后执行`npx webpack`

可看到文件被打包到dist/main.js

运行`node dist/main.js`

## 编写webpack配置文件

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

这个时候可以使用`npx webpack --config webpack.config.js`构建

## 加载图片,css,scss

安装相应的loader

```shell
 yarn add css-loader file-loader node-sass sass-loader style-loader -D
```

webpack配置中加入loader规则

```javascript
module: {
  rules: [
    {
      test: /\.css/,
      use: [
        'style-loader',
        'css-loader'
      ]
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader'
      ]
    }
  ]
}
```

这个时候js文件可以引入一些sass文件,sass文件可以引入一些图片

## 使用html模板

安装html-webpack-plugin

`yarn add html-webpack-plugin -D`

webpack配置文件中加入plugin

```javascript
 plugins: [
    new HtmlWebpackPlugin({
      title: 'web title',
      template: path.resolve(__dirname, "src", "index.html")
    })
  ],
```

src/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```
这个时候可以打包看看

## 加入clean webpack

`yarn add clean-webpack-plugin -D`

定时清理dist下的资源

```javascript
 plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'web title',
      template: path.resolve(__dirname, "src", "index.html")
    })
  ],
```

## 加入webpack-dev-server 启动服务

`yarn add webpack-dev-server -D`

webpack配置

```javascript
devServer: {
  contentBase: './dist',
  hot: true
}

```
package.json添加webpack-dev-server命令

```json
 "scripts": {
    "build": "webpack --config webpack.config.js",
    "start": "webpack serve --config webpack.config.js"
  },
```

## 安装react

这时先需要安装一些babel依赖，用来转换react中的jsx语法

`yarn add @babel/core @babel/preset-env @babel/preset-react babel-loader react react-dom -D`

在webpack中添加babel-loader匹配规则

```javascript
{
  test: /(\.js|\.jsx)$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader'
  }
},
```

添加.babelrc.js文件

```javascript
const presets = ["@babel/preset-env","@babel/preset-react"];
const plugins = [];

module.exports = { presets, plugins };
```

修改src/index.js

```javascript
import React, { useState } from "react";
import { render } from "react-dom";

function App() {
    const [state, setState] = useState("点击我");

    return <button onClick={() => setState("我被点击了")}>{state}</button>;
}

render(<App />, document.getElementById("root"));
```

使用yarn start 启动命令可看到视图

```
yarn start
```

最后可加入当前的模式与匹配代码行
```
  mode: 'development',
  devtool: 'inline-source-map',
```