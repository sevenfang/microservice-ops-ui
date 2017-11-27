# [microservice-ops-ui](https://github.com/yonyou-auto-dev/microservice-ops-ui.git)

## 准备工作
- node.js环境（npm包管理器）
- vue-cli 脚手架构建工具
- cnpm  npm的淘宝镜像

## 开发运行
```bash
   
    # 安装依赖
    npm install
    //or # 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
    npm install --registry=https://registry.npm.taobao.org

    # 本地开发 开启服务
    npm run dev
```
浏览器访问 http://localhost:9527/index

## 发布

    开发环境 npm run dev
```bash
    
    # 发布测试环境 带webpack ananalyzer
    npm run build:sit-preview

    # 构建生成环境
    npm run build:prod
```
### 部署nginx配置参考
```
  location / {
        # 指向我们打包后上传的前端文件
        root /opt/nginx/dist;
        index index.html;
    }
    location /jwt/ {
        # 转发请求到后端服务网关
        proxy_pass http://127.0.0.1:8765/jwt/;
    }
    location /api/ {
        proxy_pass http://127.0.0.1:8765/api/;
     }
```

## 目录结构
```shell
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求---------------------所有的js-data方法都放到api中 
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filtres                // 全局filter
│   ├── mock                   // mock数据
│   ├── router                 // 路由
│   ├── store                  // 全局store管理-----------------Vuex 的仓库 管理所有组件状态
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── view                   // view        ------------------ 页面 每个view 对应一个api 文件
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
├── static                     // 第三方不打包资源
│   ├── jquery
│   └── Tinymce                // 富文本
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json

```

## 状态管理
后台只有user和app配置相关状态使用vuex存在全局，其它数据都由每个业务页面自己管理。
 



 
 
## 1.api 和 views
根据业务模块来划分views，并且将views 和 api 两个模块一一对应，方便维护
## 2.components
放置的都是全局公用的一些组件，如上传组件，富文本等等。一些页面级的组件建议还是放在各自views文件下

## 3.store
	使用vuex来存储公共的data
	业务之间的耦合度是高的时候使用
	vuex来统一管理的，如登录token，用户信息（角色，权限），或者是一些全局个人偏好设置等
	
## 4.webpack

	vue-cli为基础模板构建
	
## 5.jQuery
会经常用到一些第三方插件，但有些插件是不得不依赖jquery的，如市面上好的富文本基都是依赖jquery的，所以干脆就直接引入到项目中省事

## 6.alias  
    在build下面
	webpack.base.cof.js 指定 绝对路径

## 7.eslint
eslint+vscode来写vue   代码语法格式自动检测

vscode 插件地址
https://github.com/varHarrie/YmxvZw/issues/10

## 8.封装axios
我们经常遇到一些线上的bug，但测试环境很难模拟。其实可以通过简单的配置就可以在本地调试线上环境。

ajax 发送和接受数据的时候拦截 进行一些操作 如401,404 等等


## 9.多环境
	npm run dev 
	npm run build:prod
	
	package.json中放的就是打包的信息
	  "scripts": {
			"dev": "node build/dev-server.js",
			"build:prod": "cross-env NODE_ENV=production node build/build.js",
			"build:sit": "cross-env NODE_ENV=sit node build/build.js",
			"build:sit-preview": "cross-env NODE_ENV=sit npm_config_preview=true  npm_config_report=true node build/build.js",
			"lint": "eslint --ext .js,.vue src"
		  },

		  代码里自行判断，想干就干啥
		  var env = process.env.NODE_ENV === 'production' ? config.build.prodEnv : config.build.sitEnv
		  
		  新版的vue-cli也内置了webpack-bundle-analyzer 一个模块分析的东西，相当的好用。使用方法也很简单，和之前一样封装一个npm script 就可以。

		  //package.json
			"build:sit-preview": "NODE_ENV=sit npm_config_preview=true  npm_config_report=true node build/build.js"

			//之后通过process.env.npm_config_report来判断是否来启用webpack-bundle-analyzer 
			var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
			webpackConfig.plugins.push(new BundleAnalyzerPlugin())
			
			如webpack.prod.conf.js
			
			webpack-bundle-analyzer这个插件还是很有用的，对后期的代码优化什么的，最重要的是它够装逼~
## 10.前后端交互
	webpack-dev-server的proxy来解决，开发环境用nginx反代理一下就好了
	config index.js  dev 代理配置  如果是生产环境的话 直接用Nginx代理
	
	后端mock api 生成好文档， 前端 对接接口的。 文档生成器swagger
	
	前端 用 mock  server 或者使用mockjs+rap也是很方便的。 不久前出的easy-mock也相当的不错，还能结合swagger。
	
