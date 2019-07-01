<template>
  <div class="d2-crud">
    <el-button slot="header" style="margin-bottom: 5px" @click="addRow">新增</el-button>
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="data"
      :rowHandle="rowHandle"
      :add-template="addTemplate"
      :edit-template="editTemplate"
      @row-add="handleRowAdd"
      @row-edit="handleRowEdit"
      @dialog-cancel="handleDialogCancel"
      @custom-emit-1="showDialog"/>
      <el-dialog
        width="800"
        :visible.sync="dialogVisible2"
      >
        <d2-crud
          ref="d2Crud2"
          title="支付通道关联会员配置查询"
          :columns="columns2"
          :data="data2"/>
      </el-dialog>
    </d2-crud>
  </div>
</template>

<script>
import Vue from 'vue'
import D2Crud from '@d2-projects/d2-crud'

import { postUrl } from '@/api'
import { payment_list,payment_queryByChannel,payment_add,payment_edit } from '@/api/apiUrl'
import TimeSelect from './TimeSelect';
Vue.use(D2Crud)

export default {
  data() {
    return {
      columns: [
        {
          title: '渠道商名',
          key: 'channel_agent',
          width: '100'
        },
        {
          title: '渠道商通道 ',
          key: 'channel_code',
          width: '100'
        },
        {
          title: '标题',
          key: 'title',
          width: '180'
        },
        {
          title: '每日限制额度 元',
          key: 'day_limit_money',
          width: '120'
        },

        {
          title: '可交易时间结束',
          key: 'day_time_end',
          width: '100'
        },
        {
          title: '可交易时间开始 ',
          key: 'day_time_start',
          width: '100'
        },
        {
          title: '百分比',
          key: 'fee_per',
          width: '100'
        },
        {
          title: '固定费用',
          key: 'fixed_fee',
          width: '100'
        },
        {
          title: 'ID',
          key: 'id',
          width: '80'
        },
        {
          title: '单卡单日 元',
          key: 'single_card_day_limit_money',
          width: '100'
        },
        {
          title: '单笔额度 元',
          key: 'single_limit_money',
          width: '100'
        },
      ],
      data: [],
      columns2: [
        {
          title: 'channel_id',
          key: 'channel_id',
          width: '100'
        },
        {
          title: '渠道商通道',
          key: 'channel_code',
          width: '100'
        },
        {
          title: '可交易时间结束',
          key: 'day_time_end',
          width: '100'
        },
        {
          title: '可交易时间开始',
          key: 'day_time_start',
          width: '100'
        },
        {
          title: '标题',
          key: 'title',
          width: '100'
        },

        {
          title: 'start_amt',
          key: 'start_amt',
          width: '100'
        },
        {
          title: 'end_amt',
          key: 'end_amt',
          width: '100'
        },
        {
          title: '百分比',
          key: 'fee_per',
          width: '100'
        },
        {
          title: '固定费用',
          key: 'fixed_fee',
          width: '100'
        },
        {
          title: 'ID',
          key: 'id',
          width: '80'
        },
        {
          title: 'grade_code',
          key: 'grade_code',
          width: '100'
        },
      ],
      data2: [],
      rowHandle: {
        width: '280',
        custom: [
          {
            text: '关联会员查询',
            type: 'warning',
            size: 'small',
            emit: 'custom-emit-1'
          }
        ],
        edit: {
          text: '编辑',
          size: 'small',
          show (index, row) {
            return true
          }
        },
      },
      addTemplate: {
        title: {
          title: '标题',
          value: '',
          component: {
            span: 24,
          }
        },
        id: {
          title: 'id',
          value: '',
          component: {
            span: 24,
          }
        },
        fee_per: {
          title: '百分比费率 单位 : %',
          value: '',
          component: {
            span: 24
          }
        },
        fixed_fee: {
          title: '固定费率 单位：元',
          value: '',
          component: {
            span: 24
          }
        },
        day_time_start: {
          title: '一天开始 0000',
          value: '',
          component: {
            span: 24
          }
        },
        day_time_end: {
          title: '一天结束 2399',
          value: '',
          component: {
            span: 24
          }
        },
        single_limit_money: {
          title: '单笔限额',
          value: '',
          component: {
            span: 24
          }
        },
        single_card_day_limit_money: {
          title: '单卡单日限额',
          value: '',
          component: {
            span: 24
          }
        },
        day_limit_money: {
          title: '单日限额',
          value: '',
          component: {
            span: 24
          }
        },
        channel_code: {
          title: '渠道商通道',
          value: '',
          component: {
            name: 'el-select',
            options: [
              {
                value: '488000',
                label: '提现'
              },
              {
                value: '487000',
                label: '支付'
              },
              {
                value: '663006',
                label: '快捷'
              }
            ],
            size: 'small'
          }
        },
        channel_agent: {
          title: '渠道商名',
          value: '',
          component: {
            name: 'el-select',
            options: [
              {
                value: 'zmf',
                label: '暂定'
              },
            ],
            size: 'small'
          }
        },
      },
      editTemplate: {
        title: {
          title: '标题',
          value: '',
          component: {
            span: 24,
          }
        },
        id: {
          title: 'id',
          value: '',
          component: {
            span: 24,
          }
        },
        fee_per: {
          title: '百分比费率 单位 : %',
          value: '',
          component: {
            span: 24
          }
        },
        fixed_fee: {
          title: '固定费率 单位：元',
          value: '',
          component: {
            span: 24
          }
        },
        day_time_start: {
          title: '一天开始 0000',
          value: '',
          component: {
            span: 24
          }
        },
        day_time_end: {
          title: '一天结束 2399',
          value: '',
          component: {
            span: 24
          }
        },
        single_limit_money: {
          title: '单笔限额',
          value: '',
          component: {
            span: 24
          }
        },
        single_card_day_limit_money: {
          title: '单卡单日限额',
          value: '',
          component: {
            span: 24
          }
        },
        day_limit_money: {
          title: '单日限额',
          value: '',
          component: {
            span: 24
          }
        },
        channel_code: {
          title: '渠道商通道',
          value: '',
          component: {
            name: 'el-select',
            options: [
              {
                value: '488000',
                label: '提现'
              },
              {
                value: '487000',
                label: '支付'
              },
              {
                value: '663006',
                label: '快捷'
              }
            ],
            size: 'small'
          }
        },
        channel_agent: {
          title: '渠道商名',
          value: '',
          component: {
            name: 'el-select',
            options: [
              {
                value: 'zmf',
                label: '暂定'
              },
            ],
            size: 'small'
          }
        },
      },
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false,
        gutter: 20
      },
      dialogVisible: false,
      dialogVisible2: false,
      pagination: {
        currentPage:1,
        pageSize:10,
        total:1,
      },
    }
  },
  mounted(){
    this.getPaymentList();
  },
  methods:{
    //请求数据
    async  getPaymentList(){
      let data = await postUrl(payment_list,{
        page_index: this.pagination.currentPage,
        page_size: this.pagination.pageSize,
      });
      console.log('请求数据：',data);
      this.data = data;
      this.data.map(item => {
        return{
          // createTime: timeSite(item.createTime),
          // sendTime: timeSite(item.sendTime),
          channel_agent: item.channel_agent,
          channel_code: item.channel_code,
          day_limit_money: item.day_limit_money,
          day_time_end: item.day_time_end,
          day_time_start: item.day_time_start,
          fee_per: item.fee_per,
          fixed_fee: item.fixed_fee,
          single_card_day_limit_money: item.single_card_day_limit_money,
          single_limit_money: item.single_limit_money,
          title: item.title,
          id: item.id,
        }
      })
    },
    async showDialog({ row, index }){
      // this.dialogVisible = true;
      this.dialogVisible2 = true;
      let data = await postUrl(payment_queryByChannel,{
        channel_id: row.id,
      });
      this.data2 = data;
      this.data2.map(item => {
        return{
          channel_id: item.channel_id,
          channel_code: item.channel_code,
          day_time_end: item.day_time_end,
          day_time_start: item.day_time_start,
          start_amt: item.start_amt,
          end_amt: item.end_amt,
          fee_per: item.fee_per,
          fixed_fee: item.fixed_fee,
          grade_code: item.grade_code,
          title: item.title,
          id: item.id,
        }
      })
      console.log('支付宝通道',data)
    },
    // 普通的新增
    addRow () {
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    },
    async handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      console.log(row)
      let data = await postUrl(payment_add,{
        title: row.title,
        fee_per:row.fee_per,
        fixed_fee: row.fixed_fee,
        day_time_start: row.day_time_start,
        day_time_end: row.day_time_end,
        single_limit_money: row.single_limit_money,
        single_card_day_limit_money:row.single_card_day_limit_money,
        day_limit_money: row.day_limit_money,
        channel_code: row.channel_code,
        channel_agent: row.channel_agent,
      });
      console.log(data);
      // this.$message({
      //   message: '保存成功',
      //   type: 'success'
      // });
      done()
      this.formOptions.saveLoading = false
    },
    // 修改
    handleRowEdit ({index, row}, done) {
      this.formOptions.saveLoading = true
      let data =  postUrl(payment_edit,{
        id:row.id,
        title: row.title,
        fee_per:row.fee_per,
        fixed_fee: row.fixed_fee,
        day_time_start: row.day_time_start,
        day_time_end: row.day_time_end,
        single_limit_money: row.single_limit_money,
        single_card_day_limit_money:row.single_card_day_limit_money,
        day_limit_money: row.day_limit_money,
        channel_code: row.channel_code,
        channel_agent: row.channel_agent,
      });
      // this.$message({
      //   message: '编辑成功',
      //   type: 'success'
      // })
      done()
      this.formOptions.saveLoading = false
    },
    handleDialogCancel (done) {
      // this.$message({
      //   message: '取消保存',
      //   type: 'warning'
      // });
      done()
    },
  }
}

</script>
