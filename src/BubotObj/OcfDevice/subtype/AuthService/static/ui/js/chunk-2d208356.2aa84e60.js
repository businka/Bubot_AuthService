(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d208356"],{a48e:function(t,s,n){"use strict";n.r(s);var e=function(){var t=this,s=t.$createElement,n=t._self._c||s;return t.session.available?n("span",[t.user?n("v-menu",{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(s){var e=s.on;return[n("v-btn",t._g({attrs:{text:"",dense:"","x-small":""}},e),[n("div",{staticClass:"pl-1 LangSelectorText"},[t._v(" "+t._s(t.title)+" ")])])]}}],null,!1,2301757758)},[n("v-list",{staticClass:"pa-0",attrs:{"min-width":"60px",dense:""}},[n("v-list-item",{staticClass:"d-flex flex-row",attrs:{max:""},on:{click:function(s){return s.stopPropagation(),t.signOut()}}},[n("div",{staticClass:"pl-1 LangSelectorText"},[t._v(" "+t._s(t.$t("auth.SignOut"))+" ")])])],1)],1):n("v-btn",{attrs:{text:"",dense:"","x-small":""},on:{click:function(s){return s.stopPropagation(),t.signIn(s)}}},[t._v(" "+t._s(t.$t("auth.SignIn"))+" ")])],1):t._e()},i=[],a=n("17a6"),o={name:"CurrentUserInToolbar",props:{hideNoUser:{type:Boolean,default:!1}},data:function(){return{title:"",loading:!1,visible:!1}},computed:{session:function(){return this.$store.state["Session"]},user:function(){try{return this.$store.state["Session"]["user"]["title"]}catch(t){return""}}},watch:{user:function(t){t?(this.visible=!0,this.title=t):(this.visible=!this.hideNoUser,this.title=this.$t("auth.SignIn"))}},mounted:function(){this.init()},methods:{init:function(){this.session._id||this.$store.dispatch("Session/signIn",null,{root:!0})},signIn:function(){Object(a["c"])()},signOut:function(){this.$store.dispatch("Session/signOut",null,{root:!0})}}},r=o,u=n("2877"),l=n("6544"),c=n.n(l),h=n("8336"),d=n("8860"),p=n("da13"),f=n("e449"),v=Object(u["a"])(r,e,i,!1,null,null,null);s["default"]=v.exports;c()(v,{VBtn:h["a"],VList:d["a"],VListItem:p["a"],VMenu:f["a"]})}}]);
//# sourceMappingURL=chunk-2d208356.2aa84e60.js.map