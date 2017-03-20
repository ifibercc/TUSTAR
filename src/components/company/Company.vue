<template>
  <div class="main">
    <el-row :gutter="24" >
      <el-col :span="8"><div class="grid-content bg-purple">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-button-group>
              <el-button type="primary" size="small">气象仪权重</el-button>
              <el-button type="primary" size="small">报警设置</el-button>
              <el-button type="primary" size="small">量程设置</el-button>
            </el-button-group>
          </div>
          <el-tree :data="tree" :props="defaultProps"   :default-expand-all=true :highlight-current=true @node-click="handleNodeClick" :node-key="id"  ></el-tree>
          </el-card>
        </div>
      </el-col>
      <el-col :span="16"><div class="grid-content bg-purple" >

        <el-form :model="formAlignLeft" label-position="left" label-width="80px" class="layout form">
          
          <el-input v-model="formAlignLeft.id" style="display:none" ></el-input>
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
          <el-button type="primary" @click="addNode" size="small" >新增</el-button>
            <el-button type="primary" @click="onSubmit" size="small">保存</el-button>
            <el-button @click="deleteNode" size="small">删除</el-button>
          </el-form-item>
        </el-form>
        </div>
        </el-col>
    </el-row>
  </div>
</template>
<script>
    
    
  export default {
    data() {
      return {
        formAlignLeft:{
          pId:null,
          id:null,
          name:'新增节点',
          code:'0001' ,
          type:'公司'

        },
        tree:[],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      };
    },
    methods: {
      handleNodeClick(data,node,element) {
        console.log(node.data.code);
        var dd=node;
        this.formAlignLeft.name=node.label;
        this.formAlignLeft.id=node.data.id;
        this.formAlignLeft.type=node.data.type;
        this.formAlignLeft.code=node.data.code;
      },
      filter(id){
        console.log(this.data[0]);
          for(let i=0;i<this.data.length;i++)
          {
            if(this.data[i].id==id){
              return i;
              break;
            }
          }

      },
      onSubmit(){
        console.log("编辑");
        var cc=this.formAlignLeft;
        this.data.forEach(function(item,index,array){
          if(item.id==cc.id)
          {
            item.name=cc.name;
            item.code=cc.code;
            item.type=cc.type;           
          }
        })
      },
      addNode(){
        this.formAlignLeft.name=null;
        this.formAlignLeft.code=null;
        this.formAlignLeft.type=null;
      },
      deleteNode(){
        var pos=this.filter(this.formAlignLeft.id);
        this.data.splice(pos,1);
      }




    },
    created:function(){
      var root=[];
      var me=this;
      this.$ajax('get','/api/bsOrganize/treeDis',{},function(treeData){
        //console.log(treeData);
        for ( var i = 0; i < treeData.length; i++)
        {
            var ri = treeData[i];
            ri.text = ri.name;
            for ( var j = 0; j < treeData.length; j++)
            {
                treeData[j].leaf = true;
                for ( var k = 0; k < treeData.length; k++)
                {
                    if (treeData[k].pId == treeData[j].id&&k!=j)
                    {
                        treeData[j].leaf = false;
                        break;
                    }
                }
            }            
            if (ri.pId != ri.id)
            {
                for ( var j = 0; j < treeData.length; j++)
                {
                    var rj = treeData[j];
                    if (rj.id == ri.pId)
                    {
                        rj.children = !rj.children ? [] : rj.children;
                        rj.children.push (ri);
                        break;
                    }
                }
            }
             
            if (ri.pId == ri.id||ri.pId==null||ri.pId=="null")
            {
                root.push (ri);
            }

          }
          me.tree=root;
      });

    }
  };
</script>
<style scoped>
    .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 20px;
    }
  }
  .el-col {
    border-radius: 4px;
    height:100%;
  }
  .el-col>*:first-child{
    height:95%;
  }
  .bg-purple {
    background: #F5F5F5;
  }
  .el-form{
    padding:20px;
    margin-left:25%;
  }
  .el-input{
    width:50%;
  }
    .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .el-tree{
    height:100%;
    border:0px solid;
  }
  .el-col:first-child>div[class="grid-content bg-purple"]{
    height:95%;
  }
  div[class="grid-content bg-purple"]{
    height:auto;
    position:relative;
  }
  .el-row{
    height:95%;
  }
  .el-select{
    width:50%;
  }
  .form>*{
    height:22px;
  }
  .button{
    margin-left:-8%;
    margin-top:30px;
  }
  .box-card{
    height:100%;
  }
</style>