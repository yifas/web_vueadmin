<template>
    <div>
        <el-form :inline="true">
            <!--搜索框-->
            <el-form-item>
                <el-input v-model="pagination.queryString" placeholder="用户名 / 电话" clearable ></el-input>
            </el-form-item>

            <el-form-item>
                <el-button @click="buttonFindPage()">搜索</el-button>
            </el-form-item>

            <el-form-item>
<!--                <el-button type="primary" @click="dialogVisible = true" v-if="hasAuth('sys:user:save')">新增</el-button>-->
                <el-button type="primary" @click="handleAdd" >新增</el-button>
            </el-form-item>

            <el-form-item>
                <el-button type="success" @click="showAll">全部显示</el-button>
            </el-form-item>

            <el-form-item>
                <el-popconfirm title="这是确定批量删除吗？" @confirm="delHandle(null)">
                    <el-button type="danger" slot="reference" :disabled="delBtlStatu" v-if="hasAuth('sys:user:delete')">
                        批量删除
                    </el-button>
                </el-popconfirm>
            </el-form-item>
        </el-form>





        <!--表单-->

        <el-table size="small" current-row-key="id" :data="dataList" stripe highlight-current-row>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" align="center" width="55" label="序号"></el-table-column>
            <el-table-column prop="username" label="用户名" align="center"></el-table-column>
            <el-table-column prop="gender" label="性别" align="center"></el-table-column>

            <el-table-column prop="telephone" label="手机号" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
          <!--  <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>-->
            <el-table-column
                    prop="icon"
                    width="260px"
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
                    <el-button size="mini" type="success" @click="roleHandle(scope.row.id)">分配角色</el-button>


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
<!--

        <el-table
                ref="multipleTable"
                :data="dataList"
                tooltip-effect="dark"
                style="width: 100%"
                border
                stripe
                @selection-change="handleSelectionChange">

            &lt;!&ndash;多选框&ndash;&gt;
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>

          &lt;!&ndash;  <el-table-column
                    label="头像"
                    width="50">
                <template slot-scope="scope">
                    <el-avatar size="small" :src="scope.row.avatar"></el-avatar>
                </template>
            </el-table-column>&ndash;&gt;
            &lt;!&ndash;用户名&ndash;&gt;
            <el-table-column
                    prop="username"
                    label="用户名"
                    width="120">
            </el-table-column>

           &lt;!&ndash; <el-table-column
                    prop="code"
                    label="角色名称">
                <template slot-scope="scope">
                    <el-tag size="small" type="info" v-for="item in scope.row.sysRoles">{{item.name}}</el-tag>
                </template>

            </el-table-column>&ndash;&gt;
            <el-table-column      prop="gender" label="性别" align="center">

            </el-table-column>


            &lt;!&ndash;<el-table-column
                    prop="email"
                    label="邮箱">
            </el-table-column>&ndash;&gt;
            <el-table-column
                    prop="telephone"
                    label="手机号">
            </el-table-column>

            <el-table-column
                    prop="station"
                    label="状态">
                <template slot-scope="scope">
                    <el-tag size="small" v-if="scope.row.station === 1" type="success">正常</el-tag>
                    <el-tag size="small" v-else-if="scope.row.station === 0" type="danger">禁用</el-tag>
                </template>

            </el-table-column>
            <el-table-column
                    prop="createTime"
                    width="200"
                    label="创建时间"
            >
            </el-table-column>

            <el-table-column
                    prop="icon"
                    width="260px"
                    label="操作">

                <template slot-scope="scope">
                    <el-button type="text" @click="roleHandle(scope.row.id)">分配角色</el-button>
                    <el-divider direction="vertical"></el-divider>

                    <el-button type="text" @click="repassHandle(scope.row.id, scope.row.username)">重置密码</el-button>
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
        </el-table>
-->





    <!--    <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes, prev, pager, next, jumper"
                :page-sizes="[10, 20, 50, 100]"
                :current-page="current"
                :page-size="size"
                :total="total">
        </el-pagination>
