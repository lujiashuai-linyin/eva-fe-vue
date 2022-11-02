<template>
  <div class="header">
      <div class="content">
        <div class="logo full-left">
          <router-link to="/"><img style="width: 148px;height: 38px" src="/static/image/logo.png" alt=""></router-link>
        </div>
        <ul class="nav full-left">
          <li v-for="(nav, index) in nav_list" :key="index">
            <router-link :to="nav.link">{{nav.title}}</router-link>
          </li>
        </ul>

        <div v-if="token" class="login-bar full-right">
          <div class="shop-cart full-left">
            <span class="shop-cart-total">{{$store.state.cart_length}}</span>
            <img src="/static/image/备忘录.png" alt="">
            <span><router-link to="/">备忘录</router-link></span>
          </div>
          <div class="login-box login-box1 full-left">
            <router-link to="/courses">学习中心</router-link>
            <el-menu width="200" class="member el-menu-demo" mode="horizontal">
              <el-submenu index="2">
                <template slot="title"><img src="/static/image/logo@2x.png" alt=""></template>
                <el-menu-item index="2-1">我的账户</el-menu-item>
                <el-menu-item index="2-2">我的订单</el-menu-item>
                <el-menu-item index="2-3">我的优惠卷</el-menu-item>
                <el-menu-item index="2-3"><span @click="logoutHander">退出登录</span></el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </div>

        <div v-else class="login-bar full-right">
          <div class="shop-cart full-left">
            <div><img src="/static/image/备忘录.png" alt=""></div>
            <div><router-link to="/cart">备忘录</router-link></div>
          </div>
          <div class="auth-button">
            <span class="signin">登录</span>
            <a href="/" class="signup" target="_blank">注册</a>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      token: '',
      nav_id: 0,
      nav_list: [
        {
          id: 1,
          link:"/home",
          title: "首页"
        },
        {
          id: 2,
        link:"/book",
        title: "书云"
      },
        {
          id: 3,
          link:"/",
          title:"游戏"
        },
        {
          id: 4,
          link:"/",
          title:"动漫"
        },
        {
          id: 5,
          link: "/",
          title: "电影"
        },
        {
          id: 6,
          link: "/",
          title: "漫画"
        },
        {
          id: 7,
          link: "/",
          title: "音乐"
        },
        {
          id: 8,
          link: "/",
          title: "图集"
        },
        {
          id: 9,
          link: "/",
          title: "日志"
        },
        {
          id: 10,
          link: "/",
          title: "随笔"
        }
      ]
    }
  },
  created () {
    // this.check_user_login()
    // this.get_nav()
    // console.log(this.nav_list)
  },
  // methods: {
  //   check_user_login () {
  //     // 获取用户的登录状态
  //     this.token = sessionStorage.user_token || localStorage.user_token
  //     return this.token
  //   },
  //   get_nav () {
  //     this.$axios.get(`${this.$settings.HOST}/nav/header/`, {}).then(response => {
  //       this.nav_list = response.data
  //     }).catch(error => {
  //       console.log(error.response)
  //     })
  //   },
  //   logoutHander () {
  //     // 退出登录
  //     localStorage.removeItem('user_token')
  //     localStorage.removeItem('user_id')
  //     localStorage.removeItem('user_name')
  //     sessionStorage.removeItem('user_token')
  //     sessionStorage.removeItem('user_id')
  //     sessionStorage.removeItem('user_name')
  //     this.check_user_login()
  //   }
  // }
}
</script>

<style scoped>
.header-box{
  width: 100%;
  height: 60px;
}
.header{
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 99;
  background: #fff;
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 21%)
}
.auth-button {
  height: 36px;
  display: flex;
  align-items: center;
  line-height: 36px;
}
.auth-button span{
  width: 76px;
  border: 1px solid #ffc210;
  color: #ffc210;
  margin-right: 14px;
  margin-left: 5px;
  cursor: pointer;
  border-radius: 4px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  white-space: nowrap;
  font-weight: 500;
}
.auth-button a {
  width: 98px;
  background: #ffc210;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  white-space: nowrap;
  font-weight: 500;
  text-decoration: none;
}
.header .content{
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.header .content{
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.header .full-right {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.header .content .logo{
  cursor: pointer; /* 设置光标的形状为爪子 */
}
.header .content .logo img{
  vertical-align: middle;
}
.header .nav {
  width: auto;
  height: 36px;
  display: flex;
  justify-content: space-between;
  line-height: 36px;
}
.header .nav li{
  float: left;
  margin-right: 30px;
  font-size: 16px;
  cursor: pointer;

  list-style-type:none;
}
.header .nav li a{
  display: inline-block;
  text-decoration: none;
  color: #4a4a4a;
  font-size: 15px;
  font-weight: 400;
}
.header .nav li .router-link-exact-active{
  color: #ffc210;
  border-bottom: 2px solid #ffc210;
}

.header .nav li:hover a{
  border-bottom: 2px solid #ffc210;
}
.header .login-bar{
  height: 100%;
}
.header .login-bar .shop-cart{

  border-radius: 17px;
  background: #f7f7f7;
  cursor: pointer;
  font-size: 14px;
  width: 110px;
  line-height: 25px;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.header .login-bar .shop-cart:hover{
  background: #f0f0f0;
}
.header .login-bar .shop-cart div img{
  margin-top: 6px;
  width: 18px;
}
.header .login-bar .shop-cart div{
  margin-right: 6px;
}
.header .login-bar .shop-cart div a{
  color: orange;
  text-decoration: none;
}

.header .login-bar .login-box span{
  color: #4a4a4a;
  cursor: pointer;
}
.header .login-bar .login-box span:hover{
  color: #000000;
}
.member{
  display: inline-block;
  height: 34px;
  margin-left: 20px;
}
.member img{
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: inline-block;
}
.member img:hover{
  border: 1px solid yellow;
}
.header .login-bar .login-box1{
  margin-top: 16px;
}
</style>
