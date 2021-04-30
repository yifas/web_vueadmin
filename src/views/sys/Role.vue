<template>
	<div>
		<el-form :inline="true">
			<!--搜索框-->
			<el-form-item>
				<el-input v-model="pagination.queryString" placeholder="角色名称" clearable ></el-input>
			</el-form-item>

			<el-form-item>
				<el-button @click="buttonFindPage">搜索</el-button>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="handleAdd">新增</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="success" @click="showAll">全部显示</el-button>
			</el-form-item>
			<el-form-item>
				<el-popconfirm title="这是确定批量删除吗？" @confirm="delHandle(null)">
					<el-button type="danger" slot="reference" :disabled="delBtlStatu">批量删除</el-button>
				</el-popconfirm>
			</el-form-item>
		</el-form>




		<!--<el-table
				ref="multipleTable"
				:data="tableData"
				tooltip-effect="dark"
				style="width: 100%"
				border
				stripe
				@selection-change="handleSelectionChange">

			<el-table-column
					type="selection"
					width="55">
			</el-table-column>

			<el-table-column
					prop="name"
					label="名称"
					width="120">
			</el-table-column>
			<el-table-column
					prop="code"
					label="唯一编码"
					show-overflow-tooltip>
			</el-table-column>
			<el-table-column
					prop="remark"
					label="描述"
					show-overflow-tooltip>
			</el-table-column>

			<el-table-column
					prop="statu"
					label="状态">
				<template slot-scope="scope">
					<el-tag size="small" v-if="scope.row.statu === 1" type="success">正常</el-tag>
					<el-tag size="small" v-else-if="scope.row.statu === 0" type="danger">禁用</el-tag>
				</template>

			</el-table-column>
			<el-table-column
					prop="icon"
					label="操作">

				<template slot-scope="scope">
					<el-button type="text" @click="permHandle(scope.row.id)">分配权限</el-button>
					<el-divider direction="vertical"></el-divider>

					<el-button type="text" @click="editHandle(scope.row.id)">编辑</el-button>
					<el-divider direction="vertical"></el-divider>

					<template>
						<el-popconfirm title="这是一段内容确定删除吗？" @confirm="delHandle(scope.row.id)">
							<el-button type="text" slot="reference">删除</el-button>
						</el-popconfirm>
					</template>

				</template>
			</el-table-column>

		</el-table>-->


		<el-table size="small" current-row-key="id" :data="dataList" stripe highlight-current-row>
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="id" align="center" width="55" label="序号"></el-table-column>
			<el-table-column prop="name" label="角色名" align="center"></el-table-column>
			<el-table-column prop="keyword" label="关键字" align="center"></el-table-column>

			<el-table-column prop="description" label="描述信息" align="center"></el-table-column>

			<el-table-column
					prop="icon"
					width="auto"
					label="操作"
					align="center">

				<template slot-scope="scope">

					<!--  <el-button type="text" @click="repassHandle(scope.row.id, scope.row.username)">重置密码</el-button>
                      <el-divider direction="vertical"></el-divider>-->

					<el-button size="mini" type="primary" @click="editHandle(scope.row.id)">编辑</el-button>
					<el-divider direction="vertical"></el-divider>

					<template>
						<el-popconfirm title="这是一段内容确定删除吗？" @confirm="delHandle(scope.row.id)">
							<el-button size="mini" type="danger" slot="reference">删除</el-button>
						</el-popconfirm>
					</template>
					<el-divider direction="vertical"></el-divider>
					<el-button size="mini" type="warning" @click="permHandle(scope.row.id)">分配权限</el-button>

					<el-divider direction="vertical"></el-divider>
					<el-button size="mini" type="success" @click="menuHandle(scope.row.id)">分配菜单</el-button>


				</template>
			</el-table-column>
		</el-table>





		<div class="pagination-container">
			<el-pagination
					class="pagiantion"
					@current-change="handleCurrentChange"
					:current-page="pagination.currentPage"
					:page-size="pagination.pageSize"
					layout="total, prev, pager, next, jumper"
					:total="pagination.total">
			</el-pagination>
		</div>


		<!--新增对话框-->
		<el-dialog
				title="新增角色信息"
				:visible.sync="dialog4addVisible"
				width="600px"
				:before-close="handleClose">

			<el-form :model="addForm" :rules="addFormRules" ref="addForm" label-width="100px" class="demo-editForm">

				<!--<el-form-item label="序号" prop="id" label-width="100px">
					<el-input v-model="addForm.id" autocomplete="off"></el-input>
				</el-form-item>-->

				<el-form-item label="角色名" prop="name" label-width="100px">
					<el-input v-model="addForm.name" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="关键字" prop="keyword" label-width="100px">
					<el-input v-model="addForm.keyword" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述信息" prop="description" label-width="100px">
					<el-input v-model="addForm.description" autocomplete="off"></el-input>
				</el-form-item>

			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm('addForm')">取 消</el-button>
				<el-button type="primary" @click="submitAddForm('addForm')">确 定</el-button>
			</div>
		</el-dialog>



		<!--编辑对话框-->
		<el-dialog
				title="编辑角色信息"
				:visible.sync="dialogVisible"
				width="600px"
				:before-close="handleClose">

			<el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px" class="demo-editForm">

				<el-form-item label="序号" prop="id" label-width="100px">
					<label>{{editForm.id}}</label>
