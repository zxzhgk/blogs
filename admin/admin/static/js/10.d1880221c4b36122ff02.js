webpackJsonp([10],{Quw4:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o("4YfN"),r=o.n(n),s=o("HVJf"),a={data:function(){return{buttonLoading:!1,form:{email:"",password:""},rules:{email:[{required:!0,message:"不能为空",trigger:"blur"}],password:[{required:!0,message:"密码不能为空",trigger:"blur"}]}}},created:function(){this.$Loading.finish()},methods:r()({},Object(s.b)({login:"admin/login"}),{handleSubmit:function(){var t=this;this.buttonLoading=!0,this.$refs.loginForm.validate(function(e){if(!e)return t.$Message.error("表单验证失败!"),t.buttonLoading=!1,!1;console.log("start"),t.login(t.form).then(function(e){console.log("done"),t.$ls.set("token",e.data.token),t.$Message.success("登录成功！"),t.$router.push("/")}).catch(function(e){console.log("err"),console.log(e),t.buttonLoading=!1})})}})},i={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"login",on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleSubmit(e)}}},[o("div",{staticClass:"login-con"},[o("Card",{attrs:{bordered:!1}},[o("p",{attrs:{slot:"title"},slot:"title"},[o("Icon",{attrs:{type:"log-in"}}),t._v("\n        欢迎登录\n      ")],1),t._v(" "),o("div",{staticClass:"form-con"},[o("Form",{ref:"loginForm",attrs:{model:t.form,rules:t.rules}},[o("FormItem",{attrs:{prop:"email"}},[o("i-input",{attrs:{placeholder:"请输入用户名"},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}},[o("span",{attrs:{slot:"prepend"},slot:"prepend"},[o("Icon",{attrs:{size:16,type:"person"}})],1)])],1),t._v(" "),o("FormItem",{attrs:{prop:"password"}},[o("i-input",{attrs:{type:"password",placeholder:"请输入密码"},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}},[o("span",{attrs:{slot:"prepend"},slot:"prepend"},[o("Icon",{attrs:{size:14,type:"locked"}})],1)])],1),t._v(" "),o("FormItem",[o("Button",{attrs:{loading:t.buttonLoading,type:"primary",long:""},on:{click:t.handleSubmit}},[t._v("登录")])],1)],1)],1)])],1)])},staticRenderFns:[]};var l=o("C7Lr")(a,i,!1,function(t){o("gpzO")},null,null);e.default=l.exports},gpzO:function(t,e){}});
//# sourceMappingURL=10.d1880221c4b36122ff02.js.map