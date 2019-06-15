<template>
  <div class="d2-crud">
    <d2-crud
      ref="d2Crud"
      :data="data"
      :columns="columns"
      :pagination="pagination"
      :form-options="formOptions"
      :loading="loading"
      :loading-options="loadingOptions"
    />

  </div>
</template>

<script>
import Vue from 'vue'
import D2Crud from '@d2-projects/d2-crud'
import { postUrl } from '@/api'
import { exmine_list } from '@/api/apiUrl'
import { timeSite, numTime } from '@/tool/TimeTransition'


Vue.use(D2Crud)

export default {
  data() {
    return {
      columns: [
        {
          title: '提交时间',
          key: 'update_time',
          width: '180'
        },
        {
          title: '姓名',
          key: 'real_name',
          width: '100'
        },
        {
          title: '性别',
          key: 'sex',
          width: '80'
        },
        {
          title: '身份证号',
          key: 'card_no',
          width: '180'
        },
        {
          title: '到期日',
          key: 'expire_date',
          width: '180'
        },
        {
          title: '出生年月',
          key: 'birthday',
          width: '180'
        },
        {
          title: '邮箱',
          key: 'email'
        },
        {
          title: '邮政编码',
          key: 'zipcode'
        },
        {
          title: '地址',
          key: 'address'
        }
      ],
      data: [],
      pagination:{
        currentPage: 1,
        pageSize: 10,
        total: 1,
      },
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: true,
      },
      loadingOptions: {
        text: '加载中'
      },
      loading: false,
    }
  },
  mounted(){
    this.getIndexData();
  },
  methods:{
    async getIndexData(){
      this.loading=true;
      //请求数据
      let data = await postUrl(exmine_list, {
        verify: 0,  //状态
        page_index: this.pagination.currentPage, //页码
        page_size: this.pagination.pageSize, //每页个数
      });
      this.loading=false;
      //data.count 页码
      this.pagination.total=data.count;
      //渲染表格数据
      this.data = data.list.map(item=>{
        return{
          update_time: timeSite(item.update_time),
          real_name: item.real_name,
          sex: item.sex==1?"男":"女",
          birthday: numTime(item.birthday),
          email: item.email,
          zipcode: item.zipcode,
          card_no: item.card_no,
          expire_date:numTime(item.expire_date),
          address: item.address,
        }
      })
    },
    
  }
}

</script>
