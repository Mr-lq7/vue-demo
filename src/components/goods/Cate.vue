<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入商品种类名称"
            clearable
            v-model="queryInfo.query"
            @clear="getCateList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleCurrentChange(1);getCateList;"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible=true">添加商品类别</el-button>
        </el-col>
      </el-row>

      <el-table :data="catelist" stripe border style="width: 100%">
        <!-- <el-table-column type="index"> </el-table-column> -->
        <el-table-column prop="category_id" label="商品类别ID"></el-table-column>
        <el-table-column prop="category_name" label="类别名称"></el-table-column>
        <el-table-column prop="update_time" label="更新时间"></el-table-column>
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
              @click="showEditDialog(scope.row.category_id)"
            ></el-button>
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-delete"
              @click="removeById(scope.row.category_id)"
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
    <el-dialog
      title="添加商品类别"
      :visible.sync="dialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form
        :model="addCateForm"
        ref="addCateFormRef"
        label-width="90px"
        class="demo-ruleForm"
      >
        <el-form-item label="类别名称" prop="category_name">
          <el-input v-model="addCateForm.category_name"></el-input>
        </el-form-item>


      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
        <el-dialog
      title="修改商品类别参数"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        :model="editCateForm"
        ref="editCateFormRef"
        label-width="70px"
        class="demo-ruleForm"
      >
        <!-- <el-form-item label="类别名称">
          <el-input v-model="editCateForm.category_name" disabled></el-input>
        </el-form-item> -->
        <el-form-item label="类别名称" prop="category_name">
          <el-input v-model="editCateForm.category_name"></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input v-model="editCateForm.update_time" disabled></el-input>
        </el-form-item>
        <!-- <el-form-item label="库存数量" prop="stock_num">
          <el-input v-model="editGoodsForm.stock_num"></el-input>
        </el-form-item>
        <el-form-item label="商品种类" prop="category_id">
          <el-input v-model="editGoodsForm.category_id"></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加分类对话框 -->
    <!-- <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      @close="addCateDialogClosed"
      width="50%"
    >
      <el-form
        ref="addCateFormRef"
        :model="addCateForm"
        :rules="addCateFormRules"
        label-width="100px"
      >
        <el-form-item label="分类名称：" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类：">
          <el-cascader
            :options="parentCateList"
            :props="cascadarProps"
            clearable
            v-model="selectKeys"
            @change="parentCateChanged"
          >
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      catelist: [],
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10,
        id:''
      },
      total: 0,
      columns: [
        {
          label: "分类名称",
          prop: "cat_name"
        },
        {
          label: "是否有效",
          type: "template",
          template: "isok"
        },
        {
          label: "排序",
          type: "template",
          template: "order"
        },
        {
          label: "操作",
          type: "template",
          template: "opt"
        }
      ],
      addCateDialogVisible: false,
      editDialogVisible:false,
      dialogVisible:false,
      addCateForm: {
        category_name: "",
        // cat_pid: 0,
        // cat_level: 0
        update_time:""
      },
      editCateForm:{
        category_name:"",
        update_time:''
      },
      // addCateFormRules: {
      //   cat_name: [
      //     { required: true, message: "请输入分类名称", trigger: "blur" }
      //   ]
      // },
      parentCateList: [],
      cascadarProps: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children",
        checkStrictly: true
      },
      selectKeys: []
    };
  },
  methods: {
    async getCateList() {
      const { data } = await this.$http.get("categories", {
        params: this.queryInfo
      });
      // if (data.meta.status !== 200) {
      //   return this.$message.error(data.meta.msg);
      // }
      console.log(data.data)
      this.catelist = data.data.categories;
      this.total = data.data.total;
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getCateList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getCateList();
    },
    showAddCateDialog() {
      this.getParentCateList();
      this.addCateDialogVisible = true;
    },
    async getParentCateList() {
      const { data } = await this.$http.get("categories", {
        params: { type: 2 }
      });
      if (data.meta.status !== 200) {
        return this.$message.error(data.meta.msg);
      }
      this.parentCateList = data.data;
    },
    parentCateChanged() {
      if (this.selectKeys.length > 0) {
        this.addCateForm.cat_pid = this.selectKeys[this.selectKeys.length - 1];
        this.addCateForm.cat_level = this.selectKeys.length;
        return;
      } else {
        this.addCateForm.cat_pid = 0;
        this.addCateForm.cat_level = 0;
      }
    },
    addCateDialogClosed() {
      this.$refs.addCateFormRef.resetFields();
      this.selectKeys = [];
      this.addCateForm.cat_pid = 0;
      this.addCateForm.cat_level = 0;
    },
    addDialogClosed() {
      this.$refs.addCateFormRef.resetFields();
    },
    addCate() {
      this.$refs.addCateFormRef.validate(async valid => {
        if (!valid) return;
        const { data } = await this.$http.post("categories", this.addCateForm);
        if (data.data == '404') {
          return this.$message.error("添加商品分类失败！商品类别已存在");
        }
        else this.$message.success('添加分类成功！')
        this.getCateList()
        this.addCateDialogVisible = false
        this.dialogVisible = false
      });
    },
    editDialogClosed() {
      this.queryInfo.id = '';
      this.$refs.editCateFormRef.resetFields();
    },
    async showEditDialog(id) {
      // const { data } = await this.$http.get(`users/${id}`);
      this.queryInfo.id = 'm'+id;
      const { data } = await this.$http.get("categories",
      {params: this.queryInfo});
      // if (data.meta.status !== 200) {
      //   this.$message.error("查询用户失败！");
      // }
      console.log('11111111111')
      console.log(data.data);
      this.editCateForm = data.data;
      console.log(this.editCateForm)
      // this.editUserForm.push(data.data);
      console.log(id);
      this.editDialogVisible = true;
    },
    editCate() {
      this.$refs.editCateFormRef.validate(async valid => {
        if (!valid) return;
        // const { data } = await this.$http.put(`users/${this.editUserForm.id}`, {
        //   email: this.editUserForm.email,
        //   mobile: this.editUserForm.mobile
        // });
        const {data} = await this.$http.put('categories',{
          category_name:this.editCateForm.category_name,id:this.queryInfo.id})
        // const {data} = await this.$http.put('goods',(this.editGoodsForm,id:this.queryInfo.id))
        console.log(data)
        if (data.data !== '200') {
          this.$message.error("修改类别信息失败！");
        }
        else this.$message.success("修改成功！");
        this.editDialogVisible = false;
        this.getCateList();
      });
    },
    async removeById(id) {
      const confirmResult = await this.$confirm(
        '此操作将用就删除该商品类别,是否继续?',
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
      const  {data} = await this.$http.delete('categories?id='+id);
      console.log(data)
      if (data.data !== '200') {
        return this.$message.error('删除商品分类失败')
      }
      else this.$message.success('删除商品分类成功')

      this.getCateList();
    },
  },
  created() {
    this.getCateList();
  }
};
</script>

<style lang="less" scoped>
.TreeTable {
  margin-top: 15px;
}

.el-cascader {
  width: 100%;
}
</style>
