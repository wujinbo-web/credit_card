<template>
  <div class="d2-crud">
    <!-- 使用方法请参考文档和示例 -->
    <!-- 文档： https://d2-projects.github.io/d2-admin-doc/zh/ecosystem-d2-crud/ -->
    <!-- 示例： https://d2-projects.github.io/d2-admin/#/demo/d2-crud/index -->
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="data"/>
  </div>
</template>

<script>
import Vue from 'vue'
import { postUrl } from "@/api";
import { userInvite_query } from "@/api/apiUrl";
import Img from './Img'
import D2Crud from '@d2-projects/d2-crud'

Vue.use(D2Crud)

export default {
  data() {
    return {
      columns: [
        {
          title: '昵称',
          key: 'nickname',
          align:'center',
          width: '180'
        },
        // {
        //   title: '真实姓名',
        //   key: 'realname',
        //   align:'center',
        //   width: '80'
        // },

        {
          title: '头像',
          key: 'head',
          align:'center',
          width: '80',
          component:{
            name: Img,
          }
        },
        {
          title: '邀请码',
          key: 'idcode',
          align:'center',
          width: '80'
        },
        {
          title: '性别',
          key: 'sex',
          align:'center',
          width: '80'
        },
        // {
        //   title: '生日',
        //   key: 'birthday',
        //   align:'center',
        //   width: '80'
        // },
        // {
        //   title: '大图',
        //   key: 'bg_img',
        //   align:'center',
        //   width: '80'
        // },
        // {
        //   title: '国家',
        //   key: 'nation',
        //   align:'center',
        //   width: '80'
        // },
        // {
        //   title: '默认地址',
        //   key: 'default_address',
        //   align:'center',
        //   width: '80'
        // },
        // {
        //   title: '邮箱验证',
        //   key: 'email_validate',
        //   align:'center',
        //   width: '80'
        // },
        {
          title: '身份验证',
          key: 'identity_validate',
          align:'center',
          width: '80'
        },
        // {
        //   title: '经验',
        //   key: 'exp',
        //   align:'center',
        //   width: '80'
        // },
        // {
        //   title: '登录',
        //   key: 'login',
        //   align:'center',
        //   width: '80'
        // },
        {
          title: '在线状态',
          key: 'online_status',
          align:'center',
          width: '80'
        },
        // {
        //   title: '状态',
        //   key: 'status',
        //   align:'center',
        //   width: '80'
        // },
        // {
        //   title: '分数',
        //   key: 'score',
        //   align:'center',
        //   width: '80'
        // },
        // {
        //   title: '签名',
        //   key: 'sign',
        //   align:'center',
        //   width: '80'
        // },

        {
          title: '邀请用户的id',
          key: 'invite_uid',
          align:'center',
          width: '80'
        },
        // {
        //   title: 'geohash',
        //   key: 'geohash',
        //   align:'center',
        //   width: '80'
        // },
      ],
      data: [],
      pagination: {
        currentPage: 1,
        pageSize: 100,
        total: 1
      }
    }
  },
  mounted() {
    this.getUserInvite();
  },
  methods: {
    //获取身份证黑名单列表
    async getUserInvite() {
      let data = await postUrl(userInvite_query, {
        page_index: this.pagination.currentPage,
        page_size: this.pagination.pageSize,
        // uid:2
      });
      this.pagination.total = data.count;
      this.data = data.list.map(item => {
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
}

</script>
