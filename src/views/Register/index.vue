<template>
  <div class="login-page">
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="用户名/手机号">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" autocomplete="off" v-model="formLabelAlign.password"></el-input>
      </el-form-item>
<!--      <el-form-item label="活动形式">-->
<!--        <el-input v-model="formLabelAlign.type"></el-input>-->
<!--      </el-form-item>-->
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: 'left',
      formLabelAlign: {
        name: '',
        password: '',
      }
    };
  }
}
</script>

<style scoped>

</style>