<template>
  <el-dialog title="提示" v-model="addVis" size="tiny" ref="dialog">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="addVis = false">取 消</el-button>
    <el-button type="primary" @click="addVis = false">确 定</el-button>
  </span>
  </el-dialog>
</template>
<script>
  export default {
    data() {
      return {
      };
    },
    props: ['addVis']
  };
</script>