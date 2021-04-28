import Vue from 'vue'
import Vuex from 'vuex'
import menus from "./modules/menus"; //导入菜单store

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token: ''

	},
	mutations: {
		//获取到的jwt就可以存储到应用的store以及localStorage中
		SET_TOKEN: (state, token) => {
			state.token = token

			localStorage.setItem("token", token)
		},


	},
	actions: {},
	modules: {
		menus
	}
})
