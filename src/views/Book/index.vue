<template>
  <div class="book">
    <div v-if="this.$store.state.name" class="tags-row">
      <div class="wrap">
        <div class="search-area" id="searchArea">
          <input class="search-input" type="text" id="search" maxlength="50" placeholder="输入作品名/作者名">
          <div class="search-btn" id="searchBtn">
            <span class="icn"></span>
          </div>
        </div>
        <div class="right-info">
          <a href="/">
            <i class="icn"></i>
            <span>书架</span>
          </a>
          <a href="/">
            <i class="icn-v"></i>
            <span>笔记</span>
          </a>
          <a href="https://manhua.sfacg.com/">创作</a>
        </div>
      </div>
    </div>
    <e-banner></e-banner>
    <div class="condition">
      <ul class="cate-list">
        <li class="title">书籍分类:</li>
        <li @click="category=-1" :class="category==-1?'this':''">全部</li>
        <li @click="category=cat.id" :class="category==cat.id?'this':''" v-for="cat in category_list">{{cat.name}}</li>
      </ul>

      <div class="ordering">
        <ul>
          <li class="title">筛&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;选: </li>
          <li @click="change_order_type('id')" class="default" :class="change_order_class('id')">默认</li>
          <li @click="change_order_type('students')" class="hot" :class="change_order_class('students')">人气</li>
          <li @click="change_order_type('price')" class="price" :class="change_order_class('price')">价格</li>

          <!--            <li @click="filters.type=0" class="default" :class="filters.type==0?'this':''">默认</li>-->
          <!--            <li @click="filters.type=1" class="hot" :class="filters.type==1?'this':''">人气</li>-->
          <!--            <li @click="filters.type=2" class="price" :class="filters.type==2?'this':''">价格</li>-->
        </ul>
        <p class="condition-result">共21个课程</p>
      </div>

    </div>
    <div class="book-content">
      
    </div>
  </div>
</template>

<script>
import EBanner from "@/components/common/EBanner";
import cookie from "js-cookie";
export default {
  data(){
    return{
      token: '',
      category: -1,
      category_list:[
        {
          id:0,
          name:"轻小说"
        },
        {
          id:1,
          name:"网络小说"
        },
        {
          id:2,
          name:"纯文学"
        },
        {
          id:3,
          name:"其他"
        }
      ],
      total: 0,
      filters:{
        type: "id", // 筛选类型，id表示默认，students表示人气,price表示价格
        orders: "desc",  // 排序类型[控制样式]，desc表示降序，asc表示升序
        size: 5, // 单页数据量
        page: 1, // 当前页码
      }
    }
  },
  methods: {
    change_order_type(type){
      // 更改升序或者降序
      if( this.filters.type === type && this.filters.orders === "desc" ){
        this.filters.orders="asc";
      }else if( this.filters.type === type && this.filters.orders === "asc"){
        this.filters.orders="desc";
      }

      // 更改排序方式
      this.filters.type=type;
      // 重新获取课程
      this.get_course();
    },
    change_order_class(type){
      // 更改当前选中筛选条件的高亮方式
      if( this.filters.type === type && this.filters.orders === "asc" ){
        return "this asc";
      }else if(this.filters.type===type && this.filters.orders === "desc"){
        return "this desc";
      }else{
        return "";
      }
    },
  },
  components:{
    EBanner
  }
}
</script>

<style scoped>
 .book{
   padding-top: 60px;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: flex-start;
   overflow: hidden;
   width: 100%;
   height:100%;
 }

 .tags-row {
   -webkit-tap-highlight-color: transparent;
   -webkit-text-size-adjust: none;
   font: 16px "microsoft yahei",\u5fae\u8f6f\u96c5\u9ed1,"微软雅黑",Arial;
   height: 39px;
   background: #f56c6c00;
   border-bottom: 1px solid #fbe6db;
   line-height: 40px;
 }

 .right-info{
   -webkit-tap-highlight-color: transparent;
   -webkit-text-size-adjust: none;
   font: 16px "microsoft yahei",\u5fae\u8f6f\u96c5\u9ed1,"微软雅黑",Arial;
   line-height: 40px;
   float: right;
 }
