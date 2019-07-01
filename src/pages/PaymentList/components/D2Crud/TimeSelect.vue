<template>
  <div>
    <!-- <img :src='text' style="height: 25px" onerror="this.style.display='none'"  /> -->
    <el-time-select
      v-model="text"
      :picker-options="{
        start: '00:00',
        step: '01:00',
        end: '23:99'
      }"
      placeholder="选择时间"
    ></el-time-select>
  </div>
</template>
<script>
export default {
  props: {
    // 本行的所有数据，此字段不需要额外配置
    scope: {
      default: null
    },
    // 通过 component 中 props 字段传过来的数据，此字段需要先在 component 中配置
    myProps: {
      default: null
    }
  },
  computed: {
    text: {
      get(val) {
        console.log("get", val);
        return this.scope;
      },
      set(val) {
        return this.scope;
      }
    }
  }
};
</script>