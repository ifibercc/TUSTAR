#tustar

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