## 11.iconfont
	element-ui 默认的icon不是很多 http://iconfont.cn 阿里图标神奇
	
## 12.router-view

computed: {
    key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
 }

 创建和编辑的页面使用的是同一个component,默认情况下当这两个页面切换时并不会触发vue的created或者mounted钩子
 
 watch $route的变化来做处理，但其实说真的还是蛮麻烦的。 简单的做法是router-view上加上一个唯一的key，来保证路由切换时都会重新渲染触发钩子了
 
 
## 13. 权限
	不同的权限对应着不同的路由，同时侧边栏也需根据不同的权限，异步生成。这
	
	设计思路
	登录：当用户填写完账号和密码后向服务端验证是否正确，验证通过之后，服务端会返回一个token，拿到token之后（我会将这个token存贮到cookie中，保证刷新页面后能记住用户登录状态），
		  前端会根据token再去拉取一个user_info的接口来获取用户的详细信息（如用户权限，用户名等等信息）。
	权限验证：通过token获取用户的role,动态根据用户的role算出其相应有权限的路由，通过router.addRoutes动态挂载路由
	
	数据和操作都是通过vuex全局管理控制的
	
#### 	a.登录篇
	click事件触发登录操作

		this.$store.dispatch('LoginByEmail', this.loginForm).then(() => {
		  this.$router.push({ path: '/' }); //登录成功之后重定向到首页
		}).catch(err => {
		  this.$message.error(err); //登录失败提示错误
		});
		
		action

	LoginByEmail({ commit }, userInfo) {
	  const email = userInfo.email.trim();
	  return new Promise((resolve, reject) => {
		loginByEmail(email, userInfo.password).then(response => {
		  const data = response.data;
		  Cookies.set('Token', response.data.token); //登录成功后将token存储在cookie之中
		  commit('SET_TOKEN', data.token);
		  commit('SET_EMAIL', email);
		  resolve();
		}).catch(error => {
		  reject(error);
		});
	  });
	}
			
登录成功后，服务端会返回一个token（该token的是一个能唯一标示用户身份的一个key），之后我们将token存储在本地cookie之中，这样下次打开页面或者刷新页面的时候能记住用户的登录住在那台，不用再去登录页面重新登录了

获取用户信息
用户登录成功之后，我们会在全局钩子router.beforeEach中拦截路由，判断是否已获得token，在获得token之后我们就要去获取用户的基本信息了

//router.beforeEach
if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
  store.dispatch('GetInfo').then(res => { // 拉取user_info
    const roles = res.data.role;
    next();//resolve 钩子
  })
 
 
