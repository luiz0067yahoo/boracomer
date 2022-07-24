/*!
  * vue-router v4.0.5
  * (c) 2021 Eduardo San Martin Morote
  * @license MIT
  */
var VueRouter=function(e,t){"use strict";const n="function"==typeof Symbol&&"symbol"==typeof Symbol.toStringTag,r=e=>n?Symbol("[vue-router]: "+e):"[vue-router]: "+e,o=r("router view location matched"),a=r("router view depth"),i=r("router"),s=r("route location"),l=r("router view location"),c="undefined"!=typeof window;const u=Object.assign;function f(e,t){const n={};for(const r in t){const o=t[r];n[r]=Array.isArray(o)?o.map(e):e(o)}return n}let d=()=>{};function p(e){const t=Array.from(arguments).slice(1);console.warn.apply(console,["[Vue Router warn]: "+e].concat(t))}const h=/\/$/;function m(e,t,n="/"){let r,o={},a="",i="";const s=t.indexOf("?"),l=t.indexOf("#",s>-1?s:0);return s>-1&&(r=t.slice(0,s),a=t.slice(s+1,l>-1?l:t.length),o=e(a)),l>-1&&(r=r||t.slice(0,l),i=t.slice(l,t.length)),r=function(e,t){if(e.startsWith("/"))return e;if(!t.startsWith("/"))return p(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`),e;if(!e)return t;const n=t.split("/"),r=e.split("/");let o,a,i=n.length-1;for(o=0;o<r.length;o++)if(a=r[o],1!==i&&"."!==a){if(".."!==a)break;i--}return n.slice(0,i).join("/")+"/"+r.slice(o-(o===r.length?1:0)).join("/")}(null!=r?r:t,n),{fullPath:r+(a&&"?")+a+i,path:r,query:o,hash:i}}function v(e,t){return!t||e.toLowerCase().indexOf(t.toLowerCase())?e:e.slice(t.length)||"/"}function g(e,t,n){let r=t.matched.length-1,o=n.matched.length-1;return r>-1&&r===o&&y(t.matched[r],n.matched[o])&&b(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function y(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function b(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(let n in e)if(!w(e[n],t[n]))return!1;return!0}function w(e,t){return Array.isArray(e)?_(e,t):Array.isArray(t)?_(t,e):e===t}function _(e,t){return Array.isArray(t)?e.length===t.length&&e.every(((e,n)=>e===t[n])):1===e.length&&e[0]===t}var $,k;!function(e){e.pop="pop",e.push="push"}($||($={})),function(e){e.back="back",e.forward="forward",e.unknown=""}(k||(k={}));function E(e){if(!e)if(c){const t=document.querySelector("base");e=(e=t&&t.getAttribute("href")||"/").replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return"/"!==e[0]&&"#"!==e[0]&&(e="/"+e),e.replace(h,"")}const C=/^[^#]+#/;function x(e,t){return e.replace(C,"#")+t}const R=()=>({left:window.pageXOffset,top:window.pageYOffset});function A(e){let t;if("el"in e){let n=e.el;const r="string"==typeof n&&n.startsWith("#");if(!("string"!=typeof e.el||r&&document.getElementById(e.el.slice(1))))try{let t=document.querySelector(e.el);if(r&&t)return void p(`The selector "${e.el}" should be passed as "el: document.querySelector('${e.el}')" because it starts with "#".`)}catch(t){return void p(`The selector "${e.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`)}const o="string"==typeof n?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return void p(`Couldn't find element using selector "${e.el}" returned by scrollBehavior.`);t=function(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}(o,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(null!=t.left?t.left:window.pageXOffset,null!=t.top?t.top:window.pageYOffset)}function O(e,t){return(history.state?history.state.position-t:-1)+e}const P=new Map;let S=()=>location.protocol+"//"+location.host;function I(e,t){const{pathname:n,search:r,hash:o}=t;if(e.indexOf("#")>-1){let e=o.slice(1);return"/"!==e[0]&&(e="/"+e),v(e,"")}return v(n,e)+r+o}function j(e,t,n,r=!1,o=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:o?R():null}}function T(e){const t=function(e){const{history:t,location:n}=window;let r={value:I(e,n)},o={value:t.state};function a(r,a,i){const s=e.indexOf("#"),l=s>-1?(n.host&&document.querySelector("base")?e:e.slice(s))+r:S()+e+r;try{t[i?"replaceState":"pushState"](a,"",l),o.value=a}catch(e){p("Error with push/replace State",e),n[i?"replace":"assign"](l)}}return o.value||a(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0),{location:r,state:o,push:function(e,n){const i=u({},o.value,t.state,{forward:e,scroll:R()});t.state||p("history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:\n\nhistory.replaceState(history.state, '', url)\n\nYou can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state."),a(i.current,i,!0),a(e,u({},j(r.value,e,null),{position:i.position+1},n),!1),r.value=e},replace:function(e,n){a(e,u({},t.state,j(o.value.back,e,o.value.forward,!0),n,{position:o.value.position}),!0),r.value=e}}}(e=E(e)),n=function(e,t,n,r){let o=[],a=[],i=null;const s=({state:a})=>{const s=I(e,location),l=n.value,c=t.value;let u=0;if(a){if(n.value=s,t.value=a,i&&i===l)return void(i=null);u=c?a.position-c.position:0}else r(s);o.forEach((e=>{e(n.value,l,{delta:u,type:$.pop,direction:u?u>0?k.forward:k.back:k.unknown})}))};function l(){const{history:e}=window;e.state&&e.replaceState(u({},e.state,{scroll:R()}),"")}return window.addEventListener("popstate",s),window.addEventListener("beforeunload",l),{pauseListeners:function(){i=n.value},listen:function(e){o.push(e);const t=()=>{const t=o.indexOf(e);t>-1&&o.splice(t,1)};return a.push(t),t},destroy:function(){for(const e of a)e();a=[],window.removeEventListener("popstate",s),window.removeEventListener("beforeunload",l)}}}(e,t.state,t.location,t.replace);const r=u({location:"",base:e,go:function(e,t=!0){t||n.pauseListeners(),history.go(e)},createHref:x.bind(null,e)},t,n);return Object.defineProperty(r,"location",{get:()=>t.location.value}),Object.defineProperty(r,"state",{get:()=>t.state.value}),r}function L(e){return"string"==typeof e||"symbol"==typeof e}const N={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},D=r("navigation failure");var U;e.NavigationFailureType=void 0,(U=e.NavigationFailureType||(e.NavigationFailureType={}))[U.aborted=4]="aborted",U[U.cancelled=8]="cancelled",U[U.duplicated=16]="duplicated";const M={1:({location:e,currentLocation:t})=>`No match for\n ${JSON.stringify(e)}${t?"\nwhile being at\n"+JSON.stringify(t):""}`,2:({from:e,to:t})=>`Redirected from "${e.fullPath}" to "${function(e){if("string"==typeof e)return e;if("path"in e)return e.path;const t={};for(const n of B)n in e&&(t[n]=e[n]);return JSON.stringify(t,null,2)}(t)}" via a navigation guard.`,4:({from:e,to:t})=>`Navigation aborted from "${e.fullPath}" to "${t.fullPath}" via a navigation guard.`,8:({from:e,to:t})=>`Navigation cancelled from "${e.fullPath}" to "${t.fullPath}" with a new navigation.`,16:({from:e,to:t})=>`Avoided redundant navigation to current location: "${e.fullPath}".`};function q(e,t){return u(new Error(M[e](t)),{type:e,[D]:!0},t)}function W(e,t){return e instanceof Error&&D in e&&(null==t||!!(e.type&t))}const B=["params","query","hash"];const V="[^/]+?",G={sensitive:!1,strict:!1,start:!0,end:!0},F=/[.+*?^${}()[\]/\\]/g;function K(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?1===e.length&&80===e[0]?-1:1:e.length>t.length?1===t.length&&80===t[0]?1:-1:0}function H(e,t){let n=0;const r=e.score,o=t.score;for(;n<r.length&&n<o.length;){const e=K(r[n],o[n]);if(e)return e;n++}return o.length-r.length}const z={type:0,value:""},J=/[a-zA-Z0-9_]/;function Q(e,t,n){const r=function(e,t){const n=u({},G,t);let r=[],o=n.start?"^":"";const a=[];for(const t of e){const e=t.length?[]:[90];n.strict&&!t.length&&(o+="/");for(let r=0;r<t.length;r++){const i=t[r];let s=40+(n.sensitive?.25:0);if(0===i.type)r||(o+="/"),o+=i.value.replace(F,"\\$&"),s+=40;else if(1===i.type){const{value:e,repeatable:n,optional:l,regexp:c}=i;a.push({name:e,repeatable:n,optional:l});const u=c||V;if(u!==V){s+=10;try{new RegExp(`(${u})`)}catch(t){throw new Error(`Invalid custom RegExp for param "${e}" (${u}): `+t.message)}}let f=n?`((?:${u})(?:/(?:${u}))*)`:`(${u})`;r||(f=l&&t.length<2?`(?:/${f})`:"/"+f),l&&(f+="?"),o+=f,s+=20,l&&(s+=-8),n&&(s+=-20),".*"===u&&(s+=-50)}e.push(s)}r.push(e)}if(n.strict&&n.end){const e=r.length-1;r[e][r[e].length-1]+=.7000000000000001}n.strict||(o+="/?"),n.end?o+="$":n.strict&&(o+="(?:/|$)");const i=new RegExp(o,n.sensitive?"":"i");return{re:i,score:r,keys:a,parse:function(e){const t=e.match(i),n={};if(!t)return null;for(let e=1;e<t.length;e++){const r=t[e]||"",o=a[e-1];n[o.name]=r&&o.repeatable?r.split("/"):r}return n},stringify:function(t){let n="",r=!1;for(const o of e){r&&n.endsWith("/")||(n+="/"),r=!1;for(const e of o)if(0===e.type)n+=e.value;else if(1===e.type){const{value:a,repeatable:i,optional:s}=e,l=a in t?t[a]:"";if(Array.isArray(l)&&!i)throw new Error(`Provided param "${a}" is an array but it is not repeatable (* or + modifiers)`);const c=Array.isArray(l)?l.join("/"):l;if(!c){if(!s)throw new Error(`Missing required param "${a}"`);o.length<2&&(n.endsWith("/")?n=n.slice(0,-1):r=!0)}n+=c}}return n}}}(function(e){if(!e)return[[]];if("/"===e)return[[z]];if(!e.startsWith("/"))throw new Error(`Route paths should start with a "/": "${e}" should be "/${e}".`);function t(e){throw new Error(`ERR (${n})/"${c}": ${e}`)}let n=0,r=n;const o=[];let a;function i(){a&&o.push(a),a=[]}let s,l=0,c="",u="";function f(){c&&(0===n?a.push({type:0,value:c}):1===n||2===n||3===n?(a.length>1&&("*"===s||"+"===s)&&t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),a.push({type:1,value:c,regexp:u,repeatable:"*"===s||"+"===s,optional:"*"===s||"?"===s})):t("Invalid state to consume buffer"),c="")}function d(){c+=s}for(;l<e.length;)if(s=e[l++],"\\"!==s||2===n)switch(n){case 0:"/"===s?(c&&f(),i()):":"===s?(f(),n=1):d();break;case 4:d(),n=r;break;case 1:"("===s?n=2:J.test(s)?d():(f(),n=0,"*"!==s&&"?"!==s&&"+"!==s&&l--);break;case 2:")"===s?"\\"==u[u.length-1]?u=u.slice(0,-1)+s:n=3:u+=s;break;case 3:f(),n=0,"*"!==s&&"?"!==s&&"+"!==s&&l--,u="";break;default:t("Unknown state")}else r=n,n=4;return 2===n&&t(`Unfinished custom RegExp for param "${c}"`),f(),i(),o}(e.path),n);{const t=new Set;for(const n of r.keys)t.has(n.name)&&p(`Found duplicated params with name "${n.name}" for path "${e.path}". Only the last one will be available on "$route.params".`),t.add(n.name)}const o=u(r,{record:e,parent:t,children:[],alias:[]});return t&&!o.record.aliasOf==!t.record.aliasOf&&t.children.push(o),o}function Y(e,t){const n=[],r=new Map;function o(e,n,r){let s=!r,l=function(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:X(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||{}:{default:e.component}}}(e);l.aliasOf=r&&r.record;const c=te(t,e),f=[l];if("alias"in e){const t="string"==typeof e.alias?[e.alias]:e.alias;for(const e of t)f.push(u({},l,{components:r?r.record.components:l.components,path:e,aliasOf:r?r.record:l}))}let p,h;for(const t of f){let{path:u}=t;if(n&&"/"!==u[0]){let e=n.record.path,r="/"===e[e.length-1]?"":"/";t.path=n.record.path+(u&&r+u)}if("*"===t.path)throw new Error('Catch all routes ("*") must now be defined using a param with a custom regexp.\nSee more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.');if(p=Q(t,n,c),n&&"/"===u[0]&&oe(p,n),r?(r.alias.push(p),re(r,p)):(h=h||p,h!==p&&h.alias.push(p),s&&e.name&&!Z(p)&&a(e.name)),"children"in l){let e=l.children;for(let t=0;t<e.length;t++)o(e[t],p,r&&r.children[t])}r=r||p,i(p)}return h?()=>{a(h)}:d}function a(e){if(L(e)){const t=r.get(e);t&&(r.delete(e),n.splice(n.indexOf(t),1),t.children.forEach(a),t.alias.forEach(a))}else{let t=n.indexOf(e);t>-1&&(n.splice(t,1),e.record.name&&r.delete(e.record.name),e.children.forEach(a),e.alias.forEach(a))}}function i(e){let t=0;for(;t<n.length&&H(e,n[t])>=0;)t++;n.splice(t,0,e),e.record.name&&!Z(e)&&r.set(e.record.name,e)}return t=te({strict:!1,end:!0,sensitive:!1},t),e.forEach((e=>o(e))),{addRoute:o,resolve:function(e,t){let o,a,i,s={};if("name"in e&&e.name){if(o=r.get(e.name),!o)throw q(1,{location:e});i=o.record.name,s=u(function(e,t){let n={};for(let r of t)r in e&&(n[r]=e[r]);return n}(t.params,o.keys.filter((e=>!e.optional)).map((e=>e.name))),e.params),a=o.stringify(s)}else if("path"in e)a=e.path,a.startsWith("/")||p(`The Matcher cannot resolve relative paths but received "${a}". Unless you directly called \`matcher.resolve("${a}")\`, this is probably a bug in vue-router. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/vue-router-next.`),o=n.find((e=>e.re.test(a))),o&&(s=o.parse(a),i=o.record.name);else{if(o=t.name?r.get(t.name):n.find((e=>e.re.test(t.path))),!o)throw q(1,{location:e,currentLocation:t});i=o.record.name,s=u({},t.params,e.params),a=o.stringify(s)}const l=[];let c=o;for(;c;)l.unshift(c.record),c=c.parent;return{name:i,path:a,params:s,matched:l,meta:ee(l)}},removeRoute:a,getRoutes:function(){return n},getRecordMatcher:function(e){return r.get(e)}}}function X(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(let r in e.components)t[r]="boolean"==typeof n?n:n[r];return t}function Z(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function ee(e){return e.reduce(((e,t)=>u(e,t.meta)),{})}function te(e,t){let n={};for(let r in e)n[r]=r in t?t[r]:e[r];return n}function ne(e,t){return e.name===t.name&&e.optional===t.optional&&e.repeatable===t.repeatable}function re(e,t){for(let n of e.keys)if(!n.optional&&!t.keys.find(ne.bind(null,n)))return p(`Alias "${t.record.path}" and the original record: "${e.record.path}" should have the exact same param named "${n.name}"`);for(let n of t.keys)if(!n.optional&&!e.keys.find(ne.bind(null,n)))return p(`Alias "${t.record.path}" and the original record: "${e.record.path}" should have the exact same param named "${n.name}"`)}function oe(e,t){for(let n of t.keys)if(!e.keys.find(ne.bind(null,n)))return p(`Absolute path "${e.record.path}" should have the exact same param named "${n.name}" as its parent "${t.record.path}".`)}const ae=/#/g,ie=/&/g,se=/\//g,le=/=/g,ce=/\?/g,ue=/\+/g,fe=/%5B/g,de=/%5D/g,pe=/%5E/g,he=/%60/g,me=/%7B/g,ve=/%7C/g,ge=/%7D/g,ye=/%20/g;function be(e){return encodeURI(""+e).replace(ve,"|").replace(fe,"[").replace(de,"]")}function we(e){return be(e).replace(ue,"%2B").replace(ye,"+").replace(ae,"%23").replace(ie,"%26").replace(he,"`").replace(me,"{").replace(ge,"}").replace(pe,"^")}function _e(e){return function(e){return be(e).replace(ae,"%23").replace(ce,"%3F")}(e).replace(se,"%2F")}function $e(e){try{return decodeURIComponent(""+e)}catch(t){p(`Error decoding "${e}". Using original value`)}return""+e}function ke(e){const t={};if(""===e||"?"===e)return t;const n=("?"===e[0]?e.slice(1):e).split("&");for(let e=0;e<n.length;++e){const r=n[e].replace(ue," ");let o=r.indexOf("="),a=$e(o<0?r:r.slice(0,o)),i=o<0?null:$e(r.slice(o+1));if(a in t){let e=t[a];Array.isArray(e)||(e=t[a]=[e]),e.push(i)}else t[a]=i}return t}function Ee(e){let t="";for(let n in e){t.length&&(t+="&");const r=e[n];if(n=we(n).replace(le,"%3D"),null==r){void 0!==r&&(t+=n);continue}let o=Array.isArray(r)?r.map((e=>e&&we(e))):[r&&we(r)];for(let e=0;e<o.length;e++)t+=(e?"&":"")+n,null!=o[e]&&(t+="="+o[e])}return t}function Ce(e){const t={};for(let n in e){let r=e[n];void 0!==r&&(t[n]=Array.isArray(r)?r.map((e=>null==e?null:""+e)):null==r?r:""+r)}return t}function xe(){let e=[];return{add:function(t){return e.push(t),()=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)}},list:()=>e,reset:function(){e=[]}}}function Re(e,n,r){const o=()=>{e[n].delete(r)};t.onUnmounted(o),t.onDeactivated(o),t.onActivated((()=>{e[n].add(r)})),e[n].add(r)}function Ae(e,t,n,r,o){const a=r&&(r.enterCallbacks[o]=r.enterCallbacks[o]||[]);return()=>new Promise(((i,s)=>{const l=e=>{var l;!1===e?s(q(4,{from:n,to:t})):e instanceof Error?s(e):"string"==typeof(l=e)||l&&"object"==typeof l?s(q(2,{from:t,to:e})):(a&&r.enterCallbacks[o]===a&&"function"==typeof e&&a.push(e),i())},c=e.call(r&&r.instances[o],t,n,function(e,t,n){let r=0;return function(){1==r++&&p(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`),e._called=!0,1===r&&e.apply(null,arguments)}}(l,t,n));let u=Promise.resolve(c);if(e.length<3&&(u=u.then(l)),e.length>2){const t=`The "next" callback was never called inside of ${e.name?'"'+e.name+'"':""}:\n${e.toString()}\n. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;if("object"==typeof c&&"then"in c)u=u.then((e=>l._called?e:(p(t),Promise.reject(new Error("Invalid navigation guard")))));else if(void 0!==c&&!l._called)return p(t),void s(new Error("Invalid navigation guard"))}u.catch((e=>s(e)))}))}function Oe(e,t,r,o){const a=[];for(const s of e)for(const e in s.components){let l=s.components[e];if(!l||"object"!=typeof l&&"function"!=typeof l)throw p(`Component "${e}" in record with path "${s.path}" is not a valid component. Received "${String(l)}".`),new Error("Invalid route component");if("then"in l){p(`Component "${e}" in record with path "${s.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);let t=l;l=()=>t}else l.__asyncLoader&&!l.__warnedDefineAsync&&(l.__warnedDefineAsync=!0,p(`Component "${e}" in record with path "${s.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));if("beforeRouteEnter"===t||s.instances[e])if("object"==typeof(i=l)||"displayName"in i||"props"in i||"__vccOpts"in i){const n=(l.__vccOpts||l)[t];n&&a.push(Ae(n,r,o,s,e))}else{let i=l();"catch"in i?i=i.catch(console.error):(p(`Component "${e}" in record with path "${s.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`),i=Promise.resolve(i)),a.push((()=>i.then((a=>{if(!a)return Promise.reject(new Error(`Couldn't resolve component "${e}" at "${s.path}"`));const i=(l=a).__esModule||n&&"Module"===l[Symbol.toStringTag]?a.default:a;var l;s.components[e]=i;const c=(i.__vccOpts||i)[t];return c&&Ae(c,r,o,s,e)()}))))}}var i;return a}function Pe(e){const n=t.inject(i),r=t.inject(s),o=t.computed((()=>n.resolve(t.unref(e.to)))),a=t.computed((()=>{let{matched:e}=o.value,{length:t}=e;const n=e[t-1];let a=r.matched;if(!n||!a.length)return-1;let i=a.findIndex(y.bind(null,n));if(i>-1)return i;let s=Ie(e[t-2]);return t>1&&Ie(n)===s&&a[a.length-1].path!==s?a.findIndex(y.bind(null,e[t-2])):i})),l=t.computed((()=>a.value>-1&&function(e,t){for(let n in t){let r=t[n],o=e[n];if("string"==typeof r){if(r!==o)return!1}else if(!Array.isArray(o)||o.length!==r.length||r.some(((e,t)=>e!==o[t])))return!1}return!0}(r.params,o.value.params))),c=t.computed((()=>a.value>-1&&a.value===r.matched.length-1&&b(r.params,o.value.params)));return{route:o,href:t.computed((()=>o.value.href)),isActive:l,isExactActive:c,navigate:function(r={}){return function(e){if(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)return;if(e.defaultPrevented)return;if(void 0!==e.button&&0!==e.button)return;if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}e.preventDefault&&e.preventDefault();return!0}(r)?n[t.unref(e.replace)?"replace":"push"](t.unref(e.to)):Promise.resolve()}}}const Se=t.defineComponent({name:"RouterLink",props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},setup(e,{slots:n,attrs:r}){const o=t.reactive(Pe(e)),{options:a}=t.inject(i),s=t.computed((()=>({[je(e.activeClass,a.linkActiveClass,"router-link-active")]:o.isActive,[je(e.exactActiveClass,a.linkExactActiveClass,"router-link-exact-active")]:o.isExactActive})));{const e=t.getCurrentInstance();t.watchEffect((()=>{e&&(e.__vrl_route=o.route)})),t.watchEffect((()=>{e&&(e.__vrl_active=o.isActive,e.__vrl_exactActive=o.isExactActive)}))}return()=>{const a=n.default&&n.default(o);return e.custom?a:t.h("a",u({"aria-current":o.isExactActive?e.ariaCurrentValue:null,onClick:o.navigate,href:o.href},r,{class:s.value}),a)}}});function Ie(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const je=(e,t,n)=>null!=e?e:null!=t?t:n;function Te(e,t){if(!e)return null;const n=e(t);return 1===n.length?n[0]:n}const Le=t.defineComponent({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},setup(e,{attrs:n,slots:r}){!function(){const e=t.getCurrentInstance(),n=e.parent&&e.parent.type.name;if(n&&("KeepAlive"===n||n.includes("Transition"))){const e="KeepAlive"===n?"keep-alive":"transition";p(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.\nUse slot props instead:\n\n<router-view v-slot="{ Component }">\n  <${e}>\n    <component :is="Component" />\n  </${e}>\n</router-view>`)}}();const i=t.inject(l),s=t.computed((()=>e.route||i.value)),c=t.inject(a,0),f=t.computed((()=>s.value.matched[c]));t.provide(a,c+1),t.provide(o,f),t.provide(l,s);const d=t.ref();return t.watch((()=>[d.value,f.value,e.name]),(([e,t,n],[r,o,a])=>{t&&(t.instances[n]=e,o&&o!==t&&e&&e===r&&(t.leaveGuards.size||(t.leaveGuards=o.leaveGuards),t.updateGuards.size||(t.updateGuards=o.updateGuards))),!e||!t||o&&y(t,o)&&r||(t.enterCallbacks[n]||[]).forEach((t=>t(e)))}),{flush:"post"}),()=>{const o=s.value,a=f.value,i=a&&a.components[e.name],l=e.name;if(!i)return Te(r.default,{Component:i,route:o});const c=a.props[e.name],p=c?!0===c?o.params:"function"==typeof c?c(o):c:null,h=t.h(i,u({},p,n,{onVnodeUnmounted:e=>{e.component.isUnmounted&&(a.instances[l]=null)},ref:d}));return Te(r.default,{Component:h,route:o})||h}}});function Ne(){return"undefined"!=typeof navigator?window:"undefined"!=typeof global?global:{}}function De(e,t){const n=Ne().__VUE_DEVTOOLS_GLOBAL_HOOK__;if(n)n.emit("devtools-plugin:setup",e,t);else{const n=Ne();(n.__VUE_DEVTOOLS_PLUGINS__=n.__VUE_DEVTOOLS_PLUGINS__||[]).push({pluginDescriptor:e,setupFn:t})}}function Ue(e,t){const n=u({},e,{matched:e.matched.map((e=>function(e,t){const n={};for(let r in e)t.includes(r)||(n[r]=e[r]);return n}(e,["instances","children","aliasOf"])))});return{_custom:{type:null,readOnly:!0,display:e.fullPath,tooltip:t,value:n}}}function Me(e){return{_custom:{display:e}}}let qe=0;function We(e,n,r){if(n.__hasDevtools)return;n.__hasDevtools=!0;const o=qe++;De({id:"org.vuejs.router"+(o?"."+o:""),label:"Vue Router",packageName:"vue-router",homepage:"https://next.router.vuejs.org/",logo:"https://vuejs.org/images/icons/favicon-96x96.png",componentStateTypes:["Routing"],app:e},(a=>{a.on.inspectComponent(((e,t)=>{e.instanceData&&e.instanceData.state.push({type:"Routing",key:"$route",editable:!1,value:Ue(n.currentRoute.value,"Current Route")})})),a.on.visitComponentTree((({treeNode:e,componentInstance:t})=>{"RouterLink"===e.name&&(t.__vrl_route&&e.tags.push({label:t.__vrl_route.path,textColor:0,backgroundColor:Fe}),t.__vrl_exactActive&&e.tags.push({label:"exact",textColor:0,backgroundColor:Ge}),t.__vrl_active&&e.tags.push({label:"active",textColor:0,backgroundColor:Ve}))})),t.watch(n.currentRoute,(()=>{c(),a.notifyComponentUpdate(),a.sendInspectorTree(l)}));const i="router:navigations:"+o;a.addTimelineLayer({id:i,label:`Router${o?" "+o:""} Navigations`,color:4237508}),n.onError((e=>{a.addTimelineEvent({layerId:i,event:{title:"Error",subtitle:"An uncaught error happened during navigation",logType:"error",time:Date.now(),data:{error:e}}})}));let s=0;n.beforeEach(((e,t)=>{const n={guard:Me("beforeEach"),from:Ue(t,"Current Location during this navigation"),to:Ue(e,"Target location")};Object.defineProperty(e.meta,"__navigationId",{value:s++}),a.addTimelineEvent({layerId:i,event:{time:Date.now(),title:"Start of navigation",data:n,groupId:e.meta.__navigationId}})})),n.afterEach(((e,t,n)=>{const r={guard:Me("afterEach")};n?(r.failure={_custom:{type:Error,readOnly:!0,display:n?n.message:"",tooltip:"Navigation Failure",value:n}},r.status=Me("❌")):r.status=Me("✅"),r.from=Ue(t,"Current Location during this navigation"),r.to=Ue(e,"Target location"),a.addTimelineEvent({layerId:i,event:{title:"End of navigation",time:Date.now(),data:r,logType:n?"warning":"default",groupId:e.meta.__navigationId}})}));const l="router-inspector:"+o;function c(){if(!u)return;const e=u;let t=r.getRoutes().filter((e=>!e.parent));t.forEach(Qe),e.filter&&(t=t.filter((t=>Ye(t,e.filter.toLowerCase())))),t.forEach((e=>Je(e,n.currentRoute.value))),e.rootNodes=t.map(Ke)}let u;a.addInspector({id:l,label:"Routes"+(o?" "+o:""),icon:"book",treeFilterPlaceholder:"Search routes"}),a.on.getInspectorTree((t=>{u=t,t.app===e&&t.inspectorId===l&&c()})),a.on.getInspectorState((t=>{if(t.app===e&&t.inspectorId===l){const e=r.getRoutes().find((e=>e.record.__vd_id===t.nodeId));e&&(t.state={options:Be(e)})}})),a.sendInspectorTree(l),a.sendInspectorState(l)}))}function Be(e){const{record:t}=e,n=[{editable:!1,key:"path",value:t.path}];return null!=t.name&&n.push({editable:!1,key:"name",value:t.name}),n.push({editable:!1,key:"regexp",value:e.re}),e.keys.length&&n.push({editable:!1,key:"keys",value:{_custom:{type:null,readOnly:!0,display:e.keys.map((e=>`${e.name}${function(e){return e.optional?e.repeatable?"*":"?":e.repeatable?"+":""}(e)}`)).join(" "),tooltip:"Param keys",value:e.keys}}}),null!=t.redirect&&n.push({editable:!1,key:"redirect",value:t.redirect}),e.alias.length&&n.push({editable:!1,key:"aliases",value:e.alias.map((e=>e.record.path))}),n.push({key:"score",editable:!1,value:{_custom:{type:null,readOnly:!0,display:e.score.map((e=>e.join(", "))).join(" | "),tooltip:"Score used to sort routes",value:e.score}}}),n}const Ve=2450411,Ge=8702998,Fe=16486972;function Ke(e){const t=[],{record:n}=e;null!=n.name&&t.push({label:String(n.name),textColor:0,backgroundColor:2282478}),n.aliasOf&&t.push({label:"alias",textColor:0,backgroundColor:Fe}),e.__vd_match&&t.push({label:"matches",textColor:0,backgroundColor:15485081}),e.__vd_exactActive&&t.push({label:"exact",textColor:0,backgroundColor:Ge}),e.__vd_active&&t.push({label:"active",textColor:0,backgroundColor:Ve}),n.redirect&&t.push({label:"redirect: "+("string"==typeof n.redirect?n.redirect:"Object"),textColor:16777215,backgroundColor:6710886});let r=String(He++);return n.__vd_id=r,{id:r,label:n.path,tags:t,children:e.children.map(Ke)}}let He=0;const ze=/^\/(.*)\/([a-z]*)$/;function Je(e,t){const n=t.matched.length&&y(t.matched[t.matched.length-1],e.record);e.__vd_exactActive=e.__vd_active=n,n||(e.__vd_active=t.matched.some((t=>y(t,e.record)))),e.children.forEach((e=>Je(e,t)))}function Qe(e){e.__vd_match=!1,e.children.forEach(Qe)}function Ye(e,t){const n=String(e.re).match(ze);if(e.__vd_match=!1,!n||n.length<3)return!1;if(new RegExp(n[1].replace(/\$$/,""),n[2]).test(t))return e.children.forEach((e=>Ye(e,t))),("/"!==e.record.path||"/"===t)&&(e.__vd_match=e.re.test(t),!0);const r=e.record.path.toLowerCase(),o=$e(r);return!(t.startsWith("/")||!o.includes(t)&&!r.includes(t))||(!(!o.startsWith(t)&&!r.startsWith(t))||(!(!e.record.name||!String(e.record.name).includes(t))||e.children.some((e=>Ye(e,t)))))}function Xe(e){return e.reduce(((e,t)=>e.then((()=>t()))),Promise.resolve())}return e.RouterLink=Se,e.RouterView=Le,e.START_LOCATION=N,e.createMemoryHistory=function(e=""){let t=[],n=[""],r=0;function o(e){r++,r===n.length||n.splice(r),n.push(e)}const a={location:"",state:{},base:e,createHref:x.bind(null,e),replace(e){n.splice(r--,1),o(e)},push(e,t){o(e)},listen:e=>(t.push(e),()=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)}),destroy(){t=[]},go(e,o=!0){const a=this.location,i=e<0?k.back:k.forward;r=Math.max(0,Math.min(r+e,n.length-1)),o&&function(e,n,{direction:r,delta:o}){const a={direction:r,delta:o,type:$.pop};for(let r of t)r(e,n,a)}(this.location,a,{direction:i,delta:e})}};return Object.defineProperty(a,"location",{get:()=>n[r]}),a},e.createRouter=function(e){const n=Y(e.routes,e);let r=e.parseQuery||ke,o=e.stringifyQuery||Ee,a=e.history;const h=xe(),v=xe(),b=xe(),w=t.shallowRef(N);let _=N;c&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const $=f.bind(null,(e=>""+e)),k=f.bind(null,_e),E=f.bind(null,$e);function C(e,t){if(t=u({},t||w.value),"string"==typeof e){let o=m(r,e,t.path),i=n.resolve({path:o.path},t),s=a.createHref(o.fullPath);return s.startsWith("//")?p(`Location "${e}" resolved to "${s}". A resolved location cannot start with multiple slashes.`):i.matched.length||p(`No match found for location with path "${e}"`),u(o,i,{params:E(i.params),hash:$e(o.hash),redirectedFrom:void 0,href:s})}let i;"path"in e?("params"in e&&!("name"in e)&&Object.keys(e.params).length&&p(`Path "${e.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`),i=u({},e,{path:m(r,e.path,t.path).path})):(i=u({},e,{params:k(e.params)}),t.params=k(t.params));let s=n.resolve(i,t);const l=e.hash||"";l&&!l.startsWith("#")&&p(`A \`hash\` should always start with the character "#". Replace "${l}" with "#${l}".`),s.params=$(E(s.params));const c=function(e,t){let n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}(o,u({},e,{hash:(f=l,be(f).replace(me,"{").replace(ge,"}").replace(pe,"^")),path:s.path}));var f;let d=a.createHref(c);return d.startsWith("//")?p(`Location "${e}" resolved to "${d}". A resolved location cannot start with multiple slashes.`):s.matched.length||p(`No match found for location with path "${"path"in e?e.path:e}"`),u({fullPath:c,hash:l,query:o===Ee?Ce(e.query):e.query},s,{redirectedFrom:void 0,href:d})}function x(e){return"string"==typeof e?m(r,e,w.value.path):u({},e)}function S(e,t){if(_!==e)return q(8,{from:t,to:e})}function I(e){return T(e)}function j(e){const t=e.matched[e.matched.length-1];if(t&&t.redirect){const{redirect:n}=t;let r="function"==typeof n?n(e):n;if("string"==typeof r&&(r=r.indexOf("?")>-1||r.indexOf("#")>-1?r=x(r):{path:r}),!("path"in r)&&!("name"in r))throw p(`Invalid redirect found:\n${JSON.stringify(r,null,2)}\n when navigating to "${e.fullPath}". A redirect must contain a name or path. This will break in production.`),new Error("Invalid redirect");return u({query:e.query,hash:e.hash,params:e.params},r)}}function T(e,t){const n=_=C(e),r=w.value,a=e.state,i=e.force,s=!0===e.replace,l=j(n);if(l)return T(u(x(l),{state:a,force:i,replace:s}),t||n);const c=n;let f;return c.redirectedFrom=t,!i&&g(o,r,n)&&(f=q(16,{to:c,from:r}),Q(r,r,!0,!1)),(f?Promise.resolve(f):U(c,r)).catch((e=>W(e)?e:z(e))).then((e=>{if(e){if(W(e,2))return g(o,C(e.to),c)&&t&&(t._count=t._count?t._count+1:1)>10?(p(`Detected an infinite redirection in a navigation guard when going from "${r.fullPath}" to "${c.fullPath}". Aborting to avoid a Stack Overflow. This will break in production if not fixed.`),Promise.reject(new Error("Infinite redirect in navigation guard"))):T(u(x(e.to),{state:a,force:i,replace:s}),t||c)}else e=B(c,r,!0,s,a);return M(c,r,e),e}))}function D(e,t){const n=S(e,t);return n?Promise.reject(n):Promise.resolve()}function U(e,t){let n;const[r,o,a]=function(e,t){const n=[],r=[],o=[],a=Math.max(t.matched.length,e.matched.length);for(let i=0;i<a;i++){const a=t.matched[i];a&&(e.matched.find((e=>y(e,a)))?r.push(a):n.push(a));const s=e.matched[i];s&&(t.matched.find((e=>y(e,s)))||o.push(s))}return[n,r,o]}(e,t);n=Oe(r.reverse(),"beforeRouteLeave",e,t);for(const o of r)o.leaveGuards.forEach((r=>{n.push(Ae(r,e,t))}));const i=D.bind(null,e,t);return n.push(i),Xe(n).then((()=>{n=[];for(const r of h.list())n.push(Ae(r,e,t));return n.push(i),Xe(n)})).then((()=>{n=Oe(o,"beforeRouteUpdate",e,t);for(const r of o)r.updateGuards.forEach((r=>{n.push(Ae(r,e,t))}));return n.push(i),Xe(n)})).then((()=>{n=[];for(const r of e.matched)if(r.beforeEnter&&t.matched.indexOf(r)<0)if(Array.isArray(r.beforeEnter))for(const o of r.beforeEnter)n.push(Ae(o,e,t));else n.push(Ae(r.beforeEnter,e,t));return n.push(i),Xe(n)})).then((()=>(e.matched.forEach((e=>e.enterCallbacks={})),n=Oe(a,"beforeRouteEnter",e,t),n.push(i),Xe(n)))).then((()=>{n=[];for(const r of v.list())n.push(Ae(r,e,t));return n.push(i),Xe(n)})).catch((e=>W(e,8)?e:Promise.reject(e)))}function M(e,t,n){for(const r of b.list())r(e,t,n)}function B(e,t,n,r,o){const i=S(e,t);if(i)return i;const s=t===N,l=c?history.state:{};n&&(r||s?a.replace(e.fullPath,u({scroll:s&&l&&l.scroll},o)):a.push(e.fullPath,o)),w.value=e,Q(e,t,n,s),J()}let V;function G(){V=a.listen(((e,t,n)=>{let r=C(e);const o=j(r);if(o)return void T(u(o,{replace:!0}),r).catch(d);_=r;const i=w.value;var s,l;c&&(s=O(i.fullPath,n.delta),l=R(),P.set(s,l)),U(r,i).catch((e=>W(e,12)?e:W(e,2)?(T(e.to,r).catch(d),Promise.reject()):(n.delta&&a.go(-n.delta,!1),z(e)))).then((e=>{(e=e||B(r,i,!1))&&n.delta&&a.go(-n.delta,!1),M(r,i,e)})).catch(d)}))}let F,K=xe(),H=xe();function z(e){return J(e),H.list().forEach((t=>t(e))),Promise.reject(e)}function J(e){F||(F=!0,G(),K.list().forEach((([t,n])=>e?n(e):t())),K.reset())}function Q(n,r,o,a){const{scrollBehavior:i}=e;if(!c||!i)return Promise.resolve();let s=!o&&function(e){const t=P.get(e);return P.delete(e),t}(O(n.fullPath,0))||(a||!o)&&history.state&&history.state.scroll||null;return t.nextTick().then((()=>i(n,r,s))).then((e=>e&&A(e))).catch(z)}const X=e=>a.go(e);let Z;const ee=new Set,te={currentRoute:w,addRoute:function(e,t){let r,o;return L(e)?(r=n.getRecordMatcher(e),o=t):o=e,n.addRoute(o,r)},removeRoute:function(e){let t=n.getRecordMatcher(e);t?n.removeRoute(t):p(`Cannot remove non-existent route "${String(e)}"`)},hasRoute:function(e){return!!n.getRecordMatcher(e)},getRoutes:function(){return n.getRoutes().map((e=>e.record))},resolve:C,options:e,push:I,replace:function(e){return I(u(x(e),{replace:!0}))},go:X,back:()=>X(-1),forward:()=>X(1),beforeEach:h.add,beforeResolve:v.add,afterEach:b.add,onError:H.add,isReady:function(){return F&&w.value!==N?Promise.resolve():new Promise(((e,t)=>{K.add([e,t])}))},install(e){const r=this;e.component("RouterLink",Se),e.component("RouterView",Le),e.config.globalProperties.$router=r,Object.defineProperty(e.config.globalProperties,"$route",{get:()=>t.unref(w)}),c&&!Z&&w.value===N&&(Z=!0,I(a.location).catch((e=>{p("Unexpected error when starting the router:",e)})));const o={};for(let e in N)o[e]=t.computed((()=>w.value[e]));e.provide(i,r),e.provide(s,t.reactive(o)),e.provide(l,w);let u=e.unmount;ee.add(e),e.unmount=function(){ee.delete(e),ee.size<1&&(V(),w.value=N,Z=!1,F=!1),u()},We(e,r,n)}};return te},e.createRouterMatcher=Y,e.createWebHashHistory=function(e){return(e=location.host?e||location.pathname+location.search:"").indexOf("#")<0&&(e+="#"),e.endsWith("#/")||e.endsWith("#")||p(`A hash base must end with a "#":\n"${e}" should be "${e.replace(/#.*$/,"#")}".`),T(e)},e.createWebHistory=T,e.isNavigationFailure=W,e.matchedRouteKey=o,e.onBeforeRouteLeave=function(e){if(!t.getCurrentInstance())return void p("getCurrentInstance() returned null. onBeforeRouteLeave() must be called at the top of a setup function");const n=t.inject(o,{}).value;n?Re(n,"leaveGuards",e):p("No active route record was found. Are you missing a <router-view> component?")},e.onBeforeRouteUpdate=function(e){if(!t.getCurrentInstance())return void p("getCurrentInstance() returned null. onBeforeRouteUpdate() must be called at the top of a setup function");const n=t.inject(o,{}).value;n?Re(n,"updateGuards",e):p("No active route record was found. Are you missing a <router-view> component?")},e.parseQuery=ke,e.routeLocationKey=s,e.routerKey=i,e.routerViewLocationKey=l,e.stringifyQuery=Ee,e.useLink=Pe,e.useRoute=function(){return t.inject(s)},e.useRouter=function(){return t.inject(i)},e.viewDepthKey=a,Object.defineProperty(e,"__esModule",{value:!0}),e}({},Vue);