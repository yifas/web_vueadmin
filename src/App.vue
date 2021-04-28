<template>
	<div id="app">
		<!--路由匹配到页面 并渲染-->
		<router-view/>
	</div>
</template>

<script>
	export default {
		name: "App",
		watch: {
			$route(to, from) {

				console.log("to")
				console.log(to)

				if (to.path != '/login') {
					let obj = {
						name: to.name,
						title: to.meta.title
					}

					this.$store.commit("addTab", obj)
				}

			}
		}
	}

</script>

<!--调整全局的样式-->


<style>
	html, body, #app {
		font-family: 'Helvetica Neue', 'Hiragino Sans GB', 'WenQuanYi Micro Hei', 'Microsoft Yahei', sans-serif;
		height: 100%;
		padding: 0;
		margin: 0;
		font-size: 15px;
	}
</style>
