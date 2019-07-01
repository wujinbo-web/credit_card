<template>
  <div style="cursor: pointer" >
    <el-upload 
        ref="avatar"
        name="image"
        :limit='1'
        :data="{uid:'3',sid:'2#f479aa7aeca640bf9f939ea8ba210724',t:'banner'}"
        action="http://api.361fit.cn/picture/upload"
        :on-success="handleSuccess"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList2"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      fileList2:
        this.value == "" || this.value == null
          ? []
          : this.value.split(",").map(item => {
              return { name: "栏目图", url: item };
            })
    };
  },
  props: {
    value: {
      type: String
    },
    // 本行的所有数据，此字段不需要额外配置
    scope: {
      default: null
    },
    // 通过 component 中 props 字段传过来的数据，此字段需要先在 component 中配置
    myProps: {
      default: null
    }
  },
  computed: {},
  mounted() {
    // console.log("scope:", this.scope);
    // console.log("value:", this.value);
  },
  methods: {
    handleRemove(file, fileList) {
      this.value = "";
      this.$emit("input", this.value);
    },
    handlePreview(file) {
      // console.log('handlePreview file',file);
    },
    handleSuccess(response, file, fileList) {
      // console.log("response", response);
    //   this.value = fileList[0].response.data;
      this.$emit("input", response.data.relative_path);
    },
  }
};
</script>