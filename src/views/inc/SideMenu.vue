<template>
	<el-menu
			:default-active="this.$store.state.menus.editableTabsValue"
			class="el-menu-vertical-demo"
			background-color="#545c64"
			text-color="#fff"
			active-text-color="#ffd04b">


		<router-link to="/index">
			<el-menu-item index="Index"  @click="selectMenu({name: 'Index', title: '首页'})">
				<template slot="title">
					<i class="el-icon-s-home"></i>
					<span slot="title">首页</span>
				</template>
			</el-menu-item>
		</router-link>


		<el-submenu :index="menu.name" v-for="menu in menuList">
			<!--动态菜单名字-->
			<template slot="title">
				<i class="el-icon-menu"></i>
				<span>{{menu.name}}</span>
			</template>


			<!--动态菜单链接-->
			<router-link :to="item.linkUrl" v-for="item in menu.children">
				<el-menu-item :index="item.name" @click="selectMenu(item)">
					<template slot="title">
						<i class="el-icon-edit"></i>
						<span slot="title">{{item.name}}</span>
					</template>
				</el-menu-item>
			</router-link>

		</el-submenu>

	</el-menu>
</template>



<script>
	export default {
		name: "SideMenu",
		data() {
			return {

			}
		},
		computed:  {
			menuList: {
				get() {
					return this.$store.state.menus.menuList
				}
			}
		},
		methods: {
			selectMenu(item) {
				this.$store.commit("addTab", item)
			}
		}
	}
</script>

<style scoped>
	.el-menu-vertical-demo {
		height: 100%;
	}
</style>