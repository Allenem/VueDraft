# Vue 学习笔记2（40-49）

>学习地址：[https://ke.qq.com/course/279700](https://ke.qq.com/course/279700)

## 目录：

- 01-01 git下载代码
- 02-27 Vue2.x
- 28-39 路由精讲
- [40-49 Vue-Cli3.0](#vuecli3)
- 50-64 Vue2.x-实战项目(个人博客)
- 65-76 Vue2.x-实战项目(用户管理)
- 77-87 Vuex

## vuecli3

## 01	Vue-Cli3.0-项目搭建及介绍

找到脚手架的github仓库：https://github.com/vuejs/vue-cli

打开docs文件夹，拉到最后，按照步骤安装

Install:
```bush
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```
Create a project:
```bush
vue create my-project
# OR
vue ui
```
Run a project
```bush
cd my-project
npm run serve
```

## 02	Vue-Cli3.0-自定义脚手架模板

`vue create my-project`时选择`Manually select features`，选择自己需要的插件等等，`Save this as a preset for future projects?`选择y，`Save preset as`给预置取个名字。

可以在自己的文件夹中找到隐藏文件`.vuerc`，记事本打开即可看见。默认为空`{}`。

## 03	Vue-Cli3.0-新出的添加插件方法

- 原来的插件安装方法
  ```bush
  npm install <plugin> --save
  ```
- 新方法
  ```bush
  vue add <plugin>
  ```
  会有一些文件替换的插件（比如`vuetify`）会有提示，建议用该方法


## 04	Vue-Cli3.0-全局环境变量的使用

### 全局环境
根路径下创建`.env`文件，设置全局环境变量，比如：
```
VUE_APP_XXX = XXX
```

在需要的组件内
```html
<script>
export default{
  data(){
    return{
      url: process.env.VUE_APP_XXX
    }
  }
}
</script>
```

`.env`数据变化要重新启动项目

### 开发环境
根路径下创建`.env.development`文件，设置开发环境变量，比如：
```
VUE_APP_XXX = XXX
```
`npm run serve`时用该文件的值。

### 生产环境
根路径下创建`.env.production`文件，设置开发环境变量，比如：
```
VUE_APP_XXX = XXX
```
`npm run build`时用该文件的值。

## 05	Vue-Cli3.0-独立运行.vue文件

```bush
npm install -g @vue/cli-service-global

vue serve XXX.vue
```

## 06	Vue-Cli3.0-图形页面构建项目

```bush
vue ui
```
打开GUI地址，进入图形页面，开始构建项目。

创建新项目：详情->预设->功能->配置

创建时 terminal 窗口会继续运行

创建好后gui界面会有：插件，依赖，配置，任务(serve,build,inspect) 4个菜单。

## 07	Vue-Cli3.0-配置基础的路径

根路径下创建`vue.config.js`文件
```js
module.exports = {
  baseUrl: '/', //根路径
  outputDir: 'dist2', //构建输出目录
  assetsDir: 'assets', //静态资源目录(js, css, img, fonts )
  lintOnSave: false, //是否开启eslint保存检测，有效值: true || false || ' error'
};
```

## 08	Vue-Cli3.0-配置跨域请求

续上一讲...根路径下创建`vue.config.js`文件
```js
module.exports = {
  baseUrl: '/', //根路径
  outputDir: 'dist2', //构建输出目录
  assetsDir: 'assets', //静态资源目录(js, css, img, fonts )
  lintOnSave: false, //是否开启eslint保存检测，有效值: true || false || ' error'

  devServer: {
    open: true, // 浏览器自动开启
    host: 'localhost', // 主机地址'127.0.0.0','0.0.0.0'也可以
    port: 8081, // 端口号
    https: false, // 是否启动https，启动会警告
    hot0nly: false, // 热更新，默认false
    proxy: {
      //配置跨域
      '/api': {
        target: 'http//localhost:5000/api/',
        ws: true,
        chang0rigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }

};
```

## 09	Vue-Cli3.0-加载美团外卖数据json

将包含 `goods.json`,`ratings.json`,`seller.json` 三个文件的 `data` 文件夹放到根目录下

还是`vue.config.js`文件
```js
const goods = require(' ./data/goods.json');
const ratings = require(' ./data/ratings.json');
const seller = require(' ./data/seller.json');

module.exports = {
  baseUrl: '/', //根路径
  outputDir: 'dist2', //构建输出目录
  assetsDir: 'assets', //静态资源目录(js, css, img, fonts )
  lintOnSave: false, //是否开启eslint保存检测，有效值: true || false || ' error'

  devServer: {
    open: true, // 浏览器自动开启
    host: 'localhost', // 主机地址'127.0.0.0','0.0.0.0'也可以
    port: 8081, // 端口号
    https: false, // 是否启动https，启动会警告
    hot0nly: false, // 热更新，默认false
    proxy: {
      //配置跨域
      '/api': {
        target: 'http//localhost:5000/api/',
        ws: true,
        chang0rigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  before(app) {
    // http: //loca lhost: 8081/api/goods
    app.get('/api/goods', (req, res) => {
      res. json(goods) ;
    });
    app.get( '/api/ratings', (req, res) => {
      res. json(ratings);
    });
    app.get( '/api/seller', (req, res) => {
      res. json(seller);
    });
  }

};
```