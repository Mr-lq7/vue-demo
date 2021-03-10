<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入商品名字"
            clearable
            v-model="queryInfo.query"
            @clear="getGoodsList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleCurrentChange(1);getGoodsList;"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click='dialogVisible = true'>添加商品</el-button>
        </el-col>
      </el-row>

      <el-table :data="goodslist" stripe border style="width: 100%">
        <!-- <el-table-column type="index"> </el-table-column> -->
        <el-table-column prop="goods_id" label="商品ID"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column prop="status" label="商品销售状态"></el-table-column>
        <el-table-column prop="price" label="商品价格"></el-table-column>
        <el-table-column prop="stock_num" label="库存数量"></el-table-column>
        <el-table-column prop="category_id" label="商品种类"></el-table-column>
        <!-- <el-table-column
          prop="goods_price"
          label="商品价格（元）"
          width="95px"
        ></el-table-column>
        <el-table-column
          prop="goods_weight"
          label="商品重量"
          width="70px"
        ></el-table-column> -->
        <!-- <el-table-column prop="add_time" label="创建时间" width="170px">
          <template v-slot="scope">
            {{ scope.row.add_time | dateFormat }}
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="130px">
          <template v-slot="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="showEditDialog(scope.row.goods_id)"
            ></el-button>
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-delete"
              @click="removeById(scope.row.goods_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[10, 20, 50]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>
        <!-- 添加商品对话框 -->
    <el-dialog
      title="添加商品"
      :visible.sync="dialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form
        :model="addGoodsForm"
        ref="addGoodsFormRef"
        label-width="90px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="addGoodsForm.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="销售状态" prop="status">
          <el-input v-model="addGoodsForm.status"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="addGoodsForm.price"></el-input>
        </el-form-item>
        <el-form-item label="库存数量" prop="stock_num">
          <el-input v-model="addGoodsForm.stock_num"></el-input>
        </el-form-item>
          <el-form-item label="商品种类ID" prop="category_id">
          <el-input v-model="addGoodsForm.category_id"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addGoods">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改商品"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        :model="editGoodsForm"
        ref="editGoodsFormRef"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称">
          <el-input v-model="editGoodsForm.goods_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品状态" prop="status">
          <el-input v-model="editGoodsForm.status"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="editGoodsForm.price"></el-input>
        </el-form-item>
        <el-form-item label="库存数量" prop="stock_num">
          <el-input v-model="editGoodsForm.stock_num"></el-input>
        </el-form-item>
        <el-form-item label="商品种类" prop="category_id">
          <el-input v-model="editGoodsForm.category_id"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editGoods">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
        id : ""
      },
      goodslist: [],
      dialogVisible:false,
      editDialogVisible: false,
      addGoodsForm: {
        goods_name: "",
        status: "",
        price: "",
        stock_num: "",
        category_id:""
      },
      editGoodsForm: {},
      total: 0
    };
  },
  methods: {
    async getGoodsList() {
      const { data } = await this.$http.get("goods", {
        params: this.queryInfo
      });
      // if (data.meta.status !== 200) {
      //   return this.$message.error(data.meta.msg);
      // }
      console.log(data)
      console.log(this.queryInfo.pagenum)
      var x = (this.queryInfo.pagenum) * (this.queryInfo.pagesize);
      var be = (this.queryInfo.pagenum-1) * (this.queryInfo.pagesize);
      console.log(data.data.goods);
      this.goodslist = []
      for(var i = be; i < x; ++i)
        this.goodslist.push(data.data.goods[i]);
      // this.goodslist = data.data.goods;
      console.log(this.goodslist);
      this.total = data.data.total;
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getGoodsList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getGoodsList();
    },
    // removeById(id) {
    //   this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(async () => {
    //       const { data } = await this.$http.delete(`goods/${id}`);
    //       if (data.meta.status !== 200) {
    //         return this.$message.error(data.meta.msg);
    //       }
    //       this.getGoodsList();
    //       this.$message({
    //         type: "success",
    //         message: "删除成功!"
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // },
    async removeById(id) {
      const confirmResult = await this.$confirm(
        '此操作将用就删除该商品,是否继续?',
        '提示',
        {
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }
      ).catch(err => err)
      //如果用户确认删除,则返回值为字符串,confirm
      //如果用户取消删除,则返回值为字符串,cancel
      console.log(confirmResult)
      if(confirmResult !== 'confirm') {
        return this.$message.info('已取消删除');
      }
      console.log(id)
      const  {data} = await this.$http.delete('goods?id='+id);
      console.log(data)
      if (data.data !== '200') {
        return this.$message.error('删除商品失败')
      }
      else this.$message.success('删除商品成功')

      this.getGoodsList();
    },
    addDialogClosed() {
      this.$refs.addGoodsFormRef.resetFields();
    },
    editDialogClosed() {
      this.queryInfo.id = '';
      this.$refs.editGoodsFormRef.resetFields();
    },
    async showEditDialog(id) {
      // const { data } = await this.$http.get(`users/${id}`);
      this.queryInfo.id = 'm'+id;
      const { data } = await this.$http.get("goods",
      {params: this.queryInfo});
      // if (data.meta.status !== 200) {
      //   this.$message.error("查询用户失败！");
      // }
      console.log('11111111111')
      console.log(data.data);
      this.editGoodsForm = data.data;
      console.log(this.editUserForm)
      // this.editUserForm.push(data.data);
      console.log(id);
      this.editDialogVisible = true;
    },
    editGoods() {
      this.$refs.editGoodsFormRef.validate(async valid => {
        if (!valid) return;
        // const { data } = await this.$http.put(`users/${this.editUserForm.id}`, {
        //   email: this.editUserForm.email,
        //   mobile: this.editUserForm.mobile
        // });
        const {data} = await this.$http.put('goods',{
          goods_name:this.editGoodsForm.goods_name,status:this.editGoodsForm.status,
          price:this.editGoodsForm.price,stock_num:this.editGoodsForm.stock_num,
          category_id :this.editGoodsForm.category_id,id:this.queryInfo.id})
        // const {data} = await this.$http.put('goods',(this.editGoodsForm,id:this.queryInfo.id))
        console.log(data)
        if (data.data !== '200') {
          this.$message.error("修改用户信息失败！");
        }
        else this.$message.success("修改成功！");
        this.editDialogVisible = false;
        this.getGoodsList();
      });
    },
    addGoods() {
      this.$refs.addGoodsFormRef.validate(async valid => {
        if (!valid) return;
        const { data } = await this.$http.post("goods", this.addGoodsForm);
        console.log('2456')
        console.log(data)
        if (data.data == '404') {
          this.$message.error("添加商品失败！商品已存在");
        } 
        else this.$message.success("添加商品成功！");
        this.dialogVisible = false;
        this.getGoodsList();
      });
    }
    // goAddPage() {
    //   this.$router.push("goods/add");
    // }
  },
  created() {
    this.getGoodsList();
  }
};
</script>

<style lang="less" scoped></style>
