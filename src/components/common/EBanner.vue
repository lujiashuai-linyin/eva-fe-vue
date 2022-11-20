<template>
  <div class="banner">
    <el-carousel  height="464px" style="width: 1200px">
      <el-carousel-item v-for="(banner, index) in banner_list" :key="index">
        <a :href="banner.link"><img width="100%" :src="banner.img" alt=""></a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props:[],
  data(){
    return {
      banner_list:[
        {link:"http://www.baidu.com",img:"/static/banner/book_image/仙子们魔堕后抓住我狠狠报恩.jpg"},
        {link:"http://www.baidu.com",img:"/static/banner/book_image/失格魔王与七神姬.jpg"},
        {link:"http://www.baidu.com",img:"/static/banner/book_image/女尊，帝夫今天也在祸乱朝纲.jpg"},
        {link:"http://www.baidu.com",img:"/static/banner/book_image/萝变的我绝不向死神小姐屈服.jpg"},
      ]
    };
  }
}
</script>

<style>

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
</style>