<template>
  <div class="d2-crud">
    <el-button slot="header" style="margin-bottom: 5px" @click="addRow">新增</el-button>
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="data"
      :rowHandle="rowHandle"
      :add-template="addTemplate"
      :edit-template="editTemplate"
      :form-rules="formRules"
      :form-options="formOptions"
      @dialog-cancel="handleDialogCancel"
      @row-add="handleRowAdd"
      @row-edit="handleRowEdit"/>
  </div>
</template>

<script>
import Vue from 'vue'
import D2Crud from '@d2-projects/d2-crud'
import { postUrl } from '@/api'
import { publicMessage_list, message_create ,message_update} from '@/api/apiUrl'
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
          width: '80'
        },
        {
          title: '摘要',
          key: 'summary',
          width: '80'
        },
        {
          title: '额外信息',
          key: 'extra',
          width: '80'
        },
        {
          title: '类型',
          key: 'dtreeType',
          width: '120'
        },
        {
          title: '信息状态',
          key: 'msgStatus',
          width: '80'
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
      addTemplate: {
        title: {
          title: '标题',
          value: '',
          component: {
            span: 24
          }
        },
        dtree_type: {
          title: '类型',
          value: 'announce',
          component: {
            span: 24
          }
        },
        summary: {
          title: '摘要',
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
        // from_uid: {
        //   title: '发送者id',
        //   value: '3',//uid登陆时候传入，现在写死
        //   component: {
        //     span: 24
        //   }
        // },
        to_uid: {
          title: '接收者id -2 全部',
          value: '-2',
          component: {
            span: 24
          }
        },
        send_time: {
          title: '发送时间',
          value: new Date().getTime() / 1000,
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
      rowHandle: {
        columnHeader: '编辑表格',
        edit: {
          text: '编辑',
          size: 'small',
          show (index, row) {
            return true
          },
        }
      },
      editTemplate: {
        title: {
          title: '标题',
          value: '',
          component: {
            span: 24
          }
        },
        summary: {
          title: '摘要',
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
      },
      formRules: {
        title: [ { required: true, message: '请输入标题', trigger: 'blur' } ],
        dtree_type: [ { required: true, message: '请输入类型', trigger: 'blur' } ],
        summary: [ { required: true, message: '请输入summary', trigger: 'blur' } ],
        content: [ { required: true, message: '请输入content', trigger: 'blur' } ],
        // from_uid: [ { required: true, message: '请输入发送者id', trigger: 'blur' } ],
        to_uid: [ { required: true, message: '请输入接受者id', trigger: 'blur' } ],
        // send_time: [ { required: true, message: '请输入发送时间', trigger: 'blur' } ],
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
      dtree_type:'announce',
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
      this.data = data.list.map(item => {
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
    // 普通的新增
    addRow () {
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    },
    async handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      row.from_uid = '3';
      console.log(row)
      let data =await postUrl(message_create,row);
      // this.$message({
      //   message: '保存成功',
      //   type: 'success'
      // });
      done()
      this.getPublicMessageList();
      this.formOptions.saveLoading = false
    },
    async handleRowEdit (row, done) {
      this.formOptions.saveLoading = true
      console.log(row)
      let data = await postUrl(message_update,{
        title:row.row.title,
        summary:row.row.summary,
        content:row.row.title,
        id:row.row.id,
      });
      done()
      this.formOptions.saveLoading = false
    },
    handleDialogCancel (done) {
      done()
    },
  }
}

</script>
