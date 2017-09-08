
## 前后端分离实践----blog's frontend
### 后端地址---- [blog's backend](https://github.com/FantasyGao/blog-backend.git)

#### 简介:通过vue.js框架与[koa2框架](https://github.com/FantasyGao/koa2.git)分别搭建前后端，利用ngnix端口分发部署实现代码全分离，开发全分离。

#### nginx文件配置内容
 ```
	server {
		listen       80;
		server_name  localhost;
		location / {
		    proxy_pass http://127.0.0.1:8080;               #转发非api，与上传的静态资源的其他信息 
		    proxy_redirect default;
		}
		location /api/ {
		    proxy_pass http://127.0.0.1:3000/api/;          #转发至api接口
		}
			location ^~ /uploads/ {
		    proxy_pass http://127.0.0.1:3000/uploads/;     #转发至上传的静态资源
		}
	}
 ```

#### Getting Start

##### 1. 开发环境
 ```
node.js 7.6+
mognodb 3.0+
```
##### 2. 克隆到本地，安装依赖，运行
```
> git clone https://github.com/FantasyGao/blog-frontend.git
> cd blog-frontend
> npm install 
> npm start
```
### 简要概述

  #### 1. axios模块实现http请求拦截器，配合完成权限控制
  #### 2. vuex集中管理文章数据信息
  #### 3. [iview](https://www.iviewui.com/)开源组件的使用(全局提示框，文件上传组件等)
  #### 4. [mavon-editor](https://github.com/hinesboy/mavonEditor) 模块完成markdown富文本编辑器 
  #### 5. vue-chartjs 完成数据分析的图表展示
  #### 6. smartTable 表格组件使用

### 功能概述

#### 用户层
#### 1. 文章按照种类区分
#### 2. 文章可拥有多个不同标签
#### 3. 文章按照种类区分
#### 4. 支持文章评论，用户之间的多层回复

### 管理员层
#### 1. 撰写文章（markdown编写，实时查看效果）
#### 2. 全部文章管理（上，下线;修改文章，预览效果，删除文章等）
#### 3. 评论管理（审核，删除等）
#### 4. 回复管理（审核，删除等）
#### 5. 注册人员管理（查看，删除等）
#### 6. 评论用户或者回复用户 （查看评论或回复详情）
#### 7. 添加评论用户或者回复用户为特别关注
#### 8. 登录与操作日志查看
#### 9. 评论用户或者回复用户 （查看评论或回复详情）
#### 10. 网站数据分析（评论最多与浏览最多文章查看）
#### 11. 网站数据用图表展示（近十天浏览量，浏览最多十篇文章，评论最多十篇文章）

### 后期添加功能
#### 1. 网站后台多层权限控制
#### 2. 不定

### 目录结构

```
➜  backend/src
.
├── components
├── page
│   ├── admin
│   ├── articlePage
│   ├── classPage
│   ├── coverPage
│   ├── index
│   ├── noPage
│   └── tags
├── router
│   └── index.js
├── util
│   ├── api.js
│   └── axios.js
├── vuex
│   ├── action.js
│   ├── mutations.js
│   ├── store.js
│   └── type.js
├── api
│   ├── articleAPI.js
├── ├── userAPI.js
│   └── logAPI.js
├── main.js
└── App.vue

```

### License
MIT
