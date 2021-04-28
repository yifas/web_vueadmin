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
				<el-button type="primary" @click="dialogVisible = true">新增</el-button>
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
					<el-button size="mini" type="success" @click="roleHandle(scope.row.id)">分配权限</el-button>


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


		<!--编辑对话框-->
		<el-dialog
				title="编辑角色信息"
				:visible.sync="dialogVisible"
				width="600px"
				:before-close="handleClose">

			<el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px" class="demo-editForm">

				<el-form-item label="序号" prop="id" label-width="100px">
					<el-input v-model="editForm.id" autocomplete="off"></el-input>
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

		</el-dialog>

	</div>
</template>

<script>
	export default {
		name: "Role",
		data() {
			return {
				searchForm: {},

				delBtlStatu: true,
				pagination: {//分页相关模型数据
					currentPage: 1,//当前页码
					pageSize: 3,//每页显示的记录数
					total: 0,//总记录数
					queryString: null//查询条件
				},
				total: 0,
				size: 10,
				current: 1,
				dataList:[],
				dialogVisible: false,
				editForm: {},

				tableData: [],

				editFormRules: {
					name: [
						{required: true, message: '请输入角色名称', trigger: 'blur'}
					],
					code: [
						{required: true, message: '请输入唯一编码', trigger: 'blur'}
					],
					statu: [
						{required: true, message: '请选择状态', trigger: 'blur'}
					]
				},

				multipleSelection: [],

				permDialogVisible: false,
				permForm: {},
				defaultProps: {
					children: 'children',
					label: 'name'
				},
				permTreeData: []
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

			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.size = val
				this.getRoleList()
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.current = val
				this.getRoleList()
			},

			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.dialogVisible = false
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
			submitForm() {
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
			permHandle(id) {
				this.permDialogVisible = true

				this.$axios.get("/sys/role/info/" + id).then(res => {

					this.$refs.permTree.setCheckedKeys(res.data.data.menuIds)
					this.permForm = res.data.data
				})
			},

			submitPermFormHandle(formName) {
				var menuIds = this.$refs.permTree.getCheckedKeys()

				console.log(menuIds)

				this.$axios.post('/sys/role/perm/' + this.permForm.id, menuIds).then(res => {
					this.$message({
						showClose: true,
						message: '恭喜你，操作成功',
						type: 'success',
						onClose:() => {
							this.getRoleList()
						}
					});
					this.permDialogVisible = false
					this.resetForm(formName)
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