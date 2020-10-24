import Vue from "vue";
import Router from "vue-router";
import {
  Toast
} from 'vant';

// 首页
const Home = () => import('../views/Home.vue').catch(() => {
  Toast("loading...")
})
// 报价
const Offer = () => import('../views/offer/Offer.vue').catch(() => {
  Toast("loading...")
})
// 已报价
const Offered = () => import('../views/offer/Offered.vue').catch(() => {
  Toast("loading...")
})
// 已报价
const UnOffer = () => import('../views/offer/UnOffer.vue').catch(() => {
  Toast("loading...")
})
// 结算
const Settlement = () => import('../views/settlement/Settlement.vue').catch(() => {
  Toast("loading...")
})
//加工未对账
const UnSettlemach = () => import('../views/settlement/UnSettlemach.vue').catch(() => {
  Toast("loading...")
})
// UnSettleTrade
//贸易未对账
const UnSettleTrade = () => import('../views/settlement/UnSettleTrade.vue').catch(() => {
  Toast("loading...")
})
// 登录
const Login = () => import('../views/Login.vue').catch(() => {
  Toast("loading...")
})
// 注册
const Registered = () => import('../views/user/Registered.vue').catch(() => {
  Toast("loading...")
})
// 重置密码
const Forgot = () => import('../views/user/Forgot.vue').catch(() => {
  Toast("loading...")
})
//实名认证
const RealName = () => import('../views/user/RealName.vue').catch(() => {
  Toast('loading...')
})
//承运商入驻
const Appraisal = () => import('../views/user/Appraisal.vue').catch(() => {
  Toast('loading...')
})
//我的
const Mine = () => import('../views/mine/Mine.vue').catch(() => {
  Toast('loading...')
})
// 我的信息
const MineInfo = () => import('../views/mine/MineInfo.vue').catch(() => {
  Toast("loading...")
})

// 运输路线
const MineCourse = () => import('../views/mine/MineCourse.vue').catch(() => {
  Toast("loading...")
})
// 我的开票信息
const MineInvoice = () => import('../views/mine/MineInvoice.vue').catch(() => {
  Toast("loading...")
})
// 我的车辆信息
const MineCar = () => import('../views/mine/MineCar.vue').catch(() => {
  Toast("loading...")
})
// 订单
const order = () => import('../views/order/Order.vue').catch(() => {
  Toast("loading...")
})
//待派车
const Car = () => import('../views/order/Car.vue').catch(() => {
  Toast('loading...')
})
//待提货
const Take = () => import('../views/order/Take.vue').catch(() => {
  Toast('loading...')
})
//待传单据
const Bill = () => import('../views/order/Bill.vue').catch(() => {
  Toast('loading...')
})
//已签收
const Signed = () => import('../views/order/Signed.vue').catch(() => {
  Toast('loading...')
})
//上传单据
const UploadBill = () => import('../views/order/UploadBill.vue').catch(() => {
  Toast('loading...')
})
//已对账
const Settled = () => import('../views/settlement/Settled.vue').catch(() => {
  Toast('loading...')
})
//已开票
const Invoiced = () => import('../views/settlement/Invoiced.vue').catch(() => {
  Toast('loading...')
})
//开票付款申请
const paymentRequest = () => import('../views/settlement/paymentRequest.vue').catch(() => {
  Toast('loading...')
})
//待开票
const Uninvoice = () => import('../views/settlement/Uninvoice.vue').catch(() => {
  Toast('loading...')
})
//上传发票
const UpInvoice = () => import('../views/settlement/UpInvoice.vue').catch(() => {
  Toast('loading...')
})
//派出车辆
const SendCar = () => import('../views/order/SendCar.vue').catch(() => {
  Toast('loading...')
})

// 合同查看
const Img = () => import('../views/user/Img.vue').catch(() => {
  Toast('loading...')
})
//地图
const Map=()=>import('../views/map/Map.vue').catch(() => {
  Toast('loading...')
})
//职员权限
const MineManage=()=>import('../views/mine/MineManage.vue').catch(() => {
  Toast('loading...')
})
//职员权限管理
const ProSet=()=>import('../views/mine/ProSet.vue').catch(() => {
  Toast('loading...')
})
//新增职员权限
const AddPer=()=>import('../views/mine/AddPer.vue').catch(() => {
  Toast('loading...')
})
//职员权限信息编辑
const Modification=()=>import('../views/mine/Modification.vue').catch(() => {
  Toast('loading...')
})
//测试
const Hello=()=>import('../views/helloWorld/HelloWorld.vue').catch(() => {
  Toast('loading...')
})

Vue.use(Router);

