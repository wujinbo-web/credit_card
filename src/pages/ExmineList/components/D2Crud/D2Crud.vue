<template>
  <div class="d2-crud">
    <d2-crud
      ref="d2Crud"
      :pagination="pagination"
      :form-options="formOptions"
      :loading="loading"
      :loading-options="loadingOptions"
      :rowHandle="rowHandle"
      @custom-emit-1='handleSuccess'
      @custom-emit-2='handleReject'
    />
    <el-dialog
      title="驳回申请"
      width="400"
      :visible.sync="dialogVisible"
    >
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="申请者id" prop="user_id">
          <el-input v-model="form.user_id" :disabled="true"/>
        </el-form-item>
        <el-form-item  label="驳回原因：" prop="content">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="form.content"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import D2Crud from '@d2-projects/d2-crud'
import { postUrl } from '@/api'
import { exmine_list, exmine_success, exmine_reject } from '@/api/apiUrl'
import { timeSite, numTime } from '@/tool/TimeTransition'
import Dialog from './Dialog'


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
          title: '用户id',
          key: 'uid',
          width: '80'
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
          title: '身份证到期日',
          key: 'expire_date',
          width: '180'
        },
        {
          title: '出生年月',
          key: 'birthday',
          width: '180'
        },
        {
          title: '详情',
          key: 'uid',
          component:{
            name:Dialog
          }
        }
      ],
      data: [],
      rules: {
        content:[
          { required: true, message: '请输入驳回原因', trigger: 'blur' },
        ]
      },
      form:{
        content: null,
        user_id: null,
      },
      dialogVisible: false,
      rowHandle: {
        columnHeader: '操作',
        width: '180',
        custom:[
          {
            text: '通过',
            type: 'success',
            size: 'small',
            emit: 'custom-emit-1',
            show(){
              return true;
            }
          },
          {
            text: '驳回',
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
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
            //提交驳回
            let data = await postUrl(exmine_reject,{
              user_id: this.form.user_id,
              content: this.form.content,
            });
            this.dialogVisible = false;
            this.$message.success('提交成功');
            this.getIndexData();
        } else {
            console.log('error submit!!');
            return false;
        }
      })
    },
    //获取数据
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
          expire_date:numTime(item.expire_date),
          uid: item.uid,
        }
      })
    },
    //审核通过
    async handleSuccess({ row, index }){
      let data = await postUrl(exmine_success,{ user_id: row.uid });
      this.$message.success('通过')
    },
    //审核驳回
    handleReject({ row, index }){
      this.dialogVisible = true;
      this.form.user_id = row.uid;
    }
  }
}

</script>
