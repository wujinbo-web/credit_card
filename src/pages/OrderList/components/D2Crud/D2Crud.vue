<template>
  <div class="d2-crud">

    <el-form :model="form" ref="form" >
      <!-- <el-form-item label="查询的用户手机号" prop="mobile" label-width="100">
        <input class="el-input__inner query_input" v-model="form.mobile" maxlength="100" />
      </el-form-item>
      <el-form-item label="查询订单号" prop="order_code">
        <input  class="el-input__inner query_input" v-model="form.order_code" />
      </el-form-item> -->
      <el-form-item>
        <input class="el-input__inner query_input" v-model="form.mobile" maxlength="100" placeholder="请输入查询的用户手机号" />
        <input  class="el-input__inner query_input" v-model="form.order_code"  placeholder="请输入查询订单号" />
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
      </el-form-item>
    </el-form>
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      title="订单详情"
      :data="data"
      :pagination="pagination"
      @pagination-current-change="paginationCurrentChange"
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
import { timeSite } from '@/tool/TimeTransition'
Vue.use(D2Crud)

export default {
  data() {
    return {
      columns: [
        {
          title: 'id',
          key: 'id',
          width: '80',
          align:'center'
        },
        {
          title: '价格',
          key: 'amount',
          width: '80',
          align:'center'
        },
        {
          title: '自动撤销',
          key: 'auto_withdraw',
          width: '60',
          align:'center'
        },
        // {
        //   title: '克隆订单id',
        //   key: 'clone_order_id',
        //   width: '100'
        // },
        {
          title: '创建月份',
          key: 'create_month',
          width: '80',
          align:'center'
        },
        {
          title: '创建时间',
          key: 'create_time',
          width: '100',
          align:'center'
        },
        {
          title: '备注',
          key: 'note',
          width: '180',
          align:'center'
        },
        {
          title: '通知时间',
          key: 'notify_time',
          width: '100',
          align:'center'
        },
        {
          title: '订单号码',
          key: 'order_code',
          width: '180',
          align:'center'
        },
        {
          title: '订单状态',
          key: 'order_type',
          width: '80',
          align:'center'
        },
        // {
        //   title: '支付金额',
        //   key: 'pay_amount',
        //   width: '80'
        // },
        // {
        //   title: '支付卡',
        //   key: 'pay_card',
        //   width: '80'
        // },
        // {
        //   title: '支付产品编码',
        //   key: 'pay_product_code',
        //   width: '80'
        // },
        // {
        //   title: '支付比率',
        //   key: 'pay_rate',
        //   width: '80'
        // },
        // {
        //   title: '计划卡id',
        //   key: 'plan_card_id',
        //   width: '80'
        // },
        // {
        //   title: '计划id',
        //   key: 'plan_id',
        //   width: '80'
        // },
        {
          title: 'sys_fee',
          key: 'sys_fee',
          width: '100',
          align:'center'
        },
        {
          title: 'uid',
          key: 'uid',
          width: '60',
          align:'center'
        },
        {
          title: '更新时间',
          key: 'update_time',
          width: '100',
          align:'center'
        },
        {
          title: '上传结果',
          key: 'upload_result',
          width: '80',
          align:'center'
        },

        // {
        //   title: '撤销卡',
        //   key: 'withdraw_card',
        //   width: '80'
        // },
        // {
        //   title: '固定撤销比率',
        //   key: 'withdraw_fixrate',
        //   width: '80'
        // },
        {
          title: '银行卡名',
          key: '_card_name',
          width: '80',
          align:'center'
        },
        {
          title: '银行卡号',
          key: '_card_no',
          width: '80',
          align:'center'
        },
        {
          title: '状态',
          key: '_status',
          width: '80',
          align:'center'
        },
      ],
      data: [],
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
        mobile: '',//查询的用户手机号
        order_code: '',//查询订单号
      },
      dialogVisible:false,
    }
  },
  mounted(){
    this.submitForm('form');
  },
  methods:{
    //提交表单
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //查询订单列表
          let data = await postUrl(order_list,{
            mobile: this.form.mobile,
            order_code: this.form.order_code,
            page_index: this.pagination.currentPage, //页码
            page_size: this.pagination.pageSize, //每页个数

          });
          this.pagination.total = Number(data.count);
          //渲染表格数据
          this.data = data.list.map(item=>{
            return{
              amount: item.amount,//金额
              auto_withdraw:  item.auto_withdraw,//自动撤销
              clone_order_id: item.clone_order_id,//克隆订单id
              cost_fee: item.cost_fee,//费用比率
              create_month: item.create_month,//创建月
              create_time: timeSite(item.create_time),//创建时间
              id: item.id,//id
              note: item.note,//备注
              notify_time: timeSite(item.notify_time),//通知时间
              order_code: item.order_code,//订单号码
              order_type:item.order_type,//订单状态
              pay_amount: item.pay_amount,//支付金额
              pay_card: item.pay_card,//支付卡
              pay_fixrate:  item.pay_fixrate,//固定支付比率
              pay_product_code: item.pay_product_code,//支付产品编码
              pay_rate: item.pay_rate,//支付比率
              plan_card_id:item.plan_card_id,//计划银行卡id
              plan_id: item.plan_id,//计划id
              suc_proc_status: item.suc_proc_status,//suc_proc_status
              sys_fee: item.sys_fee,//sys_fee
              uid: item.uid,//用户id
              update_time: timeSite(item.update_time),//更新时间
              upload_result:item.upload_result,//上传结果
              withdraw_card: item.withdraw_card,//撤销卡
              withdraw_fixrate: item.withdraw_fixrate,//撤销固定比率
              withdraw_order_code:item.withdraw_order_code,//撤销订单号码
              withdraw_product_code:item.withdraw_product_code,//撤销产品编码
              withdraw_rate:item.withdraw_rate,//撤销率
              _card_name: item._card_name,//银行卡名称
              _card_no: item._card_no,//银行卡号
              _status: item._status,//状态
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
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
      // this.$message({
      //   message: '取消保存',
      //   type: 'warning'
      // });
      done()
    },
    //切换页码
    paginationCurrentChange (currentPage) {
      console.log(this.form.order_code);
        this.pagination.currentPage = currentPage;
        this.submitForm('form');
    },
  }
}

</script>

<style>
.query_input{
  width: 300px!important;
  margin-right: 20px;
}
</style>