<!--					<el-input v-model="editForm.id" autocomplete="off" disabled="true"></el-input>-->
				</el-form-item>

				<el-form-item label="角色名" prop="name" label-width="100px">
					<el-input v-model="editForm.name" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="关键字" prop="keyword" label-width="100px">
					<el-input v-model="editForm.keyword" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述信息" prop="description" label-width="100px">
					<el-input v-model="editForm.description" autocomplete="off"></el-input>
				</el-form-item>

			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm('editForm')">取 消</el-button>
				<el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
			</div>
		</el-dialog>



<!--
		<el-dialog
				title="分配权限"
				:visible.sync="permDialogVisible"
				width="600px">

			<el-form :model="permForm">

				<el-tree
						:data="permTreeData"
						show-checkbox
						ref="permTree"
						:default-expand-all=true
						node-key="id"
						:check-strictly=true
						:props="defaultProps">
				</el-tree>

			</el-form>

			<span slot="footer" class="dialog-footer">
			    <el-button @click="permDialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="submitPermFormHandle('permForm')">确 定</el-button>
			</span>

		</el-dialog>-->



		<!-- 分配权限对话框 -->
		<el-dialog title="分配权限" v-model="tempId" :visible.sync="permDialogFormVisible" width="600px">

			<el-tree
					:data="permData"
					ref="permTree"
					show-checkbox
					:default-checked-keys="permIds"
					node-key="id"
					:default-expand-all=true
					:props="defaultProps">
			</el-tree>


			<div slot="footer" class="dialog-footer">
				<el-button @click="permDialogFormVisible=false">取 消</el-button>
				<el-button type="primary" @click="submitPermFormHandle(tempId)">确 定</el-button>
			</div>
		</el-dialog>




		<!-- 分配菜单对话框 -->
		<el-dialog title="分配菜单" v-model="tempId" :visible.sync="menuDialogFormVisible" width="600px">

			<el-tree
					:data="menuData"
					ref="menuTree"
					show-checkbox
					:default-checked-keys="menuIds"
					node-key="id"
					:default-expand-all=true
					:props="defaultProps">
			</el-tree>


			<div slot="footer" class="dialog-footer">
				<el-button @click="menuDialogFormVisible=false">取 消</el-button>
				<el-button type="primary" @click="submitMenuFormHandle(tempId)">确 定</el-button>
			</div>
		</el-dialog>








	</div>
</template>

