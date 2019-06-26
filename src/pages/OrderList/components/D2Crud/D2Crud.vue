<template>
  <div class="d2-crud">
    <el-form :model="form" ref="form" >
      <el-form-item label="查询的用户手机号" prop="mobile">
        <el-input v-model="form.mobile" />
      </el-form-item>
      <el-form-item label="查询订单号" prop="order_code">
        <el-input v-model="form.order_code" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
      </el-form-item>
    </el-form>
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      title="订单详情"
      :data="data"
      @dialog-cancel="handleDialogCancel"
      @custom-emit-1='orderDetail'
      />
      <el-dialog
        width="400"
        :visible.sync="dialogVisible">
        <p>ddd</p>
      </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import D2Crud from '@d2-projects/d2-crud'
import { postUrl } from '@/api'
import { order_list,order_info } from '@/api/apiUrl'

Vue.use(D2Crud)

export default {
  data() {
    return {
      columns: [
        {
          title: '日期',
          key: 'date',
          width: '180'
        },
        {
          title: '姓名',
          key: 'name',
          width: '180'
        },
        {
          title: '地址',
          key: 'address'
        }
      ],
      data: [],
      // rules: {
      //   mobile: [ { required: true, message: '请输入查询的用户手机号', trigger: 'blur' } ],
      //   order_code: [ { required: true, message: '请输入订单号', trigger: 'blur' } ],
      // },
      rowHandle: {
        columnHeader: '操作',
        width: '340',
        align:'center',
        custom:[
          {
            text: '查看详情',
            size: 'small',
            emit: 'custom-emit-1',
            show(){
              return true;
            }
          }
        ]
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      form:{
        mobile: null,//查询的用户手机号
        order_code: null,//查询订单号
      },
      dialogVisible:false,
    }
  },
  mounted(){
    // this.orderDetail()
  },
  methods:{
    //提交表单
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //查询订单列表
          let data = await postUrl(order_list,{
            mobile: this.form.order_code,
            order_code: this.form.order_code,
            page_index: this.pagination.currentPage, //页码
            page_size: this.pagination.pageSize, //每页个数

          });
          console.log('查询订单列表 返回结果：',data)
          this.$message.success('查询成功');
        } else {
          console.log('error submit!!');
          return false;
        }
        this.form.mobile = null;
        this.form.order_code = null;
      })
    },
    async orderDetail(){
      let data = await postUrl(order_info,{
        order_code: '1377201906210829451325858',

      });
      console.log('查询订单详情 返回结果：',data);
      this.dialogVisible = true;
    },

    handleDialogCancel (done) {
      this.$message({
        message: '取消保存',
        type: 'warning'
      });
      done()
    },
  }
}

</script>