#### b.权限篇
	权限控制的主体思路
	前端会有一份路由表，它表示了每一个路由可访问的权限。当用户登录之后，通过token获取用户的role,动态根据用户的role算出其相应有权限的路由，再通过router.addRoutes动态挂载路由,但这些控制都只是页面级的，说白了前端再怎么做权限控制都不是绝对安全的，后端的权限验证是逃不掉的
	不同权限的用户显示不同的侧边栏和能进入不同的页面(也做了少许按钮级别的权限控制)，
	后端则会验证每一个涉及请求的操作，验证其是否有该操作的权限，每一个后台的请求不管是get还是post都会让前端在请求header里面携带用户的token，后端会根据该token来验证用户是否有权限执行该操作。
	
	router.addRoutes 动态挂载路由表
	
	1.创建vue实例的时候将vue-router挂载，但这个时候vue-router挂载一些登录或者不用权限的公用的页面。
	2.当用户登录后，获取用role，将role和路由表每个页面的需要的权限作比较，生成最终用户可访问的路由表。
	3.调用router.addRoutes(store.getters.addRouters)添加用户可访问的路由。
	4.使用vuex管理路由表，根据vuex中可访问的路由渲染侧边栏组件。
	
	
	// router.js
	import Vue from 'vue';
	import Router from 'vue-router';

	import Login from '../views/login/';
	const dashboard = resolve => require(['../views/dashboard/index'], resolve);
	//使用了vue-routerd的[Lazy Loading Routes
	](https://router.vuejs.org/en/advanced/lazy-loading.html)

	//所有权限通用路由表 
	//如首页和登录页和一些不用权限的公用页面
	export const constantRouterMap = [
	  { path: '/login', component: Login, hidden: true //hidden为自定义属性，侧边栏那章会纤细解释},
	  {
		path: '/',
		component: Layout,
		redirect: '/dashboard',
		name: '首页',
		children: [{ path: 'dashboard', component: dashboard }]
	  },
	]

	//实例化vue的时候只挂载constantRouter
	export default new Router({
	  routes: constantRouterMap
	});

	//异步挂载的路由
	//动态需要根据权限加载的路由表 
	export const asyncRouterMap = [
	  {
		path: '/permission',
		component: Layout,
		redirect: '/permission/index',
		name: '权限测试',
		meta: { role: ['admin','super_editor'] }, //页面需要的权限
		children: [
		{ 
			path: 'index',
			component: Permission,
			name: '权限测试页',
			meta: { role: ['admin','super_editor'] }  //页面需要的权限
		}]
	  },
	  { path: '*', redirect: '/404', hidden: true }
	];
	
	
## 14	vue 实例
	ivew 一国人个人写的框架，美观度和交互性都不错，有种介于Element和Ant之间的感觉，之前和element团队小小的撕了一下，有兴趣的自己去围观吧，框架还是很不做的，一个人能做出这样，也是很不容易的。作者公开信件
	vue-admin 也是一个不错的选择，代码写的和不错，官方也出了一个admin的架子，也很值得借鉴
	vue-material 一个material design vue框架库
	vuetify 又是一个material design vue框架库
	Keen-UI 又又是一个material design vue框架库
	CoreUI-Free-Bootstrap-Admin-Template 和以前的Bootstrap一样，搭好了一个完整的架子，大家可以进行二次拓展，它有vue,react,angular多个版本
	
	基于Element的动态换肤
 a.左侧栏	
     导航栏的问题，
	  侧边栏是根据 router.js 配置的路由并且根据权限动态生成的， 
		如果路由可能会有多层嵌套，很多人反馈自己的侧边栏会有三级，甚至还有五级的。所以重构了一下侧边栏，使用了递归组件，这样不管你多少级，都能愉快的显示了	
		<template>
		  <div class='menu-wrapper'>
			<template v-for="item in routes">

			  <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
				<el-menu-item :index="item.path+'/'+item.children[0].path" class='submenu-title-noDropdown'>
				  <icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg><span>{{item.children[0].name}}</span>
				</el-menu-item>
			  </router-link>

			  <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
				<template slot="title">
				  <icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg><span>{{item.name}}</span>
				</template>
				<template v-for="child in item.children" v-if='!child.hidden'>

				  <sidebar-item class='nest-menu' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>

				  <router-link v-else :to="item.path+'/'+child.path">
					<el-menu-item :index="item.path+'/'+child.path">
					  <icon-svg v-if='child.icon' :icon-class="child.icon"></icon-svg><span>{{child.name}}</span>
					</el-menu-item>
				  </router-link>

				</template>

			  </el-submenu>

			</template>
		  </div>
		</template>

		<script>
		export default {
		  name: 'SidebarItem',
		  props: {
			routes: {
			  type: Array
			}
		  }
		}
		</script>
	
侧边栏高亮问题: 	:default-active="$route.path"
将default-active一直指向当前路由就可以了，就是这么简单。

 监听侧边栏每个link 的 click事件，每次点击都给router push 一个不一样的query 来确保会重新刷新view。
点击侧边栏 刷新当前路由
	clickLink(path) {
	  this.$router.push({
		path,
		query: {
		  t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
		}
	  })
	}
	
	router-view 加上一个特定唯一的 key，如 <router-view :key="$route.path"></router-view>
	
	
Table

	Table 拖拽排序
	import Sortable from 'sortablejs'
	let el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
	let sortable = Sortable.create(el)
	在table mounted之后申明Sortable.create(el) table的每行tr就可以随意拖拽了，麻烦的目前我们的排序都是基于dom的，我们的数据层list并没有随之改变。所以我们就要手动的来管理我们的列表。

	this.sortable = Sortable.create(el, {
	  onEnd: evt => { //监听end事件 手动维护列表
		const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
		this.newList.splice(evt.newIndex, 0, tempIndex);
	  }
	});
	
	Table 内联编辑
	<el-table-column min-width="300px" label="标题">
	  <template scope="scope">
		<el-input v-show="scope.row.edit" size="small" v-model="scope.row.title"></el-input>
		<span v-show="!scope.row.edit">{{ scope.row.title }}</span>
	  </template>
	</el-table-column>
	<el-table-column align="center" label="编辑" width="120">
	  <template scope="scope">
		<el-button v-show='!scope.row.edit' type="primary" @click='scope.row.edit=true' size="small" icon="edit">编辑</el-button>
		<el-button v-show='scope.row.edit' type="success" @click='scope.row.edit=false' size="small" icon="check">完成</el-button>
	  </template>
	</el-table-column>