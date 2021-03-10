<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>购物车管理</el-breadcrumb-item>
      <el-breadcrumb-item>购物车</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <el-card> -->
      <!-- <el-table :data="rightsList" border stripe style="width: 100%">
        <el-table-column type="index"></el-table-column> 
        <el-table-column prop="shopping_cart_id" label="购物车ID"></el-table-column>
        <el-table-column prop="ueser_id" label="用户ID"></el-table-column>
        <el-table-column prop="goods_num" label="所购商品数量"></el-table-column>
        <el-table-column prop="shopping_time" label="购物时间"></el-table-column>
        <el-table-column prop="goods_id" label="商品ID"></el-table-column> -->
        <!-- <el-table-column type="index"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column> -->
        <!-- <el-table-column label="权限等级">
          <template v-slot="scope">
            <el-tag v-if="scope.row.level==='0'">一级</el-tag>
            <el-tag v-if="scope.row.level==='1'" type="success">二级</el-tag>
            <el-tag v-if="scope.row.level==='2'" type="info">三级</el-tag>
          </template>
        </el-table-column> -->
      <!-- </el-table> -->
    <!-- </el-card> -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="购物车ID"
            clearable
            @clear="getCartList"
            v-model="queryInfo.query"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getCartList"
            ></el-button>
          </el-input>
        </el-col>
        <!-- <el-col :span="1">
          <el-button type="primary" @click="dialogVisible = true"
            >添加用户</el-button
          >
        </el-col> -->
      </el-row>
      <el-table :data="cartList" border stripe style="width: 100%">
        <!-- <el-table-column type="index"></el-table-column> -->
        <el-table-column prop="shopping_cart_id" label="购物车ID"></el-table-column>
        <el-table-column prop="user_id" label="用户ID"></el-table-column>
        <el-table-column prop="goods_num" label="所购商品数量"></el-table-column>
        <el-table-column prop="shopping_time" label="购物时间"></el-table-column>
        <el-table-column prop="goods_id" label="商品ID"></el-table-column>
        <!--<el-table-column label="状态">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>-->
        <!-- <el-table-column label="操作"> -->
          <!-- 编辑用户 -->
          <!-- <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="showEditDialog(scope.row.id)"
              size="mini"
            ></el-button> -->
            <!-- 删除用户 -->
            <!-- <el-button
              type="danger"
              @click="deleteUser(scope.row.id)"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
          </template>
        </el-table-column> -->
      </el-table>
            <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // rights]List: []
      cartList:[],
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      total: 0
    };
  },
  methods: {
    async getCartList() { 
      const { data } = await this.$http.get("rights",{
        params: this.queryInfo
      });
      console.log(data.data);
      // if (data.meta.status !== 200) {
      //   return this.$message.error(data.meta.msg);
      // }
      this.cartList = data.data.cart;
      this.total = data.data.total;
    }
  },
  created() {
    this.getCartList();
  }
};
</script>

<style lang="less" scoped>
</style>