export default new Router({
  //  mode: 'history',
  routes: [{
    path: "/",
    name: "home",
    component: Home,
    redirect: 'offer',
    meta: {
      title: "物流系统",
      isLogin:true
    },
    children: [{
      path: "/offer",
      name: "offer",
      component: Offer,
      meta: {
        title: "物流系统",
        keepAlive: true,
        isLogin:true
      }
    },
    {
      path: "/order",
      name: "order",
      component: order,
      meta: {
        title: "物流系统",
        keepAlive: true,
        isLogin:true
      }
    }, {
      path: "/settlement",
      name: "settlement",
      component: Settlement,
      meta: {
        title: "物流系统",
        keepAlive: true,
        isLogin:true
      }
    },

    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "物流系统",
    }
  },
  {
    path:'/registered',
    name:'registered',
    component:Registered,
    meta:{
      title:"用户注册",
      // keepAlive: true,

    }
  },
  {
    path:'/forgot',
    name:'forgot',
    component:Forgot,
    meta:{
      title:"忘记密码",
       keepAlive: false,

    }
  },
  {
    path:'/realName',
    name:'realName',
    component:RealName,
    meta:{
      title:"实名认证",
      keepAlive: true,

    }
  },
  {
    path:'/appraisal',
    name:'appraisal',
    component:Appraisal,
    meta:{
      title:"承运商入驻",
      keepAlive: true,

    }
  },
  {
    path: "/img",
    name: "img",
    component: Img,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: "/mine",
    name: "mine",
    component: Mine,
    meta: {
      title: "我的",
      isLogin:true
    }
  },
  {
    path: "/mineInfo",
    name: "mineInfo",
    component: MineInfo,
    meta: {
      title: "我的资料",
      isLogin:true
    }
  }, {
  path: "/minecourse",
  name: "minecourse",
  component: MineCourse,
  meta: {
    title: "运输路线",
    isLogin:true
  }
},
  {
    path: "/mineInvoice",
    name: "mineInvoice",
    component: MineInvoice,
    meta: {
      title: "乐刚开票/邮寄信息",
      isLogin:true
    }
  }, {
    path: "/mineCar",
    name: "mineCar",
    component: MineCar,
    meta: {
      title: "车辆管理",
      isLogin:true
    }
  }, {
    path: "/car",
    name: "car",
    component: Car,
    meta: {
      title: "待派车详情",
      isLogin:true
    }
  }, {
    path: "/take",
    name: "take",
    component: Take,
    meta: {
      title: "待提货详情",
      isLogin:true
    }
  }, {
    path: "/bill",
    name: "bill",
    component: Bill,
    meta: {
      title: "待传单据详情",
       isLogin:true
    }
  }, {
    path: "/signed",
    name: "signed",
    component: Signed,
    meta: {
      title: "已签收详情",
      isLogin:true
    }
  }, {
    path: "/offered",
    name: "offered",
    component: Offered,
    meta: {
      title: "已报价详情",
      isLogin:true
    }
  }, {
    path: "/unOffer",
    name: "unOffer",
    component: UnOffer,
    meta: {
      title: "待报价详情",
      isLogin:true
    }
  },

  {
    path: "/uploadBill",
    name: "uploadBill",
    component: UploadBill,
    meta: {
      title: "上传单据",
      isLogin:true
    }
  }, {
    path: "/unSettlemach",
    name: "UnSettlemach",
    component: UnSettlemach,
    meta: {
      title: "加工待对账",
      isLogin:true
    }
  }, {
    path: "/unSettleTrade",
    name: "UnSettleTrade",
    component: UnSettleTrade,
    meta: {
      title: "贸易待对账",
      isLogin:true
    }
  }, {
    path: "/settled",
    name: "settled",
    component: Settled,
    meta: {
      title: "已对账",
      isLogin:true
    }
  }, {
    path: "/invoiced",
    name: "invoiced",
    component: Invoiced,
    meta: {
      title: "已开票",
       isLogin:true
    }
  },
  {
    path: "/paymentRequest",
    name: "paymentRequest",
    component: paymentRequest,
    meta: {
      title: "开票付款申请",
       isLogin:true
    }
  },
  
  {
    path: "/uninvoice",
    name: "uninvoice",
    component: Uninvoice,
    meta: {
      title: "待开票",
      isLogin:true
    }
  }, {
    path: "/upInvoice",
    name: "upInvoice",
    component: UpInvoice,
    meta: {
      title: "上传发票",
      isLogin:true
    }
  }, {
    path: "/sendCar",
    name: "sendCar",
    component: SendCar,
    meta: {
      title: "派车",
      isLogin:true
    }
  },
  {
    path: "/map",
    name: "map",
    component: Map,
    meta: {
      isLogin:true
    }
  },
  {
    path: "/mineManage",
    name: "mineManage",
    component: MineManage,
    meta: {
      title: "职员权限",
      isLogin:true

    }
  },
  {
    path: "/proset",
    name: "proset",
    component: ProSet,
    meta: {
      title: "权限设置",
      isLogin:true

    }
  },
  {
    path: "/addper",
    name: "addper",
    component: AddPer,
    meta: {
      title: "新增职员权限",
      isLogin:true

    }
  },
  {
    path: "/modification",
    name: "modification",
    component: Modification,
    meta: {
      title: "编辑",
      isLogin:true

    }
  },




  {
    path: "/hello",
    name: "hello",
    component: Hello,
    meta: {
      title: "这是测试",

    }
  },

  ]
});