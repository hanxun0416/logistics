/**
 * 封装axios
 * 对请求拦截、响应拦截、错误进行统一处理
 */
import axios from "axios";
import Router from "../../router/index";
//引入vant的Toast
import { Toast } from "vant";
//引入vuex
import store from "../../store/index";

/**
 * 提示函数
 * 禁止点击蒙层，显示一秒后关闭
 */
const tip = msg => {
  Toast({
    message: msg,
    duration: 1000,
    forbidClick: true
  });
};

/**
 * 跳转登录页
 * 携带当前页面路由跳转至登录页，以便登陆完成之后跳转回当前页面
 */
const toLogin = () => {
  Toast("用户登录过期,请重新登录");
  
  Router.push({
    name: "login",
  });
};
/**
 * 请求失败后错误统一处理方法
 * @param {Number} status //请求失败的状态码
 * @param {*} other
 */
const errorHandle = (status, other) => {
  switch (status) {
    case 404:
      Toast("网络开小差了，请稍后再试");
      // tip('请求的资源不存在')
      break;
    default:
      console.log(other);
      break;
  }
};

//创建axios实例
let instance = axios.create({
  timeout: 1000 * 30
   
});
axios.defaults.timeout = 30000;
//设置POST请求头
instance.defaults.headers.post["Content-Type"] =
  "application/json;charset=UTF-8";
instance.defaults.baseURL = "";
/**
 * 请求拦截器
 * 每次请求前如果存在token则每次发起请求时都携带token参数
 */
instance.interceptors.request.use(
  config => {
    // Do something before request is sent
    const token = store.state.login.token;
    token && (config.headers["Authorization"] = token);
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 *
 */
instance.interceptors.response.use(
  response => {
    // Do something before response is sent
    if (response.status === 200) {
       return Promise.resolve(response); 
      // if (response.data.code == "405") {
      //   store.commit("login/removeToken");
      //   toLogin();
      // } else {
      // return Promise.resolve(response);
      // }
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    Toast.clear();
    // Do something with response error
    const { response } = error;
    if (response) {
      errorHandle(response.status, "response.data.errmsg");
      return Promise.reject(response);
    } else {
      Toast("网络错误,请稍后再试");
      //处理断网情况
    }
    return Promise.reject(error);
  }
);

export default instance;
