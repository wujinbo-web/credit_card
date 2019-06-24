<template>
  <div class="d2-crud">
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="data"
      :rowHandle="rowHandle"
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
  </div>
</template>

<script>
import Vue from 'vue'
import D2Crud from '@d2-projects/d2-crud'

import { postUrl } from '@/api'
import { payment_list,payment_queryByChannel } from '@/api/apiUrl'
Vue.use(D2Crud)

export default {
  data() {
    return {
      columns: [
        {
          title: '代理通道',
          key: 'channel_agent',
          width: '100'
        },
        {
          title: '通道编码',
          key: 'channel_code',
          width: '100'
        },
        {
          title: '标题',
          key: 'title',
          width: '180'
        },
        {
          title: '每日限制金额',
          key: 'day_limit_money',
          width: '120'
        },

        {
          title: 'time_end',
          key: 'day_time_end',
          width: '100'
        },
        {
          title: 'time_start',
          key: 'day_time_start',
          width: '100'
        },
        {
          title: 'fee_per',
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
          title: '单张卡每日限制金额',
          key: 'single_card_day_limit_money',
          width: '100'
        },
        {
          title: '单张卡金额限制',
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
          title: '通道编码',
          key: 'channel_code',
          width: '100'
        },
        {
          title: 'time_end',
          key: 'day_time_end',
          width: '100'
        },
        {
          title: 'time_start',
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
          title: 'fee_per',
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
        width: '180',
        custom: [
          {
            text: '关联会员查询',
            type: 'warning',
            size: 'small',
            emit: 'custom-emit-1'
          }
        ]
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
    }
  }
}

</script>
