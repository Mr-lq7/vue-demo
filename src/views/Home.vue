<template>
  <el-container style="height:100vh">
    <el-header style="height:80px; ">
      
        <img src="../assets/logo.png" alt />
        <span style="padding-left:20px">Vue网格数据可视化系统</span>

    </el-header>

    <el-container>
      <el-aside style="width:240px">
        <el-menu router :default-active="$route.path">
          <el-submenu :index="item.id+''" v-for="(item) in menulist" :key="item.id">
            <template slot="title">
              <i :class="iconObj[item.id]"></i>   
              <span style="font-size:16px">{{item.attributeName}}</span>
            </template>

            <el-menu-item  v-for="(subItem) in item.children" :key="subItem.id">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span style="font-size:16px"  @click="select(subItem.id)">{{subItem.attributeName}}</span>
              </template>
            </el-menu-item>
        

          </el-submenu>
          <div style="margin-top:100px">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link" style="font-size:16px; margin-left:20px">
                用户自选添加<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item  @click.native="Pick_Gold">黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>



          <div style="margin-top:100px; margin-left:20px; font-style:16px">
            用户历史查询
            <ul>
              <li>
                dd
              </li>
              <li>
                dd
              </li>
            </ul>
          </div>

        </el-menu>
      </el-aside>

      <el-main>
        <!-- 路由匹配到的组件将显示在这里 -->
        <router-view></router-view>
        <div style="font-size:18px; font-weight:bold; padding-left:12px; margin-bottom: 10px">{{message[id]}}</div>

        <div class="block">
          <span style="font-size:16px; padding-left: 0px">(北京时间)日期：</span>
          <el-date-picker v-model="valueDate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
          </el-date-picker>
          <!-- <div :width="flag == 0 ? '64px' : '200px'">11</div> -->
          <span :style="`font-size:16px;padding-left:25px;visibility:${flag === 0?'hidden':'visible'}`">时间：
          <!-- <span class="11" v-if="flag">  时间： -->
            <el-time-select v-model="valueTime" 
              :picker-options="{
                start: '00:00',
                step: '01:00',
                end: '13:00'
              }" 
              placeholder="选择时间">
            </el-time-select>
          </span>
          <span style="margin-left:300px; font-size:16px">
            <el-button round>上一帧</el-button>
            <el-button round>开始</el-button>
            <el-button round>下一帧</el-button>
            <el-button round @click="test">测试按钮</el-button>
          </span>
        </div>
        <!-- <div class="mymap">
          //开始放地图
        </div> -->
        <myMap class="Map"></myMap>
        <div class = "legend">
          此处放地图图例
          <ul>
            
            <li v-for="item in colors" v-bind:key="item.id">
              <span style="background: #bd0026;"> </span>
              <a>{{item.value}}</a>
            </li>
          </ul>
        </div>
 
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
import myMap from "../components/myMap.vue"
import {test11} from "../util/api.js"
export default {

  name: 'Home',
  components: { //注册组件
    myMap
  },
  //data就是定义的变量,methods就是对应的js函数
  data() {
      return {
        // {id:111,authName:'角色列表',path:'roles'},
        // {id:115,authName:'分类参数',path:'params'},
        // menulist: [ {id:125,authName:'用户管理',path:'users',children:[{id:110,authName:'用户列表',path:'users'}]},
        //   {id:103,authName:'购物车管理',path:'rights',children:[{id:112,authName:'购物车',path:'rights'}]},
        //   {id:101,authName:'商品管理',path:'goods',children:[{id:104,authName:'商品列表',path:'goods'},{id:121,authName:'商品分类',path:'categories'}]},
        //   {id:102,authName:'订单管理',path:'orders',children:[{id:107,authName:'订单列表',path:'orders'}]},
        //   {id:145,authName:'查询功能',path:'reports',children:[{id:146,authName:'查询列表',path:'reports'}]}],
        colors: [{
          id:1,
          value:'ho'
        },
        {
          id:2,
          value:'fdds'
        },
        {
          id:3,
          value:'sdf'
        },
        {
          id:4,
          value:'sdf55'
        }], 
        menulist: [{
            id: 1,
            attributeName: "降雨量",
            path: "users",
            children: [{
                id: 101,
                attributeName: "日平均降雨量",
                path: "users"
              },
              {
                id: 102,
                attributeName: "一小时降雨量",
                path: "users"
              },
            ],
          },
          {
            id: 2,
            attributeName: "气温",
            path: "rights",
            children: [{
              id: 103,
              attributeName: "小时气温",
              path: "rights"
            }, {
              id: 104,
              attributeName: "小时最高气温"
            }, {
              id: 105,
              attributeName: "小时最低气温"
            }, {
              id: 106,
              attributeName: "日最高气温"
            }, {
              id: 107,
              attributeName: "日最低气温"
            }],
          },
          {
            id: 3,
            attributeName: "湿度",
            path: "goods",
            children: [{
              id: 108,
              attributeName: "相对湿度",
              path: "goods"
            }],
          },
        ],

        // iconObj: {
        //   "125": "iconfont icon-icon_user",
        //   "103": "iconfont icon-tijikongjian",
        //   "101": "iconfont icon-shangpin",
        //   "102": "iconfont icon-danju",
        //   "145": "iconfont icon-baobiao"
        // },
        iconObj: {
          1: "el-icon-message",
          2: "iconfont icon-tijikongjian",
          3: "iconfont icon-baobiao",
          4: "el-icon-message",
          5: "el-icon-message",
          6: "el-icon-message",
          7: "el-icon-message",
          8: "el-icon-message",
          9: "el-icon-message",
          10: "el-icon-message",
          11: "el-icon-message",

        },

        // isCollapse: false,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        valueDate: '',
        valueTime: '',
        message: ['日平均降雨量','一小时降雨量','小时气温','相对湿度'],
        id: 0,
        flag: 0 //false
    };
  },
    methods: {
      select(key) {
        this.id = parseInt(key)-4;
        console.log(key)
        if (key === 4) //为日平均降雨量的时候，不显示时间
          this.flag = false;
        else 
          this.flag = true;
        console.log("flag:"+this.flag);

      },
      Pick_Gold() {//选择对应属性之后的action

        var temp = {
          id:"4",
          attributeName:"你好",
          children:[]
        };
        var child_tmp = {
          id:"109",
          attributeName: "你好的孩子"
        }
        temp.children.push(child_tmp);
        this.menulist.push(temp);

        console.log(this.menulist)




      },
      // logout() {
      //   window.sessionStorage.clear;
      //   this.$router.push("/login");
      // },

      /*async getMenuList() {
        const { data } = await this.$http.get("menus");
        console.log(data.data);
        if (data.meta.status === 200) {
          this.menulist = data.data;
        } else {
          this.$message({
            type: "error",
            message: data.meta.msg
          });
        }
      },*/
      // toggleCollapse() {
      //   this.isCollapse = !this.isCollapse;
      // }
      test () { //测试前后端交互
        this.$http.post('/home',{'date':'1', 'time':'2'}).then(successResponse => {
          console.log(successResponse.data[0]);
          console.log(test11(5));
          if (successResponse.data.code === 200) {
            console.log('111'); 
          }
        })
      }

    },
    /*created() {
      this.getMenuList();
    }*/

  };

