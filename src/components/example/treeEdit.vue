<template>
    <div class="layout-tree-edit">
        <el-row :gutter="20">
            <el-col :span="5">
                <tu-tree url="/api/bsOrganize/treeDis" v-on:emitId="clickNode" v-on:emitBtnAdd="addNode" btnEdit="true" default-expand-all="true"></tu-tree>
            </el-col>
            <el-col :span="10" :offset="4">
                <el-form :model="formAlignLeft" label-position="left" label-width="80px" class="layout form">
                    <el-input v-model="formAlignLeft.id" style="display:none"></el-input>
                    <el-form-item label="上级节点" size="small">
                        <el-select v-model="value" placeholder="请选择" size="small">
                            <el-option v-for="item in options" :label="item.label" :value="formAlignLeft.pId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="机构名称">
                        <el-input v-model="formAlignLeft.name" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="机构代码">
                        <el-input v-model="formAlignLeft.code" id="000001" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="机构类别" prop="resource">
                        <el-radio-group v-model="formAlignLeft.type" size="small">
                            <el-radio label="公司"></el-radio>
                            <el-radio label="部门"></el-radio>
                            <el-radio label="供热站"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="机构描述">
                        <el-input v-model="formAlignLeft.name" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="机构图标">
                        <el-input v-model="formAlignLeft.region" size="small"> </el-input>
                    </el-form-item>
                    <el-form-item label="负责人">
                        <el-input v-model="formAlignLeft.type" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人">
                        <el-input v-model="formAlignLeft.name" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <el-input v-model="formAlignLeft.region" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="联系邮箱">
                        <el-input v-model="formAlignLeft.type" size="small"></el-input>
                    </el-form-item>
                    <el-form-item class="button">
                        <el-button type="primary" size="middle">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                data: [],
                condition: {
                    UserName: '',
                    LoginName: '',
                    NickName: '',
                    nodeId: ''
                },
                fieldData: [],
                gridData: [],
                pagination: {
                    currentPage: 1,
                    pageSize: 20,
                    total: 0
                },
                dialogFormVisible: false,
                form: {
                    UserName: '',
                    LoginName: '',
                    NickName: '',
                    ContactTel: '',
                    RegDt: '',
                    ValidDate: '',
                    AccountStatus: false,
                    IsSysUser: false
                },
                formLabelWidth: '120px',
                formAlignLeft: {
                    pId: null,
                    id: null,
                    name: '新增节点',
                    code: '0001',
                    type: '公司'

                },
            };
        },
        methods: {
            search() {
                var me = this;
                this.$ajax('get', '/api/bsuser/getallwithpaging', {
                    condition: me.condition,
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
                this.$ajax('post', '/api/bsuser/delete', {
                    idValue: row.bsU_Id
                }, function (res) {
                    me.search();
                });
            },
            openModal(flag) {
                if (flag === 'add') {
                    // 新增 清空form
                    this.dialogFormVisible = true;
                } else {
                    // 编辑根据主键请求数据并赋值form
                    console.log(flag)
                    this.dialogFormVisible = true;
                }
            },
            modalSubmit() {
                var me = this;
                console.log(this.form)
                this.$ajax('post', '/api/bsuser/add', {
                    UserName: me.form.UserName,
                    LoginName: me.form.LoginName,
                    NickName: me.form.NickName,
                    ContactTel: me.form.ContactTel,
                    RegDt: me.form.RegDt,
                    ValidDate: me.form.ValidDate,
                    AccountStatus: me.form.AccountStatus == true ? '1' : '0',
                    IsSysUser: me.form.IsSysUser,
                    bsO_Id: 'f2c52587-19c6-4dd0-9671-6d05045c1d41',
                    bsU_Id: null
                }, function (res) {
                    me.search();
                });
            },
            clickNode(node) {
                this.condition.nodeId = node.id;
                this.search();
            },
            addNode(pNode) {
                console.log(pNode)
            }
        },
        created: function () {
            this.search();
        }
    }
</script>
<style lang="sass" scoped>
</style>