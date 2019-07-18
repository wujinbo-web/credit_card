<template>
  <div className="basic-table">
    <basic-container>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="nickname"
          label="昵称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="realname"
          label="真实姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="head"
          label="头像"
          width="180">
        </el-table-column>
        <el-table-column
          prop="idcode"
          label="邀请码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="180">
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="生日"
          width="180">
        </el-table-column>

        <el-table-column
          prop="bg_img"
          label="大图"
          width="180">
        </el-table-column>
        <el-table-column
          prop="nation"
          label="国家"
          width="180">
        </el-table-column>
        <el-table-column
          prop="default_address"
          label="默认地址"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email_validate"
          label="邮箱验证"
          width="180">
        </el-table-column>
        <el-table-column
          prop="identity_validate"
          label="身份验证"
          width="180">
        <el-table-column
          prop="exp"
          label="经验"
          width="180">
        </el-table-column>
        </el-table-column>
        <el-table-column
          prop="login"
          label="登录"
          width="180">
        </el-table-column>
        <el-table-column
          prop="online_status"
          label="在线状态"
          width="180">
        </el-table-column>
        <el-table-column
          prop="score"
          label="分数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sign"
          label="签名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="180">
        </el-table-column>
        <el-table-column
          prop="invite_uid"
          label="邀请用户的id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="geohash"
          label="geohash"
          width="180">
        </el-table-column>
      </el-table>
    </basic-container>
  </div>
</template>
<script>
import BasicContainer from "@vue-materials/basic-container";

import { postUrl } from "@/api";
import { userInvite_query } from "@/api/apiUrl";

export default {
  components: { BasicContainer },
  name: "BasicTable",

  data() {
    return {
      tableData: [],
      pagination: {
        currentPage: 1,
        pageSize: 100,
        total: 1
      }
    };
  },
  mounted() {
    // this.getUserInvite();
  },
  methods: {
    //获取身份证黑名单列表
    async getUserInvite() {
      let data = await postUrl(userInvite_query, {
        page_index: this.pagination.currentPage,
        page_size: this.pagination.pageSize,
        uid:2
      });
      this.pagination.total = data.count;
      this.tableData = data.list.map(item => {
        return {
          bg_img: item.bg_img,//大图
          birthday: item.birthday,//生日
          default_address: item.default_address,//默认地址
          email_validate: item.email_validate,//邮箱验证
          exp: item.exp,//经验
          geohash: item.geohash,//geohash
          head: item.head, //头像
          idcode: item.idcode,//邀请码
          identity_validate: item.identity_validate,//身份验证
          invite_uid: item.invite_uid,//邀请用户的id
          login: item.login, //登录
          nation: item.nation,//国家
          nickname: item.nickname, //昵称
          online_status: item.online_status,//在线状态
          realname: item.realname,//真实姓名
          score: item.score, //分数
          sex: item.sex,//性别
          sign: item.sign,//签名
          status: item.status, //状态
        };
      });
    }
  }
};
</script>

<style>
.basic-table {
}
</style>
