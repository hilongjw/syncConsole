!function(e){function t(e){delete q[e]}function n(e){var t=document.getElementsByTagName("head")[0],n=document.createElement("script");n.type="text/javascript",n.charset="utf-8",n.src=f.p+""+e+"."+b+".hot-update.js",t.appendChild(n)}function r(){return new Promise(function(e,t){if("undefined"==typeof XMLHttpRequest)return t(new Error("No browser support"));try{var n=new XMLHttpRequest,r=f.p+""+b+".hot-update.json";n.open("GET",r,!0),n.timeout=1e4,n.send(null)}catch(e){return t(e)}n.onreadystatechange=function(){if(4===n.readyState)if(0===n.status)t(new Error("Manifest request to "+r+" timed out."));else if(404===n.status)e();else if(200!==n.status&&304!==n.status)t(new Error("Manifest request to "+r+" failed."));else{try{var o=JSON.parse(n.responseText)}catch(e){return void t(e)}e(o)}}})}function o(e){var t=D[e];if(!t)return f;var n=function(n){return t.hot.active?(D[n]?D[n].parents.indexOf(e)<0&&D[n].parents.push(e):(O=[e],m=n),t.children.indexOf(n)<0&&t.children.push(n)):(console.warn("[HMR] unexpected require("+n+") from disposed module "+e),O=[]),f(n)};for(var r in f)Object.prototype.hasOwnProperty.call(f,r)&&"e"!==r&&Object.defineProperty(n,r,function(e){return{configurable:!0,enumerable:!0,get:function(){return f[e]},set:function(t){f[e]=t}}}(r));return n.e=function(e){function t(){P--,"prepare"===S&&(L[e]||l(e),0===P&&0===M&&d())}return"ready"===S&&a("prepare"),P++,f.e(e).then(t,function(e){throw t(),e})},n}function i(e){var t={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],_main:m!==e,active:!0,accept:function(e,n){if(void 0===e)t._selfAccepted=!0;else if("function"==typeof e)t._selfAccepted=e;else if("object"==typeof e)for(var r=0;r<e.length;r++)t._acceptedDependencies[e[r]]=n||function(){};else t._acceptedDependencies[e]=n||function(){}},decline:function(e){if(void 0===e)t._selfDeclined=!0;else if("object"==typeof e)for(var n=0;n<e.length;n++)t._declinedDependencies[e[n]]=!0;else t._declinedDependencies[e]=!0},dispose:function(e){t._disposeHandlers.push(e)},addDisposeHandler:function(e){t._disposeHandlers.push(e)},removeDisposeHandler:function(e){var n=t._disposeHandlers.indexOf(e);n>=0&&t._disposeHandlers.splice(n,1)},check:c,apply:p,status:function(e){if(!e)return S;x.push(e)},addStatusHandler:function(e){x.push(e)},removeStatusHandler:function(e){var t=x.indexOf(e);t>=0&&x.splice(t,1)},data:k[e]};return m=void 0,t}function a(e){S=e;for(var t=0;t<x.length;t++)x[t].call(null,e)}function s(e){return+e+""===e?+e:e}function c(e){if("idle"!==S)throw new Error("check() is only allowed in idle status");return w=e,a("check"),r().then(function(e){if(!e)return a("idle"),null;C={},L={},j=e.c,y=e.h,a("prepare");var t=new Promise(function(e,t){v={resolve:e,reject:t}});g={};for(var n in q)l(n);return"prepare"===S&&0===P&&0===M&&d(),t})}function u(e,t){if(j[e]&&C[e]){C[e]=!1;for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(g[n]=t[n]);0==--M&&0===P&&d()}}function l(e){j[e]?(C[e]=!0,M++,n(e)):L[e]=!0}function d(){a("ready");var e=v;if(v=null,e)if(w)p(w).then(function(t){e.resolve(t)},function(t){e.reject(t)});else{var t=[];for(var n in g)Object.prototype.hasOwnProperty.call(g,n)&&t.push(s(n));e.resolve(t)}}function p(n){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];e.indexOf(r)<0&&e.push(r)}}if("ready"!==S)throw new Error("apply() is only allowed in ready status");n=n||{};var o,i,c,u,l,d={},p=[],h={},_=function(){console.warn("[HMR] unexpected require("+v.moduleId+") to disposed module")};for(var m in g)if(Object.prototype.hasOwnProperty.call(g,m)){l=s(m);var v;v=g[m]?function(e){for(var t=[e],n={},o=t.slice().map(function(e){return{chain:[e],id:e}});o.length>0;){var i=o.pop(),a=i.id,s=i.chain;if((u=D[a])&&!u.hot._selfAccepted){if(u.hot._selfDeclined)return{type:"self-declined",chain:s,moduleId:a};if(u.hot._main)return{type:"unaccepted",chain:s,moduleId:a};for(var c=0;c<u.parents.length;c++){var l=u.parents[c],d=D[l];if(d){if(d.hot._declinedDependencies[a])return{type:"declined",chain:s.concat([l]),moduleId:a,parentId:l};t.indexOf(l)>=0||(d.hot._acceptedDependencies[a]?(n[l]||(n[l]=[]),r(n[l],[a])):(delete n[l],t.push(l),o.push({chain:s.concat([l]),id:l})))}}}}return{type:"accepted",moduleId:e,outdatedModules:t,outdatedDependencies:n}}(l):{type:"disposed",moduleId:m};var w=!1,E=!1,x=!1,M="";switch(v.chain&&(M="\nUpdate propagation: "+v.chain.join(" -> ")),v.type){case"self-declined":n.onDeclined&&n.onDeclined(v),n.ignoreDeclined||(w=new Error("Aborted because of self decline: "+v.moduleId+M));break;case"declined":n.onDeclined&&n.onDeclined(v),n.ignoreDeclined||(w=new Error("Aborted because of declined dependency: "+v.moduleId+" in "+v.parentId+M));break;case"unaccepted":n.onUnaccepted&&n.onUnaccepted(v),n.ignoreUnaccepted||(w=new Error("Aborted because "+l+" is not accepted"+M));break;case"accepted":n.onAccepted&&n.onAccepted(v),E=!0;break;case"disposed":n.onDisposed&&n.onDisposed(v),x=!0;break;default:throw new Error("Unexception type "+v.type)}if(w)return a("abort"),Promise.reject(w);if(E){h[l]=g[l],r(p,v.outdatedModules);for(l in v.outdatedDependencies)Object.prototype.hasOwnProperty.call(v.outdatedDependencies,l)&&(d[l]||(d[l]=[]),r(d[l],v.outdatedDependencies[l]))}x&&(r(p,[v.moduleId]),h[l]=_)}var P=[];for(i=0;i<p.length;i++)l=p[i],D[l]&&D[l].hot._selfAccepted&&P.push({module:l,errorHandler:D[l].hot._selfAccepted});a("dispose"),Object.keys(j).forEach(function(e){!1===j[e]&&t(e)});for(var L,C=p.slice();C.length>0;)if(l=C.pop(),u=D[l]){var q={},I=u.hot._disposeHandlers;for(c=0;c<I.length;c++)(o=I[c])(q);for(k[l]=q,u.hot.active=!1,delete D[l],c=0;c<u.children.length;c++){var A=D[u.children[c]];A&&((L=A.parents.indexOf(l))>=0&&A.parents.splice(L,1))}}var T,R;for(l in d)if(Object.prototype.hasOwnProperty.call(d,l)&&(u=D[l]))for(R=d[l],c=0;c<R.length;c++)T=R[c],(L=u.children.indexOf(T))>=0&&u.children.splice(L,1);a("apply"),b=y;for(l in h)Object.prototype.hasOwnProperty.call(h,l)&&(e[l]=h[l]);var H=null;for(l in d)if(Object.prototype.hasOwnProperty.call(d,l)){u=D[l],R=d[l];var U=[];for(i=0;i<R.length;i++)T=R[i],o=u.hot._acceptedDependencies[T],U.indexOf(o)>=0||U.push(o);for(i=0;i<U.length;i++){o=U[i];try{o(R)}catch(e){n.onErrored&&n.onErrored({type:"accept-errored",moduleId:l,dependencyId:R[i],error:e}),n.ignoreErrored||H||(H=e)}}}for(i=0;i<P.length;i++){var W=P[i];l=W.module,O=[l];try{f(l)}catch(e){if("function"==typeof W.errorHandler)try{W.errorHandler(e)}catch(t){n.onErrored&&n.onErrored({type:"self-accept-error-handler-errored",moduleId:l,error:t,orginalError:e}),n.ignoreErrored||H||(H=t),H||(H=e)}else n.onErrored&&n.onErrored({type:"self-accept-errored",moduleId:l,error:e}),n.ignoreErrored||H||(H=e)}}return H?(a("fail"),Promise.reject(H)):(a("idle"),Promise.resolve(p))}function f(t){if(D[t])return D[t].exports;var n=D[t]={i:t,l:!1,exports:{},hot:i(t),parents:(E=O,O=[],E),children:[]};return e[t].call(n.exports,n,n.exports,o(t)),n.l=!0,n.exports}var h=window.webpackJsonp;window.webpackJsonp=function(t,n,r){for(var o,i,a=0,s=[];a<t.length;a++)i=t[a],q[i]&&s.push(q[i][0]),q[i]=0;for(o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);for(h&&h(t,n,r);s.length;)s.shift()()};var _=this.webpackHotUpdate;this.webpackHotUpdate=function(e,t){u(e,t),_&&_(e,t)};var m,v,g,y,w=!0,b="b36710aa66b328ac9ca0",k={},O=[],E=[],x=[],S="idle",M=0,P=0,L={},C={},j={},D={},q={3:0};f.e=function(e){function t(){o.onerror=o.onload=null,clearTimeout(i);var t=q[e];0!==t&&(t&&t[1](new Error("Loading chunk "+e+" failed.")),q[e]=void 0)}if(0===q[e])return Promise.resolve();if(q[e])return q[e][2];var n=new Promise(function(t,n){q[e]=[t,n]});q[e][2]=n;var r=document.getElementsByTagName("head")[0],o=document.createElement("script");o.type="text/javascript",o.charset="utf-8",o.async=!0,o.timeout=12e4,f.nc&&o.setAttribute("nonce",f.nc),o.src=f.p+"client/"+({}[e]||e)+".js";var i=setTimeout(t,12e4);return o.onerror=o.onload=t,r.appendChild(o),n},f.m=e,f.c=D,f.i=function(e){return e},f.d=function(e,t,n){f.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},f.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return f.d(t,"a",t),t},f.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},f.p="/",f.oe=function(e){throw console.error(e),e},f.h=function(){return b},o(101)(f.s=101)}({101:function(e,t,n){e.exports=n(34)},34:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(94);window.LogTracer=r.a,t.default=r.a},89:function(e,t,n){"use strict";var r={info:function(e){var t={UA:navigator.userAgent,system:this.system(),wechat:this.wechat(),network:this.network()};this.performance(t,e)},system:function(){var e=navigator.userAgent,t="Unknown",n=e.match(/(ipod).*\s([\d_]+)/i),r=e.match(/(ipad).*\s([\d_]+)/i),o=e.match(/(iphone)\sos\s([\d_]+)/i),i=e.match(/(android)\s([\d\.]+)/i),a=e.match(/(chrome)\/([\d\.]+)/i),s=e.match(/(safari)\/([\d\.]+)/i);return i?t="Android "+i[2]:o?t="iPhone, iOS "+o[2].replace(/_/g,"."):r?t="iPad, iOS "+r[2].replace(/_/g,"."):n?t="iPod, iOS "+n[2].replace(/_/g,"."):a?t="Chrome "+a[2].replace(/_/g,"."):s&&(t="Safari "+s[2].replace(/_/g,".")),t},wechat:function(){var e=navigator.userAgent,t=e.match(/MicroMessenger\/([\d\.]+)/i),n="Unknown";return t&&t[1]&&(n=" WeChat "+t[1]),n},protocol:function(){var e="Unknown";return e="https:"===location.protocol?"HTTPS":"http:"===location.protocol?"HTTP":location.protocol.replace(":",""),e},network:function(){var e=navigator.userAgent,t=e.toLowerCase().match(/ nettype\/([^ ]+)/g),n="Unknown";return t&&t[0]&&(t=t[0].split("/"),n=t[1]),n},performance:function(e,t){var n=window.performance||window.msPerformance||window.webkitPerformance;if(!n||!n.timing)return t("unsupport",e);setTimeout(function(){var r=n.timing;r.navigationStart&&(e.navigationStart=r.navigationStart),r.navigationStart&&r.domainLookupStart&&(e.navigation=r.domainLookupStart-r.navigationStart+"ms"),r.domainLookupEnd&&r.domainLookupStart&&(e.dns=r.domainLookupEnd-r.domainLookupStart+"ms"),r.connectEnd&&r.connectStart&&(r.connectEnd&&r.secureConnectionStart?e["tcp (ssl)"]=r.connectEnd-r.connectStart+"ms ("+(r.connectEnd-r.secureConnectionStart)+"ms)":e.tcp=r.connectEnd-r.connectStart+"ms"),r.responseStart&&r.requestStart&&(e.request=r.responseStart-r.requestStart+"ms"),r.responseEnd&&r.responseStart&&(e.response=r.responseEnd-r.responseStart+"ms"),r.domComplete&&r.domLoading&&(r.domContentLoadedEventStart&&r.domLoading?e.domComplete=r.domComplete-r.domLoading+"ms ("+(r.domContentLoadedEventStart-r.domLoading)+"ms)":e.domComplete=r.domComplete-r.domLoading+"ms"),r.loadEventEnd&&r.loadEventStart&&(e.loadEvent=r.loadEventEnd-r.loadEventStart+"ms"),r.navigationStart&&r.loadEventEnd&&(e["total (DOM)"]=r.loadEventEnd-r.navigationStart+"ms ("+(r.domComplete-r.navigationStart)+"ms)"),t(null,e)},1)}};t.a=r},90:function(e,t,n){"use strict";function r(){return Math.random().toString(16).substr(2)+(new Date).getTime().toString(16)}function o(e){return"[object Number]"==Object.prototype.toString.call(e)}function i(e){return"[object String]"==Object.prototype.toString.call(e)}function a(e){return"[object Array]"==Object.prototype.toString.call(e)}function s(e){return"[object Boolean]"==Object.prototype.toString.call(e)}function c(e){return"[object Undefined]"==Object.prototype.toString.call(e)}function u(e){return"[object Null]"==Object.prototype.toString.call(e)}function l(e){return"[object Symbol]"==Object.prototype.toString.call(e)}function d(e){return!("[object Object]"!=Object.prototype.toString.call(e)&&(o(e)||i(e)||s(e)||a(e)||u(e)||p(e)||c(e)||l(e)))}function p(e){return"[object Function]"==Object.prototype.toString.call(e)}function f(e){if(!d(e)&&!a(e))return[];var t=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],n=[];for(var r in e)t.indexOf(r)<0&&n.push(r);return n=n.sort()}t.b=r,t.c=p,t.a=f;"function"==typeof Symbol&&Symbol.iterator},91:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=function(){function e(){r(this,e),this._listeners={}}return o(e,[{key:"$on",value:function(e,t){return this._listeners[e]||(this._listeners[e]=[]),this._listeners[e].push(t),this._listeners[e].length-1}},{key:"$off",value:function(e,t){var n=this;this._listeners[e]&&this._listeners[e].length&&(t||(this._listeners[e].map(function(e){return null}),this._listeners[e]=[]),"function"==typeof t&&this._listeners[e].map(function(r,o){r===t&&(n._listeners[e].splice(o,1),r=null)}),"number"==typeof t&&this._listeners[e].splice(t,1))}},{key:"$emit",value:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];if(t.length){var r=t[0];t.shift(),this._listeners[r]&&this._listeners[r].length&&this._listeners[r].map(function(e){e.apply(null,t)})}}}]),e}();t.a=i},92:function(module,__webpack_exports__,__webpack_require__){"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function getUniqueID(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})}function formatHeader(e){var t={},n=[];return e.split("\n").map(function(e){n=e.split(":"),e&&n.length&&(t[n[0]]=n[1])}),t}var __WEBPACK_IMPORTED_MODULE_0__system__=__webpack_require__(89),__WEBPACK_IMPORTED_MODULE_1__event__=__webpack_require__(91),__WEBPACK_IMPORTED_MODULE_2__utils__=__webpack_require__(90),__WEBPACK_IMPORTED_MODULE_3_json_stringify_safe__=__webpack_require__(96),__WEBPACK_IMPORTED_MODULE_3_json_stringify_safe___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_json_stringify_safe__),__WEBPACK_IMPORTED_MODULE_4__vue_instance__=__webpack_require__(93),_createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),LogManager=function(_Event){function LogManager(e){_classCallCheck(this,LogManager);var t=_possibleConstructorReturn(this,(LogManager.__proto__||Object.getPrototypeOf(LogManager)).call(this));return t.options={maxLogCount:e.maxLogCount||50,report:e.report,socket:e.socket},t.logQueue=[],t.historyQueue=t.load(),t.errorQueue=[],t.netWorkQueue=[],t.logIndex=0,t.system={},__WEBPACK_IMPORTED_MODULE_0__system__.a.info(function(e,n){t.system=n}),t.mock(["log","error","warn"]),t.initSocket(),t}return _inherits(LogManager,_Event),_createClass(LogManager,[{key:"initSocket",value:function(){var e=this;__webpack_require__.e(1).then(__webpack_require__.bind(null,31)).then(function(t){e.socket=t.connect(e.options.socket),e.socket.on("connect",function(){e.socket.emit("regist",{system:e.system}),e.socket.on("run-code",function(t){e.execCommand(t.code)})})})}},{key:"toJSON",value:function(){return"LogManager"}},{key:"clearHistory",value:function(){this.historyQueue=[],this.save(),this.$emit("clearHistory")}},{key:"clear",value:function(){this.logQueue=[],this.$emit("clear")}},{key:"errorHandler",value:function(e,t,n){this.report({message:e.message,stack:e.stack,info:n,vm:t})}},{key:"report",value:function(e){var t=e.message,n=e.stack,r=e.info,o=e.vm,i=e.source,a=e.lineNo,s=e.colNo,c={requestId:__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__.b)(),message:t,stack:n,info:r,source:i,lineNo:a,colNo:s,vue:o,historyQueue:this.historyQueue};console.debug("report to "+this.options.report,c)}},{key:"write",value:function(e,t){var n={id:this.logIndex++,type:e,date:Date.now(),args:t};this.historyQueue.length>this.options.maxLogCount&&this.historyQueue.shift(),this.historyQueue.push(n),this.logQueue.push(n),this.$emit("newLog",n),this.socket.emit("run-code-callback",n),clearTimeout(this.timer),this.timer=setTimeout(this.save.bind(this),100)}},{key:"save",value:function(){var e=JSON.stringify(this.historyQueue);localStorage.LogManager=e}},{key:"load",value:function(){var e=localStorage.LogManager||"[]",t=[];try{t=JSON.parse(e)}catch(e){console.error(e)}return t}},{key:"execCommand",value:function execCommand(code){console.log(code);try{var result=eval(code);console.log(result)}catch(e){console.error(e)}}},{key:"mockConsole",value:function(e){var t=this;e.map(function(e){var n=console[e],r=t;console[e]=function(){for(var t=arguments.length,o=Array(t),i=0;i<t;i++)o[i]=arguments[i];if(!o||!o.length)return n.apply(console,o);r.write.call(r,e,JSON.parse(__WEBPACK_IMPORTED_MODULE_3_json_stringify_safe___default()(o,__WEBPACK_IMPORTED_MODULE_4__vue_instance__.a))),n.apply(console,o)}})}},{key:"mockOnError",value:function(){var e=this;this.windowOnError=window.onerror,window.onerror=function(t,n,r,o,i){var a={message:t,source:n,lineNo:r,colNo:o,error:i,stack:i&&i.stack};e.errorQueue.push(a),e.report(a),__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__.c)(e.windowOnError)&&e.windowOnError.call(window,t,n,r,o,i)}}},{key:"requestFormat",value:function(e,t){switch(e.readyState){case 0:case 1:t.startTime=Date.now();break;case 2:t.header=e.getAllResponseHeaders();break;case 3:t.state=1;break;case 4:t.header=e.getAllResponseHeaders(),t.headers=formatHeader(t.header),t.response=e.response,t.endTime=Date.now(),t.costTime=t.endTime-t.startTime}return t.status=e.status,t}},{key:"addOrUpdateRequest",value:function(e){for(var t=!1,n=0,r=this.netWorkQueue.length;n<r;n++)if(this.netWorkQueue[n]._requestId===e._requestId){t=!0,this.netWorkQueue[n]=this.requestFormat(e,this.netWorkQueue[n]);break}t||this.netWorkQueue.push(this.requestFormat(e,{_requestId:e._requestId,startTime:0,costTime:0,status:0,header:"",headers:{},response:"",url:e._URL}))}},{key:"mockXMLHttpRequest",value:function(){if(window.XMLHttpRequest){var e=(window.XMLHttpRequest,function(){}),t=this,n=window.XMLHttpRequest.prototype.open;window.XMLHttpRequest.prototype.send;window.XMLHttpRequest.prototype.open=function(){for(var r=arguments.length,o=Array(r),i=0;i<r;i++)o[i]=arguments[i];var a=this,s=o[1],c=this.onprogress||e,u=this.onload||e;a._requestId=getUniqueID(),a._URL=s;var l=a.onreadystatechange||function(){console.debug("no onreadystatechange event")};return a.onreadystatechange=function(){return t.addOrUpdateRequest.call(t,this),l.apply(a,arguments)},this.onprogress=function(){t.addOrUpdateRequest.call(t,this);for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];return c.apply(a,n)},this.onload=function(){t.addOrUpdateRequest.call(t,this);for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];return u.apply(a,n)},n.apply(a,o)}}}},{key:"mock",value:function(e){this.mockConsole(e),this.mockOnError(),this.mockXMLHttpRequest()}}]),LogManager}(__WEBPACK_IMPORTED_MODULE_1__event__.a);__webpack_exports__.a=LogManager},93:function(e,t,n){"use strict";function r(e){return e.replace(/\/.*\//,"")}function o(e){return e._data}function i(e){var t=e.$route;if(t){var n=t.path,r=t.query,o=t.params,i={path:n,query:r,params:o};return t.fullPath&&(i.fullPath=t.fullPath),t.hash&&(i.hash=t.hash),t.name&&(i.name=t.name),t.meta&&(i.meta=t.meta),i}}function a(e){var t=e.$options.name||e.$options._componentTag;if(t)return t;var n=e.$options.__file;return n?r(n):e.$root===e?"Root":"Anonymous Component"}function s(e,t){return t&&t._isVue?{name:"[Vue instance] <"+a(t)+"> ",state:o(t),$route:i(t)}:t}t.a=s},94:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=n(92),i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=document.createElement("div");a.id="ddd",a.setAttribute("style","height: 20px; width: 20px; background: red;"),document.body.appendChild(a);var s={el:"#ddd",clickCount:5,maxLogCount:50,report:"http://xxxxx.com/api/report",Vue:null},c=function(){function e(t){r(this,e),this.options=Object.assign({},s,t),this.state={clickCount:0},window.logManager=this.logManager=new o.a({maxLogCount:this.options.maxLogCount,report:this.options.report,socket:this.options.socket}),t.Vue&&(t.Vue.config.errorHandler=function(){this.logManager.errorHandler(arguments)}.bind(this));var n=window.document.body.querySelector(this.options.el);if(!n)return console.error("invalid el selector with LogTracer");n.addEventListener("click",this.clickMark.bind(this)),this.startReset(),this.show()}return i(e,[{key:"startReset",value:function(){var e=this;clearInterval(this.timer),this.timer=setInterval(function(){e.state.clickCount=0},1e4)}},{key:"clickMark",value:function(){++this.state.clickCount>this.options.clickCount&&(this.show(),this.options.clickCount=0)}},{key:"show",value:function(){var e=this;clearInterval(this.timer),n.e(0).then(n.bind(null,102)).then(function(t){t.install(e.logManager).show()})}},{key:"hide",value:function(){this.startReset(),app.hide()}}]),e}();t.a=c},96:function(e,t){function n(e,t,n,o){return JSON.stringify(e,r(t,o),n)}function r(e,t){var n=[],r=[];return null==t&&(t=function(e,t){return n[0]===t?"[Circular ~]":"[Circular ~."+r.slice(0,n.indexOf(t)).join(".")+"]"}),function(o,i){if(n.length>0){var a=n.indexOf(this);~a?n.splice(a+1):n.push(this),~a?r.splice(a,1/0,o):r.push(o),~n.indexOf(i)&&(i=t.call(this,o,i))}else n.push(i);return null==e?i:e.call(this,o,i)}}t=e.exports=n,t.getSerialize=r}});