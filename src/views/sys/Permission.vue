<template>
    <div>
        <el-form :inline="true">
            <!--搜索框-->
            <el-form-item>
                <el-input v-model="pagination.queryString" placeholder="权限名/ID" clearable ></el-input>
            </el-form-item>

            <el-form-item>
                <el-button @click="buttonFindPage()">搜索</el-button>
            </el-form-item>

            <el-form-item>
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
            <el-table-column prop="name" label="权限名" align="center"></el-table-column>
            <el-table-column prop="keyword" label="关键字" align="left"></el-table-column>

            <el-table-column prop="pid" label="父级ID" align="left"></el-table-column>
            <el-table-column prop="uri" label="资源路径" align="center"></el-table-column>
            <el-table-column prop="status" label="状态" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
            <el-table-column prop="description" label="描述信息" align="center"></el-table-column>

            <el-table-column
                    prop="icon"
                    width="auto"
                    label="操作"
                    align="center">

                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="editHandle(scope.row.id)">编辑</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <template>
                        <el-popconfirm title="这是一段内容确定删除吗？" @confirm="delHandle(scope.row.id)">
                            <el-button size="mini" type="danger" slot="reference">删除</el-button>
                        </el-popconfirm>
                    </template>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
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


        <!--新增对话框
        addFormRules 前端校验待添加
        -->
        <el-dialog
                title="添加权限"
                :visible.sync="dialog4addVisible"
                width="600px"
                :before-close="handleClose">

            <el-form :model="addForm" :rules="addFormRules" ref="addForm">
                <el-form-item label="权限名称" prop="name" label-width="100px">
                    <el-input v-model="addForm.name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="关键字" prop="keyword" label-width="100px">
                    <el-input v-model="addForm.keyword" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="父级ID" prop="pid" label-width="100px">
                    <el-input v-model="addForm.pid" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="资源路径" prop="uri" label-width="100px">
                    <el-input v-model="addForm.uri" autocomplete="off" ></el-input>
                </el-form-item>

                <el-form-item label="状态" prop="status" label-width="100px">
                    <el-input v-model="addForm.status" autocomplete="off" ></el-input>
                </el-form-item>

                <el-form-item label="描述信息" prop="description" label-width="100px">
                    <el-input v-model="addForm.description" autocomplete="off" ></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('addForm')">取 消</el-button>
                <el-button type="primary" @click="submitAddForm()">确 定</el-button>
            </div>
        </el-dialog>



        <!--编辑对话框-->
        <el-dialog
                title="修改权限信息"
                :visible.sync="dialogVisible"
                width="600px"
                :before-close="handleClose">

            <el-form :model="editForm" :rules="editFormRules" ref="editForm">
                <el-form-item label="权限名称" prop="name" label-width="100px">
                    <el-input v-model="editForm.name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="关键字" prop="keyword" label-width="100px">
                    <el-input v-model="editForm.keyword" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="父级ID" prop="pid" label-width="100px">
                    <el-input v-model="editForm.pid" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="资源路径" prop="uri" label-width="100px">
                    <el-input v-model="editForm.uri" autocomplete="off" ></el-input>
                </el-form-item>

                <el-form-item label="状态" prop="status" label-width="100px">
                    <el-input v-model="editForm.status" autocomplete="off" ></el-input>
                </el-form-item>

                <el-form-item label="描述信息" prop="description" label-width="100px">
                    <el-input v-model="editForm.description" autocomplete="off" ></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('editForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm()">确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
    export default {
        name: "Permission",
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

                editFormRules: {
                    name: [
                        {required: true, message: '请输入菜单名称', trigger: 'blur'}
                    ],

                },
                addFormRules: {
                    name: [
                        {required: true, message: '请输入菜单名称', trigger: 'blur'}
                    ],

                },

                multipleSelection: [],

                dialogVisible: false,
                dialog4addVisible: false,
                roleDialogFormVisible: false,

            }
        },
        created() {
            this.getMenuList()
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

            //切换页码
            handleCurrentChange(currentPage) {
                //也要触发分页查询
                //将当前页参数设置给后台
                this.pagination.currentPage = currentPage;
                this.getMenuList();
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
                this.getMenuList();
            },
            getMenuList() {
                //分页参数
                let param = {
                    currentPage: this.pagination.currentPage,//页码
                    pageSize: this.pagination.pageSize,//每页显示的记录数
                    queryString: this.pagination.queryString//查询条件
                };
                this.$axios.post("/perm/findPermList",param).then(resp => {
                    this.pagination.total = resp.data.data.total;
                    this.dataList = resp.data.data.rows;
                    console.log("=======================>"+resp.data.data.rows)
                    //alert(resp.data.rows);

                });
            },
            showAll(){  //全部显示
                this.pagination.currentPage = 1;
                this.pagination.queryString=null;
                this.getMenuList();

            },
            submitForm() {   //修改提交
                //this.$refs[formName].$children[0].validate
                this.$refs['editForm'].validate((valid) => {
                    if (valid) {
                        this.$axios.put('/perm/updatePerm/' + this.editForm.id, this.editForm)
                            .then(res => {

                                this.$message({
                                    showClose: true,
                                    message: '修改成功',
                                    type: 'success',
                                    onClose: () => {
                                        this.getMenuList()
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
                this.$refs["addForm"].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/perm/addPerm' , this.addForm)
                            .then(res => {

                                this.$message({
                                    showClose: true,
                                    message: '新用户添加成功',
                                    type: 'success',
                                    onClose: () => {
                                        this.getMenuList()
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
            editHandle(id) { //修改时信息回显
                this.$axios.get('/perm/findPermById/' + id).then(res => {
                    this.editForm = res.data.data;

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
                            this.getMenuList()
                        }
                    });
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