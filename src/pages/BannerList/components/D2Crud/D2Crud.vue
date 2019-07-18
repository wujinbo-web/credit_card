<template>
  <div class="d2-crud">
    <el-button slot="header" style="margin-bottom: 5px" @click="addRow">新增</el-button>
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="data"
      :rowHandle="rowHandle"
      :form-options="formOptions"
      :pagination="pagination"
      :add-template="addTemplate"
      :edit-template="editTemplate"
      @row-add="handleRowAdd"
      @row-edit="handleRowEdit"
      @row-remove="handleRowRemove"
      @dialog-open="handleDialogOpen"
      @dialog-cancel="handleDialogCancel"
      @pagination-current-change="paginationCurrentChange"
      />
  </div>
</template>

<script>
import Vue from "vue";
import D2Crud from "@d2-projects/d2-crud";
import { postUrl } from "@/api";
import {
  banner_list,
  banner_delete,
  banner_add,
  banner_update,
  banner_query,
  banner_info,
  banner_position
} from "@/api/apiUrl";
import { timeSite, numTime } from "@/tool/TimeTransition";
import MyUpload from "./MyUpload";
import Img from './Img';
import { constants } from 'fs';
Vue.use(D2Crud);

export default {
  components: {
    MyUpload
  },
  data() {
    return {
      jumpType: [], //跳转类型
      columns: [
        // {
        //   title: "位置",
        //   key: "position",
        //   align: "center",
        //   width: "180",
        //   filters: [],
        //   filterMethod(value, row) {
        //     console.log('位置',row);
        //     return row.position == value;
        //   },
        //   filterPlacement: "bottom-end"
        // },
        {
          title: "alis",
          key: "alis",
          align: "center",
          width: "180",
          filters: [],
          filterMethod(value, row) {
            console.log('位置',row);
            return row.alis == value;
          },
          filterPlacement: "bottom-end"
        },
        {
          title: "ID",
          key: "id",
          align: "center",
          width: "60"
        },
        {
          title: "用户id",
          key: "uid",
          align: "center",
          width: "60"
        },
        {
          title: "排序",
          key: "sort",
          align: "center",
          width: "60"
        },
        {
          title: "点击次数",
          key: "click_nums",
          align: "center",
          width: "60"
        },
        {
          title: "创建时间",
          key: "create_time",
          align: "center",
          width: "100"
        },
        {
          title: "截止时间",
          key: "end_time",
          align: "center",
          width: "100"
        },
        {
          title: "高度",
          key: "h",
          align: "center",
          width: "60"
        },
        {
          title: "宽度",
          key: "w",
          align: "center",
          width: "60"
        },
        {
          title: "标题",
          key: "title",
          align: "center",
          width: "100"
        },
        {
          title: "图片路径",
          key: "img_url",
          align: "center",
          width: "100",
          component:{
            name: Img,
          }
        },
        {
          title: "跳转网址",
          key: "jump_url",
          align: "center",
          width: "100"
        },
        {
          title: "跳转类型",
          key: "jump_type",
          align: "center",
          width: "60"
        }
      ],
      data: [],
      addButton: {
        icon: "el-icon-plus",
        size: "small"
      },
      rowHandle: {
        columnHeader: "编辑表格",
        align: "center",
        width: "180",
        edit: {
          text: "编辑",
          size: "small",
          show(index, row) {
            return true;
          }
        },
        remove: {
          size: "small",
          text: "删除",
          show(index, row) {
            return true;
          }
        }
      },
      addTemplate: {
        title: {
          title: "标题",
          value: "",
          component: {
            span: 12
          }
        },
        position: {
          title: "位置",
          value: "",
          component: {
            name: "el-select",
            options: [],
            size: "small"
          }
        },
        jump_type: {
          title: "跳转类型",
          value: "url",
          component: {
            span: 24
          }
        },
        img_url: {
          title: "图片上传",
          value: "",
          component: {
            name:MyUpload
          }
        },
        create_time: {
          title: "开始时间",
          value: "",
          component: {
            span: 24,
            name: "el-date-picker",
            type: "datetime"
          }
        },
        end_time: {
          title: "结束时间",
          value: "",
          component: {
            span: 24,
            name: "el-date-picker",
            type: "datetime"
          }
        },
        w: {
          title: "宽",
          value: "",
          component: {
            span: 24
          }
        },
        h: {
          title: "高",
          value: "",
          component: {
            span: 24
          }
        },
        sort: {
          title: "排序",
          value: "",
          component: {
            span: 24
          }
        },
        jump_url: {
          title: "跳转网址",
          value: "",
          component: {
            span: 24
          }
        }
      },
      editTemplate: {
        title: {
          title: "标题",
          value: "",
          component: {
            span: 12
          }
        },
        position: {
          title: "位置",
          value: "",
          component: {
            name: "el-select",
            options: [],
            size: "small"
          }
        },
        jump_type: {
          title: "跳转类型",
          value: "url",
          component: {
            span: 24
          }
        },
        img_url: {
          title: "图片上传",
          value: "",
          component: {
            name:MyUpload,
          }
        },
        create_time: {
          title: "开始时间",
          value: "",
          component: {
            span: 24,
            name: "el-date-picker",
            type: "datetime"
          }
        },
        end_time: {
          title: "结束时间",
          value: "",
          component: {
            span: 24,
            name: "el-date-picker",
            type: "datetime"
          }
        },
        w: {
          title: "宽",
          value: "100",
          component: {
            span: 24
          }
        },
        h: {
          title: "高",
          value: "100",
          component: {
            span: 24
          }
        },
        sort: {
          title: "排序",
          value: "",
          component: {
            span: 24
          }
        },
        id: {
          title: "id",
          value: "",
          component: {
            span: 24
          }
        },
        jump_url: {
          title: "跳转网址",
          value: "",
          component: {
            span: 24
          }
        },
      },
      formOptions: {
        labelWidth: "80px",
        labelPosition: "left",
        saveLoading: false,
      },
      pagination: {
        currentPage: 1,
        pageSize: 100,
        total: 1
      },
    };
  },
  mounted() {
    this.getBannerList();
    this.getBannerType();
    this.getBannerPosition(); //banner-广告位 返回banner广告图位置
  },
  methods: {
    //获取banner列表
    async getBannerList() {
      let data = await postUrl(banner_list, {
        page_index: this.pagination.currentPage,
        page_size: this.pagination.pageSize
        // user_id://用户id 搜索用
        // position: //位置 搜索用
        // nowTime:  //时间 搜索用
      });
      this.pagination.total = data.length;
      this.data = data.map(item => {
        return {
          alis: item.alis, //标题
          click_nums: item.click_nums, //点击次数
          create_time: timeSite(item.create_time), //创建时间
          end_time: timeSite(item.end_time), //截止时间
          h: item.h, //高
          w: item.w, //宽 180
          id: item.id, //id
          img_url: item.img_url, //图片地址
          jump_type: item.jump_type, //”url“
          jump_url: item.jump_url, // "http://www.baidu.com"
          position: item.position, //位置 "002001002"
          sort: item.sort, // 1
          title: item.title, // "标题"
          uid: item.uid //"2"
        };
      });
    },

    handleDialogOpen ({ mode }) {
      // this.$message({
      //   message: '打开模态框，模式为：' + mode,
      //   type: 'success'
      // })
    },
    // 普通的新增
    addRow () {
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    },
    //banner-广告位 添加
    handleRowAdd(row, done) {
      this.formOptions.saveLoading = true;
      let data = postUrl(banner_add, {
        title: row.title,
        position: row.position,
        user_id: "2",
        jump_url: row.jump_url,
        jump_type: row.jump_type,
        img_url: row.img_url,
        // start_time: new Date(row.start_time).getTime(), //开始时间 单位秒
        start_time: new Date(row.create_time).getTime()/1000, //开始时间 单位秒
        end_time: new Date(row.end_time).getTime()/1000, //结束时间 单位秒 end_time = 9999999999 设置最大值
        w: row.w,
        h: row.h,
        sort: row.sort
      });
      // this.$message({
      //   message: "添加成功",
      //   type: "success"
      // });
      done();
      this.getBannerList();
      this.formOptions.saveLoading = false;
    },

    //banner-广告位 获取类型
    async getBannerType() {
      this.formOptions.saveLoading = true;
      let data = await postUrl(banner_query, {
        parent_id: "34" //数据字典父id
      });
      this.jumpType = data.list.map(item => {
        return {
          label: item.name,
          value: item.code
        };
      });
      this.addTemplate.position.component.options = this.jumpType;
      this.editTemplate.position.component.options = this.jumpType;
      this.columns[0].filters = data.list.map(item => {
        return {
          text: item.name,
          value: item.name
        };
      });
      this.formOptions.saveLoading = false;
    },

    //banner-广告位 修改
    async handleRowEdit({ index, row },done) {
      console.log('row:',row)
      this.getBannerInfo(row.id)
      this.formOptions.saveLoading = true;
      let data = await postUrl(banner_update, {
        title: row.title,
        id: row.id,
        user_id: row.uid,
        img_url: row.img_url,
        jump_type: row.jump_type,
        jump_url: row.jump_url,
        start_time:new Date(row.create_time).getTime()/1000, //开始时间 单位秒
        end_time: new Date(row.end_time).getTime()/1000, //结束时间 单位秒 end_time = 9999999999 设置最大值
        h: row.h,
        w: row.w,
        sort: row.sort,
        position: row.position,
      });
      done();
      this.getBannerList();
      this.formOptions.saveLoading = false;
    },
    //banner-广告位 删除
    handleRowRemove({ index, row }, done) {
      setTimeout(() => {
        console.log(index);
        console.log(row);
        let data = postUrl(banner_delete, {
          id: row.id
        });
        // this.$message({
        //   message: "删除成功",
        //   type: "success"
        // });
        done();
      }, 300);
    },

    //banner-广告位 返回banner广告位信息
    async getBannerInfo(id) {
      let data = await postUrl(banner_info, {
        id: id
      });
      console.log("返回banner广告位信息:", data);
    },
    //banner-广告位 返回banner广告图位置
    async getBannerPosition() {
      let data = await postUrl(banner_position);
      console.log("返回banner广告图位置:", data);
    },

    handleDialogCancel(done) {
      // this.$message({
      //   message: "取消保存",
      //   type: "warning"
      // });
      done();
    },
    //切换页码
    paginationCurrentChange (currentPage) {
      console.log(currentPage);
        this.pagination.currentPage = currentPage
        this.getBannerList()
    },
  }
};
</script>