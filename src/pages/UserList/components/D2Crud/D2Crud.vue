<template>
  <div class="d2-crud">
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :loading="loading"
      add-mode
      :add-button="addButton"
      :form-template="formTemplate"
      :form-rules="formRules"
      :form-options="formOptions"
      @pagination-current-change="paginationCurrentChange"
      @row-add="handleRowAdd"
      @dialog-cancel="handleDialogCancel"/>
  </div>
</template>

<script>
import Vue from 'vue'
import D2Crud from '@d2-projects/d2-crud'
import { postUrl } from '@/api'
import { user_list, user_add } from '@/api/apiUrl'
import { timeSite, numTime } from '@/tool/TimeTransition'

Vue.use(D2Crud)

export default {
  data() {
    return {
      columns: [
        {
          title: 'xx号码',
          key: 'country_no',
          width: '120'
        },
        {
          title: '创建时间',
          key: 'create_time',
          width: '240'
        },
        {
          title: '用户ID',
          key: 'id',
          width: '120'
        },
        {
          title: '电话',
          key: 'mobile',
          width: '240'
        },
        {
          title: '项目ID',
          key: 'project_id',
          width: '120'
        },
      ],
      data: [],
      addButton: {
        icon: 'el-icon-plus',
        size: 'small'
      },
      formTemplate: {
        mobile: {
          title: '电话号码',
          value: '',
          component: {
            span: 24
          }
        },
        password: {
          title: '密码',
          value: '',
          component: {
            span: 24
          }
        },
        idcode: {
          title: 'idcode',
          value: '',
          component: {
            span: 24
          }
        },
      },
      formRules: {
        mobile: [ { required: true, message: '请输入电话号码', trigger: 'blur' } ],
        password: [ { required: true, message: '请输入密码', trigger: 'blur' } ],
        // idcode: [ { required: true, message: '请输入地址', trigger: 'blur' } ]
      },
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false,
        gutter: 20
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      loading: false,
    }
  },
  mounted(){
    this.getUserList();
  },
  methods: {
    async getUserList(){
      this.loading = true;
      //请求数据
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
          country_no: item.country_no,
          create_time: timeSite(item.create_time),
          id: item.id,
          mobile: item.mobile,
          project_id: item.project_id,
        }
      })
      console.log('用户列表数据：',data);
    },
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        let userAdd_data = postUrl(user_add,row)
        console.log(userAdd_data);
        this.$message({
          message: '保存成功',
          type: 'success'
        });
        done()
        this.formOptions.saveLoading = false
      }, 300);
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消保存',
        type: 'warning'
      });
      done()
    },
    //分页操作
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.getUserList()
    },
  }
}

</script>
