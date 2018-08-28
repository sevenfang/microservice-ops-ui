import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// const __import = require('_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router)

/* layout */
import Layout from '../views/layout/Layout'

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
export const constantRouterMap = [{
  path: '/login',
  component: _import('login/index'),
  hidden: true
},
{
  path: '/authredirect',
  component: _import('login/authredirect'),
  hidden: true
},
{
  path: '/404',
  component: _import('error/404'),
  hidden: true
},
{
  path: '/401',
  component: _import('error/401'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard-ui',
  name: '首页',
  hidden: true,
  children: [{
    path: 'dashboard-ui',
    component: _import('dashboard-ui/index')
  }]
},
{
  path: '/introduction',
  component: Layout,
  redirect: '/introduction/index',
  icon: 'form',
  noDropdown: true,
  children: [{
    path: 'index',
    component: _import('introduction/index'),
    name: '简述'
  }]
},
{
  path: '/router/serviceRouting',
  component: Layout,
  redirect: '/gate/index',
  icon: 'form',
  noDropdown: true,
  children: [{
    path: '/',
    component: _import('gate/index'),
    name: '服务路由'
  }]
},
// /router/routerVersion
{
  path: '/router/routerVersion',
  component: Layout,
  redirect: '/gate/routerVersion',
  icon: 'form',
  noDropdown: true,
  children: [{
    path: '/',
    component: _import('gate/routerVersion'),
    name: '服务路由版本'
  }]
},
{
  path: '/filter/groovyFilter',
  component: Layout,
  redirect: '/gate/filter',
  icon: 'form',
  noDropdown: true,
  children: [{
    path: '/',
    component: _import('gate/filter'),
    name: '动态过滤器配置'
  }]
},
{
  path: '/auth/authprovider',
  component: Layout,
  redirect: '/gate/authprovider',
  icon: 'form',
  noDropdown: true,
  children: [{
    path: '/',
    component: _import('gate/authprovider'),
    name: '自定义认证'
  }]
},
{
  path: '/router/ignoreUri',
  component: Layout,
  redirect: '/gate/gateIgnoreUri',
  icon: 'form',
  noDropdown: true,
  children: [{
    path: '/',
    component: _import('gate/gateIgnoreUri'),
    name: 'ignoreUri'
  }]
},

{
  path: '/message/mq',
  component: Layout,
  redirect: '/message/index',
  icon: 'form',
  noDropdown: true,
  children: [{
    path: '/',
    component: _import('message/index'),
    name: '消息中心'
  }]
},
{
  path: '/task/tasklist',
  component: Layout,
  redirect: '/task/index',
  icon: 'form',
  noDropdown: true,
  children: [{
    path: '',
    component: _import('task/index'),
    name: '计划任务'
  }]
},
{
  path: '/task/tasklog',
  component: Layout,
  redirect: '/task/tasklog',
  icon: 'form',
  noDropdown: true,
  children: [{
    path: '/',
    component: _import('task/tasklog'),
    name: '计划任务'
  }]
},

{
  path: '/monitor/serviceManager',
  component: Layout,
  redirect: '/service/index',
  icon: 'form',
  noDropdown: true,
  children: [{
    path: '/',
    component: _import('service/index'),
    name: '服务列表'
  }]
},
{
  path: '/monitor/eureka',
  component: Layout,
  redirect: '/hyperlink/common/index',
  icon: 'form',
  noDropdown: true,
  children: [{
    path: '/',
    component: _import('hyperlink/common/index'),
    name: '注册中心'
  }]
},

// /hyperlink/index
{
  path: '/hyperlink/index',
  component: Layout,
  redirect: '/hyperlink/common/index',
  icon: 'form',
  noDropdown: true,
  children: [{
    path: '/',
    component: _import('hyperlink/common/index'),
    name:'/hyperlink/index'
  }]
},

{
  path: '/monitor/pinpoint',
  component: Layout,
  redirect: '/hyperlink/common/index',
  icon: 'form',
  noDropdown: true,
  children: [{
    path: '/',
    component: _import('hyperlink/common/index'),
    name: 'pinpoint'
  }]
},
{
  path: '/alarm',
  component: Layout,
  redirect: '/alarm',
  icon: 'form',
  noDropdown: true,
  children: [
    {path: 'rulelist', component: _import('alarm/rule-group-list') ,name: '报警规则' },
    {path: 'alarmLogs', component: _import('alarm/alarmLogs') ,name: '报警记录' },
    {name:'addrule',path: 'add', component: _import('alarm/rule-add') ,name: '创建报警规则' },
    {path: 'groupManager', component: _import('admin/group/index') ,name: '报警组管理' }
]
},
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})


// 动态需要根据权限加载的路由表

export const asyncRouterMap = [
  {
  path: '/baseManager',
  component: Layout,
  name: '基础配置管理',
  icon: 'setting',
  authority: 'baseManager',
  children: [{
    path: 'userManager',
    icon: 'fa-user',
    component: _import('admin/user/index'),
    name: '用户管理',
    authority: 'userManager'
  }, {
    path: 'menuManager',
    icon: 'category',
    component: _import('admin/menu/index'),
    name: '菜单管理',
    authority: 'menuManager'
  }, {
    path: 'groupManager',
    icon: 'group_fill',
    component: _import('admin/group/index'),
    name: '角色权限管理',
    authority: 'groupManager'
  }, {
    path: 'groupTypeManager',
    icon: 'fa-users',
    component: _import('admin/groupType/index'),
    name: '角色类型管理',
    authority: 'groupTypeManager'
  }, {
    path: 'gateLogManager',
    icon: 'viewlist',
    component: _import('admin/gateLog/index'),
    name: '操作日志管理',
    authority: 'gateLogManager'
  }]
},{
  path: '/message',
  component: Layout,
  name: '基础配置管理',
  icon: 'setting',
  authority: 'mq',
  children: [{
    path: '/',
    icon: 'fa-user',
    component: _import('message/index'),
    name: '消息中心',
    authority: 'mq'
  }]
},
,{
  path: '/task',
  component: Layout,
  name: '基础配置管理',
  icon: 'setting',
  authority: 'task',
  children: [{
    path: '/',
    icon: 'fa-user',
    component: _import('task/index'),
    name: '任务管理',
    authority: 'task'
  },
  {
    path: '/',
    icon: 'fa-user',
    component: _import('task/tasklog'),
    name: '任务追踪',
    authority: 'tasklog'
  }]
}
]