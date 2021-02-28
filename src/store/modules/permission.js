import { asyncRoutes, constantRoutes,otherRouter } from '@/router'
import store from '..'
import user from './user'
import Layout from '@/layout'





/**
 * 获取一个路由组件
 * @param {*} node  节点信息
 */
function getRouter(node, component, isRoot = false) {

  let temp = {
      path: isRoot ? node.url : node.url.replace('/', ''),
      component: component,
      name: node.name,
      meta: { title: node.name, icon: node.icon },
      hidden: (node.hidden == 1)
  }
  if(isRoot && node.children) {
    temp.children = []
  }

  // isRoot && (temp.children = [])
  // isRoot && (temp.alwaysShow = true)
  return temp
}


function findComponentByPath(url) {
  let router = asyncRoutes.find(route => {
    if (route.path == url) {
        return true
    }
})
  return router ? router.component : null
}


/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
// export function filterAsyncRoutes(routes, roles) {
//   const res = []

//   routes.forEach(route => {
//     const tmp = { ...route }
//     console.log(tmp)
//     if (hasPermission(roles, tmp)) {
//       if (tmp.children) {
//         tmp.children = filterAsyncRoutes(tmp.children, roles)
//       }
//       res.push(tmp)
//     }
//   })

//   return res
// }

export function filterAsyncRoutes(menus, isRoot = true) {
  const routers = []
  let component
  menus.forEach(menu => {
      let route = Object.assign({})
      try {
          if (isRoot) {
              route = getRouter(menu, Layout, true)
          }
          else if (menu.children && menu.children.length > 0) {
              let result = menu.children.find((item) => {
                  component = findComponentByPath(item.url)
                  return component
              })
              if (result) {
                  route = getRouter(result, component, true)
              } else {
                  return
              }
          }
          else {
              if (!menu.path) { return }
              component = findComponentByPath(menu.url)
              if (!component) { return }
              route = getRouter(menu, component)
          }
          if (menu.children && menu.children.length > 0 && isRoot) {
              route.children = route.children.concat(filterAsyncRoutes(menu.children, false))
          }
      } catch (error) { console.log(error); return }

      routers.push(route)
  })
  return routers
}




const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

function filterNotFoundRouter(menus) {

  let routers = filterAsyncRoutes(menus)
  console.log(routers)
  let newRouters = []
  routers.forEach(route => {
      try {
          if (route.children.length > 0) {
              route.redirect = route.children[0].path
              newRouters = newRouters.concat(route)
          }
      } catch (err) { console.log(err) }

      return route
  })

  return newRouters
}


function getOwnRoutes(menus,roles) {
  let routers = filterNotFoundRouter(menus,roles)
  routers = routers.concat(otherRouter)
  return routers
}




//设置系统菜单和路由
const actions = {
  generateRoutes({ commit }, roles) {

    return new Promise(resolve => {
      const { roles, menu } = user.state

      let accessedRoutes = getOwnRoutes(menu,roles)

      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
  })
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      console.log(accessedRoutes)

      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
