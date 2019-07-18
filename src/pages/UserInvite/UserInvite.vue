<template>
  <d2-container class="page-UserInvite">
    <template slot="header">某用户邀请用户信息查询（按月）</template>
    <!-- <basic-table/> -->
    <d2-crud/>
  </d2-container>
</template>

<script>
// 组件
import BasicTable from './components/BasicTable/index'
import D2Crud from './components/D2Crud/index'
// 请删除下面代码中你不需要的部分
export default {
  name: 'UserInvite',
  components: {
    BasicTable,
    D2Crud
  },
  // 数据
  data () {
    return {}
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 生命周期钩子
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  activated () {},
  deactivated () {},
  beforeDestroy () {},
  destroyed () {},
  // 事件处理方法
  methods: {}
}
</script>

<style lang="scss" scoped>
@import './UserInvite.scss';
</style>
