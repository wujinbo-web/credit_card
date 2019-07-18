<template>
  <div class="d2-crud">
    <el-button slot="header" style="margin-bottom: 5px" @click="addRow">新增</el-button>
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="data"
      title="D2 CRUD"
      :rowHandle="rowHandle"
      :add-template="addTemplate"
      :add-rules="addRules"
      :form-options="formOptions"
      @row-add="handleRowAdd"
      @row-remove="handleRowRemove"
      @dialog-cancel="handleDialogCancel"/>
  </div>
</template>

<script>
import Vue from 'vue'
import { postUrl } from "@/api";
import { blackIdCard_list,blackIdCard_add,blackIdCard_delete } from "@/api/apiUrl";
import D2Crud from '@d2-projects/d2-crud'

Vue.use(D2Crud)

export default {
  data() {
    return {
      columns: [
        {
          title: '身份证号',
          key: 'id_no',
          width: '220'
        },
        {
          title: '状态',
          key: 'status',
          width: '100'
        }
      ],
      data: [],
      rowHandle: {
        columnHeader: '操作',
        remove: {
          size: 'small',
          fixed: 'right',
          confirm: true,
          show (index, row) {
            return true
          },
        }
      },
      addTemplate: {
        id_no: {
          title: '身份证号',
          value: '',
          component: {
            span: 12
          }
        },
      },
      addRules: {
        id_no: [ { required: true, message: '请输入身份证号', trigger: 'blur' } ],
      },
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false,
        gutter: 20
      },
      pagination: {
        currentPage: 1,
        pageSize: 100,
        total: 1
      },
    }
  },
  mounted(){
    this.getBlackIdCardList()
  },
  methods: {
    //获取身份证黑名单列表
    async getBlackIdCardList() {
      let data = await postUrl(blackIdCard_list, {
        page_index: this.pagination.currentPage,
        page_size: this.pagination.pageSize
      });
      this.pagination.total = data.length;
      this.data = data.map(item => {
        return {
          id_no: item.id_no, //身份证号码
          status: item.status, //状态
          id: item.id, //id
        };
      });
    },
    // 普通的新增
    addRow () {
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    },
    //添加身份证黑名单
    async handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      let data = await postUrl(blackIdCard_add, {
        id_no: row.id_no,
      });
      this.$message({
        message: '保存成功',
        type: 'success'
      });
      done()
      this.formOptions.saveLoading = false
    },
    //删除身份证黑名单
    async handleRowRemove ({index, row}, done) {
      let data = await postUrl(blackIdCard_delete, {
        id_no: row.id_no,
      });
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      done()
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
