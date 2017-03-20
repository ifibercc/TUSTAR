<template class="template">
  <div class="main">
    <el-row :gutter="24">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-tree :data="data" :props="defaultProps" :default-expand-all=true :highlight-current=true :node-key="id"></el-tree>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="grid-content bg-purple role-set">
          <div class="query-condition">
            <el-form :inline="true">
              <el-form-item>
                <el-input v-model="input" placeholder="角色编码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="input" placeholder="角色名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="search">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="toolbar">
            <el-button-group>
              <el-button type="info" icon="edit" size="small">添加</el-button>
              <el-button type="info" icon=" el-icon-menu" size="small">页面权限</el-button>
              <el-button type="info" icon=" el-icon-setting" size="small">数据项配置</el-button>
            </el-button-group>
          </div>
          <div>
            <el-table :data="tableData" border style="width:100%;overflow:auto;">
              <el-table-column prop="name" label="序号" width="80">
              </el-table-column>
              <el-table-column prop="province" label="所属单位" width="160">
              </el-table-column>
              <el-table-column prop="city" label="角色编码" width="100">
              </el-table-column>
              <el-table-column prop="address" label="角色名称" width="160">
              </el-table-column>
              <el-table-column prop="zip" label="角色描述">
              </el-table-column>
              <el-table-column inline-template :context="_self" fixed="right" label="操作" width="120">
                <span>
                  <el-button type="text" size="small" @click="">查看</el-button>
                  <el-button type="text" size="small" @click.native="">删除</el-button>
                </span>
              </el-table-column>
            </el-table>
          </div>
          <el-pagination :current-page="5" :page-size="100" layout="total, prev, pager, next" :total="1000" style="float:right">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        input: '',
        tableData: [{
          // date: '2016-05-03',
          name: '1',
          province: '玻纤厂供热站',
          city: '0010',
          address: '站长',
          zip: '拥有管理和设置权限'
        }, {
          // date: '2016-05-02',
          name: '2',
          province: '玻纤厂供热站',
          city: '0020',
          address: '测温人员',
          zip: '测试温度'
        }, {
          // date: '2016-05-04',
          name: '3',
          province: '玻纤厂供热站',
          city: '0030',
          address: '大屏查看',
          zip: '查看大屏数据'
        }, {
          // date: '2016-05-01',
          name: '4',
          province: '玻纤厂供热站',
          city: '0040',
          address: '普通员工',
          zip: '普通员工'
        }, {
          // date: '2016-05-08',
          name: '5',
          province: '玻纤厂供热站',
          city: '0050',
          address: '普通员工',
          zip: '普通员工'
        }, {
          // date: '2016-05-06',
          name: '6',
          province: '玻纤厂供热站',
          city: '0060',
          address: '普通员工',
          zip: '普通员工'
        }, {
          // date: '2016-05-07',
          name: '7',
          province: '玻纤厂供热站',
          city: '0070',
          address: '普通员工',
          zip: '普通员工'
        }],
        data: [{
            pId: null,
            id: '001',
            name: '玻纤热力公司',
            type: '公司',
            code: '1',
            children: [{
              pId: '001',
              id: '0010',
              name: '玻纤分公司',
              type: '部门',
              code: '01001'
            }]
          },
          {
            pId: null,
            id: '002',
            name: '宏源热力公司',
            type: '公司',
            code: '0100',
            children: []
          }
        ],
        defaultProps: {
          pId: 'pId',
          children: 'children',
          label: 'name',
          type: 'type',
          id: 'id',
          code: 'code'
        },
        options: [{
            value: '001',
            label: '玻纤热力公司',
          },
          {
            value: ''
          }

        ]
      }
    }
  };
</script>
<style scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .el-col {
    border-radius: 4px;
    height: 100%;
  }
  
  .bg-purple-dark {
    background: #99a9bf;
  }
  
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  
  .data-Oper {
    float: right;
  }
  
  .normal-operate {
    float: right;
  }
  
  .el-row {
    height: 100%;
  }
  
  .el-tree {
    height: 100%;
  }
  
  div[class="grid-content bg-purple"] {
    height: 90%;
  }
</style>