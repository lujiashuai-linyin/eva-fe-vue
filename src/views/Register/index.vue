<template>
  <div class="register-page">
    <img src="/static/image/register_background.jpg" alt="">
    <div class="register">
      <div class="register-box">
        <el-form :label-position="labelPosition" :model="formLabelAlign">
          <div class="title" id="title_2" style="padding-top: 9px">欢迎注册</div>
          <div class="Proverbs">
            <div class="login_entry">这世间忙忙碌碌，可总有安逸娴静的光阴。</div>
            <div class="login_entry">可记得有多久未曾停歇？</div>
          </div>
          <el-form-item>
            <el-input @focus="set_captcha=false" v-model="formLabelAlign.username" autocomplete="off" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input @focus="set_captcha=false" v-model="formLabelAlign.nickname" autocomplete="off" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input @focus="set_captcha=false" type="password" autocomplete="off" v-model="formLabelAlign.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input @focus="set_captcha=false" type="password" autocomplete="off" v-model="formLabelAlign.repassword" @change="ensurePassword" placeholder="请确认密码"></el-input>
            <div style="color: red; margin-right:  57px; margin-left: 57px; text-align: start; line-height: 1px;margin-top: 10px;" v-show="re_password_error">{{re_password_error}}</div>
          </el-form-item>
          <el-form-item>
            <el-input @focus="set_captcha=true" @change="checkMobile" v-model="formLabelAlign.phone" placeholder="请输入手机号"></el-input>
            <div style="color: red; margin-right:  57px; margin-left: 57px; text-align: start; line-height: 1px;margin-top: 10px;" v-show="phone_error">{{phone_error}}</div>
          </el-form-item>
          <el-form-item>
            <el-input v-show="set_captcha" maxlength="6" v-model="formLabelAlign.captcha" placeholder="请输入验证码">
            </el-input>
            <el-button class="smscode-wrap__btn" :disabled="!formLabelAlign.phone||is_send_sms" :class="sms_text !== '点击发送短信'? 'margin':''" @click="smsHander">{{sms_text}}</el-button>
          </el-form-item>
          <div v-show='code'>{{code}}</div>
          <el-form-item>
            <el-button type="primary" @click="handleregister" style="width: 300px;height: 38px; margin-top: 0px; margin-bottom: 8px; margin-right:  57px; margin-left: 57px">点击注册</el-button>
          </el-form-item>
          <div v-show="!set_captcha" class="bottom" id="bottom_web" style="margin-right:  57px; margin-left: 57px; height: 16px; width: 300px;">
            <div>
              <a href="#" class="link" id="forgetpwd" target="_blank">邮箱注册</a>
            </div>
            <div>
              <a href="/login" class="link">前往登录</a>
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
export default {
  data() {
    return {
      set_captcha: false,
      is_send_sms: false,
      login_method:0,
      code: '',
      sms_text: '点击发送短信',
      labelPosition: 'left',
      template: 'register',
      re_password_error: '',
      phone_error: '',
      formLabelAlign: {
        username: '',
        nickname: '',
        password: '',
        repassword: '',
        phone: '',
        captcha: '',
      }
    };
  },
  methods: {
    checkMobile(){
      // 检查手机号的合法性[格式和是否已经注册]
      if(! /1[3-9]\d{9}/.test(this.formLabelAlign.phone)){
        this.phone_error = "手机号码格式不正确！";
      }else {
        this.phone_error = "";
      }
    },
    // 校验确认密码
    ensurePassword(){
      if (this.formLabelAlign.repassword !== this.formLabelAlign.password) {
        this.re_password_error = "两次密码不一致"
      }else {
        this.re_password_error = ""
      }
    },
    // 添加短信注册功能
    smsHander(){
      // 发送短信
      // 1. 检查手机格式
      if(! /1[3-9]\d{9}/.test(this.formLabelAlign.phone)){
        this.$message.error("手机号码格式不正确！");
        return false;
      }
      this.$axios.get(`/api/v1/user/mobile/${this.formLabelAlign.phone}`).catch(error=>{
        this.$message.error(error.response.data.message);
        return
      });
      // 2. 判断手机号码是否60s内发送短信
      if(this.is_send_sms){
        this.$message.error("当前手机号已经在60秒内发送过短信，请不要频繁发送！");
        return false;
      }

      // 3. 发送ajax
      this.$axios.get(`/api/v1/user/sms/valid`,{params:
            {mobile:this.formLabelAlign.phone,
              template:this.template,}
      }).then(response=>{
        console.log(response.data);
        if (response.data.code === 0){
          this.code === response.data.data.code
          this.is_send_sms = true;
          let interval_time = 60;
          let timer = setInterval(()=>{
            if(interval_time<=1){
              // 停止倒计时，允许用户点击发送短信
              clearInterval(timer);
              this.is_send_sms=false; // 设置短信发送段的间隔状态为false,允许点击发送短信
              this.sms_text = "点击发送短信";
            }else{
              interval_time--;
              this.sms_text= `${interval_time}秒后重新点击发送`;
            }
          },1000)
        }
      }).catch(error=>{
        this.$message.error(error.response.data.message);
      });
    },
    handleregister() {
      // 用户密码账号登录
      // 现在只支持手机号
      this.$axios.post(`/api/v1/user/register`, {
        userName: this.formLabelAlign.username,
        passWord: this.formLabelAlign.password,
        rePassWord: this.formLabelAlign.repassword,
        nickName: this.formLabelAlign.nickname,
        phone: this.formLabelAlign.phone,
        captcha: this.formLabelAlign.captcha,
      }).then(response => {
        console.log(response.data)
        if (response.data.code === 0) {
          let self = this
          this.$alert('注册成功!', 'eva', {
            callback() {
              if (self.$router.currentRoute.path.split('/').pop() === 'chat') {
                self.$router.push('/login/chat')
              } else {
                self.$router.push('/login')
              }
              // self.$router.go(-1);
            }
          })
        }
        // 页面跳转
      }).catch(error => {
        console.log(error)
        this.$message.error('对不起，注册失败！')
      })
    },
  }
}
</script>

