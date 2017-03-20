# tustar

基于 vue 2.0 + ElementUI + Vue Router + axios 后台管理系统

## 主要依赖模块
- vue
- vue router
- ElementUI
- axios
- json-server
- nprogress
- webpack

## 安装项目
`cnpm install`

## 开发模式
`npm run dev`

## 开启mock服务器
`npm run mock`

## 线上模式
`npm run build`

## 主要功能

### 1. 前端mock服务器
#### 1.1 服务器环境
webpack dev-server作为前端服务器，json-server作为后端mock服务器，使用proxy字段进行代理  
拦截前缀`/api`的请求至后端环境，拦截前缀`/mock`的请求至mock环境，可修改port
```
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    port: 8888,
    proxy: {
      "/api": "http://localhost:3454",
      "/mock": "http://localhost:8888"
    }
  }
```

#### 1.2 mock接口
在`/mock/server.js`中可以修改json-server的默认接口，默认为3456
```
server.listen(3456, function () {
  console.log('JSON Server is running')
})
```

#### 1.3 路由配置
在`/mock/routes.json`中进行路由的映射重写
```
{
  "/mock/organization": "/mockOrganization",
  "/mock/organizations": "/mockOrganizations",
  "/mock/organizeTree":"/mockOrganizeTree",
  "/mock/userList":"/mockUserList",
  "/mock/bsuser":"/mockUserList"
}
```
为避免混淆，建议将路由地址改写为驼峰式对象名称

#### 1.4 配置mock数据
在`/mock/mock.json`中进行mock返回数据的配置
```
{
  "apiOrganization": {
    "code": 200,
    "msg": "操作错误",
    "data": [{
        "label": "一级 1",
        "children": [{
          "label": "二级 1-2"
        }]
      },
      {
        "label": "一级 2",
        "children": [{
            "label": "二级 2-1"
          },
          {
            "label": "二级 2-2"
          }
        ]
      },
      {
        "label": "一级 3",
        "children": [{
            "label": "二级 3-1"
          },
          {
            "label": "二级 3-2"
          }
        ]
      }
    ]
  }
}
```

### 2. 接口规范
#### 2.1 具有分页的表格返回数据
对于有分页的表格，在遵循Ajax JSON返回数据规范与分页信息的基础上，我们需要加入分页信息。本标准建议在分页信息同级别增加data字段用于包含数据。
```
{
    "code": 0,  
    "msg" : ""    
    "data": {
        "data": [{…},{…}], 
        "currentPage": 0, 
        "pageSize": 25, 
        "totalCount": 8040, 
        "totalPage": 322
    }
}
```

#### 2.2 post状态返回数据
```
{
    "code": 0,
    "data": *, 
    "msg" : ""
}
```

#### 2.3 相关字段说明
code: 整型。请求成功与否。0表示成功，其他表示失败  
data: 任意类型。所包含的数据  
msg: 字符串型。如果有错误，则错误的信息放置在此，否则请设置为为空或null  

### 3. AJAX
使用axios作为异步请求工具  
已经绑定了全局的方法，并对按照接口规范的数据进行预处理，进行message的统一错误处理，并结合nprocess插件进行进度提示
```
this.$ajax('get', '/api/organizeTree', {a: 'test'},  function (res) {
            console.log(res)
});
```
- param1: method，第一个参数为ajax的方法，目前有"get" 和 "post"两种类型，取数据用get提交数据用post
- param2: url，第二个参数为请求地址，按照目前的方式需要以"/api"作为前缀
- param3: req，第三个参数为请求参数，是一个js对象，如果没有请求参数则写为"{}"空对象即可
- param4: res，第四个参数为响应参数，传入的值是后端的返回值中的data对象，并且已经将code和msg字段去掉，进行了裁剪

### 4. icon-font
为了个性化以及打包速度，并没有引入体积庞大的awesome-font，而是使用阿里巴巴开源的icon-font  
http://www.iconfont.cn/  
为了首屏渲染速度，没有将本css打包进build.js中  
所以每次图标库修改后直接替换index.html中的链接地址即可  
`<link rel="stylesheet" type="text/css" href="//at.alicdn.com/t/font_558ntzswktucv7vi.css">`

## 模板页面
### 1. 基本查询
```
<template>
    <div class="layout-table-simple">
        <div class="condition">
        </div>
        <div class="toolbar">
        </div>
        <div class="grid">
        </div>
        <div class="pagination">
        </div>
        <el-dialog>
        </el-dialog>
    </div>
</template>
```

### 2. 左树右表

### 3. 树编辑