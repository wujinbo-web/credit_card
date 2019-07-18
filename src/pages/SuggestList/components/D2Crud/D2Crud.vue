<template>
  <div class="d2-crud">
    <d2-crud
      ref="d2Crud"
      :pagination="pagination"
      :form-options="formOptions"
      :data="data"
      :columns="columns"
      :rowHandle="rowHandle"
      @custom-emit-2='handleReject'
      @pagination-current-change="paginationCurrentChange"
      @dialog-cancel="handleDialogCancel"/>
      <el-dialog
        title="查看内容"
        width="400"
        :visible.sync="dialogVisible"
      >
      <p>{{dialogContent}}</p>
      <el-button type="primary" @click="colse">关闭</el-button>
        </el-form>
      </el-dialog>
    </d2-crud>
  </div>
</template>

<script>
import Vue from 'vue'
import D2Crud from '@d2-projects/d2-crud'
import { postUrl } from '@/api'
import { suggest_list } from "@/api/apiUrl";
import { timeSite, numTime } from '@/tool/TimeTransition'
Vue.use(D2Crud)

export default {
  data() {
    return {
      columns: [
        {
          title: 'id',
          key: 'id',
          width: '80'
        },
        {
          title: '用户id',
          key: 'uid',
          width: '80'
        },
        {
          title: '用户姓名',
          key: 'username',
          width: '100'
        },
        {
          title: '用户电话',
          key: 'mobile',
          width: '180'
        },
        // {
        //   title: '内容',
        //   key: 'content',
        //   width: '180'
        // },
        {
          title: '添加时间',
          key: 'create_time',
          width: '180'
        },
        {
          title: '更新时间',
          key: 'update_time',
          width: '180'
        },
        {
          title: '用户邮箱',
          key: 'Email',
          width: '120'
        },
      ],
      data: [],
      dialogVisible: false,
      rowHandle: {
        columnHeader: '操作',
        width: '120',
        custom:[
          {
            text: '查看内容',
            type: 'danger',
            size: 'small',
            emit: 'custom-emit-2',
            show(){
              return true;
            }
          }
        ]
      },
      pagination:{
        currentPage: 1,
        pageSize: 5,
        total: 1,
      },
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: true,
      },
      dialogContent:null,//查看内容
    };
  },
  mounted() {
    this.getSuggestList()
  },
  methods: {
    async getSuggestList() {
      let data = await postUrl(suggest_list,{
        page_index: this.pagination.currentPage,
        page_size: this.pagination.pageSize,
      })
      this.data  = data.list;
      this.pagination.total = Number(data.count);
      //渲染数据
      this.data = data.list.map(item => {
        return{
          id: item.id,
          uid: item.uid,
          username: item.username,
          mobile: item.mobile,
          Email: item.Email,
          content: item.content,
          create_time: timeSite(item.create_time),
          update_time: timeSite(item.update_time),
        }
      })
    },

    //审核驳回
    handleReject({ row, index }){
      this.dialogVisible = true;
      console.log(row)
      this.dialogContent = row.content;
      // this.form.user_id = row.uid;
    },
    colse(){
      this.dialogVisible = false;
    },
    handleDialogCancel (done) {
      done()
    },
    //切换页码
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.getSuggestList()
    },
  }
}

</script>
