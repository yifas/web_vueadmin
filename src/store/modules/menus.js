import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
	state: {
		// 菜单栏数据
		menuList: [],
		// 权限数据
		permList: [],
		//hasRoute来动态判断是否已经加载过菜单
		hasRoutes: false,

		//Tabs的内容
		editableTabsValue: 'Index',
		editableTabs: [{
			title: '首页',
			name: 'Index',
		}]
	},
	mutations: {
		setMenuList(state, menus) {
			state.menuList = menus
		},
		setPermList(state, perms) {
			state.permList = perms
		},
		changeRouteStatus(state, hasRoutes) {
			state.hasRoutes = hasRoutes
		},

		addTab(state, tab) {

			let index = state.editableTabs.findIndex(e => e.name === tab.name)

			if (index === -1) {
				state.editableTabs.push({
					title: tab.title,
					name: tab.name,
				});
			}

			state.editableTabsValue = tab.name;
		},

		resetState: (state) => {
			state.menuList = []
			state.permList = []

			state.hasRoutes = false
			state.editableTabsValue = 'Index'
			state.editableTabs = [{
				title: '首页',
				name: 'Index',
			}]
		}

	},
	actions: {
	},

}