</script>

<style lang="less" scoped>
.el-header {
  background-color: #b3c0d1;
  display: flex;
  // justify-content: space-between;
  padding-left: 10px;
  align-items: center;
  color: #333;
  font-size: 30px;
  line-height: 20px;
  // height: 500px;
  //  > div {
  //   display: flex;
  //  align-items: center;
  //   span {
  //     margin-left: 15px;
  //   }
  //  }

  img {
    width: 50px;
    height: 50px;
  }
}

// .el-aside {
//   // background-color: #333;
//   .el-menu {
//     border-right: none;
//   }

// }

.el-main {
  background-color: #eaedf1;
  height: 100%;
  width: 100%;
}
.Map {
  height: 100%;
  width: 100%;
}
.iconfont {
  margin-right: 10px;
}

.legend {
    width: 100px;
    position: absolute;
    right: 50px;
    bottom: 25px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.legend ul {
    overflow: hidden;
    list-style: none;
    margin: 0;
    padding: 0;
}

.legend ul li {
    float: left;
    height: 30px;
}

.legend ul li a {
    float: left;
    color: #555;
    font-size: 14px;
    text-decoration: none;
    height: 30px;
    line-height: 30px;
}

.legend ul li span {
    float: left;
    width: 14px;
    height: 14px;
    margin: 8px;
}

.el-dropdown-link {
  cursor: pointer;
  //color: #409EFF;
  color:black;
}
.el-icon-arrow-down {
  font-size: 12px;
}
// .toggle-button {
//   // background-color: #4a5064;
//   font-size: 10px;
//   line-height: 24px;
//   color: #333;
//   text-align: center;
//   letter-spacing: 0.2em;
//   cursor: pointer;
// }

</style>