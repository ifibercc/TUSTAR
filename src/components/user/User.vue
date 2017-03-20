<template>
  <div class="main">
    <el-row class="tu-layout-tree" :gutter="20">
      <el-col :span="4">
        <tu-tree url="/api/bsOrganize/treeDis"></tu-tree>
      </el-col>
      <el-col :span="20">
        <div class="query-condition">
          <el-form :inline="true" :model="queryData">
            <el-form-item>
              <el-input v-model="queryData.loginName" placeholder="登录名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="queryData.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="queryData.sex" placeholder="性别">
                <el-option label="男" value="nan"></el-option>
                <el-option label="女" value="nv"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker v-model="queryData.date" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click=""><i class="fa fa-search"></i> 查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <tu-toolbar url="/api/bsuser/GetFunOperations"></tu-toolbar>
        <el-table :data="tableData" border stripe>
          <el-table-column v-for="item in fieldData" v-if="item.FVisible" :prop="item.FName" :label="item.FDesp" :width="item.FWidth">
          </el-table-column>
          <el-table-column inline-template :context="_self" fixed="right" label="操作" width="120">
            <span>
              <el-button type="text" size="small" @click="">查看</el-button>
              <el-button type="text" size="small" @click.native="">删除</el-button>
            </span>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination @size-change="" @current-change="" :current-page="5" :page-size="100" layout="total, prev, pager, next" :total="1000">
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
        data: [],
        queryData: {
          name: '',
          sex: '',
          date: '',
          loginName: ''
        },
        fieldData: [],
        tableData: [],
      };
    },
    methods: {

    },
    created: function () {
      var me = this
      me.$ajax('get', '/api/bsuser/GetFunListItemConf', {
        controllername: 'bsuser',
        actionname: 'getall'
      }, function (res) {
        me.fieldData = res;
      }).then(
        me.$ajax('get', '/api/bsuser/getall', {}, function (res) {
          me.tableData = res;
        })
      )
    }
  }
</script>
<style lang="sass" scoped>
</style>