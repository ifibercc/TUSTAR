<template>
  <div class="welcome">
    <el-card>
      <img src="" class="image">
      <div style="padding: 14px;">
        <span>欢迎页面</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button type="text" class="button">操作按钮</el-button>
        </div>
      </div>
    </el-card>
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
<style scoped>
  .welcome {
    position: absolute;
    top: 32px;
    bottom: 32px;
    padding: 10px 20px;
    width: calc(100% - 60px);
    background: #FFF;
  }
</style>