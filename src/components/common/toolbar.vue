<template>
    <div class="toolbar">
        <el-button-group>
            <el-button v-for="item in data" :type="item.btnType" :size="item.btnSize"><i :class="item.btnClass"></i> {{item.btnNameTip}}</el-button>
        </el-button-group>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                data: []
            }
        },
        props: ['url'],
        methods: {},
        created: function () {
            let me = this;
            this.$ajax('get', this.url, {}, function (res) {
                me.data = res;
            });
        }
    }
</script>