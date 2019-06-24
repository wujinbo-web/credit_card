<template>
  <div class="d2-crud">
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="data"
      add-mode
      :add-button="addButton"
      :rowHandle="rowHandle"
      :form-template="formTemplate"
      :form-rules="formRules"
      :form-options="formOptions"
      @row-add="handleRowAdd"
      @row-edit="handleRowEdit"
      @row-remove="handleRowRemove"
      @dialog-cancel="handleDialogCancel"
      />
  </div>
</template>

<script>
import Vue from 'vue'
import D2Crud from '@d2-projects/d2-crud'
import { postUrl } from '@/api'
import { banner_list, banner_delete, banner_update } from '@/api/apiUrl'
import { timeSite, numTime } from '@/tool/TimeTransition'
Vue.use(D2Crud)

export default {
  data() {
    return {
      columns: [
        {
          title: 'ID',
          key: 'id',
          align:'center',
          width: '80'
        },
        {
          title: '用户id',
          key: 'uid',
          align:'center',
          width: '80'
        },
        {
          title: '排序',
          key: 'sort',
          align:'center',
          width: '80'
        },
        {
          title: '点击次数',
          key: 'click_nums',
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
          title: '截止时间',
          key: 'end_time',
          align:'center',
          width: '180'
        },
        {
          title: '高度',
          key: 'h',
          align:'center',
          width: '80'
        },
        {
          title: '宽度',
          key: 'w',
          align:'center',
          width: '80'
        },
        {
          title: '标题',
          key: 'title',
          align:'center',
          width: '180'
        },
        {
          title: '图片路径',
          key: 'img_url',
          align:'center',
          width: '180'
        },
        {
          title: '跳转网址',
          key: 'jump_url',
          align:'center',
          width: '180'
        },
        {
          title: '跳转类型',
          key: 'jump_type',
          align:'center',
          width: '180'
        },
        {
          title: '位置',
          key: 'position',
          align:'center',
          width: '180'
        },
        {
          title: 'alis',
          key: 'alis',
          align:'center',
          width: '180'
        },
      ],
      data: [],
      addButton: {
        icon: 'el-icon-plus',
        size: 'small'
      },
      rowHandle: {
        columnHeader: '编辑表格',
        align:'center',
        width: '180',
        edit: {
          text: '编辑',
          size: 'small',
          show (index, row) {
            return true
          }
        },
        remove: {
          size: 'small',
          text: '删除',
          show (index, row) {
            return true
          }
        }
      },
      formTemplate: {
        title: {
          title: '标题',
          value: '',
          component: {
            span: 12
          }
        },
        user_id: {
          title: '用户id',
          value: '',
          component: {
            span: 24
          }
        },
        jump_url: {
          title: '跳转网址',
          value: '',
          component: {
            span: 24
          }
        },
        jump_type: {
          title: '跳转类型',
          value: '',
          component: {
            span: 24
          }
        },
        img_url: {
          title: '图片路径',
          value: '',
          component: {
            span: 24
          }
        },
        date_range: {
          title: '日期范围',
          value: 'end_time - start_time',
          component: {
            span: 24
          }
        },
        w: {
          title: '宽',
          value: '',
          component: {
            span: 24
          }
        },
        h: {
          title: '高',
          value: '',
          component: {
            span: 24
          }
        },
        sort: {
          title: '排序',
          value: '',
          component: {
            span: 24
          }
        },
        id: {
          title: '位置',
          value: '',
          component: {
            span: 24
          }
        },
        position: {
          title: '位置',
          value: '',
          component: {
            span: 24
          }
        },
      },
      formRules: {
        date: [ { required: true, message: '请输入日期', trigger: 'blur' } ],
        name: [ { required: true, message: '请输入姓名', trigger: 'change' } ],
        address: [ { required: true, message: '请输入地址', trigger: 'blur' } ]
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
      }
    }
  },
  mounted(){
    this.getBannerList();
  },
  methods: {
    //获取banner列表
    async  getBannerList(){
      let data = await postUrl(banner_list,{
        page_index: this.pagination.currentPage,
        page_size: this.pagination.pageSize,
        // user_id://用户id 搜索用
        // position: //位置 搜索用
        // nowTime:  //时间 搜索用
      })
      this.data = data;
      this.data.map(item => {
        console.log('截止时间:',timeSite(item.end_time));
        return {
          alis: item.alis, //标题
          click_nums: item.click_nums, //点击次数
          create_time: item.create_time, //创建时间
          end_time: timeSite(item.end_time), //截止时间
          h: item.h, //高
          w: item.w,//宽 180
          id: item.id, //id
          img_url: item.img_url, //图片地址
          jump_type: item.jump_type, //”url“
          jump_url: item.jump_url, // "http://www.baidu.com"
          position: item.position,//位置 "002001002"
          sort: item.sort,// 1
          title: item.title, // "标题"
          uid: item.uid, //"2"
        }
      })
      console.log('bannerList:',data);
    },
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(row)
        this.$message({
          message: '保存成功',
          type: 'success'
        });
        done()
        this.formOptions.saveLoading = false
      }, 300);
    },
    //banner-广告位 修改
    handleRowEdit ({index, row}, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(index)
        console.log(row)
        let data =  postUrl(banner_update,{
          title: "标题",
          id: row.id,
          user_id: "22",
          img_url: "http://www.baidu.com",
          jump_type: "url",
          jump_url: "http://www.baidu.com",
          dateRange:'[0=>11111111111111]',
          h: 120,
          w: 180,
          sort: 1,
          position: "002001002",
          start_time: "0",
        });
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
        done()
        this.formOptions.saveLoading = false
      }, 300)
    },
    //banner-广告位 删除
    handleRowRemove ({index, row}, done) {
      setTimeout(() => {
        console.log(index)
        console.log(row)
        let data =  postUrl(banner_delete,{
          id: row.id,
        });
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        done()
      }, 300)
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消保存',
        type: 'warning'
      });
      done()
    },
    handleSelectionChange (selection) {
      console.log('已选id',selection.id)
    }
  }
}

</script>
