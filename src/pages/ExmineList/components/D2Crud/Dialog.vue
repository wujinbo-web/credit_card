<template>
  <div>
    <el-button
      type="text"
      @click="enSure"
    >点击查看</el-button>
    <el-dialog
      title="商品详情"
      width="400"
      :visible.sync="dialogVisible"
    >
      <el-form>
        <!-- <el-form-item label="审核状态:">
          {{data.verify}}
        </el-form-item> -->
        <el-form-item label="姓名:">
          {{data.name}}
        </el-form-item>
        <el-form-item label="手机号:">
          {{data.mobile}}
        </el-form-item>
        <el-form-item label="身份证号:">
          {{data.id_no}}
        </el-form-item>
        <el-form-item label="银行卡号:">
          {{data.bank_card_no}}
        </el-form-item>
        <el-form-item label="地址:">
          {{data.address}}
        </el-form-item>
        <el-form-item label="邮编:">
          {{data.zipcode}}
        </el-form-item>
        <el-form-item label="email:">
          {{data.email}}
        </el-form-item>
        <el-form-item label="申请历史:">
          <br/>
          <div v-for="item,index in data.log_his">
            申请时间:{{item.time}},驳回原因:{{item.content}}
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { user_exmine_detail } from '@/api/apiUrl'
import { postUrl } from '@/api'
export default{
  props:{
    //本行数据
    scope: {
      default: null
    },
    //额外参数
    myProps: {
      default: null
    },
    value: {
      default: null
    }
  },
  data(){
    return{
      dialogVisible: false,
      data:{
        // "verify": 0,
        // "id_front_img": "http:\/\/www.baidu.com",
        // "id_back_img": "http:\/\/www.baidu.com",
        // "id_no": "330327198407040039",
        // "id_hold_img": "http:\/\/www.baidu.com",
        // "zipcode": "330000",
        // "address": "浙江省杭州市",
        // "email": "346551990@qq.com",
        // "name": "周波",
        // "bank_card_no": "6222081202007602202",
        // "bank_front_img": "http:\/\/www.baidu.com",
        // "branch_bank": "杭州西湖",
        // "opening_bank": "杭州西湖",
        // "mobile": "13858066033",
        // "card_code": "",
        // "log_his": [
        //   {
        //      "audit_nick": "手机用户1545388811",
        //      "content": "测试驳回",
        //      "time": "1559381563"
        //   },
        // ],
      }
    }
  },
  mounted(){

  },
  methods:{
    //获取首页数据
    async getIndexData(){
      let data = await postUrl(user_exmine_detail,{
        user_id: this.value
      })
      this.data = data;
    },
    //打开弹窗
    enSure(){
      this.dialogVisible = true;
      this.getIndexData();
    },
  }
}
</script>

<style>

</style>

<!-- <table
  :data="data.log_his"
>
  <el-table-column
    prop="time"
    label="日期"
    width="180"
  >
  </el-table-column>
  <el-table-column
    prop="audit_nick"
    label="昵称"
    width="180"
  >
  </el-table-column>
  <el-table-column
    prop="content"
    label="原因"
    width="180"
  >
  </el-table-column> -->
<!-- </table> -->
