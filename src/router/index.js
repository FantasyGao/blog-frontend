import Vue from 'vue'
import Router from 'vue-router'

const coverPage = resolve => require(['../page/coverPage/coverPage'], resolve)
const index = resolve => require(['../page/index/index'], resolve)
const articlePage = resolve => require(['../page/articlePage/articlePage'], resolve)

const classPage = resolve => require(['../page/classPage/classPage'], resolve)
const classDetail = resolve => require(['../page/classPage/classDetail'], resolve)

const tagPage = resolve => require(['../page/tags/tagPage'], resolve)

const admin = resolve => require(['../page/admin/admin'], resolve)
const adminIndex = resolve => require(['../page/admin/adminIndex'], resolve)
const adminWrite = resolve => require(['../page/admin/adminWrite'], resolve)
const adminEdit = resolve => require(['../page/admin/adminEdit'], resolve)
const adminLogin = resolve => require(['../page/admin/adminLogin'], resolve)
const adminRegister = resolve => require(['../page/admin/adminRegister'], resolve)
const adminBrowse = resolve => require(['../page/admin/adminBrowse'], resolve)

const adminMarkManage = resolve => require(['../page/admin/adminMarkManage'], resolve)
const adminUserManage = resolve => require(['../page/admin/adminUserManage'], resolve)
const adminMarkerManage = resolve => require(['../page/admin/adminMarkerManage'], resolve)
const adminReplyerManage = resolve => require(['../page/admin/adminReplyerManage'], resolve)
const adminReplyManage = resolve => require(['../page/admin/adminReplyManage'], resolve)
const adminReadAnaly = resolve => require(['../page/admin/adminReadAnaly'], resolve)
const adminChartsAnaly = resolve => require(['../page/admin/adminChartsAnaly'], resolve)
const adminCareUser = resolve => require(['../page/admin/adminCareUser'], resolve)
const adminLogs = resolve => require(['../page/admin/adminLogs'], resolve)

const noPage = resolve => require(['../page/noPage/noPage'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: coverPage,
      name: 'coverPage'
    },
    {
      path: '/index',
      component: index,
      name: 'Index'
    },
    {
      path: '/article/:id',
      component: articlePage,
      name: 'article'
    },
    {
      path: '/tag/:id',
      component: tagPage,
      name: 'tags'
    },
    {
      path: '/class',
      component: classPage,
      children: [
        {
          path: 'one',
          name: 'classicOne',
          component: classDetail
        },
        {
          path: 'two',
          name: 'classicTwo',
          component: classDetail
        },
        {
          path: 'three',
          name: 'classicThree',
          component: classDetail
        },
        {
          path: 'four',
          name: 'classicFour',
          component: classDetail
        },
        {
          path: 'five',
          name: 'classicFive',
          component: classDetail
        },
        {
          path: 'six',
          name: 'classicSix',
          component: classDetail
        }
      ],
      redirect: '/class/one'
    },
    {
      path: '/admin',
      component: admin,
      redirect: '/admin/login',
      children: [
        {
          path: 'index',
          meta: {auth: true},
          component: adminIndex,
          name: 'adminIndex'
        },
        {
          path: 'write',
          meta: {auth: true},
          component: adminWrite,
          name: 'adminWrite'
        },
        {
          path: 'markManage',
          meta: {auth: true},
          component: adminMarkManage,
          name: 'adminMarkManage'
        },
        {
          path: 'userManage',
          meta: {auth: true},
          component: adminUserManage,
          name: 'adminUserManage'
        },
        {
          path: 'markerManage',
          meta: {auth: true},
          component: adminMarkerManage,
          name: 'adminMarkerManage'
        },
        {
          path: 'ReplyManage',
          meta: {auth: true},
          component: adminReplyManage,
          name: 'adminReplyManage'
        },
        {
          path: 'replyerManage',
          meta: {auth: true},
          component: adminReplyerManage,
          name: 'adminReplyerManage'
        },
        {
          path: 'readAnaly',
          meta: {auth: true},
          component: adminReadAnaly,
          name: 'adminReadAnaly'
        },
        {
          path: 'chartsAnaly',
          meta: {auth: true},
          component: adminChartsAnaly,
          name: 'adminChartsAnaly'
        },
        {
          path: 'edit/:id',
          meta: {auth: true},
          component: adminEdit,
          name: 'adminEdit'
        },
        {
          path: 'login',
          component: adminLogin
        },
        {
          path: 'register',
          component: adminRegister
        },
        {
          path: 'browse/:id',
          meta: {auth: true},
          component: adminBrowse,
          name: 'adminBrowse'
        },
        {
          path: 'careUser',
          meta: {auth: true},
          component: adminCareUser,
          name: 'adminCareUser'
        },
        {
          path: 'adminLogs',
          meta: {auth: true},
          component: adminLogs,
          name: 'adminLogs'
        }
      ]
    },
    {
      path: '*',
      component: noPage
    }
  ]
})