<style scoped>
.register-page{
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.register-page img{
  width: 100%;
  min-height: 100%;
}

.register {
  position: absolute;
  width: 500px;
  height: 400px;
  left: 0;
  margin: auto;
  right: -900px;
  bottom: 0;
  top: -438px;
}
.register-box {
  width: 414px;
  min-height: 400px;
  max-height: 500px;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.5);
  border-radius: 4px;
  margin: 0 auto;
  /*padding-bottom: 40px;*/
}

.Proverbs {
  height: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  padding-bottom: 20px;
}

::v-deep .el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 300px;
  height: 38px;
  margin: 5px 57px;
}

::v-deep .el-form-item {
  margin-bottom: 10px;
}
::v-deep .el-form-item__content {
  line-height: 0px;
  position: relative;
  font-size: 10px;
}

.title {
  font-family: PingFang SC,helvetica,arial,微软雅黑,华文黑体;
  text-align: center;
  font-size: 20px;
  line-height: 28px;
  color: #000;
  margin: 16px 0 6px;
}
.login_entry {
  font-family: PingFang SC,helvetica,arial,微软雅黑,华文黑体;
  font-size: 12px;
  line-height: 16px;
  color: #606266;
  text-align: center;
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
.margin {
  color: #ccc;
  margin-left: -44px;
}
.smscode-wrap__btn .disabled {
  color: #ccc;
}
.smscode-wrap__btn {
  font-size: 14px;
  color: #2e77e5;
  cursor: pointer;
  position: absolute;
  left: 232px;
  top: 7px;
  border: none;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  padding: 11px 20px;
  border-radius: 4px;
}
</style>