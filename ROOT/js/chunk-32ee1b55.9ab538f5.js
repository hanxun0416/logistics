(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-32ee1b55"],{"0a3c":function(a,t,r){},"59cd":function(a,t,r){},"6f0c":function(a,t,r){},8036:function(a,t,r){"use strict";var s=r("0a3c"),e=r.n(s);e.a},"825d":function(a,t,r){"use strict";var s=r("59cd"),e=r.n(s);e.a},b5c9:function(a,t,r){"use strict";var s=function(){var a=this,t=a.$createElement,r=a._self._c||t;return r("div",{staticClass:"carCard"},[r("span",{staticClass:"title"},[a._v("用车信息")]),a._l(a.carddata,(function(t,s){return r("div",{key:s,staticClass:"item"},[r("span",{staticClass:"item-title"},[a._v(a._s(t.carNun))]),r("span",{staticClass:"item-count"},[a._v(a._s(t.name))]),r("span",{staticClass:"item-title"},[a._v(a._s(t.mobile))])])}))],2)},e=[],n={name:"CarCard",props:["carddata"],data:function(){return{}}},i=n,d=(r("8036"),r("2877")),c=Object(d["a"])(i,s,e,!1,null,"cc5fc35e",null);t["a"]=c.exports},b6ad:function(a,t,r){"use strict";var s=r("6f0c"),e=r.n(s);e.a},da36:function(a,t,r){"use strict";r.r(t);var s=function(){var a=this,t=a.$createElement,r=a._self._c||t;return r("div",{staticClass:"main"},[r("div",{staticClass:"main-mid"},[r("order-info-card",{attrs:{carddata:a.orderdata}}),r("transport-card",{staticStyle:{"margin-top":"15px"},attrs:{carddata:a.transdata}}),r("car-card",{staticStyle:{"margin-top":"15px"},attrs:{carddata:a.cardata}}),r("goods-card",{staticStyle:{"margin-top":"15px"},attrs:{carddata:a.goodsdata}})],1)])},e=[],n=r("effd"),i=r("967d"),d=r("5550"),c=r("b5c9"),o=r("7b60"),l={name:"Signed",components:{"order-info-card":n["a"],"goods-card":i["a"],"transport-card":d["a"],"car-card":c["a"]},data:function(){return{orderdata:{id:"",orderNum:"",weight:"",price:"",totalMoney:"",transTypeName:""},transdata:{type:0,startAddr:"",startDate:"",endPlace:"",endDate:""},goodsdata:[],cardata:[]}},created:function(){this.orderdata.id=this.$route.query.id,this.getOrderInfo()},methods:{getOrderInfo:function(){var a=this,t={id:this.orderdata.id,permit:1,transCorpID:71536};this.$api.post(o["a"].getOrderDetail,t).then((function(t){if("200"==t.data.code){console.log(t);var r=t.data.data[0],s=[r.allBillNo||r.orderID,"".concat(r.weight,"吨"),r.transPrice,r.transMoneySum,r.transTypeName];a.orderdata.orderNum=s[0],a.orderdata.weight=s[1],a.orderdata.price=s[2],a.orderdata.totalMoney=s[3],a.orderdata.transTypeName=s[4];var e=[r.startAddr,r.startDate,r.endPlace,r.endDate];a.transdata.startAddr=e[0],a.transdata.startDate=e[1],a.transdata.endPlace=e[2],a.transdata.endDate=e[3];for(var n=0;n<r.transBillLines.length;n++){var i={stename:r.transBillLines[n].steName||"",steSpec:r.transBillLines[n].steSpec||"",quantity:r.transBillLines[n].quantity||"",weight:r.transBillLines[n].weight||""};a.goodsdata.push(i)}for(var d=0;d<r.transCars.length;d++){var c={carNun:r.transCars[d].cartNo||"",name:r.transCars[d].driverName||"",mobile:r.transCars[d].mobile||""};a.cardata.push(c)}}}))}}},u=l,p=(r("b6ad"),r("2877")),m=Object(p["a"])(u,s,e,!1,null,"ff5f317a",null);t["default"]=m.exports},effd:function(a,t,r){"use strict";var s=function(){var a=this,t=a.$createElement,r=a._self._c||t;return r("div",{staticClass:"carCard"},[r("span",{staticClass:"title"},[a._v("订单信息")]),r("div",{staticClass:"item"},[r("span",{staticClass:"item-title"},[a._v("订单号")]),r("span",[a._v(a._s(a.carddata.orderNum))])]),r("div",{staticClass:"item"},[r("span",{staticClass:"item-title"},[a._v("运输方式")]),r("span",[a._v(a._s(a.carddata.transTypeName))])]),r("div",{staticClass:"item"},[r("span",{staticClass:"item-title"},[a._v("单价")]),r("span",[a._v(a._s(a.carddata.price))])]),r("div",{staticClass:"item"},[r("span",{staticClass:"item-title"},[a._v("总吨位")]),r("span",[a._v(a._s(a.carddata.weight))])]),r("div",{staticClass:"item"},[r("span",{staticClass:"item-title"},[a._v("总金额")]),r("span",[a._v(a._s(a.carddata.totalMoney))])])])},e=[],n={name:"OrderInfoCard",props:["carddata"],data:function(){return{}},methods:{myclick:function(){this.$emit("cardClick",this.carddata.type,this.carddata.orderNum)}},computed:{}},i=n,d=(r("825d"),r("2877")),c=Object(d["a"])(i,s,e,!1,null,"005ea11b",null);t["a"]=c.exports}}]);