.right-info a {
  -webkit-tap-highlight-color: transparent;
  -webkit-text-size-adjust: none;
  font: 16px "microsoft yahei",\u5fae\u8f6f\u96c5\u9ed1,"微软雅黑",Arial;
  line-height: 40px;
  background: transparent;
  text-decoration: none;
  margin-left: 20px;
  color: #d86a36;
  font-size: 15px;
}
.right-info a i{
  -webkit-tap-highlight-color: transparent;
  -webkit-text-size-adjust: none;
  font: 16px "microsoft yahei",\u5fae\u8f6f\u96c5\u9ed1,"微软雅黑",Arial;
  color: #d86a36;
  display: inline-block;
  font-family: 'icomoon' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: middle;
  letter-spacing: 0;
  font-feature-settings: "liga";
  font-variant-ligatures: discretionary-ligatures;
  -webkit-font-smoothing: antialiased;
  font-size: 19px;
}
 .tags-row .right-info span {
   vertical-align: middle;
 }
 .tags-row .tags {
   float: left;
   font-size: 14px;
 }
 .tags-row .wrap{
   -webkit-tap-highlight-color: transparent;
   -webkit-text-size-adjust: none;
   font: 16px "microsoft yahei",\u5fae\u8f6f\u96c5\u9ed1,"微软雅黑",Arial;
   line-height: 40px;
   position: relative;
   width: 1200px;
   margin: 0 auto;
 }
 .search-area {
   -webkit-tap-highlight-color: transparent;
   -webkit-text-size-adjust: none;
   font: 16px "microsoft yahei",\u5fae\u8f6f\u96c5\u9ed1,"微软雅黑",Arial;
   position: absolute;
   left: 10px;
   width: 360px;
   height: 35px;
   background: rgba(255, 255, 255, .7);
   border-radius: 40px;
   box-shadow: 0 0 1px 1px rgb(0 0 0 / 30%);
 }
 .search-area .search-input {
   display: block;
   width: 300px;
   height: 38px;
   padding-left: 20px;
   background: none;
   line-height: 40px;
   border: none;
   outline: none;
   color: #333;
   font-size: 14px;
 }
 .search-area .search-btn {
   -webkit-tap-highlight-color: transparent;
   -webkit-text-size-adjust: none;
   font: 16px "microsoft yahei",\u5fae\u8f6f\u96c5\u9ed1,"微软雅黑",Arial;
   position: absolute;
   top: 0;
   right: 0;
   width: 40px;
   height: 40px;
   color: #ff6701;
   font-size: 24px;
   text-align: center;
   cursor: pointer;
 }

 .book{
   background: #f6f6f6;
 }
 .book .condition{
   width: 1150px;
   margin-bottom: 35px;
   padding: 25px 30px 25px 20px;
   background: #fff;
   border-radius: 4px;
   box-shadow: 0 2px 4px 0 #f0f0f0;
 }
 .book .cate-list{
   border-bottom: 1px solid #333;
   border-bottom-color: rgba(51,51,51,.05);
   padding-bottom: 18px;
   margin-bottom: 17px;
 }
 .book .cate-list::after{
   content:"";
   display: block;
   clear: both;
 }
 .book .cate-list li{
   float: left;
   font-size: 16px;
   padding: 6px 15px;
   line-height: 16px;
   margin-left: 14px;
   position: relative;
   transition: all .3s ease;
   cursor: pointer;
   color: #4a4a4a;
   border: 1px solid transparent; /* transparent 透明 */
   list-style-type:none;
 }
 .book .cate-list .title{
   color: #888;
   margin-left: 0;
   letter-spacing: .36px;
   padding: 0;
   line-height: 28px;
 }
 .book .cate-list .this{
   color: #ffc210;
   border: 1px solid #ffc210!important;
   border-radius: 30px;
 }
 .book .ordering::after{
   content:"";
   display: block;
   clear: both;
 }
 .book .ordering ul{
   float: left;
 }
 .book .ordering ul::after{
   content:"";
   display: block;
   clear: both;
 }
 .book .ordering .condition-result{
   float: right;
   font-size: 14px;
   color: #9b9b9b;
   line-height: 28px;
 }
 .book .ordering ul li{
   float: left;
   padding: 6px 15px;
   line-height: 16px;
   margin-left: 14px;
   position: relative;
   transition: all .3s ease;
   cursor: pointer;
   color: #4a4a4a;
   list-style-type:none;
 }
 .book .ordering .title{
   font-size: 16px;
   color: #888;
   letter-spacing: .36px;
   margin-left: 0;
   padding:0;
   line-height: 28px;
 }
 .book .ordering .this{
   color: #ffc210;
   position: relative;
 }
 .book .ordering .this::before,
 .book .ordering .this::after{
   cursor: pointer;
   content:"";
   display: block;
   width: 0px;
   height: 0px;
   border: 5px solid transparent;
   position: absolute;
   right: 0;
 }
 .book .ordering .this::before{
   border-bottom: 5px solid #aaa;
   margin-bottom: 2px;
   top: 2px;
 }
 .book .ordering .this::after{
   border-top: 5px solid #aaa;
   bottom: 2px;
 }
 .book .ordering .asc::before{
   border-bottom-color: #ffc210;
 }
 .book .ordering .desc::after{
   border-top-color: #ffc210;
 }


</style>