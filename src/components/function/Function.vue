
<template>
  <div class="main">
    <el-row :gutter="24" >
      <el-col :span="8"><div class="grid-content bg-purple">
        <el-card class="box-card">
          <el-tree :data="treeData" :props="defaultProps"  :default-expand-all=true :highlight-current=true @node-click="clicked" :node-key="id"></el-tree>
          </el-card>
        </div>
      </el-col>
      <el-col :span="16"><div class="grid-content bg-purple" >
        <div class="layout-grid-form">
        <el-form :model="formAlignLeft" label-position="left" label-width="80px" class="layout form">         
          <el-form-item label="导航名称">
            <el-input  size="small" v-model="formAlignLeft.NaviName"></el-input>
          </el-form-item>
          <el-form-item label="导航编号">
            <el-input  size="small" v-model="formAlignLeft.NaviNo"></el-input>
          </el-form-item>
          <el-form-item label="导航类型">
            <el-radio-group v-model="formAlignLeft.NaviType" size="small">
            <el-radio class="radio" label="page">页面</el-radio>
            <el-radio class="radio" label="group">导航</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="导航状态">
            <el-radio-group v-model="formAlignLeft.NaviStatus" size="small">
              <el-radio class="radio"  label="正常">正常</el-radio>
              <el-radio class="radio"  label="禁用">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          
          <el-form-item label="URL">
            <el-input  size="small" v-model="formAlignLeft.UrlServerEx"></el-input>
          </el-form-item>
          <el-form-item label="快捷键"  >
            <el-radio-group v-model="formAlignLeft.IsShortkey" size="small">
              <el-radio class="radio"  label="true">是</el-radio>
              <el-radio class="radio"  label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="快捷图标" >
            <el-input  size="small" v-model="formAlignLeft.ShortkeyPic"></el-input>
          </el-form-item>
          <el-form-item label="系统导航" >
            <el-radio-group v-model="formAlignLeft.IsSysNavi" size="small">
              <el-radio class="radio"  label="true">是</el-radio>
              <el-radio class="radio"  label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="button">
            <el-form-item>
              <el-button type="primary" @click="addNode" size="small" >新增</el-button>
              <el-button type="primary" @click="onSubmit" size="small">保存</el-button>
              <el-button @click="deleteNode" size="small">删除</el-button>
            </el-form-item>
          </div>
        </el-form>
        </div>
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
          $id:null,
          bsN_Id:null,  
          pId:null,        
          NaviName:'新增导航',
          NaviNo:'0',
          NaviType:'page',
          NaviStatus:"禁用",
          UrlServerEx:'null',
          IsSysNavi:'false',
          IsShortkey:'false',
          ShortkeyPic:'null'
        },
        treeData:[],
        defaultProps: {
          children: 'children',
          label: 'name'
        } , 
      }
    } ,
    methods:{
      clicked(data , node , element) {
        var me=this;
        this.$ajax('get','/api/bsnavigation/getone',{'idvalue':node.data.id},function(res) {
          console.log(res.IsSysNavi);
          me.formAlignLeft.pId=node.data.pId;
          me.formAlignLeft.$id=res.$id;
          
          me.formAlignLeft.bsN_Id=res.bsN_Id;     
          me.formAlignLeft.NaviName=res.NaviName;
          me.formAlignLeft.NaviNo=res.NaviNo;
          me.formAlignLeft.NaviType=res.NaviType;
          me.formAlignLeft.NaviStatus=res.NaviStatus;
          me.formAlignLeft.UrlServerEx=res.UrlServerEx;
          me.formAlignLeft.IsSysNavi=res.IsSysNavi.toString();
          me.formAlignLeft.IsShortkey=res.IsShortkey.toString();
          me.formAlignLeft.ShortkeyPic=res.ShortkeyPic;
          console.log(me.formAlignLeft.NaviStatus);
        })
      },
      addNode(){
          this.formAlignLeft.bsN_Id='00000000-0000-0000-0000-000000000000';     
          this.formAlignLeft.NaviName=null;
          this.formAlignLeft.NaviNo=null;
          this.formAlignLeft.NaviType='page'
          this.formAlignLeft.NaviStatus='正常';
          this.formAlignLeft.UrlServerEx=null;
          this.formAlignLeft.IsSysNavi='false';
          this.formAlignLeft.IsShortkey='false';
          this.formAlignLeft.ShortkeyPic=null;


      },
      onSubmit(){
        var me=this;
        console.log("onSubmit");
        var strJson=JSON.stringify(this.formAlignLeft);
        console.log(strJson);
        debugger;
        var url=this.formAlignLeft.bsN_Id==null?'/api/bsnavigation/Add':'/api/bsnavigation/Edit';
        this.$ajax('post',url,{strjson:strJson},function(message){
          console.log(message);
        }).then(me.getTree());
        console.log(1111);
      },
      deleteNode(){
        console.log("deleteNode");
      },
      getTree(){
        var root=[];
      var me=this;
      this.$ajax('get','/api/bsnavigation/treedis',{},function(tree){
        console.log(tree);
        for ( var i = 0; i < tree.length; i++)
        {
            var ri = tree[i];
            ri.text = ri.name;
            for ( var j = 0; j < tree.length; j++)
            {
                tree[j].leaf = true;
                for ( var k = 0; k < tree.length; k++)
                {
                    if (tree[k].pId == tree[j].id&&k!=j)
                    {
                        tree[j].leaf = false;
                        break;
                    }
                }
            }            
            if (ri.pId != ri.id)
            {
                for ( var j = 0; j < tree.length; j++)
                {
                    var rj = tree[j];
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
          me.treeData=root;
          console.log(me.treeData);
      });
      }
    },
    
    created:function(){
      this.getTree();

    },   
  }
</script>
<style scoped>
    .el-row {
    margin-bottom: 20px;
    }
    :last-child {
      margin-bottom: 20px;
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
  /*.el-form{
    padding:20px;
    margin-left:25%;
  }*/
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

  .form>*{
    height:22px;
  }
  /*.button{
    margin-left:-8%;
    margin-top:30px;
  }*/
  .box-card{
    height:100%;
  }
  
</style>