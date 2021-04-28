<template>

	<el-container>
		<el-container>

		<!--
			<el-header>
				<div class="header-avatar">
&lt;!&ndash;					{{userInfo}}&ndash;&gt;
&lt;!&ndash;					<el-avatar size="medium" :src="userInfo.avatar"></el-avatar>&ndash;&gt;

					<el-dropdown>
						<span class="el-dropdown-link">
						{{userInfo.username}}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>
								<router-link :to="{name: 'UserCenter'}">个人中心</router-link>
							</el-dropdown-item>
							<el-dropdown-item @click.native="logout">退出</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>

					&lt;!&ndash;<el-link href="https://markerhub.com" target="_blank">网站</el-link>
					<el-link href="https://space.bilibili.com/13491144" target="_blank">B站</el-link>&ndash;&gt;
				</div>

			</el-header>-->



			<!-- 头部-->
			<el-header class="el-header">
				<el-container>
					<!--<div>
						<el-image src="src/assets/logo.png" class="header-img"></el-image>
					</div>-->
					<el-menu
							mode="horizontal"
							background-color="#545c64"
							text-color="white"
							active-text-color="#ffd04b"
							style="margin-left: auto;">
						<!--
						<el-menu
							:default-active="activeIndex2"
							mode="horizontal"
							@select="handleSelect"
							background-color="#545c64"
							text-color="white"
							active-text-color="#ffd04b"
							style="margin-left: auto;">-->


						<el-menu-item index="1">处理中心</el-menu-item>
						<el-submenu index="2">
							<template slot="title">我的工作台</template>
							<el-menu-item index="2-1">选项1</el-menu-item>
							<el-menu-item index="2-2">选项2</el-menu-item>
							<el-menu-item index="2-3">选项3</el-menu-item>
						</el-submenu>
						<el-menu-item index="3">{{userInfo.username}}</el-menu-item>
						<el-menu-item index="4"><a href="学生列表.html" target="_self">首页</a></el-menu-item>
					</el-menu>
				</el-container>
			</el-header>


			<el-container>

				<el-aside width="200px">
				<!--动态菜单-->
					<SideMenu></SideMenu>

				</el-aside>
				<!--主内容-->
				<el-main>
					<!--动态标签-->
					<Tabs></Tabs>
					<div style="margin: 0 15px;">
						<!--配置要显示的内容
							关联到 src/router/index.js 中的配置
							路由配置如下
							{
								path: '/sys/users',  //与数据库中menu linkUrl相关
								name: 'SysUser',
								component: User
							},
							如果请求路径中是/sys/users  那么显示的页面就是User.vue
						-->
						<router-view/>
					</div>
				</el-main>
			</el-container>


		</el-container>
	</el-container>


</template>

<!--
	提炼公共部分出来，放在Home.vue中 上面↑↑↑↑↑↑↑↑↑
-->

<script>
	//SideMenu.vue作为一个组件添加到Home.vue中
	import SideMenu from "./inc/SideMenu";
	import Tabs from "./inc/Tabs";

	export default {
		name: "Home",
		components: { //然后声明compoents，然后才能使用标签
			SideMenu, Tabs
		},
		data() {
			return {
				userInfo: {//用户信息
				}
			}
		},
		created() {
			this.getUserInfo()
		},
		methods: {
			getUserInfo() {
				//请求用户信息
				this.$axios.get("/auth/userInfo").then(res => {
					console.log(res.data.data);
					console.log(res.data);
					this.userInfo = res.data.data
				})
			},
			logout() {
				this.$axios.post("/logout").then(res => {
					localStorage.clear();
					sessionStorage.clear();

					this.$store.commit("resetState");
					//重定向到登陆页面
					this.$router.push("/login")
				})
			}
		}
	}
</script>

<style scoped>
	.el-container {
		padding: 0;
		margin: 0;
		height: 100%;
	}

	.header-avatar {
		float: right;
		width: 210px;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.el-dropdown-link {
		cursor: pointer;
	}

	.el-header {
		background-color: #545c64;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		line-height: 200px;
	}

	.el-main {
		color: #333;
		padding: 0;
	}

	a {
		text-decoration: none;
	}
</style>