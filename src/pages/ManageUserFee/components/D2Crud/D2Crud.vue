<template>
  <div class="d2-crud">
    <d2-crud
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
      />
  </div>
</template>

<script>
import Vue from 'vue'
import D2Crud from '@d2-projects/d2-crud'
import { postUrl } from '@/api'
import { user_list, user_add,user_setGrade,set_queryFee,set_UserFeeQuick,update_UserFeeQuick,set_UserFeeNormal,update_UserFeeNormal } from '@/api/apiUrl'

Vue.use(D2Crud)

export default {
  data() {
    return {
      columns: [
        {
          title: '用户ID',
          key: 'id',
          align:'center',
          width: '80'
        },
      ],
      data: [],
      rowHandle: {
        columnHeader: '手续费',
        width: '500',
        align:'center',
        custom:[
          {
            text: '快捷设置',
            size: 'small',
            emit: 'custom-emit-1',
            show(){
              return true;
            }
          },
          {
            text: '快捷更新',
            type: 'small',
            size: 'small',
            emit: 'custom-emit-2',
            show(){
              return true;
            }
          },
          {
            text: '代扣代付设置',
            type: 'primary',
            size: 'small',
            emit: 'custom-emit-3',
            show(){
              return true;
            }
          },
          {
            text: '代扣代付更新',
            type: 'primary',
            size: 'small',
            emit: 'custom-emit-4',
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
      dialogVisible: false,
      dialogVisible3: false,
    }
  },
  mounted(){
    this.getUserList()
  },
  methods: {
    //请求用户列表数据
    async getUserList(){
      this.loading = true;
      let data = await postUrl(user_list,{
        page_index: this.pagination.currentPage, //页码
        page_size: this.pagination.pageSize, //每页个数
      });
      this.loading = false;
      //页码
      this.pagination.total = data.count;
      //渲染数据
      this.data = data.list.map(item => {
        return{
          id: item.id,
        }
      })
    },

    //快捷设置 首次设置手续费
    async setUserqueryFeeQuick({ row, index }){
      let data = await postUrl(set_UserFeeQuick,{
        user_id: row.id,
      });
      this.$message.success('快捷：首次设置手续费成功');
    },
    //快捷更新 更新手续费
    async updateUserFeeQuick({ row, index }){
      let data = await postUrl(update_UserFeeQuick,{
        user_id: row.id,
      });
      this.$message.success('快捷：更新手续费成功');
    },
    
    //代扣代付设置 首次设置手续费
    async setUserFeeNormal({ row, index }){
      let data = await postUrl(set_UserFeeNormal,{
        user_id: row.id,
      });
      console.log('代扣代付 首次设置用户手续费 返回结果：',data)
      this.$message.success('代扣代付：首次设置用户手续费成功');
    },
    //代扣代付更新 更新手续费
    async updateUserFeeNormal({ row, index }){
      let data = await postUrl(update_UserFeeNormal,{
        user_id: row.id,
      });
      console.log('代扣代付 更新手续费 返回结果：',data);
      this.$message.success('代扣代付：更新手续费成功');
    },


    //查看用户手续费
    userqueryFee({ row, index }){
      console.log('查看用户手续费：',row);
      this.dialogVisible3 = true;
      this.form.user_id = row.id;
    },

    handleDialogCancel (done) {
      this.$message({
        message: '取消保存',
        type: 'warning'
      });
      done()
    },
    handleSelectionChange (selection) {
      console.log(selection)
    }
  }
}

</script>
