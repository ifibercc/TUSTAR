<style lang="sass">

</style>
<template>
  <div class="wrapper">
    <div class="tu-header">
      <div class="logo">TUSTAR</div>
    </div>
    <div class="tu-sidebar">
      <el-menu default-active="/welcome" :router="true" theme="dark" class="menu-left" :unique-opened="true" @select="selectMenu">
        <el-menu-item index="/welcome"><i class="tf tf-home"></i> 首页</el-menu-item>
        <el-submenu v-for="(menu, index) in navData" :key="index" :index="index + ''">
          <template slot="title"><i :class="menu.icon"></i> {{menu.title}}</template>
          <el-menu-item v-for="item in menu.items" :index="item.route"><i :class="item.icon"></i> {{item.title}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="tu-content">
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/welcome' }"><i class="fa fa-home"></i>首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{breadcrumb.pText}}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="breadcrumb.cText !== ''">{{breadcrumb.cText}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <router-view></router-view>
      <div class="footer">&copy;天津XX科技有限公司</div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        navData: [],
        breadcrumb: {
          pText: '',
          cText: '',
          cPath: ''
        }
      }
    },
    watch: {
      $route: function () {
        this.breadcrumb.pText = this.$route.name && this.$route.name.pText || '';
        this.breadcrumb.cText = this.$route.name && this.$route.name.cText || '';
      }
    },
    created: function () {
      var me = this;
      this.$router.push('/welcome')
      this.$ajax(
        'get',
        '/api/bsnavigation/getall', {},
        function (res) {
          me.navData = res;
        })
    },
    methods: {
      selectMenu() {
        // 选择菜单时修改面包屑
        // console.log(this.$route)
        // this.breadcrumb.pText = this.$route.name.pText;
        // this.breadcrumb.cText = this.$route.name.cText;
      }
    }
  }
</script>

<style lang="sass">
  html {
    width: 100%;
    height: 100%;
    body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      font-family: 'Microsoft Yahei';
      overflow: hidden;
    }
  }

  .wrapper {
    width: 100%;
    height: 100%;
    .tu-header {
      z-index: 2;
      height: 40px;
      .logo {
        z-index: 1;
        width: 220px;
        height: 50px;
        background-color: #324057;
        color: #FFF;
        font-size: 18px;
        line-height: 50px;
        text-align: center;
      }
    }
    .tu-sidebar {
      width: 220px;
      height: calc(100% - 40px);
      float: left;
      .menu-left {
        height: 100%;
      }
    }
    .tu-content {
      position: relative;
      width: calc(100% - 250px);
      height: calc(100% - 60px);
      background: #f5f5f5;
      float: left;
      padding: 10px 10px;
      .breadcrumb {
        display: flex;
        position: absolute;
        justify-content: center;
        left: 10px;
        height: 30px;
      }
      .footer {
        position: absolute;
        width: 100%;
        height: 30px;
        bottom: 2px;
        text-align: center;
        line-height: 30px;
      }
    }
  }
</style>