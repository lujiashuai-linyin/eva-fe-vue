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

        <div v-if="this.$store.state.name" class="login-bar full-right">
          <div class="shop-cart full-left">
            <div><img src="/static/image/备忘录.png" alt=""></div>
            <div><router-link to="/calendar">日程</router-link></div>
          </div>
          <div class="shop-cart full-left">
            <div><img src="/static/image/日志.png" alt=""></div>
            <div><router-link to="/">日志</router-link></div>
          </div>
          <div class="shop-cart full-left">
            <div><img src="/static/image/笔记.png" alt=""></div>
            <div><router-link to="/">随笔</router-link></div>
          </div>
          <div style="width: 130px" class="login-space">
            <span class="ant-avatar" style="cursor: pointer;">
              <img :src="this.$store.state.avatar">
            </span>
            <el-dropdown trigger="click" size="small">
              <span class="el-dropdown-link">
                {{ this.$store.state.nickname }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <div @click="logoutHander">
                  <el-dropdown-item>注销</el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>

        <div v-else class="login-bar full-right">
          <div class="search-content">
            <el-input placeholder="请输入内容" v-model="search_content" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div class="auth-button">
            <span class="signin" @click="Goto('/login')">登录</span>
            <a href="/" class="signup" target="_blank">注册</a>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
import cookie from 'js-cookie';
export default {
  data () {
    return {
      search_content: '',
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
      ]
    }
  },
  created () {
  },
  methods: {
    Goto(router) {
      this.$router.push(router)
    },
    logoutHander() {
      console.log("注销")
      cookie.remove("x-token")
      cookie.remove("username")
      this.$router.push("/login")
    }
  }
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
  width: 480px;
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
.login-space {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 150px;
}
.ant-avatar {
  margin-right: 10px;
}
.ant-avatar img {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0,0,0,.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  display: inline-block;
  overflow: hidden;
  color: #fff;
  white-space: nowrap;
  text-align: center;
  vertical-align: middle;
  background: #ccc;
  width: 32px;
  height: 32px;
  line-height: 32px;
  border-radius: 50%;
}
.el-dropdown-link {
  cursor: pointer;
}
.search-content {
  width: 260px;
  height: 36px;
}
::v-deep .el-input__inner {
  height: 38px;
}
::v-deep .el-input__inner:focus {
  outline: none;
  border: 1px solid #fad065;
}
::v-deep .el-input-group__append button.el-button {
  background-color: #fff;
  color: orange;
  border-top: 1px;
  border-bottom: 1px;
  height: 36px;
  margin-top: -6.95px;
  border-radius: 0;
}
::v-deep .el-input-group__append button.el-button:hover {
  background-color: orange;
  color: #fff;
  border-radius: 0;
}

</style>
