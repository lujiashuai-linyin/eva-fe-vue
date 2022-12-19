<template>
  <div class="login-page">
    <img src="/static/image/perry-kibler-4MKztErMnA8.jpg" alt="">
    <div class="login">
      <div class="login-box">
        <el-form :label-position="labelPosition" :model="formLabelAlign">
          <div class="title" id="title_2">密码登录</div>
          <div id="login_entry">推荐使用<a class="switch_btn_focus link_tips" style="color: dodgerblue" @click="login_method=1" >快捷登录</a>，防止盗号。</div>
          <el-form-item>
            <el-input v-model="formLabelAlign.username" placeholder="支持用户名/邮箱/手机号登录"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" autocomplete="off" v-model="formLabelAlign.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <div class="geetest1">

          </div>
          <el-form-item>
            <el-button type="primary" @click="get_geetest_captcha" style="width: 300px;height: 38px; margin-top: 6px; margin-bottom: 8px; margin-right:  57px; margin-left: 57px">点击登录</el-button>
          </el-form-item>
          <div class="bottom" id="bottom_web" style="margin-right:  57px; margin-left: 57px; height: 16px; width: 300px;">
            <div>
              <a href="#" class="link" id="forgetpwd" target="_blank">找回密码</a>
            </div>
            <div>
              <a href="/register" class="link">注册帐号</a>
            </div>
            <div>
              <a class="link" id="feedback_web" href="#" target="_blank">意见反馈</a>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import cookie from 'js-cookie';
export default {
  data() {
    return {
      remember:true,
      login_method:0,
      user_id: '',
      labelPosition: 'left',
      formLabelAlign: {
        username: '',
        password: '',
      }
    };
  },
  methods: {
    loginhandler () {
      // 用户密码账号登录
      this.$axios.post(`/base/login`, {
        username: this.formLabelAlign.username,
        password: this.formLabelAlign.password
      }).then(response => {
        console.log(response.data)
        if (this.remember) {
          // 记住登录状态
          // let expires =  response.data.data.expiresAt
          // console.log("expiresAt", expires)
          cookie.set("x-token", response.data.data.token, {domain:'localhost', expires: 7})
          cookie.set("username", response.data.data.username, {domain:'localhost', expires: 7})
          cookie.set("avatar", response.data.data.avatar, {domain:'localhost', expires: 7})
        }
        // 页面跳转
        let self = this
        this.$alert('登录成功!', 'EVA', {
          callback () {
            self.$router.push('/')
            // self.$router.go(-1);
          }
        })
      }).catch(error => {
        this.$message.error('对不起，登录失败！请确认密码或账号是否正确！')
      })
    },
    get_geetest_captcha () {
      // 获取验证码
      this.$axios.get(`/base/gt/captcha`, {
        params: {
          username: this.formLabelAlign.username
        }
      }).then(response => {
        // 使用initGeetest接口
        // 参数1：配置参数
        // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
        console.log(response.data);
        this.user_id = response.data.data.user_id.toString()
        console.log("user_id", response.data.data.user_id)
        initGeetest({
          gt: response.data.data.gt,
          challenge: response.data.data.challenge,
          product: 'popup', // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
          offline: false // 表示用户后台检测极验服务器是否宕机，一般不需要关注
        }, this.handlerPopup)
      }).catch(error => {
        console.log("error.response", error.response)
      })
    },
    handlerPopup (captchaObj) {
      let self = this
      // 极验验证密码的验证方法
      captchaObj.onSuccess(function () {
        var validate = captchaObj.getValidate()
        // 当用户拖动验证码正确以后，发送请求给后端
        self.$axios.post(`/base/gt/captcha`, {
          user_id: self.user_id,
          geetest_challenge: validate.geetest_challenge,
          geetest_validate: validate.geetest_validate,
          geetest_seccode: validate.geetest_seccode
        }).then(response => {
          console.log(response.data)
            // 验证码通过以后，才发送账号和密码进行登录！
          self.loginhandler()
        }).catch(error => {
          console.log(error.response)
        })
      })
      // 为了避免用户反复多次点击登录，造成多个验证码同时存在，所以我们可以先清空原来的验证码
      document.getElementsByClassName('geetest1').innerHTML = ''
      // 将验证码加到id为captcha的元素里
      captchaObj.appendTo('.geetest1')
    }
  }
}
</script>
<style scoped>
.login-page{
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.login-page img{
  width: 100%;
  min-height: 100%;
}

.login {
  position: absolute;
  width: 500px;
  height: 400px;
  left: 0;
  margin: auto;
  right: 0;
  bottom: 0;
  top: -338px;
}
.login-box {
  width: 414px;
  min-height: 300px;
  max-height: 350px;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.5);
  border-radius: 4px;
  margin: 0 auto;
  /*padding-bottom: 40px;*/
}
::v-deep .el-form-item {
  margin-bottom: 17px;
}
::v-deep .el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 300px;
  height: 38px;
  margin: 5px 57px;
}

.title {
  font-family: PingFang SC,helvetica,arial,微软雅黑,华文黑体;
  text-align: center;
  font-size: 20px;
  line-height: 28px;
  color: #000;
  margin: 16px 0 6px;
  padding-top: 5px;
}
#login_entry {
  font-family: PingFang SC,helvetica,arial,微软雅黑,华文黑体;
  font-size: 12px;
  line-height: 16px;
  color: #000;
  text-align: center;
  margin-bottom: 20px;
}

.rember {
  width: 300px;
  height: 20px;
  margin: 0px 57px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-top: 22px;
}
.rember p:first-of-type{
  font-size: 12px;
  color: #4a4a4a;
  letter-spacing: .19px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  /*position: relative;*/
}
.rember p:nth-of-type(2){
  font-size: 14px;
  color: #9b9b9b;
  letter-spacing: .19px;
  cursor: pointer;
}

.rember input{
  outline: 0;
  width: 20px;
  height: 25px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  text-indent: 20px;
  font-size: 14px;
  background: #fff !important;
  margin-right: 7px;
}

.rember p span{
  display: inline-block;
  font-size: 14px;
  width: 100px;
  /*position: absolute;*/
  /*left: 20px;*/

}
.geetest1 {
  position:relative;
  width: 300px;
  max-height: 38px;
  margin: 14px 57px;
}
.geetest_holder {
  width: 300px;
}
.bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  font-size: 12px;
  color: #000;
  line-height: 16px;
  padding-bottom: 11px;
}
.link {
  text-decoration: none;
  color: #000;
}

</style>