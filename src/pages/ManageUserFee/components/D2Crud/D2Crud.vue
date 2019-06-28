<template>
  <div class="d2-crud">
    <!-- <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="data"
      title="D2 CRUD"
      :rowHandle="rowHandle"
      @custom-emit-1='setUserqueryFeeQuick'
      @custom-emit-2='updateUserFeeQuick'
      @custom-emit-3='setUserFeeNormal'
      @custom-emit-4='updateUserFeeNormal'
      @dialog-cancel="handleDialogCancel"
      /> -->
          <el-button v-if="isSetFee"  @click="setUserqueryFeeQuick2">快捷设置</el-button>
          <el-button v-if="isSetFee" type="primary"  @click="setUserFeeNormal2">代扣代付设置</el-button>

          <el-button @click="updateUserFeeQuick2">快捷更新</el-button>
          <el-button type="primary" @click="updateUserFeeNormal2">代扣代付更新</el-button>
      <d2-crud
        ref="d2Crud2"
        :columns="columns2" 
        :data="data2"/>
      </d2-crub>
  </div>
</template>

<script>
import Vue from 'vue'
import D2Crud from '@d2-projects/d2-crud'
import { postUrl } from '@/api'
import { user_list, user_add,user_setGrade,set_queryFee,set_UserFeeQuick,update_UserFeeQuick,set_UserFeeNormal,update_UserFeeNormal,user_queryFee } from '@/api/apiUrl'

Vue.use(D2Crud)

export default {
  data() {
    return {
      // columns: [
      //   {
      //     title: '用户ID',
      //     key: 'id',
      //     align:'center',
      //     width: '80'
      //   },
      // ],
      // data: [],
      // rowHandle: {
      //   columnHeader: '手续费',
      //   width: '500',
      //   align:'center',
      //   custom:[
      //     {
      //       text: '快捷设置',
      //       size: 'small',
      //       emit: 'custom-emit-1',
      //       show(){
      //         return true;
      //       }
      //     },
      //     {
      //       text: '快捷更新',
      //       type: 'small',
      //       size: 'small',
      //       emit: 'custom-emit-2',
      //       show(){
      //         return true;
      //       }
      //     },
      //     {
      //       text: '代扣代付设置',
      //       type: 'primary',
      //       size: 'small',
      //       emit: 'custom-emit-3',
      //       show(){
      //         return true;
      //       }
      //     },
      //     {
      //       text: '代扣代付更新',
      //       type: 'primary',
      //       size: 'small',
      //       emit: 'custom-emit-4',
      //       show(){
      //         return true;
      //       }
      //     }
      //   ]
      // },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      columns2: [
        {
          title: '渠道商通道',
          key: 'channel_code',
          align:'center',
          width: '120'
        },
        {
          title: 'id',
          key: 'id',
          align:'center',
          width: '100'
        },
        {
          title: 'start_amt',
          key: 'start_amt',
          align:'center',
          width: '120'
        },
        {
          title: 'end_amt',
          key: 'end_amt',
          align:'center',
          width: '120'
        },
        {
          title: 'enable',
          key: 'enable',
          align:'center',
          width: '120'
        },
        {
          title: '固定费用',
          key: 'fixed_rate',
          align:'center',
          width: '120'
        },
        {
          title: 'rate',
          key: 'rate',
          align:'center',
          width: '100'
        },
        {
          title: '同步',
          key: 'sync',
          align:'center',
          width: '100'
        },
      ],
      data2: [],
      isSetFee:true,//显示设置 or 更新 默认显示设置
      userID:'',//router获取来的userid
    }
  },
  mounted(){
    this.userID = this.$route.query.user_id;
    this.userqueryFee();
  },
  methods: {
    //查看用户手续费
    async userqueryFee(){
      let data = await postUrl(user_queryFee,{
        user_id: this.userID
      });
      this.data2 = data;
      if(this.data2.length == 0){
        this.isSetFee = true;
      }else{
        this.isSetFee = false;
      }
      console.log('查看用户手续费：',this.data2);
    },
    // 更新后
    //快捷设置 首次设置手续费
    async setUserqueryFeeQuick2(){
      let data = await postUrl(set_UserFeeQuick,{
        user_id: this.userID,
      });
      this.$message.success('快捷：首次设置手续费成功');
    },
    //快捷更新 更新手续费
    async updateUserFeeQuick2(){
      let data = await postUrl(update_UserFeeQuick,{
        user_id: this.userID,
      });
      this.$message.success('快捷：更新手续费成功');
    },
    //代扣代付设置 首次设置手续费 
    async setUserFeeNormal2(){
      let data = await postUrl(set_UserFeeNormal,{
        user_id: this.userID,
      });
      console.log('代扣代付 首次设置用户手续费 返回结果：',data)
      this.$message.success('代扣代付：首次设置用户手续费成功');
    },
    //代扣代付更新 更新手续费
    async updateUserFeeNormal2(){
      let data = await postUrl(update_UserFeeNormal,{
        user_id: this.userID,
      });
      console.log('代扣代付 更新手续费 返回结果：',data);
      this.$message.success('代扣代付：更新手续费成功');
    },
    handleSelectionChange (selection) {
      console.log(selection)
    },

  }
}

</script>
