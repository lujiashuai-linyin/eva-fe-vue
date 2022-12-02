import router from "./router";
// 这个是一个顶部进度条插件，安装命令: npm install nprogress -S
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import cookie from 'js-cookie';
// 是否在右边显示一个转圈的动画
NProgress.configure({ showSpinner: false });

// 白名单（这里是根据路由名字判断的）
const whiteList = [ "book", "home", "home1", "login","register"];

router.beforeEach(async (to, from, next) => {

    NProgress.start();

    // 有 cookie 这里的 key 值 根据自己的实际来
    if (cookie.get("x-token")) {
        ["login","register"].includes(to.name) ? next({ path: "/" }) : next();
    } else {
        // 没有 cookie
        if (whiteList.includes(to.name)) {
            // 在免登录白名单，直接进入
            next();
        } else {
            if (cookie.get("x-token")) {
                if (to.name === "login") {
                    next({ path: "/" });
                } else {
                    next();
                }
            } else {
                if (to.name === "login") {
                    next(); // 否则全部重定向到登录页
                } else {
                    // 没有登录，这里跳到登录页面
                    next(`/login?redirect=${to.fullPath}`); // 否则全部重定向到登录页
                }
            }
        }
    }
});

router.afterEach(() => {
    NProgress.done();
});