<script>
	export default {
		name: "Role",
		data() {
			return {
				delBtlStatu: true,
				pagination: {//分页相关模型数据
					currentPage: 1,//当前页码
					pageSize: 3,//每页显示的记录数
					total: 0,//总记录数
					queryString: null//查询条件
				},
				dataList:[],
				dialogVisible: false,
				dialog4addVisible: false,
				permDialogFormVisible: false,
				menuDialogFormVisible: false,
				editForm: {},
				addForm:{},
				permData: [], //所有权限数据
				permIds: [],//权限数组
				menuData: [],//所有菜单数据
				menuIds: [],//菜单数组
				tempId: [], //分配Menu Permission时传递用户ID
				editFormRules: {
					name: [
						{required: true, message: '请输入角色名称', trigger: 'blur'}
					],
					keyword: [
						{required: true, message: '请输入关键字', trigger: 'blur'}
					]
				},
				addFormRules: {
					name: [
						{required: true, message: '请输入角色名称', trigger: 'blur'}
					],
					keyword: [
						{required: true, message: '请输入关键字', trigger: 'blur'}
					]
				},
				multipleSelection: [],
				defaultProps: { //Tree 树形控件的配置  label=‘name’
					children: 'children',
					label: 'name'
				}
			}
		},
		created() {
			this.getRoleList()

			/*this.$axios.get('/sys/menu/list').then(res => {
				this.permTreeData = res.data.data
			})*/
		},
		methods: {
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				console.log("勾选")
				console.log(val)
				this.multipleSelection = val;

				this.delBtlStatu = val.length == 0
			},

			handleAdd(){  //新增按钮
				this.addForm={};
				this.dialog4addVisible = true;

			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.dialogVisible = false;
				this.dialog4addVisible = false;
				this.editForm = {}
			},
			handleClose() {
				this.resetForm('editForm')
			},

			getRoleList() {
				//分页参数
				let param = {
					currentPage: this.pagination.currentPage,//页码
					pageSize: this.pagination.pageSize,//每页显示的记录数
					queryString: this.pagination.queryString//查询条件
				};
				this.$axios.post("/role/findAllRole",param).then(resp => {
					this.pagination.total = resp.data.data.total;
					this.dataList = resp.data.data.rows;
					console.log("=======================>"+resp.data.data.rows)
					//alert(resp.data.rows);

				});
			},
			showAll(){  //全部显示
				this.pagination.currentPage = 1;
				this.pagination.queryString=null;
				this.getRoleList();

			},
			//切换页码
			handleCurrentChange(currentPage) {
				//也要触发分页查询
				//将当前页参数设置给后台
				this.pagination.currentPage = currentPage;
				this.getRoleList();
			},
			buttonFindPage(){
				this.pagination.currentPage = 1;
				this.getRoleList();
			},
			submitAddForm(){ //新增角色
				this.$refs['addForm'].validate((valid) => {
					if (valid) {
						this.$axios.post('/role/addRole/' , this.addForm)
								.then(res => {

									this.$message({
										showClose: true,
										message: '新用户添加成功',
										type: 'success',
										onClose: () => {
											this.getRoleList()
										}
									});

									this.dialog4addVisible = false;
								})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			submitForm() { //编辑角色
				this.$refs['editForm'].validate((valid) => {
					if (valid) {
						this.$axios.post('/role/updateRoleInfo/' + this.editForm.id, this.editForm)
							.then(res => {

								this.$message({
									showClose: true,
									message: '恭喜你，操作成功',
									type: 'success',
									onClose:() => {
										this.getRoleList()
									}
								});

								this.dialogVisible = false;
							})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			editHandle(id) { //角色信息回显

				this.$axios.get('/role/findRoleByRoleId/' + id).then(res => {
					this.editForm = res.data.data

					this.dialogVisible = true
				})
			},
			delHandle(id) {

				var ids = []

				if (id) {
					ids.push(id)
				} else {
					this.multipleSelection.forEach(row => {
						ids.push(row.id)
					})
				}

				console.log(ids)

				this.$axios.post("/sys/role/delete", ids).then(res => {
					this.$message({
						showClose: true,
						message: '恭喜你，操作成功',
						type: 'success',
						onClose:() => {
							this.getRoleList()
						}
					});
				})
			},
			menuHandle(id){ //菜单回显
				this.menuDialogFormVisible = true;
				//点击分配角色 先置空
				this.tempId=[];
				//将id传递给提交分配角色时使用
				this.tempId.push(id);

				this.$axios.get('/menu/findMenuListTree').then(resp =>{

					this.menuData = resp.data.data;
					console.log("===================>"+resp.data.data);


					this.$axios.get("/menu/findMenuListByRoleId/" + id).then(res => {

						let menuIds=[];
						//alert(res.data.data[0].id)
						res.data.data.forEach(item =>{
							if (item!=null) {
								menuIds.push(item.id)
							}
						});
						/*
							Tree菜单数据回显存在问题
							将父级ID传过来选中后 会把菜单全选
							但是保存到数据库的时候是要携带父级ID的【用于动态菜单拿的生成】
							[解决办法]
							后端不传父级ID  SysMenuDao.xml->findMenuListByRoleId
						 */
						//将对应的角色信息绑定到Tree菜单
						this.$refs.menuTree.setCheckedKeys(menuIds);

						console.log(menuIds);

					});

				});

			},
			submitMenuFormHandle(id) {  //确定 分配菜单

				console.log("====>"+id);
				//this.tempId=[];
				let menuIds=[];
				/*
					为了动态菜单的生成 需要将父级Id也同时传入后端
				 */
				//获取tree中父节点
				let temp = this.$refs.menuTree.getCheckedNodes(false, true);
				temp.forEach(item =>{
					if (item!=null) {
						menuIds.push(item.id)
					}
				});
				//let menuIds = this.$refs.menuTree.getCheckedKeys();
				//let menuIds =this.$refs.menuTree.getCheckedNodes(false, true);
				console.log("====>"+menuIds);

				//如果用户未分配角色 id 会报错
				this.$axios.post('/menu/updateRoleMenu/'+id, menuIds).then(res => {

					this.$message({
						showClose: true,
						message: '分配权限操作成功',
						type: 'success',
						onClose: () => {
							this.getRoleList();
						}
					});

					this.menuDialogFormVisible = false;
				})
			},
			permHandle(id) { //权限回显
				this.permDialogFormVisible = true;
				//点击分配角色 先置空
				this.tempId=[];
				//将id传递给提交分配角色时使用
				this.tempId.push(id);

				this.$axios.get('/perm/findPermListTree').then(resp =>{

					this.permData = resp.data.data;
					console.log("===================>"+resp.data.data);

					//
					this.$axios.get("/perm/findPermListByRoleId/" + id).then(res => {

						let permIds=[];
						//alert(res.data.data[0].id)
						res.data.data.forEach(item =>{
							if (item!=null) {
								permIds.push(item.id)
							}
						});
						//将对应的角色信息绑定到Tree菜单
						this.$refs.permTree.setCheckedKeys(permIds);
						console.log(permIds);

					});

				});

			},
			submitPermFormHandle(id) {  //确定 分配权限

				console.log("====>"+id);
				//this.tempId=[];
				let permIds = this.$refs.permTree.getCheckedKeys();
				console.log("====>"+permIds);

				//如果用户未分配角色 id 会报错
				this.$axios.post('/perm/updateRolePerm/'+id, permIds).then(res => {

					this.$message({
						showClose: true,
						message: '分配权限操作成功',
						type: 'success',
						onClose: () => {
							this.getRoleList();
						}
					});

					this.permDialogFormVisible = false;
				})
			}






		}
	}
</script>

<style scoped>

	.el-pagination {
		float: right;
		margin-top: 22px;
	}

</style>