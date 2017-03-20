<template>
    <div class="tree">
        <div class="title"><span>组织机构</span></div>
        <div class="tree-operate">
            <el-button-group v-if="btnEdit">
                <el-button type="primary" size="small" icon="plus"   @click="emitBtnAdd">新增节点</el-button>
                <el-button type="danger"  size="small" icon="delete" @click="emitBtnDel">删除节点</el-button>
            </el-button-group>
        </div>
        <el-tree :data="data" :props="defaultProps" @node-click="emitId" :highlight-current="true" :expand-on-click-node="false" default-expand-all="default-expand-all"></el-tree>
    </div>
</template>
<script>
    function transformToTreeFormat(sNodes) {
        var i, l,
            key = 'id',
            parentKey = 'pId',
            childKey = 'children';
        if (!key || key == "" || !sNodes) return [];

        if (Object.prototype.toString.apply(sNodes) === "[object Array]") {
            var r = [];
            var tmpMap = {};
            for (i = 0, l = sNodes.length; i < l; i++) {
                tmpMap[sNodes[i][key]] = sNodes[i];
            }
            for (i = 0, l = sNodes.length; i < l; i++) {
                if (tmpMap[sNodes[i][parentKey]] && sNodes[i][key] != sNodes[i][parentKey]) {
                    if (!tmpMap[sNodes[i][parentKey]][childKey])
                        tmpMap[sNodes[i][parentKey]][childKey] = [];
                    tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i]);
                } else {
                    r.push(sNodes[i]);
                }
            }
            return r;
        } else {
            return [sNodes];
        }
    }
    export default {
        data() {
            return {
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                data: [],
                currentNode: {}
            }
        },
        props: ['url', 'onclick', 'btnEdit', 'default-expand-all'],
        methods: {
            emitId(node) {
                this.currentNode = node
                this.$emit('emitId', node)
            },
            emitBtnAdd() {
                this.$emit('emitBtnAdd', this.currentNode)
            },
            emitBtnDel() {

            }
        },
        created: function () {
            var me = this;
            this.$ajax('get', this.url, {}, function (treeData) {
                me.data = transformToTreeFormat(treeData);
            });

        }
    }
</script>
<style lang="sass" scoped>
    .tree {
        height: 100%;
        border: 1px solid #eaeefb;
        border-radius: 4px;
        background-color: #F9FAFC;
        transition: .2s;
        .title {
            border-bottom: 1px solid #D3DCE6;
            padding: 10px;
            text-align: center;
            background-color: #EFF2F7;
        }
        .el-tree {
            border: none;
            background-color: #F9FAFC;
        }
        &:hover {
            box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
        }
    }
    .tree-operate {
        text-align: center;
        margin: 5px 0;
    }
</style>