(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-13bdaf57"],{"0a26":function(t,a,e){"use strict";e.d(a,"a",(function(){return c}));var i=e("ad06"),n=e("9884"),s=e("ea8e"),c=function(t){var a=t.parent,e=t.bem,c=t.role;return{mixins:[Object(n["a"])(a)],props:{name:null,value:null,disabled:Boolean,iconSize:[Number,String],checkedColor:String,labelPosition:String,labelDisabled:Boolean,shape:{type:String,default:"round"},bindGroup:{type:Boolean,default:!0}},computed:{disableBindRelation:function(){return!this.bindGroup},isDisabled:function(){return this.parent&&this.parent.disabled||this.disabled},iconStyle:function(){var t=this.checkedColor||this.parent&&this.parent.checkedColor;if(t&&this.checked&&!this.isDisabled)return{borderColor:t,backgroundColor:t}},tabindex:function(){return this.isDisabled||"radio"===c&&!this.checked?-1:0}},methods:{onClick:function(t){var a=this.$refs.label,e=t.target,i=a&&(a===e||a.contains(e));this.isDisabled||i&&this.labelDisabled||this.toggle(),this.$emit("click",t)}},render:function(){var t=arguments[0],a=this.slots,n=this.checked,r=a("icon",{checked:n})||t(i["a"],{attrs:{name:"success"},style:this.iconStyle}),d=a()&&t("span",{ref:"label",class:e("label",[this.labelPosition,{disabled:this.isDisabled}])},[a()]),o=this.iconSize||this.parent&&this.parent.iconSize,l=[t("div",{class:e("icon",[this.shape,{disabled:this.isDisabled,checked:n}]),style:{fontSize:Object(s["a"])(o)}},[r])];return"left"===this.labelPosition?l.unshift(d):l.push(d),t("div",{attrs:{role:c,tabindex:this.tabindex,"aria-checked":String(this.checked)},class:e(),on:{click:this.onClick}},[l])}}}},2381:function(t,a,e){},"3c32":function(t,a,e){"use strict";e("68ef"),e("09fe"),e("2381")},"3de6":function(t,a,e){},"417e":function(t,a,e){"use strict";var i=e("d282"),n=e("0a26"),s=Object(i["a"])("checkbox"),c=s[0],r=s[1];a["a"]=c({mixins:[Object(n["a"])({bem:r,role:"checkbox",parent:"vanCheckbox"})],computed:{checked:{get:function(){return this.parent?-1!==this.parent.value.indexOf(this.name):this.value},set:function(t){this.parent?this.setParentValue(t):this.$emit("input",t)}}},watch:{value:function(t){this.$emit("change",t)}},methods:{toggle:function(t){var a=this;void 0===t&&(t=!this.checked),clearTimeout(this.toggleTask),this.toggleTask=setTimeout((function(){a.checked=t}))},setParentValue:function(t){var a=this.parent,e=a.value.slice();if(t){if(a.max&&e.length>=a.max)return;-1===e.indexOf(this.name)&&(e.push(this.name),a.$emit("input",e))}else{var i=e.indexOf(this.name);-1!==i&&(e.splice(i,1),a.$emit("input",e))}}}})},"57b3":function(t,a,e){"use strict";var i=e("3de6"),n=e.n(i);n.a},7830:function(t,a,e){"use strict";var i=e("94f3"),n=e.n(i);n.a},"94f3":function(t,a,e){},9884:function(t,a,e){"use strict";e.d(a,"a",(function(){return s})),e.d(a,"b",(function(){return c}));var i=e("a026");function n(t){var a=[];function e(t){t.forEach((function(t){a.push(t),t.children&&e(t.children)}))}return e(t),a}function s(t,a){var e,s;void 0===a&&(a={});var c=a.indexKey||"index";return i["a"].extend({inject:(e={},e[t]={default:null},e),computed:(s={parent:function(){return this.disableBindRelation?null:this[t]}},s[c]=function(){return this.bindRelation(),this.parent.children.indexOf(this)},s),mounted:function(){this.bindRelation()},beforeDestroy:function(){var t=this;this.parent&&(this.parent.children=this.parent.children.filter((function(a){return a!==t})))},methods:{bindRelation:function(){if(this.parent&&-1===this.parent.children.indexOf(this)){var t=[].concat(this.parent.children,[this]),a=n(this.parent.slots());t.sort((function(t,e){return a.indexOf(t.$vnode)-a.indexOf(e.$vnode)})),this.parent.children=t}}}})}function c(t){return{provide:function(){var a;return a={},a[t]=this,a},data:function(){return{children:[]}}}}},fdb6:function(t,a,e){"use strict";e.r(a);var i,n,s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"main"},[e("div",{staticClass:"main-head"},[e("span",[t._v("请选择车辆")]),e("span",{staticClass:"add",on:{click:function(a){return t.addClick()}}},[t._v("添加车辆")])]),e("div",{staticClass:"main-mid"},t._l(t.dataList,(function(a,i){return e("div",{key:i},[e("send-car-card",{attrs:{carddata:a,checkable:t.submitLoading},on:{cardClick:t.cardClick}})],1)})),0),e("div",{staticClass:"main-foot"},[e("span",{staticClass:"main-foot-label"},[t._v("\n      已选择\n      "),e("span",{staticClass:"count"},[t._v(t._s(t.count))]),t._v(" 辆\n    ")]),e("van-button",{staticClass:"submitBtn",attrs:{"loading-text":"派车中",loading:t.submitLoading,type:"danger",size:"large"},on:{click:function(a){return t.submit()}}},[t._v("确认")])],1),e("van-dialog",{attrs:{title:"新增车辆",lockScroll:"","show-cancel-button":"","before-close":t.beforeClose,confirmButtonColor:"#ffffff"},model:{value:t.addshow,callback:function(a){t.addshow=a},expression:"addshow"}},[e("car-toast",{ref:"carToast",on:{callBack:t.getMyCar}})],1)],1)},c=[],r=e("bd86"),d=(e("e17f"),e("2241")),o=(e("e7e5"),e("d399")),l=(e("7f7f"),e("66b9"),e("b650")),u=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"carCard",attrs:{id:"carCard"},on:{click:function(a){return t.cardClick()}}},[i("van-checkbox",{staticClass:"checkbox",attrs:{disabled:t.checkable},model:{value:t.carddata.checked,callback:function(a){t.$set(t.carddata,"checked",a)},expression:"carddata.checked"}}),i("div",{staticClass:"carInfo"},[i("div",[i("img",{attrs:{src:e("ef7e")}}),i("span",[t._v("车号")]),i("span",[t._v(t._s(t.carddata.carId))])]),i("div",[i("img",{attrs:{src:e("9412")}}),i("span",[t._v("司机")]),i("span",[t._v(t._s(t.carddata.name))])]),i("div",[i("img",{attrs:{src:e("6f66")}}),i("span",[t._v("联系方式")]),i("span",[t._v(t._s(t.carddata.mobile))])])])],1)},h=[],f=(e("3c32"),e("417e")),b=(e("c194"),e("7744")),m=(e("4467"),e("c36e")),p={name:"SendCarCard",props:["carddata","checkable"],components:(i={},Object(r["a"])(i,m["a"].name,m["a"]),Object(r["a"])(i,b["a"].name,b["a"]),Object(r["a"])(i,l["a"].name,l["a"]),Object(r["a"])(i,f["a"].name,f["a"]),i),data:function(){return{checked:!0}},created:function(){},computed:{},methods:{cardClick:function(){this.checkable||this.$emit("cardClick",this.carddata.index)}}},v=p,k=(e("7830"),e("2877")),C=Object(k["a"])(v,u,h,!1,null,"2b2082a0",null),g=C.exports,x=e("ee46"),O=e("7b60"),_={name:"SendCar",components:(n={"send-car-card":g},Object(r["a"])(n,l["a"].name,l["a"]),Object(r["a"])(n,o["a"].name,o["a"]),Object(r["a"])(n,d["a"].Component.name,d["a"].Component),Object(r["a"])(n,"car-toast",x["a"]),n),data:function(){return{id:"",dataList:[],submitLoading:!1,addshow:!1}},computed:{count:function(){for(var t=0,a=0;a<this.dataList.length;a++)this.dataList[a].checked&&(t+=1);return t}},created:function(){this.id=this.$route.query.id,this.getMyCar()},methods:{getMyCar:function(){var t=this;this.$api.post(O["a"].getCarList,{transCorpID:71536}).then((function(a){if("200"==a.data.code){for(var e=[],i=0;i<a.data.data.length;i++){var n={id:a.data.data[i].id,checked:!1,index:i,carId:a.data.data[i].carNum,mobile:a.data.data[i].mobile,name:a.data.data[i].driverName};e.push(n)}t.dataList=[].concat(e)}}))},cardClick:function(t){this.dataList[t].checked=!this.dataList[t].checked},submit:function(){if(0==this.count)return Object(o["a"])("至少派出一辆车"),!1;if(this.count>10)return Object(o["a"])("派车数量请控制在10辆以内"),!1;for(var t="",a=0;a<this.dataList.length;a++)this.dataList[a].checked&&(t+=""==t?this.dataList[a].id:",".concat(this.dataList[a].id));this.sendCar(t)},addClick:function(){this.addshow=!0},beforeClose:function(t,a){"confirm"===t?(setTimeout(a,1e3),a(this.$refs.carToast.addCar())):a()},sendCar:function(t){var a=this;this.submitLoading=!0;var e={id:this.id,transCarIDs:t,transCorpID:71536};this.$api.post(O["a"].saveCarList,e).then((function(t){a.submitLoading=!1,"200"==t.data.code?(Object(o["a"])("派车成功"),a.$router.push({name:"order",params:{active:1}})):Object(o["a"])("派车失败")})).catch((function(t){a.submitLoading=!1}))}}},j=_,L=(e("57b3"),Object(k["a"])(j,s,c,!1,null,"548d2f61",null));a["default"]=L.exports}}]);