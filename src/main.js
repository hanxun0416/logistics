import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import api from "./request/api/api";


Vue.config.productionTip = false;
Vue.prototype.$api = api;


router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  if(to.meta.isLogin){
        if (store.state.login.token == "" ||store.state.login.token&&store.state.login.date<=Date.now()||store.state.login.isCarrier==false) {
    store.commit("login/removeToken");
    next({
      path: "/login",
      query: {
        redirect: from.fullPath == "/" ? "/offer" : "/offer"
      }
    });
  }
  else{
    next(
      store.commit("login/setDate")
    )
  }
  }
  else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
