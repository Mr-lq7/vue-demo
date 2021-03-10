<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>查询功能</el-breadcrumb-item>
      <el-breadcrumb-item>查询列表</el-breadcrumb-item>
    </el-breadcrumb>


    <!-- <el-col :span="16" class="box"> -->
    <!-- <el-card>
      <div id="main" style="width: 750px;height:300px;">
              <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="请输入用户名"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      </div>
    </el-card> -->
    <el-card>
       <span>连接查询</span>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入商品名字"
            clearable
            v-model="queryInfo.query"
          >
            <!-- <el-button
              slot="append"
              icon="el-icon-search"
              @click="getResList1"
            ></el-button> -->
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="getResList1">查询商品种类</el-button>
        </el-col>
      </el-row>

    <div v-for="o in reslist1" :key="o" class="text item">
      {{'查询结果: ' + o }}
    </div>
  </el-card>
   <el-card>
       <span>分组查询</span>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder=""
            clearable
            v-model="queryInfo.query"
            disabled
          >
            <!-- <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button> -->
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="getResList2">按商品类别的数量降序排序</el-button>
        </el-col>
      </el-row>
      
    <div v-for="item in reslist2" :key="item.indx" class="text item">
      {{'种类: ' + item.kind }}           {{'商品数量'+ item.num}}
    </div>
    </el-card>

    <el-card>
       <span>嵌套查询</span>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder=""
            clearable
            v-model="queryInfo.query"
            disabled
          >
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="getResList3">查询最贵的商品</el-button>
        </el-col>
      </el-row>
      
    <div v-for="item in reslist3" :key="item.index" class="text item">
      {{'商品名称 ' + item.name }}      {{'sql:' + item.sql}}
    </div>
    </el-card>
    
  </div>
</template>

<script>
// import echarts from "echarts";
// import _ from "lodash";

export default {
  data() {
    return {
      queryInfo:{
        query: "",
        id : ""
      },
      total:'',
      reslist1:[],
      reslist2:[],
      reslist3:[]
      // option: {
      //   title: {
      //     text: "用户来源"
      //   },
      //   tooltip: {
      //     trigger:'axis',
      //     axisPointer:{
      //       type:'cross',
      //       label:{
      //         backgroundColor:'#E9EEF3'
      //       }
      //     }
      //   },
      //   grid: {
      //     left:'3%',
      //     right:'4%',
      //     bottom:'3%',
      //     containLabel:true
      //   },
      //   xAxis: [
      //     {
      //       boundaryGap:false
      //     }
      //   ],
      //   yAxis: [
      //     {
      //       type:'value'
      //     }
      //   ]
      // }
    };
  },
  methods: {
    async getResList1() {
      this.queryInfo.id = '1';
      const {data}  = await this.$http.get("reports", {
        params: this.queryInfo
      });
      console.log('1513545');
      console.log(data);
      // var x = (this.queryInfo.pagenum) * (this.queryInfo.pagesize);
      // var be = (this.queryInfo.pagenum-1) * (this.queryInfo.pagesize);
      //console.log(x);
      this.reslist1 = []
      this.reslist1.push(data.data.category_name)
//       for(var i = be; i < x; ++i)
//         this.userlist.push(data.data.users[i]);
//  //     this.userlist = data.data.users;
//       console.log(this.userlist);
       this.total = data.data.total;
       this.queryInfo.id = '';
    },
    async getResList2() {
      this.queryInfo.id = '2';
      const {data}  = await this.$http.get("reports", {
        params: this.queryInfo
      });
      console.log('1513545');
      console.log(data);
      // var x = (this.queryInfo.pagenum) * (this.queryInfo.pagesize);
      // var be = (this.queryInfo.pagenum-1) * (this.queryInfo.pagesize);
      //console.log(x);
      this.reslist2 = []
      // this.reslist2.push(data.data.num)
//       for(var i = be; i < x; ++i)
//         this.userlist.push(data.data.users[i]);
//  //     this.userlist = data.data.users;
//       console.log(this.userlist);
      this.total = data.data.total;
      this.reslist2 = data.data.res;
      this.queryInfo.id = '';
      console.log(this.reslist2);
    },
    async getResList3() {
      this.queryInfo.id = '3';
      const {data}  = await this.$http.get("reports", {
        params: this.queryInfo
      });
      console.log('1513545');
      console.log(data);
      // var x = (this.queryInfo.pagenum) * (this.queryInfo.pagesize);
      // var be = (this.queryInfo.pagenum-1) * (this.queryInfo.pagesize);
      //console.log(x);
      this.reslist3 = []
      // this.reslist2.push(data.data.num)
//       for(var i = be; i < x; ++i)
//         this.userlist.push(data.data.users[i]);
//  //     this.userlist = data.data.users;
//       console.log(this.userlist);
      this.total = data.data.total;
      this.reslist3 = data.data.res;
      console.log(this.reslist3)
      this.queryInfo.id = '';
    }
  }
};
</script>

<style lang="less" scoped></style>

