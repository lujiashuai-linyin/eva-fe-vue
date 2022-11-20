<template>
    <div>
        <e-header></e-header>
        <!-- 子路由的出口-->
        <router-view></router-view>
    </div>
</template>

<script>
    import EHeader from '@/components/common/EHeader';
    export default {
        components: {
            EHeader,
        },
      data() {
        return {
          avatar: "",
          name: "",
          nickname: "",
          authorityId: "",
          email: "",
          phone: ""
        }
      },
      created() {
        this.loginAuth()
      },
      methods: {
        loginAuth() {
          this.$axios.get(`/api/v1/user/getUserInfo`).then(response => {
            if (response.data.code === 0) {
              console.log(response.data.data)
              this.avatar = response.data.data.userInfo.headerImg
              this.$store.commit('updateAvatar', this.avatar)
              this.name = response.data.data.userInfo.userName
              this.$store.commit('updateName', this.name)
              this.nickname = response.data.data.userInfo.nickName
              this.$store.commit('updateNickName', this.nickname)
              this.authorityId = response.data.data.userInfo.authorityId
              this.$store.commit('updateAuthorityId', this.authorityId)
              this.phone = response.data.data.userInfo.phone
              this.$store.commit('updatePhone', this.phone)
              this.email = response.data.data.userInfo.email
              this.$store.commit('updateEmail', this.email)
            }
          }).catch(error => {

          });
        }
      }
    }
</script>

<style scoped>

</style>