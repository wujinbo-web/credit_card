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
      :form-options="formOptions"
      :rowHandle="rowHandle"
      @custom-emit-1='setUserGrade'
      @custom-emit-3='userqueryFee'
      @pagination-current-change="paginationCurrentChange"
      @row-add="handleRowAdd"
      @dialog-cancel="handleDialogCancel"
      />

      <el-dialog
        title="设置用户等级"
        width="1000"
        :visible.sync="dialogVisible"
      >
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item label="等级id" prop="grade_id">
            <el-input v-model="form.grade_id" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </d2-crud>
  </div>
</template>

<script>
import Vue from 'vue'
import D2Crud from '@d2-projects/d2-crud'
import Img from './Img'
import { postUrl } from '@/api'
import { user_list, user_add,user_setGrade,set_queryFee,user_queryFee} from '@/api/apiUrl'
import { timeSite, numTime } from '@/tool/TimeTransition'

Vue.use(D2Crud)

export default {
  data() {
    return {
      columns: [
        {
          title: 'xx号码',
          key: 'country_no',
          align:'center',
          width: '80'
        },
        {
          title: '昵称',
          key: '_nickname',
          align:'center',
          width: '120'
        },
        {
          title: '电话号码',
          key: 'mobile',
          align:'center',
          width: '120'
        },
        {
          title: '头像',
          key: '_head',
          align:'center',
          width: '80',
          component:{
            name: Img,
          }
        },
        {
          title: '项目ID',
          key: 'project_id',
          align:'center',
          width: '80'
        },
        {
          title: '用户ID',
          key: 'id',
          align:'center',
          width: '80'
        },
        {
          title: '创建时间',
          key: 'create_time',
          align:'center',
          width: '180'
        },
        {
          title: '上次登录时间',
          key: 'last_login_time',
          align:'center',
          width: '160'
        },
      ],
      data: [],
      addButton: {
        icon: 'el-icon-plus',
        size: 'small'
      },
      rowHandle: {
        columnHeader: '操作',
        width: '340',
        align:'center',
        custom:[
          {
            text: '设置等级',
            size: 'small',
            emit: 'custom-emit-1',
            show(){
              return true;
            }
          },
          {
            text: '查看手续费',
            type: 'primary',
            size: 'small',
            emit: 'custom-emit-3',
            show(){
              return true;
            }
          }
        ]
      },
      //添加用户表格
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
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false
      },
      rules: {
        grade_id: [ { required: true, message: '请输入等级', trigger: 'blur' } ],
      },
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false,
        gutter: 20
      },
      loading: false,
      form:{
        grade_id: null,//1: 普通用户 2: VIP1
        user_id: null,//被设置手续费的用户
        uid:null,//登录操作用户
        sid:null,
      },
      dialogVisible: false,
      queryFeeData:[],
      isSetFee:true,
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 1000
      },
    }
  },
  mounted(){
    // this.getUserList();
  },
  methods: {
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //设置用户等级
          let data = await postUrl(user_setGrade,{
            user_id: this.form.user_id,
            grade_id: this.form.grade_id,
          });
          console.log('设置用户等级 返回结果：',data)
          this.dialogVisible = false;
          this.$message.success('设置成功');
        } else {
          console.log('error submit!!');
          return false;
        }
        this.form.user_id = null;
      })
    },
    //请求用户列表数据
    async getUserList(){
      this.loading = true;
      let data = await postUrl(user_list,{
        page_index: this.pagination.currentPage, //页码
        page_size: this.pagination.pageSize, //每页个数
      });
      this.pagination.total = 1000;
      console.log(this.pagination.total);
      this.loading = false;
      //渲染数据
      this.data = data.list.map(item => {
        return{
          country_no: item.country_no,
          create_time: timeSite(item.create_time),
          id: item.id,
          _head: item._head,
          _nickname: item._nickname,
          last_login_time:  timeSite(item.last_login_time),
          mobile: item.mobile,
          project_id: item.project_id,
        }
      })
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
    //设置用户等级
    setUserGrade({ row, index }){
      this.dialogVisible = true;
      this.form.user_id = row.id;
    },
    //查看用户手续费
    async userqueryFee({ row, index }){
      this.$router.push({path: '/manage/userfee', query: {user_id: row.id}})
    },
  }
}

</script>
