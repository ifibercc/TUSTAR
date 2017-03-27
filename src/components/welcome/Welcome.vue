<template>
  <div class="welcome">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <div class="t-card">
            <div class="logo">
              <img src="../../assets/logo.png" alt="">
            </div>
            <div class="title">基本查询</div>
            <div class="info">使用单表结构对数据对象执行查询，具有分页、新增、编辑、删除等功能。</div>
            <div class="action">
              <el-button type="text" class="button">进入功能</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="t-card">
            <div class="logo">
              <img src="../../assets/logo.png" alt="">
            </div>
            <div class="title">基本查询</div>
            <div class="info">使用单表结构对数据对象执行查询，具有分页、新增、编辑、删除等功能。</div>
            <div class="action">
              <el-button type="text" class="button">进入功能</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="t-card">
            <div class="logo">
              <img src="../../assets/logo.png" alt="">
            </div>
            <div class="title">基本查询</div>
            <div class="info">使用单表结构对数据对象执行查询，具有分页、新增、编辑、删除等功能。</div>
            <div class="action">
              <el-button type="text" class="button">进入功能</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="t-card">
            <div class="logo">
              <img src="../../assets/logo.png" alt="">
            </div>
            <div class="title">基本查询</div>
            <div class="info">使用单表结构对数据对象执行查询，具有分页、新增、编辑、删除等功能。</div>
            <div class="action">
              <el-button type="text" class="button">进入功能</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        currentDate: new Date()
      }
    },

    methods: {

    }
  }
</script>
<style lang="sass" scoped>
  .welcome {
    position: absolute;
    top: 32px;
    bottom: 32px;
    padding: 10px 20px;
    width: calc(100% - 60px);
    background: #FFF;
  } 

  .t-card {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 180px;
    .logo {
      height: 80px;
      img {
        height: 100%;
      }
    }
    .title {
      height: 30px;
      font-weight: bold;
    }
    .info {
      width: 100%;
      height: 60px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .action {
      justify-content: flex-end;
      height: 30px;
    }
  }
</style>