-->

        <!--新增对话框
        addFormRules 前端校验待添加
        -->
        <el-dialog
                title="添加用户"
                :visible.sync="dialog4addVisible"
                width="600px"
                :before-close="handleClose">

            <el-form :model="addForm" :rules="addFormRules" ref="addForm">
                <el-form-item label="用户名" prop="username" label-width="100px">
                    <el-input v-model="addForm.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password" label-width="100px">
                    <el-input v-model="addForm.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="性别" prop="gender" label-width="100px">
                    <el-radio-group v-model="addForm.gender">
                        <el-radio :label="0">男</el-radio>
                        <el-radio :label="1">女</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="手机号" prop="telephone" label-width="100px">
                    <el-input v-model="addForm.telephone" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="生日" prop="birthday" label-width="100px">
                    <el-date-picker
                            v-model="addForm.birthday"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="状态" prop="station" label-width="100px">
                    <el-radio-group v-model="addForm.station">
                        <el-radio :label="1">正常</el-radio>
                        <el-radio :label="0">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('addForm')">取 消</el-button>
                <el-button type="primary" @click="submitAddForm('addForm')">确 定</el-button>
            </div>
        </el-dialog>



        <!--编辑对话框-->
        <el-dialog
                title="修改用户信息"
                :visible.sync="dialogVisible"
                width="600px"
                :before-close="handleClose">

            <el-form :model="editForm" :rules="editFormRules" ref="editForm">
                <el-form-item label="用户名" prop="username" label-width="100px">
                    <el-input v-model="editForm.username" autocomplete="off"></el-input>

                </el-form-item>


                <el-form-item label="性别" prop="gender" label-width="100px">
                    <el-radio-group v-model="editForm.gender">
                        <el-radio :label="0">男</el-radio>
                        <el-radio :label="1">女</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="手机号" prop="telephone" label-width="100px">
                    <el-input v-model="editForm.telephone" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="登陆时间" prop="loginTime" label-width="100px">
                    <el-input v-model="editForm.loginTime" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="状态" prop="station" label-width="100px">
                    <el-radio-group v-model="editForm.station">
                        <el-radio :label="1">正常</el-radio>
                        <el-radio :label="0">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('editForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
            </div>
        </el-dialog>



        <!-- 分配权限对话框 -->
        <el-dialog title="分配角色" v-model="tempId" :visible.sync="roleDialogFormVisible" width="600px">
<!--
            <table>

                <tr v-for="c in roleData" v-model="roleIds">
                    <td>
                        &lt;!&ndash;复选框&ndash;&gt;
                        <input :id="c.id"  type="checkbox"  :value="c.id">
                    </td>
                    &lt;!&ndash;数据&ndash;&gt;
                    <td><label :for="c.id">{{c.name}}</label></td>
                </tr>
   :default-expanded-keys="[2, 3]"
                        :default-checked-keys="[5]"
            </table>-->

                <el-tree
                        :data="roleData"
                        ref="roleTree"
                        show-checkbox
                        :default-checked-keys="roleIds"
                        node-key="id"
                        :default-expand-all=true
                        :props="defaultProps">
                </el-tree>


            <div slot="footer" class="dialog-footer">
                <el-button @click="roleDialogFormVisible=false">取 消</el-button>
                <el-button type="primary" @click="submitRoleHandle(tempId)">确 定</el-button>
            </div>
        </el-dialog>



    </div>
</template>

<script>
    export default {
        name: "User",
        data() {
            return {
                delBtlStatu: true,

                pagination: {//分页相关模型数据
                    currentPage: 1,//当前页码
                    pageSize: 5,//每页显示的记录数
                    total: 0,//总记录数
                    queryString: null//查询条件
                },
                dataList: [],//当前页要展示的分页列表数据
                addForm:{},//新增表单
                editForm: {},//编辑表单
                roleIds:[], //当前角色信息
                roleData: [], //所有角色信息
                tempId: [], //分配角色时传递用户ID
                editFormRules: {
                    username: [
                        {required: true, message: '请输入用户名称', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    telephone: [
                        {min: 11, max: 11 ,required: true, message: '请输入手机号', trigger: 'blur'}
                    ],
                    station: [
                        {required: true, message: '请选择状态', trigger: 'blur'}
                    ]
                },
                addFormRules: {
                    username: [
                        {required: true, message: '请输入用户名称', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    telephone: [
                        {min: 11, max: 11 ,required: true, message: '请输入手机号', trigger: 'blur'}
                    ],
                    station: [
                        {required: true, message: '请选择状态', trigger: 'blur'}
                    ]
                },


                multipleSelection: [],

                dialogVisible: false,
                dialog4addVisible: false,
                roleDialogFormVisible: false,
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },

            }
        },
        created() {
            this.getUserList()

            /*this.$axios.get("/sys/role/list").then(res => {
                this.roleTreeData = res.data.data.records
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
            /*
                        handleSizeChange(val) {
                            console.log(`每页 ${val} 条`);
                            this.size = val
                            this.getUserList()
                        },
                     handleCurrentChange(val) {
                            console.log(`当前页: ${val}`);
                            this.current = val
                            this.getUserList()
                        },
            */
            //切换页码
            handleCurrentChange(currentPage) {
                //也要触发分页查询
                //将当前页参数设置给后台
                this.pagination.currentPage = currentPage;
                this.getUserList();
            },
            resetForm() {
                this.$refs['editForm']={};
                this.dialogVisible = false;
                this.dialog4addVisible = false;
                this.editForm = {}
            },
            handleClose() {
                this.resetForm('editForm')
            },

            buttonFindPage(){
                this.pagination.currentPage = 1;
                this.getUserList();
            },
            getUserList() {
                //分页参数
                let param = {
                    currentPage: this.pagination.currentPage,//页码
                    pageSize: this.pagination.pageSize,//每页显示的记录数
                    queryString: this.pagination.queryString//查询条件
                };
                this.$axios.post("/user/findUserList",param).then(resp => {
                    this.pagination.total = resp.data.data.total;
                    this.dataList = resp.data.data.rows;
                    console.log("=======================>"+resp.data.data.rows)
                    //alert(resp.data.rows);

                });
            },
            showAll(){  //全部显示
                this.pagination.currentPage = 1;
                this.pagination.queryString=null;
                this.getUserList();

            },
            submitForm() {   //更新
                this.$refs['editForm'].validate((valid) => {
                    if (valid) {
                        this.$axios.put('/user/updateUser/' + this.editForm.id, this.editForm)
                            .then(res => {

                                this.$message({
                                    showClose: true,
                                    message: '修改成功',
                                    type: 'success',
                                    onClose: () => {
                                        this.getUserList()
                                    }
                                });

                                this.dialogVisible = false
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleAdd(){
                this.addForm={};
                this.dialog4addVisible = true;

            },
            submitAddForm(){//新增
                this.$refs['addForm'].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/user/register/' , this.addForm)
                            .then(res => {

                                this.$message({
                                    showClose: true,
                                    message: '新用户添加成功',
                                    type: 'success',
                                    onClose: () => {
                                        this.getUserList()
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

            editHandle(id) {
                this.$axios.get('/user/findUserById/' + id).then(res => {
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

                this.$axios.post("/sys/user/delete", ids).then(res => {
                    this.$message({
                        showClose: true,
                        message: '恭喜你，操作成功',
                        type: 'success',
                        onClose: () => {
                            this.getUserList()
                        }
                    });
                })
            },

            roleHandle(id) { //分配角色
                this.roleDialogFormVisible = true;
                //点击分配角色 先置空
                this.tempId=[];
                //将id传递给提交分配角色时使用
                this.tempId.push(id);
                /*
                    两次异步请求
                    1.获取所有角色
                    2.获得当前用户角色（数据回显）
                    3.roleIds 数据绑定
                    4.确定按钮 click事件  post请求 用户ID  roleIds
                 */

                this.$axios.get('/role').then(resp =>{
                    this.roleData = resp.data.data;
                        //获得当前用户角色
                        this.$axios.get('/role/findRoleById/' + id).then(res => {
                            //this.roleForm = res.data.data;

                            let roleIds=[];
                            //alert(res.data.data[0].id)
                            res.data.data.forEach(item =>{
                                if (item!=null) {
                                    roleIds.push(item.id)
                                }
                            });
                            //将对应的角色信息绑定到Tree菜单
                            this.$refs.roleTree.setCheckedKeys(roleIds)
                            console.log(roleIds);

                        });

                    });



            },
            submitRoleHandle(id) {

                console.log("====>"+id);
                //this.tempId=[];
                let roleIds = this.$refs.roleTree.getCheckedKeys();
                console.log("====>"+roleIds);

                //如果用户未分配角色 id 会报错
                this.$axios.post('/role/updateRole/'+id, roleIds).then(res => {

                    this.$message({
                        showClose: true,
                        message: '恭喜你，操作成功',
                        type: 'success',
                        onClose: () => {
                            this.getUserList()
                        }
                    });

                    this.roleDialogFormVisible = false
                })


            },
            repassHandle(id, username) {

                this.$confirm('将重置用户【' + username + '】的密码, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post("/sys/user/repass", id).then(res => {
                        this.$message({
                            showClose: true,
                            message: '恭喜你，操作成功',
                            type: 'success',
                            onClose: () => {
                            }
                        });
                    })
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