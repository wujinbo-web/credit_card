<template>
  <div class="d2-crud">
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="data"
      add-mode
      :add-button="addButton"
      :form-template="formTemplate"
      :form-rules="formRules"
      :form-options="formOptions"
      @dialog-cancel="handleDialogCancel"
      @row-add="handleRowAdd"/>
  </div>
</template>

<script>
import Vue from 'vue'
import D2Crud from '@d2-projects/d2-crud'
import { postUrl } from '@/api'
import { publicMessage_list, message_create } from '@/api/apiUrl'
import { timeSite, numTime } from '@/tool/TimeTransition'

Vue.use(D2Crud)

export default {
  data() {
    return {
      columns: [
        {
          title: '发送者id',
          key: 'fromUid',
          width: '60'
        },
        {
          title: '接收者id',
          key: 'toUid',
          width: '60'
        },
        {
          title: 'id',
          key: 'id',
          width: '60'
        },
        {
          title: '标题',
          key: 'title',
          width: '180'
        },
        {
          title: '概括',
          key: 'summary',
          width: '180'
        },
        {
          title: '额外信息',
          key: 'extra',
          width: '180'
        },
        {
          title: '类型',
          key: 'dtreeType',
          width: '180'
        },
        {
          title: '信息状态',
          key: 'msgStatus',
          width: '100'
        },
        {
          title: '创建时间',
          key: 'createTime',
          width: '180'
        },
        {
          title: '发送时间',
          key: 'sendTime',
          width: '180'
        },
      ],
      data: [],
      addButton: {
        icon: 'el-icon-plus',
        size: 'small'
      },
      formTemplate: {
        title: {
          title: '标题',
          value: '',
          component: {
            span: 24
          }
        },
        dtree_type: {
          title: '类型',
          value: '',
          component: {
            span: 24
          }
        },
        summary: {
          title: '概括',
          value: '',
          component: {
            span: 24
          }
        },
        content: {
          title: '内容',
          value: '',
          component: {
            span: 24
          }
        },
        from_uid: {
          title: '发送者id',
          value: null,
          component: {
            span: 24
          }
        },
        to_uid: {
          title: '接收者id -2 全部',
          value: null,
          component: {
            span: 24
          }
        },
        send_time: {
          title: '发送时间',
          value: new Date().getTime(),
          component: {
            span: 24
          }
        },
        extra: {
          title: '额外信息',
          value: '',
          component: {
            span: 24
          }
        },
      },
      formRules: {
        title: [ { required: true, message: '请输入标题', trigger: 'blur' } ],
        dtree_type: [ { required: true, message: '请输入类型', trigger: 'blur' } ],
        summary: [ { required: true, message: '请输入summary', trigger: 'blur' } ],
        content: [ { required: true, message: '请输入content', trigger: 'blur' } ],
        from_uid: [ { required: true, message: '请输入发送者id', trigger: 'blur' } ],
        to_uid: [ { required: true, message: '请输入接受者id', trigger: 'blur' } ],
        send_time: [ { required: true, message: '请输入发送时间', trigger: 'blur' } ],
        extra: [ { required: true, message: '请输入额外信息', trigger: 'blur' } ],
      },
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false,
        gutter: 20
      },
      pagination: {
        currentPage:1,
        pageSize:10,
        total:1,
      },
      dtree_type:'002002',
      test_data:{
        title:'公告',
        dtree_type:'002002',
        summary:'支出成功',
        content:'金额支付成功',
        from_uid:'2',
        to_uid:'-2',//-2表示全部
        send_time:'1559715607',
        extra:'111',
      },
    }
  },
  mounted(){
    this.getPublicMessageList();
  },
  methods: {
    //请求数据
      async  getPublicMessageList(){
      let data = await postUrl(publicMessage_list,{
        page_index: this.pagination.currentPage,
        page_size: this.pagination.pageSize,
        dtree_type: this.dtree_type,
      });
      console.log('请求数据：',data);
      this.data = data.list;
      this.data.map(item => {
        return{
          createTime: timeSite(item.createTime),
          sendTime: timeSite(item.sendTime),
          msgStatus: item.msgStatus,
          dtreeType: item.dtreeType,
          extra: item.extra,
          summary: item.summary,
          title: item.title,
          id: item.id,
          fromUid: item.fromUid,
          toUid: item.toUid,
        }
      })
    },
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(row)
        let data = postUrl(message_create,row);
        this.$message({
          message: '保存成功',
          type: 'success'
        });
        done()
        this.getPublicMessageList();
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
  }
}

</script>
