(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[941],{9217:function(e,n,t){Promise.resolve().then(t.bind(t,7074))},8372:function(e,n,t){"use strict";t.d(n,{I:function(){return s},db:function(){return a}});var i=t(5236),o=t(5186),r=t(9842),c=t(9854);let l=(0,i.C6)().length?(0,i.Mq)():(0,i.ZF)({apiKey:"AIzaSyAgzaJNv2Gc34TbnOnJGIRFs73TKs0vHLw",authDomain:"philog-a9b29.firebaseapp.com",projectId:"philog-a9b29",storageBucket:"philog-a9b29.appspot.com",messagingSenderId:"2917497922",appId:"1:2917497922:web:960fc82b4bbc800c1e81db",measurementId:"G-MJLSMCCKX5"}),s=(0,o.v0)(l),a=(0,r.ad)(l);(0,c.cF)(l)},7074:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return f}});var i=t(7437),o=t(1526),r=t(2265),c=t(7975),l=t(7787),s=t(5186),a=t(6463),d=t(8372),u=t(9088);function f(){let[e,n]=(0,r.useState)(""),[t,f]=(0,r.useState)(""),[p,h]=(0,r.useState)(null),g=(0,a.useRouter)(),x=async n=>{if(n.preventDefault(),h(null),!e||!t){h("이메일과 비밀번호를 모두 입력해주세요.");return}try{await (0,s.e5)(d.I,e,t),console.log("로그인 성공"),console.log("User Info:",d.I.currentUser),g.push("/")}catch(e){h(m(e.code))}},m=e=>{switch(e){case"auth/invalid-email":return"올바른 이메일 형식을 입력해주세요!";case"auth/invalid-credential":return"이메일이나 비밀번호가 올바르지 않습니다.";default:return"로그인 중 문제가 발생했습니다. 다시 시도해주세요."}};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("form",{onSubmit:x,children:[(0,i.jsx)(o.Z,{label:"이메일",placeholder:"이메일을 입력해주세요.",value:e,onChange:e=>n(e.target.value)}),(0,i.jsx)(o.Z,{label:"비밀번호",placeholder:"비밀번호를 입력해주세요.",value:t,onChange:e=>f(e.target.value),type:"password"}),(0,i.jsx)(c.Z,{text:"로그인",type:"submit"})]}),p&&(0,i.jsx)(u.Z,{message:p}),(0,i.jsx)(l.Z,{type:"login"})]})}},9088:function(e,n,t){"use strict";t.d(n,{Z:function(){return r}});var i=t(7437),o=t(9183);function r(e){let{message:n}=e;return(0,i.jsx)(c,{children:(0,i.jsx)(l,{children:n})})}let c=o.ZP.div.withConfig({componentId:"sc-c66fb4ef-0"})(["width:320px;margin-bottom:20px;"]),l=o.ZP.div.withConfig({componentId:"sc-c66fb4ef-1"})(["color:#ff4f4f;"])},7975:function(e,n,t){"use strict";t.d(n,{Z:function(){return o}});var i=t(7437);function o(e){let{text:n}=e;return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(r,{children:n})})}let r=t(9183).ZP.button.withConfig({componentId:"sc-40b1f996-0"})(["width:320px;height:56px;background-color:#7ce28d;color:white;font-size:20px;font-weight:600;border-radius:10px;margin:30px 0;"])},1526:function(e,n,t){"use strict";t.d(n,{Z:function(){return c}});var i=t(7437);t(2265);var o=t(7371),r=t(9183);function c(e){let{label:n,placeholder:t,value:r,onChange:c,type:a}=e;return(0,i.jsxs)(o.Ej,{style:{gap:10,marginBottom:15},children:[(0,i.jsx)(l,{children:n}),(0,i.jsx)(s,{placeholder:t,value:r,onChange:c,type:a})]})}let l=r.ZP.div.withConfig({componentId:"sc-5812bfb5-0"})(["font-size:14px;"]),s=r.ZP.input.withConfig({componentId:"sc-5812bfb5-1"})(["width:320px;height:56px;font-size:16px;border-radius:10px;background:#f6f7f9;resize:none;border:none;outline:none;padding:10px;line-height:56px;&::placeholder{color:#c6ccd1;font-style:normal;font-weight:400;line-height:56px;font-size:16px;}"])},7787:function(e,n,t){"use strict";t.d(n,{Z:function(){return c}});var i=t(7437),o=t(9183),r=t(7138);function c(e){let{type:n}=e,t="login"===n;return(0,i.jsxs)(l,{children:[(0,i.jsx)(s,{children:t?"아직 가입하지 않았다면?":"이미 가입을 했다면?"}),(0,i.jsx)(a,{href:t?"/register":"/login",children:t?"회원가입 하러가기":"로그인 하러가기"})]})}let l=o.ZP.div.withConfig({componentId:"sc-6eb60943-0"})(["font-size:16px;color:#a6abaf;line-height:1.5;display:flex;flex-direction:column;align-items:center;text-align:center;"]),s=o.ZP.div.withConfig({componentId:"sc-6eb60943-1"})(["margin-bottom:10px;"]),a=(0,o.ZP)(r.default).withConfig({componentId:"sc-6eb60943-2"})(["font-weight:bold;color:#a6abaf;cursor:pointer;text-decoration:none;"])},7371:function(e,n,t){"use strict";t.d(n,{Ej:function(){return l},_z:function(){return r},or:function(){return o},uP:function(){return c}});var i=t(9183);let o=i.ZP.div.withConfig({componentId:"sc-a7d8e3-0"})(["display:flex;flex-direction:column;justify-content:center;align-items:center;margin:0px;"]),r=i.ZP.div.withConfig({componentId:"sc-a7d8e3-1"})(["display:flex;flex-direction:column;justify-content:center;width:320px;"]),c=i.ZP.div.withConfig({componentId:"sc-a7d8e3-2"})(["display:flex;flex-direction:column;align-items:center;max-width:500px;width:100%;"]);i.ZP.div.withConfig({componentId:"sc-a7d8e3-3"})(["height:32px;width:32px;border-radius:90px;background-color:grey;"]);let l=i.ZP.div.withConfig({componentId:"sc-a7d8e3-4"})(["display:flex;flex-direction:column;"])}},function(e){e.O(0,[533,358,183,144,4,291,971,23,744],function(){return e(e.s=9217)}),_N_E=e.O()}]);