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
    }
</script>

<style scoped>

</style>