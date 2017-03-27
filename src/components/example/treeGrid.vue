<template>
    <div class="layout-tree-grid">
        <el-row :gutter="20">
            <el-col :span="4">
                <tu-tree url="/api/bsOrganize/treeDis" v-on:emitId="clickNode"></tu-tree>
            </el-col>
            <el-col :span="20">
                <div class="condition">
                    <el-form :inline="true" :model="searchForm">
                        <el-input v-model="searchForm.nodeId" type="hidden"></el-input>

                        <el-form-item>
                            <el-input v-model="searchForm.UserName" placeholder="用户名"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="searchForm.LoginName" placeholder="登录名"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="searchForm.NickName" placeholder="昵称"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="search()"><i class="tf tf-query"></i> 查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="toolbar">
                    <el-button-group>
                        <el-button type="primary" size="small" @click="openDialog()"><i class="fa fa-plus"></i> 新增</el-button>
                        <el-button type="primary" size="small"><i class="fa fa-edit"></i> 编辑</el-button>
                    </el-button-group>
                </div>
                <div class="grid">
                    <el-table :data="gridData" border stripe height="'100%'">
                        <el-table-column type="index" width="80">
                        </el-table-column>
                        <el-table-column prop="UserName" label="用户名">
                        </el-table-column>
                        <el-table-column prop="LoginName" label="登录名">
                        </el-table-column>
                        <el-table-column prop="NickName" label="昵称">
                        </el-table-column>
                        <el-table-column prop="ContactTel" label="联系电话">
                        </el-table-column>
                        <el-table-column prop="RegDt" label="注册时间" width="200">
                        </el-table-column>
                        <el-table-column prop="AccountStatus" label="用户状态">
                        </el-table-column>
                        <el-table-column prop="IsOnline" label="是否在线">
                        </el-table-column>
                        <el-table-column prop="IsSysUser" label="是否系统账户">
                        </el-table-column>
                        <el-table-column prop="LoginDt" label="最后登录时间">
                        </el-table-column>
                        <el-table-column :context="_self" fixed="right" label="操作" width="120">
                            <template scope="scope">
                                <el-button size="small" type="text" @click="openModal(scope.row.bsU_Id)">编辑</el-button>
                                <el-button size="small" type="text" @click="removeRow(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pagination">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage"
                        :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next" :total="pagination.total" :page-sizes="[20, 50, 100]">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>

        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="新增用户" v-model="dialogVisible" size="tiny">
            <el-form :model="dialogForm">
                <el-input v-model="dialogForm.nodeId" auto-complete="off"></el-input>

                <el-form-item label="用户名：" :label-width="'120px'">
                    <el-input v-model="dialogForm.UserName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="登录名：" :label-width="'120px'">
                    <el-input v-model="dialogForm.LoginName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称：" :label-width="'120px'">
                    <el-input v-model="dialogForm.NickName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话：" :label-width="'120px'">
                    <el-input v-model="dialogForm.ContactTel" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="注册时间：" :label-width="'120px'">
                    <el-date-picker type="date" v-model="dialogForm.RegDt" placeholder="选择日期" width="120px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="有效期至：" :label-width="'120px'">
                    <el-date-picker type="date" v-model="dialogForm.ValidDate" placeholder="选择日期" width="120px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="用户状态：" :label-width="'120px'">
                    <el-input v-model="dialogForm.AccountStatus" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否系统账户：" :label-width="'120px'">
                    <el-switch v-model="dialogForm.IsSysUser" on-text="是" off-text="否">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关闭</el-button>
                <el-button type="primary" @click="dialogSubmit()">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                searchForm: {
                    nodeId: '',
                    UserName: '',
                    LoginName: '',
                    NickName: ''
                },
                gridData: [],
                pagination: {
                    currentPage: 1,
                    pageSize: 20,
                    total: 0
                },
                dialogForm: {
                    UserName: '',
                    LoginName: '',
                    NickName: '',
                    ContactTel: '',
                    RegDt: '',
                    ValidDate: '',
                    AccountStatus: false,
                    IsSysUser: false
                },
                dialogVisible: false
            };
        },
        methods: {
            search() {
                const me = this;
                this.$ajax('get', '/api/bsuser/getallwithpaging', {
                    // 改写后端方法
                    // where: 'UserName like ' + me.searchForm.UserName + ' LoginName like ' + me.searchForm.LoginName
                    // + ' NickName like ' + me.searchForm.NickName,
                    currentPage: me.pagination.currentPage,
                    pageSize: me.pagination.pageSize
                }, function (res) {
                    me.gridData = res.data;
                    me.pagination.currentPage = res.currentPage;
                    me.pagination.pageSize = res.pageSize;
                    me.pagination.total = res.totalCount;
                });
            },
            handleSizeChange(val) {
                this.pagination.pageSize = val;
                this.search();
            },
            handleCurrentChange(val) {
                this.pagination.currentPage = val;
                this.search();
            },
            removeRow(row) {
                var me = this;
                this.$confirm('是否删除此项数据?', '警告', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(() => {
                    this.$ajax('post', '/api/bsuser/delete', {
                        idValue: row.bsU_Id
                    }, function (res) {
                        me.search();
                    });
                }).catch(() => {

                });

            },
            openDialog(id) {
                const me = this;
                if (id) {
                    // 编辑根据主键请求数据并赋值form
                    console.log(id)
                    this.$ajax('post', '/api/bsuser/getone', {
                        idValue: id
                    }, function (res) {
                        console.log(res)
                        me.dialogForm = res;
                    });
                    this.dialogVisible = true;
                } else {
                    // 新增 清空form
                    this.dialogForm = {
                        UserName: '',
                        LoginName: '',
                        NickName: '',
                        ContactTel: '',
                        RegDt: '',
                        ValidDate: '',
                        AccountStatus: false,
                        IsSysUser: false
                    };
                    this.dialogVisible = true;
                }
            },
            dialogSubmit() {
                var me = this;
                this.$ajax('post', '/api/bsuser/add', {
                    strJson: JSON.stringify({
                        UserName: me.dialogForm.UserName,
                        LoginName: me.dialogForm.LoginName,
                        NickName: me.dialogForm.NickName,
                        ContactTel: me.dialogForm.ContactTel,
                        RegDt: me.dialogForm.RegDt,
                        ValidDate: me.dialogForm.ValidDate,
                        AccountStatus: me.dialogForm.AccountStatus == true ? '1' : '0',
                        IsSysUser: me.dialogForm.IsSysUser,
                        bsO_Id: me.dialogForm.nodeId
                    })
                }, function (res) {
                    me.dialogVisible = false;
                    me.search();
                });
            },
            clickNode(node) {
                this.searchForm.nodeId = node.id;
                this.search();
            }
        },
        created: function () {
            this.search();
        }
    }
</script>
<style lang="sass" scoped>

</style>