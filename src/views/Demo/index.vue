<template>
  <div>
    <code-editor v-model="value" :opts="opts" @contentChange="contentChange"></code-editor>
  </div>
</template>

<script>
import CodeEditor from '@/components/CodeEditor'
export default {
  components: {
    CodeEditor,
  },
  data() {
    return {
      value: '',
      countent: '',
      opts: {
        value: '',
        readOnly: false, // 是否可编辑
        language: 'python', // 语言类型
        theme: 'vs-dark', // 编辑器主题
      },
    }
  },
  methods: {
    contentChange(val) {
      //每次改变编辑器内容触发事件，先用一个值存放数据
      this.countent = val
    },
    submit() {
      //在你提交给后台时将this.countent赋值给value
      this.value = this.countent
    },
  },
}
</script>

<style>
</style>