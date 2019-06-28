<template>
  <div>
    <img :src='text' style="height: 25px" onerror="this.style.display='none'"  />
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
    text() {
      return this.scope.row._head;
    }
  }
};
</script>