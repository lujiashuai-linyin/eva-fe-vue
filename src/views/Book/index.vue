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
        <p class="condition-result">共21本</p>
      </div>

    </div>
    <!-- 栏目-人气风向标 && 小说热榜 -->
    <div class="book-content">
      <!-- 主内容 -->
      <div class="left-part" style="width: 880px">
      <!-- 内容标题 -->
        <div class="common-title">
          <h3 class="title-text">
            <svg t="1671451171089" class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="2679" width="20" height="20">
              <path d="M114.0736 546.304l751.1552-371.712-529.0496 444.7232zM951.7568 159.8976L556.0832 678.4l348.8768 58.9312 21.9648-14.592z" fill="#FBC07C" p-id="2680"></path><path d="M874.9056 216.9344l-477.6448 423.5264 99.7888 212.1728 8.6528-186.9312z" fill="#FC9553" p-id="2681"></path><path d="M542.72 888.3712v-185.0368l10.9056-15.104 115.712 17.2544z" fill="#E56234" p-id="2682"></path><path d="M962.4064 96.3072c-1.8432-1.8432-4.0448-3.072-6.3488-3.84-4.0448-1.6896-8.704-1.7408-12.9536 0.2048-7.2192 3.3792-722.5856 339.6096-874.9568 410.368a27.23328 27.23328 0 0 0-15.7696 26.6752 27.09504 27.09504 0 0 0 19.2512 24.2688l253.9008 78.1312 164.4032 312.7296a16.44032 16.44032 0 0 0 14.592 8.8064c0.1024 0 0.2048-0.0512 0.3072-0.0512 0.8192 0.1024 1.6384 0.2048 2.4576 0.2048 5.4272 0 10.6496-2.6112 13.8752-7.2704l148.7872-214.8864c5.888-7.3728 10.2912-13.056 13.5168-17.5104l217.7536 38.0928c3.072 0.9728 6.2976 1.4336 9.472 1.4336 6.1952 0 12.3392-1.792 17.5616-5.3248a31.6928 31.6928 0 0 0 14.0288-25.088l24.7808-611.9424c0.0512-0.768-0.0512-1.536-0.1024-2.2528 0.4608-4.5056-1.024-9.2672-4.5568-12.7488zM852.48 169.216L332.6976 602.2144l-243.712-74.9568C217.1392 467.6096 651.4688 263.6288 852.48 169.216z m-496.9472 453.9904l481.8432-401.408-320.0512 404.7872-24.6272 30.8224-2.3552 4.7104v217.4976l-134.8096-256.4096z m289.8432 89.9584l-124.3648 179.5584v-206.8992l128 22.3744c-1.792 2.4576-3.1744 4.352-3.6352 4.9664z m266.1888 8.96v0.0512c0 0.1536 0 0.4608-0.4096 0.7168-0.3584 0.256-0.6656 0.1536-0.8192 0.1024l-1.3312-0.512-229.5296-40.1408-146.4832-26.0608 7.6288-9.6256L934.5536 153.6l-22.9888 568.5248z" fill="#333333" p-id="2683"></path>
            </svg>
            <span class="main-title">人气风向标</span>
            <span class="sub-title">(更新稳定有特点)......</span>
          </h3>
        </div>
        <ul class="story-list">
<!--          <li v-for="(item, index) in hot_book_list" :key="index">-->
          <li>
            <div class="pic">
              <a href="/Novel/598582/">
                <img data-original="//rs.sfacg.com/web/novel/images/NovelCover/Big/2022/11/98c4add7-6ce7-4a7c-a665-589737100cf5.jpg" class="block-img" alt="女主们怎么都喜欢上了黄毛助攻？" src="//rs.sfacg.com/web/novel/images/NovelCover/Big/2022/11/98c4add7-6ce7-4a7c-a665-589737100cf5.jpg" style="display: block;">
              </a>
              <div class="info-layer">
                <a href="/Novel/598582/" target="_blank">
                  <div class="bg"></div>
                  <div class="on">
                    <div class="author-info">
                      <span href="" class="mask">
                          <img src="https://rss.sfacg.com/web/account/images/avatars/app/2210/25/6f9e0ce0-f387-47d8-a53e-5953e912d2d4.jpg" class="block-img" alt="" style="">
                      </span>
                      <span class="name">风烟雨霖</span>
                    </div>
                    <div class="book-info">
                      <p>字数：<span class="highlight">206258</span>字</p>
                      <p>人气：<span class="highlight">1116937</span></p>
                      <p>收藏：<span class="highlight">11243</span></p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <p class="title">
              <a href="/Novel/598582/">女主们怎么都喜欢上了黄毛助攻？</a>
            </p>
            <p class="desc">
            </p>
          </li>
        </ul>
      </div>
      <!-- 排行 -->
      <div class="right-part" style="width: 280px">
        <div class="common-title">
          <h3 class="title-text">
            <span class="main-title">轻小说热榜</span>
          </h3>
          <!-- tab切换导航 -->
          <div class="tab-nav clearfix">
            <div @click="hot_tab='周'" :class="hot_tab === '周'? 'nav-item active': 'nav-item'">
              周
            </div>
            <div @click="hot_tab='月'" :class="hot_tab === '月'? 'nav-item active': 'nav-item'">
              月
            </div>
          </div>
        </div>
      </div>
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
      },
      hot_book_list: [],
      hot_tab: '周',
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
 .common-title {
   position: relative;
   height: 45px;
   border-bottom: 1px solid #dbdbdb;
 }
 .common-title .title-text {
   font-weight: normal;
   color: #666;
 }
 .common-title .main-title {
   margin-right: 10px;
   color: #333;
   font-size: 24px;
   vertical-align: middle;
   line-height: 1;
 }
 .common-title .sub-title {
   font-size: 16px;
   vertical-align: bottom;
 }
 .book-content{
   display: flex;
   flex-direction: row;
   align-items: flex-start;
   justify-content: space-between;
   width: 1200px;
 }
 .story-list {
   padding-top: 10px;
   width: 936px;
 }
.story-list li {
   float: left;
   width: 130px;
   height: 250px;
   padding: 10px 0 15px;
   margin-right: 57px;
   line-height: 1.5;
 }
.block-img {
  width: 130px;
  height: 163px;
}
.story-list .info-layer {
   display: none;
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   padding: 10px 0 0 10px;
}
.story-list .title a {
  color: #333;
}
.story-list .title {
   padding: 5px 0;
   text-align: center;
   font-size: 14px;
}
.story-list .desc {
   color: #666;
   font-size: 12px;
}
ul, li {
 padding: 0;
 margin: 0;
 list-style: none;
}
a {
 text-decoration: none;
 background: transparent;
}
 .tab-nav {
   position: absolute;
   bottom: -2px;
   right: 0;
 }
.tab-nav .nav-item {
   display: inline-block;
   float: left;
   padding: 0 8px;
  width: 16px;
   height: 28px;
   margin-right: 5px;
   text-align: right;
  cursor: pointer;
 }
.tab-nav .active {
   height: 25px;
   border-bottom: 3px solid #f90;
   color: #f90;
 }
</style>