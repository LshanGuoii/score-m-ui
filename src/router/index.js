import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor','teacher','student']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
    type: 1 / 2/ 3 0-admin,1-teacher, 2-student
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // {
  //   path: '/',
  //   redirect: '/login',
  // },
  {
    path: '/login',

    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/person-info',
    component: Layout,
    children: [{
      path: '/person-info',
      name: 'PersonInfo',
      component: () => import('@/views/PersonInfo'),
      meta: { title: '个人信息', icon: 'user' }
    }]
  },
  {
    path: '/student',
    redirect: 'dep-manage',
    meta: { title: '院系配置管理', icon: 'table', type: 0 },
    component: Layout,
    children: [
      {
        path: '/dep-manage',
        name: 'DepManage',
        component: () => import('@/views/DepManage'),
        meta: { title: '系部', icon: 'form' }
      },
      {
        path: '/specialize-manage',
        name: 'SpecializeManage',
        component: () => import('@/views/SpecializeManage'),
        meta: { title: '专业', icon: 'form' }
      },
      {
        path: '/class-manage',
        name: 'ClassManage',
        component: () => import('@/views/ClassManage'),
        meta: { title: '班级', icon: 'form' }
      }
    ]
  },
  {
    path: '/teacher-manage',
    component: Layout,
    meta: { type: 0 },
    children: [
      {
        path: '/teacher-manage',
        name: 'TeacherManage',
        component: () => import('@/views/TeacherManage'),
        meta: { title: '教师管理', icon: 'eye', }
      }
    ]
  },
  {
    path: '/student-manage',
    component: Layout,
    meta: { type: 0 },
    children: [
      {
        path: '/student-manage',
        name: 'StudentManage',
        component: () => import('@/views/StudentManage'),
        meta: { title: '学生管理', icon: 'password', }
      }
    ]
  },
  {
    path: '/tiny-info',
    component: Layout,
    meta: { type: 2 },
    children: [
      {
        path: '/tiny-info',
        name: 'TinyInfo',
        component: () => import('@/views/TinyInfo'),
        meta: { title: '成绩信息', icon: 'form' }
      }
    ]
  },
  {
    path: '/tiny-manage',
    component: Layout,
    // alwaysShow: true,
    meta: { type: 1 },

    children: [
      {
        path: '/tiny-manage',
        name: 'TinyManage',

        component: () => import('@/views/TinyManage'),
        meta: { title: '成绩管理', icon: 'form', type: 2 },
        // children: [

        // ]
      },
      {
        path: '/tiny-manage/result-list',
        name: 'resultList',
        hidden: true,
        component: () => import('@/views/TinyManage/resultList'),
        meta: { title: '学生成绩详情', icon: 'form', type: 2 }
      }
    ]
  },
  // {
  //   path: '/class-manage',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/class-manage',
  //       name: 'ClassManage',
  //       component: () => import('@/views/ClassManage'),
  //       meta: { title: '班级管理', icon: 'form' }
  //     }
  //   ]
  // },
  {
    path: '/course-manage',
    component: Layout,
    meta: { type: 0 },
    children: [
      {
        path: '/course-manage',
        name: 'CourseManage',
        component: () => import('@/views/CourseManage'),
        meta: { title: '课程管理', icon: 'link' }
      }
    ]
  },
  {
    path: '/teaching-manage',
    component: Layout,
    meta: { type: 0 },
    children: [
      {
        path: '/teaching-manage',
        name: 'TeachingManage',
        component: () => import('@/views/TeachingManage'),
        meta: { title: '授课管理', icon: 'nested', }
      }
    ]
  },




  {
    path: '/log-manage',
    component: Layout,
    meta: { type: 0 },
    children: [{
      path: '/log-manage',
      name: 'LogManage',
      component: () => import('@/views/LogManage'),
      meta: { title: '日志管理', icon: 'tree' }
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
