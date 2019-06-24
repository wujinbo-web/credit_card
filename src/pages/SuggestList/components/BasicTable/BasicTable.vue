<template>
  <div className="basic-table">
    <basic-container>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="id"
          align="center"
          width="60">
        </el-table-column>
        <el-table-column
          prop="uid"
          label="uid"
          align="center"
          width="60">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户姓名"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="用户电话"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="create_time"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="update_time"
          label="update_time"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="content"
          label="内容"
          align="center"
          width="200">
        </el-table-column>
        <el-table-column
          prop="Email"
          label="用户Email"
          align="center"
          width="180">
        </el-table-column>
      </el-table>
    </basic-container>
  </div>
</template>

<script>
import BasicContainer from "@vue-materials/basic-container";
import { postUrl } from '@/api'
import { suggest_list } from "@/api/apiUrl";
import { timeSite, numTime } from '@/tool/TimeTransition'

export default {
  components: { BasicContainer },
  name: "BasicTable",

  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
      ],
      pagination: {
        currentPage:1,
        pageSize:10,
        total:1,
      }
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
      this.tableData  = data;
      //渲染数据
      this.tableData = data.map(item => {
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
      console.log(data)
    }
  }
};
</script>

<style>
.basic-table {
}
</style>
