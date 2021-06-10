import Layout from'@/layout'

export const SafeRouteMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '仪表盘', icon: 'dashboard', affix: true },
        roles: ['admin', 'editor','users']
      }
    ]
  }


]
const PermissionAdmin = () => import('@/views/permission/user') // 用户管理
const PermissionRole = () => import('@/views/permission/role') // 角色管理
const Permission = () => import('@/views/permission/permission') // 权限管理
const Log = () => import('@/views/permission/log') // 系统日志
const System = () => import('@/views/permission/system') // 系统信息
const Terminal = () => import('@/views/permission/terminal') // 系统终端

export const AuthRouteMap = [
	{
		path: '/permission',
		component: Permission,
	},
	{
		path: '/role',
		component: PermissionRole
	},
	{
		path: '/user',
		component: PermissionAdmin
  },
  {
		path: '/log',
		component: Log
  },
  {
    path:'/system',
    component: System
  },
  {
    path:'/terminal',
    component: Terminal
  }
]
