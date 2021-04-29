import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import User from '../views/sys/User.vue'
import Role from '../views/sys/Role.vue'
import Menu from '../views/sys/Menu.vue'

import axios from "../axios";
import store from "../store"
import el from "element-ui/src/locale/lang/el";

/*
Router： WebApp的链接路径管理系统，简单就是建立起url和页面之间的映射关系
 */

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		children: [
			{	//页面添加到children 下 作为Home的一部分
				path: '/index',
				name: 'Index',
				meta: {
					title: "首页"
				},
				component: Index
			},
			{
				path: '/userCenter',
				name: 'UserCenter',
				meta: {
					title: "个人中心"
				},
				component: () => import('@/views/UserCenter.vue')
			},
			/*{
				path: '/sys/users',  //与数据库中menu linkUrl相关
				name: 'SysUser',
				component: User
			},
			{
				path: '/sys/roles',
				name: 'SysRole',
				component: Role
			},
			{
				path: '/sys/menus',
				name: 'SysMenu',
				component: Menu
			},*/
		]
	},

	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/Login.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

//前缀拦截
//在路由到页面之前我们可以做一些判断或者加载数据
router.beforeEach((to, from, next) => {

	let hasRoute = store.state.menus.hasRoutes

	let token = localStorage.getItem("token")
	//登录请求放行
	if (to.path == '/login') {
		next()
	//没有token 跳转登录
	} else if (!token) {
		next({path: '/login'})

	//配置动态菜单
	} else if(token && !hasRoute) {

		//用于处理动态菜单！！！！

		axios.get("/menu/nav", {
			headers: {
				Authorization: localStorage.getItem("token")
			}
		}).then(res => {

			console.log(res.data.data)

			// 拿到menuList
			store.commit("setMenuList", res.data.data.nav)

			// 拿到用户权限
			store.commit("setPermList", res.data.data.authoritys)

			console.log(store.state.menus.menuList)

			// 动态绑定路由
			let newRoutes = router.options.routes

			res.data.data.nav.forEach(menu => {
				if (menu.children) {
					menu.children.forEach(e => {

						// 转成路由
						let route = menuToRoute(e)

						// 吧路由添加到路由管理中
						if (route) {
							newRoutes[0].children.push(route)
						}

					})
				}
			})

			console.log("newRoutes")
			console.log(newRoutes)
			router.addRoutes(newRoutes)

			hasRoute = true
			store.commit("changeRouteStatus", hasRoute)
		})
	}



	next()
})


// 导航转成路由
const menuToRoute = (menu) => {

	if (!menu.component) {
		return null
	}

	let route = {
		name: menu.name,
		path: menu.path,
		meta: {
			icon: menu.icon,
			title: menu.name
		}
	}
	route.component = () => import('@/views/' + menu.component +'.vue')

	return route
}

export default router
