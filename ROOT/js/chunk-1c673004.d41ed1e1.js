(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1c673004"],{"48f4":function(t,a,e){"use strict";function r(t,a){var e=a.to,r=a.url,n=a.replace;if(e&&t){var i=t[n?"replace":"push"](e);i&&i.catch&&i.catch((function(t){if(t&&"NavigationDuplicated"!==t.name)throw t}))}else r&&(n?location.replace(r):location.href=r)}function n(t){r(t.parent&&t.parent.$router,t.props)}e.d(a,"b",(function(){return r})),e.d(a,"a",(function(){return n})),e.d(a,"c",(function(){return i}));var i={url:String,replace:Boolean,to:[String,Object]}},5433:function(t,a,e){"use strict";var r=e("fc6f"),n=e.n(r);n.a},"59cd":function(t,a,e){},"66b9":function(t,a,e){"use strict";e("68ef"),e("09fe")},"6e3c":function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"main"},[e("div",{staticClass:"main-mid"},[e("order-info-card",{attrs:{carddata:t.orderdata}}),e("transport-card",{staticStyle:{"margin-top":"15px"},attrs:{carddata:t.transdata}}),e("goods-card",{staticStyle:{"margin-top":"15px"},attrs:{carddata:t.goodsdata}})],1),e("van-button",{staticClass:"sendBtn",attrs:{hairline:"",size:"large"},on:{click:function(a){return t.sendCar()}}},[t._v("派车")])],1)},n=[],i=e("bd86"),s=(e("7f7f"),e("66b9"),e("b650")),d=e("effd"),o=e("967d"),c=e("5550"),l=e("7b60"),u={name:"Car",components:Object(i["a"])({"order-info-card":d["a"],"goods-card":o["a"],"transport-card":c["a"]},s["a"].name,s["a"]),data:function(){return{orderdata:{id:"",orderNum:"",weight:"",price:"",totalMoney:"",transTypeName:""},transdata:{type:0,startAddr:"",startDate:"",endPlace:"",endDate:""},goodsdata:[]}},created:function(){this.orderdata.id=this.$route.query.id,this.getOrderInfo()},methods:{sendCar:function(){this.$router.push({path:"/sendCar",query:{id:this.orderdata.id}})},getOrderInfo:function(){var t=this,a={id:this.orderdata.id,permit:1,transCorpID:71536};this.$api.post(l["a"].getOrderDetail,a).then((function(a){if("200"==a.data.code){var e=a.data.data[0],r=[e.allBillNo||e.orderID,"".concat(e.weight,"吨"),e.transPrice,e.transMoneySum,e.transTypeName];t.orderdata.orderNum=r[0],t.orderdata.weight=r[1],t.orderdata.price=r[2],t.orderdata.totalMoney=r[3],t.orderdata.transTypeName=r[4];var n=[e.startAddr,e.startDate,e.endPlace,e.endDate];t.transdata.startAddr=n[0],t.transdata.startDate=n[1],t.transdata.endPlace=n[2],t.transdata.endDate=n[3];for(var i=0;i<e.transBillLines.length;i++){var s={stename:e.transBillLines[i].steName||"",steSpec:e.transBillLines[i].steSpec||"",quantity:e.transBillLines[i].quantity||"",weight:e.transBillLines[i].weight||""};t.goodsdata.push(s)}}}))}}},p=u,f=(e("5433"),e("2877")),g=Object(f["a"])(p,r,n,!1,null,"0d45d87f",null);a["default"]=g.exports},"825d":function(t,a,e){"use strict";var r=e("59cd"),n=e.n(r);n.a},b1d2:function(t,a,e){"use strict";e.d(a,"g",(function(){return r})),e.d(a,"d",(function(){return i})),e.d(a,"b",(function(){return s})),e.d(a,"a",(function(){return d})),e.d(a,"c",(function(){return o})),e.d(a,"e",(function(){return c})),e.d(a,"f",(function(){return l}));var r="#fff",n="van-hairline",i=n+"--top",s=n+"--left",d=n+"--bottom",o=n+"--surround",c=n+"--top-bottom",l=n+"-unset--top-bottom"},b650:function(t,a,e){"use strict";var r=e("c31d"),n=e("2638"),i=e.n(n),s=e("d282"),d=e("ba31"),o=e("b1d2"),c=e("48f4"),l=e("ad06"),u=e("543e"),p=Object(s["a"])("button"),f=p[0],g=p[1];function m(t,a,e,r){var n,s=a.tag,p=a.icon,f=a.type,m=a.color,v=a.plain,h=a.disabled,b=a.loading,y=a.hairline,C=a.loadingText,_={};function S(t){b||h||(Object(d["a"])(r,"click",t),Object(c["a"])(r))}function B(t){Object(d["a"])(r,"touchstart",t)}m&&(_.color=v?m:o["g"],v||(_.background=m),-1!==m.indexOf("gradient")?_.border=0:_.borderColor=m);var O=[g([f,a.size,{plain:v,disabled:h,hairline:y,block:a.block,round:a.round,square:a.square}]),(n={},n[o["c"]]=y,n)];function w(){var r,n=[];return b?n.push(t(u["a"],{class:g("loading"),attrs:{size:a.loadingSize,type:a.loadingType,color:"currentColor"}})):p&&n.push(t(l["a"],{attrs:{name:p},class:g("icon")})),r=b?C:e.default?e.default():a.text,r&&n.push(t("span",{class:g("text")},[r])),n}return t(s,i()([{style:_,class:O,attrs:{type:a.nativeType,disabled:h},on:{click:S,touchstart:B}},Object(d["b"])(r)]),[w()])}m.props=Object(r["a"])({},c["c"],{text:String,icon:String,color:String,block:Boolean,plain:Boolean,round:Boolean,square:Boolean,loading:Boolean,hairline:Boolean,disabled:Boolean,nativeType:String,loadingText:String,loadingType:String,tag:{type:String,default:"button"},type:{type:String,default:"default"},size:{type:String,default:"normal"},loadingSize:{type:String,default:"20px"}}),a["a"]=f(m)},effd:function(t,a,e){"use strict";var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"carCard"},[e("span",{staticClass:"title"},[t._v("订单信息")]),e("div",{staticClass:"item"},[e("span",{staticClass:"item-title"},[t._v("订单号")]),e("span",[t._v(t._s(t.carddata.orderNum))])]),e("div",{staticClass:"item"},[e("span",{staticClass:"item-title"},[t._v("运输方式")]),e("span",[t._v(t._s(t.carddata.transTypeName))])]),e("div",{staticClass:"item"},[e("span",{staticClass:"item-title"},[t._v("单价")]),e("span",[t._v(t._s(t.carddata.price))])]),e("div",{staticClass:"item"},[e("span",{staticClass:"item-title"},[t._v("总吨位")]),e("span",[t._v(t._s(t.carddata.weight))])]),e("div",{staticClass:"item"},[e("span",{staticClass:"item-title"},[t._v("总金额")]),e("span",[t._v(t._s(t.carddata.totalMoney))])])])},n=[],i={name:"OrderInfoCard",props:["carddata"],data:function(){return{}},methods:{myclick:function(){this.$emit("cardClick",this.carddata.type,this.carddata.orderNum)}},computed:{}},s=i,d=(e("825d"),e("2877")),o=Object(d["a"])(s,r,n,!1,null,"005ea11b",null);a["a"]=o.exports},fc6f:function(t,a,e){}}]);