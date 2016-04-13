require("source-map-support").install(),module.exports=function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}(function(e){for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t))switch(typeof e[t]){case"function":break;case"object":e[t]=function(t){var n=t.slice(1),r=e[t[0]];return function(e,t,o){r.apply(this,[e,t,o].concat(n))}}(e[t]);break;default:e[t]=e[e[t]]}return e}([function(e,t,n){e.exports=n(9)},function(e,t){e.exports=require("strictduck-domain-driven-fullstack")},function(e,t){e.exports=require("source-map-support")},[33,14],function(e,t){e.exports=require("express")},function(e,t){e.exports=require("react")},function(e,t){e.exports=require("redux")},function(e,t){e.exports=require("strictduck")},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1),c=r(a),s=n(11),f=r(s),d=n(12),l=r(d),p=n(3),v=r(p),m=function(e){function t(e){var n=e.server,r=void 0===n?f["default"]:n,u=e.client,a=void 0===u?l["default"]:u,c=e.persister,s=void 0===c?v["default"]:c,d=e.domains,p=e.context,m=void 0===p?"NODE":p;return o(this,t),i(this,Object.getPrototypeOf(t).call(this,{context:m,domains:d,server:r,client:a,persister:s}))}return u(t,e),t}(c["default"]);t["default"]=m},function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.persister=t.Domain=t.settings=t["default"]=void 0;var i=n(8),u=o(i),a=n(10),c=o(a),s=n(1),f=n(3),d=r(f);t["default"]=u["default"],t.settings=c["default"];var l=s.Domain.implementation;s.Domain.Domains;t.Domain=l,t.persister=d},function(e,t,n){"use strict";function r(e,t){var n=arguments.length<=2||void 0===arguments[2]?["server","client"]:arguments[2];return e=Object.assign(e,e[t]||{}),Object.keys(e).filter(function(e){return n.indexOf(e)<0}).reduce(function(o,i){return o[i]=Array.isArray(e[i])||"object"!=u(e[i])?e[i]:r(e[i],t,n),o},{})}function o(e){var t=arguments.length<=1||void 0===arguments[1]?{NODE:"server",BROWSER:"client"}:arguments[1];return new a.Domain.implementation(i({name:"settings"},r(e,t.NODE)))}Object.defineProperty(t,"__esModule",{value:!0});var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};t["default"]=o;var a=n(1)},[33,13],[33,15],function(e,t,n){"use strict";n(2).install(),e.exports=function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(3)},function(e,t){e.exports=n(4)},function(e,t,n){function r(e){return e&&e.__esModule?e:{"default":e}}function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function i(e,t){return Object.keys(e).map(function(t){return e[t]}).filter(function(e){return Object.keys(e.get(t)).length})}function u(e){var t=e.router,n=e.routes,r=e.order,i=e.prefix,u=void 0===i?"":i,a=r||Object.keys(n);return a.forEach(function(e){var r=n[e],i=r.methods,a=r.handlers;i.forEach(function(n){t[n].apply(t,[u+e].concat(o(a)))})}),t}function a(e){var t=e.prefix,n=e.routes,r=e.order;return u({router:l["default"].Router(),routes:n,order:r,prefix:"/"+t})}function c(e){return i(e,"middleware").reduce(function(e,t){return[].concat(o(e),o(t.get("middleware")))},[]).filter(function(e){return"function"==typeof e})}function s(e){return i(e,"routes").map(a)}function f(e){return c(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.domainRouteMiddlewareGenerator=s,t.genericDomainMiddlewareGenerator=f;var d=n(1),l=r(d)},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(4)["default"];t["default"]=r},function(e,t,n){function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=(n(5),n(1)),i=r(o),u=n(6),a=n(2);t["default"]=u.server.implement({name:"DomainDrivenExpress",constructor:function(e){var t=e.Domains,n=e.DomainDrivenStorePersistencePlugin,r=e.middlewareGenerators,o=void 0===r?[a.genericDomainMiddlewareGenerator,a.domainRouteMiddlewareGenerator]:r,u=e.server,c=void 0===u?(0,i["default"])():u;return e.container,n instanceof Error||(n.provide(t),t=n.provideInjectionForDomainRouteHandlers(t)),c._domains=c._domains||{},c.generateMiddleware=function(e){var t=this;o.forEach(function(n){return n(e).forEach(function(e){return t.use(e)})}),Object.assign(this._domains,e)},c.generateMiddleware.bind(c)(t),[c]},provider:function(e){var t=e.port,n=void 0===t?3e3:t,r=e.DomainDrivenClient;r&&this.generateMiddleware.bind(this)({"":r.provide()});var o=(0,i["default"])();o.use(this),o.listen(n,function(e){e?console.error(e):console.info("==> Listening on port "+n+". Open up http://localhost:"+n+"/ in your browser.")})}})},function(e,t){e.exports=n(7)},function(e,t){e.exports=n(1)}])},function(e,t,n){"use strict";n(2).install(),e.exports=function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(8)},function(e,t,n){function r(e){return e&&e.__esModule?e:{"default":e}}function o(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function r(o,i){try{var u=t[o](i),a=u.value}catch(c){return void n(c)}return u.done?void e(a):Promise.resolve(a).then(function(e){return r("next",e)},function(e){return r("throw",e)})}return r("next")})}}function i(e,t){console.log(e,t),console.trace(t)}function u(e){var t=e.uri,n=e.protocols,r=void 0===n?["http","https"]:n,o=e.admin,i=o.name,u=o.password,a=r.filter(function(e){return t.startsWith(e+"://")})[0]+"://";return t.replace(a,""+a+i+":"+u+"@")}function a(e){try{(0,y.execSync)(e)}catch(t){console.log('command "'+e+'" failed with with error '+t)}}function c(e){var t=e.uri,n=e.name,r=e.credentials;r=void 0===r?{}:r;var o=r.admin;o&&a("curl -silent -X PUT -d '"+o.password+"' "+t+"/_config/admins/"+o.name);var i=o?u({uri:t+"/"+n,admin:o}):t+"/"+n;a("curl -silent -X PUT "+i)}Object.defineProperty(t,"__esModule",{value:!0});var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},f=function(){var e=o(regeneratorRuntime.mark(function t(e){var n,r,o=e.uri,u=e.name,a=e.password;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,v["default"].put(o+"/_config/admins/"+u).send('"'+a+'"');case 3:n=e.sent,console.log("Server admin created"),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),409!=e.t0.status?i("error creating superadmin",e.t0):console.log("Server admin already exists");case 10:return e.prev=10,e.next=13,this.login(u,a);case 13:return r=e.sent,console.log("Server admin logged in"),e.abrupt("return",r);case 18:e.prev=18,e.t1=e["catch"](10),i("error logging in superadmin",e.t1);case 21:case"end":return e.stop()}},t,this,[[0,7],[10,18]])}));return function(t){return e.apply(this,arguments)}}(),d=function(){var e=o(regeneratorRuntime.mark(function t(e){var n=e.name,r=e.password;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.signup(n,r);case 3:e.next=8;break;case 5:e.prev=5,e.t0=e["catch"](0),409!=e.t0.status?i("error creating superadmin",e.t0):console.log("user "+n+" already exists");case 8:case"end":return e.stop()}},t,this,[[0,5]])}));return function(t){return e.apply(this,arguments)}}(),l=function(){var e=o(regeneratorRuntime.mark(function t(e){var n=e.uri,r=e.credentials,o=r.admin,u=r.users;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.bind(this)(s({uri:n},o));case 3:e.next=8;break;case 5:e.prev=5,e.t0=e["catch"](0),i("error in initDbUsers",e.t0);case 8:u.forEach(d.bind(this));case 9:case"end":return e.stop()}},t,this,[[0,5]])}));return function(t){return e.apply(this,arguments)}}();t.ensureRemoteExistence=c;var p=n(17),v=r(p),m=n(2),y=(r(m),n(11));t["default"]=function(){function e(e){return t.apply(this,arguments)}var t=o(regeneratorRuntime.mark(function n(e){var t=e.settings.db,r=t.uri,o=t.credentials;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:o&&l.bind(this)({uri:r,credentials:o});case 1:case"end":return e.stop()}},n,this)}));return e}()},function(e,t,n){function r(e){return e&&e.__esModule?e:{"default":e}}function o(e){var t=e.name,n=e.uri;return n+"/"+t}function i(e){return new a["default"](o(e),{skipSetup:!0})}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=i;var u=n(14),a=r(u),c=n(15),s=r(c);a["default"].plugin(s["default"])},function(e,t,n){function r(e){return e&&e.__esModule?e:{"default":e}}function o(e){var t=e.path,n=e.persister;return function(e,r,o){var i=function(n){r({nextPathname:e.location.pathname},t),o()};(n||this.db).getSession(function(e,t){e?(console.log(e),i()):t.userCtx.name?o():i()})}}function i(e){return{requiresAuthentication:!0,path:e}}function u(e){var t=function(e){return e};return Object.assign(t,{providesAuthentication:!0,component:e}),t}function a(e){var t=e.route,n=e.persister;return t.props.onEnter&&t.props.onEnter.requiresAuthentication?{onEnter:o({path:t.props.onEnter.path,persister:n})}:{}}function c(e){var t=e.route,n=e.persister;return t.props.component&&t.props.component.providesAuthentication?{component:function(e){return h["default"].createElement(t.props.component.component,m({auth:n},e))}}:{}}function s(e,t){return t=t||this.db,h["default"].cloneElement(e,m({},a({route:e,persister:t}),c({route:e,persister:t}),{key:e.props.path}),e.props.children?e.props.children.map(function(e){return s(e,t)}):void 0)}function f(e,t){var n=this;return function(){for(var r=arguments.length,o=Array(r),i=0;r>i;i++)o[i]=arguments[i];return e.apply(void 0,[t||n.db].concat(o))}}function d(e,t){return e.handlers=e.handlers.map(function(e){return e.requiresPersister?f(e.dependentFunction,t):e}),e}function l(e,t){var n=e.get("routes");return Object.keys(e.get("routes")).map(function(r){return e.register("routes",r,d(n[r],t))}),e}function p(e,t){return t=t||this.db,Object.keys(e).reduce(function(n,r){return n[r]=l(e[r],t),n},{})}function v(e){return{requiresPersister:!0,dependentFunction:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.defaultDataFlows=void 0;var m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.requireAuthWithPersister=o,t.requireAuthFromRoute=i,t.provideAuthFromRoute=u,t.authenticateRoutes=s,t.provideInjectionForDomainRouteHandlers=p,t.requireInjection=v;var y=n(16),h=r(y),b=n(5),g=r(b);t.defaultDataFlows=g["default"]},function(e,t){e.exports=n(6)},function(e,t){function n(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={INSERT:function(e,t){return[t].concat(n(e))},UPDATE:function(e,t){return e.map(function(e){return e._id==t._id?t:e})},REMOVE:function(e,t){var n=t._id;return e.filter(function(e){return e._id!=n})}}},function(e,t,n){function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(18),i=n(7),u=r(i),a=n(2),c=r(a),s=n(3),f=n(1)["default"],d=n(1).ensureRemoteExistence;t["default"]=o.storePersistencePlugin.implement({name:"DomainDrivenPouchPersistencePlugin",constructor:function(e){var t=e.Domains.settings.db;return d(t),[{db:(0,c["default"])(t),middlewareGenerator:u["default"],authenticateRoutes:s.authenticateRoutes,provideAuthFromRoute:s.provideAuthFromRoute,provideInjectionForDomainRouteHandlers:s.provideInjectionForDomainRouteHandlers}]},provider:function(){return f.bind(this.db).apply(void 0,arguments)}})},function(e,t,n){function r(e){return e&&e.__esModule?e:{"default":e}}function o(e){return Object.keys(e).reduce(function(t,n){return t[e[n]]=n,t},{})}function i(e){var t=e.domain,n=t.actions,r=void 0===n?{}:n,i=t.pouchActionMap,u=void 0===i?{insert:"insert",update:"update",remove:"remove"}:i,a=o(u),c=Object.keys(r).filter(function(e){return[u.update,u.insert,u.remove].indexOf(e)>=0}).reduce(function(e,t){return e[a[t]]=function(e){try{return r[t](e)}catch(n){if(n instanceof TypeError)return;throw n}},e},{});return Object.keys(c).length?c:!1}function u(e){var t=e.db,n=e.domains;return(0,c["default"])(Object.values(n).filter(function(e){return i({domain:e})}).map(function(e){return e}).map(function(e){return{path:"/"+e.prefix,prefix:""+(e.dbPrefix||""),db:t,actions:i({domain:e})}}))}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=u;var a=(n(4),n(9)),c=r(a)},function(e,t,n){function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.utils=t["default"]=void 0;var o=n(3);Object.keys(o).forEach(function(e){"default"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return o[e]}})});var i=n(6),u=r(i);t["default"]=u["default"],t.utils=n(1)},function(e,t,n){function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e){var t=console.warn||console.log;t&&t.call(console,e)}function a(e){return function(){throw new Error("no action provided for "+e)}}function c(e){return e.lifecycleState?void 0:(e.lifecycleState="INITIALIZING",e.db.allDocs(m({include_docs:!0},e.prefix?{startkey:e.prefix,endkey:e.prefix+"￿"}:{})).then(function(t){t.rows.forEach(function(t){return l(e,t)}),e.lifecycleState="INITIALIZED",s(e)}))}function s(e){var t=e.db.changes(m({live:!0,since:"now",include_docs:!0},e.prefix?{filter:function(t){var n=t._id;return n.split("/")[0]==e.prefix}}:{}));t.on("change",function(t){return l(e,t)})}function f(e,t){var n=h["default"].resolve(t,e.path);n&&n.length&&"INITIALIZED"==e.lifecycleState&&n.forEach(function(t){var n=d(e.docs,t),r=n.updated,o=n.deleted,i=n.inserted;i.concat(r).forEach(function(t){return e.insert(t)}),o.forEach(function(t){return e.remove(t)})})}function d(e,t){var n=[],r=[],o=Object.keys(e).map(function(t){return e[t]});return t.forEach(function(t){t._id||u("doc with no id"),o=o.filter(function(e){return e._id!==t._id});var i=e[t._id];i?(0,_["default"])(i,t)||r.push(t):n.push(t)}),{inserted:n,updated:r,deleted:o}}function l(e,t){var n=t.doc;if(o(t,["doc"]),n._deleted)e.docs[n._id]&&(delete e.docs[n._id],e.propagations.remove(n));else{var r=e.docs[n._id];e.docs[n._id]=n,r?e.propagations.update(n):e.propagations.insert(n)}}function p(){var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0];if(Array.isArray(e)||(e=[e]),!e.length)throw new Error("PouchMiddleware: no paths");return e=e.map(function(e){return new O(e)}),function(t){var n=t.dispatch,r=t.getState;return e.forEach(function(e){e.wrapActionCreators(n),e.initFromDb()}),function(t){return function(n){var o=t(n);return e.forEach(function(e){return f(e,r())}),o}}}}Object.defineProperty(t,"__esModule",{value:!0});var v=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t["default"]=p;var y=n(13),h=r(y),b=n(10),g=r(b),x=n(12),_=r(x),w=(n(4),{remove:a("remove"),update:a("update"),insert:a("insert")}),O=function(){function e(t){var n=t.path,r=void 0===n?".":n,o=t.prefix,u=void 0===o?"":o,a=t.db,c=t.actions;if(i(this,e),!a)throw new Error("path "+r.path+" needs a db");this.queue=(0,g["default"])(1),this.docs={},this.db=a,this.path=r,this.prefix=u,this.actions=Object.assign({},w,c)}return v(e,[{key:"insert",value:function(e){this.docs[e._id]=e;var t=this.db;this.queue.push(function(n){t.put(e,n)})}},{key:"remove",value:function(e){var t=this,n=this.db;this.queue.push(function(r){n.remove(e,r),delete t.docs[e._id]})}},{key:"wrapActionCreators",value:function(e){var t=this;this.propagations=Object.keys(this.actions).reduce(function(n,r){return n[r]=function(n){var o=t.actions[r](n);o&&e(o)},n},{})}},{key:"initFromDb",value:function(){var e=this;c(this)["catch"](function(t){if(401!=t.status)throw t;e.lifecycleState=!1,e.db.once("login",function(t){return c(e)})})}}]),e}()},function(e,t){e.exports=n(16)},function(e,t){e.exports=n(17)},function(e,t){e.exports=n(18)},function(e,t){e.exports=n(21)},function(e,t){e.exports=n(23)},function(e,t){e.exports=n(24)},function(e,t){e.exports=n(5)},function(e,t){e.exports=n(28)},function(e,t){e.exports=n(1)}])},function(e,t,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};n(2).install(),e.exports=function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(19)},function(e,t){e.exports=n(6)},function(e,t){e.exports=n(27)},function(e,t){e.exports=n(1)},function(e,t){e.exports=n(22)},function(e,t){e.exports=n(5)},function(e,t){e.exports=n(25)},function(e,t){e.exports=n(7)},function(e,t){e.exports=n(29)},function(e,t){e.exports=n(30)},function(e,t,n){function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=(n(7),n(3)),i=n(21),u=r(i),a=n(15),c=r(a),s=n(17),f=r(s),d=n(18),l=r(d),p=(console.log("wat")||n(20))["default"];t["default"]=o.reactiveClient.implement({name:"DomainDrivenReduxReactClient",constructor:function(e){var t=e.Domains,n=e.elementId,r=void 0===n?"app":n,o=e.DomainDrivenClientStore,i=void 0===o?u["default"]:o,a=e.DomainDrivenStorePersistencePlugin,s=e.routes,d=e.middlewareGenerators,p=void 0===d?[]:d,v=e.client,m=void 0===v?{}:v;return a instanceof Error||p.push(function(e){return a.middlewareGenerator({db:a.db,domains:e})}),i instanceof Error&&(i=u["default"]),t=(0,l["default"])(t),Object.assign(m,{routes:s||m.routes||(0,f["default"])(t),elementId:r}),a&&a.authenticateRoutes&&(m.routes=a.authenticateRoutes(m.routes)),m.store=new i({domains:t,routes:m.routes,middlewareGenerators:p}),m.router=(0,c["default"])(m.store,m.routes),[m]},provider:function(){return p.bind(this)()}})},function(e,t,n){function r(e){return e&&e.__esModule?e:{"default":e}}function o(e){return(0,u["default"])(Object.keys(e).filter(function(t){return e[t].reducer}).reduce(function(t,n){return t[n]=e[n].reducer,t},{}))}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o;var i=n(12),u=r(i)},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i="function"==typeof Symbol&&"symbol"==r(Symbol.iterator)?function(e){return"undefined"==typeof e?"undefined":r(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":"undefined"==typeof e?"undefined":r(e)};t["default"]=function(e){if("object"!==("undefined"==typeof e?"undefined":i(e)))throw"Reactuate reducers should be an object (and not a function)";return(0,u.combineReducers)(o({router:a.routerStateReducer},e))};var u=n(1),a=n(2)},function(e,t,n){function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=function(e,t){function n(){var e=arguments.length<=0||void 0===arguments[0]?o:arguments[0],t=arguments.length<=1||void 0===arguments[1]?!1:arguments[1],i=arguments.length<=2||void 0===arguments[2]?void 0:arguments[2],c=arguments.length<=3||void 0===arguments[3]?[r.displayName]:arguments[3];return n.is(e)?e:(e=r(e),"undefined"!=typeof i&&(i=u(i)),this instanceof n?(this.type=a,this.payload=e,t&&(this.error=!0),void("undefined"!=typeof i&&(this.meta=i))):new n(e,t,i,c))}var r=arguments.length<=2||void 0===arguments[2]?i["default"].Any:arguments[2],o=arguments.length<=3||void 0===arguments[3]?void 0:arguments[3],u=arguments.length<=4||void 0===arguments[4]?i["default"].Any:arguments[4],a=e.withPrefix(t);return n.meta={kind:"actionCreator",payload:r,name:a,identity:!1},n.displayName="Action "+a+"("+r.displayName+")",n.actionCreator=!0,n.action=t,n.is=function(e){return e instanceof n},e.register("actions",t,n),n};var o=n(8),i=r(o)},function(e,t,n){function r(e){return e&&e.__esModule?e:{"default":e}}function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=function(e,t){for(var n=arguments.length,r=Array(n>2?n-2:0),i=2;n>i;i++)r[i-2]=arguments[i];var a=function c(){var n=arguments.length<=0||void 0===arguments[0]?t:arguments[0],i=arguments[1],c=i;if("@@reactuate/action"===i.type){var a=e.get("actions")[e.withoutPrefix(i.payload.type)];u["default"].Nil.is(a)||(c=a(i.payload.payload,i.payload.error,i.payload.meta))}Object.freeze(n);var s=r.map(function(e){return"function"==typeof e&&"undefined"==typeof e.meta?function(t){return e(n,t)}:e});return u["default"].match.apply(u["default"],[c].concat(o(s),[u["default"].Any,function(){return n}]))};return e.reducer=a,a};var i=n(8),u=r(i)},function(e,t,n){function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){return u["default"].createElement(c.Provider,{store:e},u["default"].createElement(a.ReduxRouter,null,t))}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o;var i=n(5),u=r(i),a=n(2),c=n(6)},function(e,t,n){function r(e){return e&&e.__esModule?e:{"default":e}}function o(e){var t=e.name;return t.toLowerCase().replace(/_([a-z])/g,function(e){return e[1].toUpperCase()})}function i(e){var t=e.prefix,n=e.name;return"@@"+t+"/"+n}function u(e,t){return p.utils.nameObj({name:o({prefix:e,name:t}),object:function(n){return{type:i({prefix:e,name:t}),payload:n}}})}function a(e,t,n){return function(r,o){var u=o.type,a=o.payload;return u===i({prefix:e,name:t})?n(r,a):r}}function c(e,t){return function(){var n=arguments.length<=0||void 0===arguments[0]?e:arguments[0],r=arguments[1];return t.reduce(function(e,t){return t(e,r)},n)}}function s(e){var t=e.get("dataFlows"),n=e.prefix;return t&&Object.keys(t).length&&(Object.keys(t).forEach(function(t){e.register("actions",o({prefix:n,name:t}),u(n,t))}),e.reducer=c(e.initialState||[],Object.keys(t).map(function(e){return a(n,e,t[e])}))),e}function f(e){return Object.keys(e).reduce(function(t,n){return t[n]=f(e[n]),t},{})}Object.defineProperty(t,"__esModule",{value:!0}),t.unpackDataFlowsIntoDomain=s,t["default"]=f;var d=n(14),l=(r(d),n(13)),p=(r(l),n(7))},function(e,t,n){function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){return Object.keys(e).map(function(t){return e[t]}).filter(function(e){return Object.keys(e.get(t)).length})}function i(e){return e.get("route").route||l["default"].createElement(p.Route,{path:"/",component:e.get("route").component})}function u(e){return o(e,"route").filter(function(e){return"/"==e.get("route").path}).map(i)[0]}function a(e){return o(e,"route").map(function(e){return e.get("route")}).filter(function(e){return e.isContainer})}function c(e){var t=e.route,n=e.domainRoutes,r=n.filter(function(e){return e.original==t.props.component})[0];return l["default"].cloneElement(t,r?{component:r.component,key:t.props.key||t.props.path}:{key:t.props.key||t.props.path},t.props.children?t.props.children.map(function(e){return c({route:e,domainRoutes:n})}):void 0)}function s(e,t){return c({route:e,domainRoutes:a(t)})}function f(e){return s(u(e),e)}Object.defineProperty(t,"__esModule",{value:!0}),t.swapRouteComponentForContainer=c,t["default"]=f;var d=n(5),l=r(d),p=n(26)},function(e,t,n){function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e){return e.get("actions")&&Object.keys(e.get("actions")).length||(e=(0,f.unpackDataFlowsIntoDomain)(e)),(0,s.connect)(function(t){return r({},e.prefix,t[e.prefix])},function(t){return{actions:(0,c.bindActionCreators)(e.get("actions"),t)}})(e.get("route").component)}function i(e){return e.get("actions")&&Object.keys(e.get("actions")).length||(e=(0,f.unpackDataFlowsIntoDomain)(e)),e.register("route","original",e.get("route").component),e.register("route","component",o(e)),e.register("route","isContainer",!0),e}function u(e){var t=e.get("dataFlows"),n=e.get("route").component;return Object.keys(t).length&&n&&(e=i(e)),e}function a(e){return Object.keys(e).reduce(function(t,n){return t[n]=u(e[n]),t},{})}Object.defineProperty(t,"__esModule",{value:!0}),t.domainReduxConnector=o,t.connectDomainRoutes=i,t.expandReduxDomain=u,t["default"]=a;var c=n(1),s=n(6),f=n(16)},function(e,t,n){function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=void 0;var o=n(10),i=r(o);t["default"]=i["default"]},function(e,t,n){function r(e){return e&&e.__esModule?e:{"default":e}}function o(){var e=(0,a["default"])(m["default"]);return e.run(function(e,t){e&&console.log("err",e)}),new y.Domain.implementation({name:"",middleware:[],routes:i({},{"static/bundle.js":{methods:["get"],handlers:[function(e,t,n){return t.sendFile(s["default"].join(process.cwd(),"dist/bundle.js"))}]}},{"*":{methods:["get"],handlers:[function(e,t,n){return t.sendFile(s["default"].join(process.cwd(),"index.html"))}]}}),order:["static/bundle.js","*"]})}Object.defineProperty(t,"__esModule",{value:!0});var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t["default"]=o;var u=n(9),a=r(u),c=n(4),s=r(c),f=n(24),d=(r(f),n(27)),l=(r(d),n(28)),p=(r(l),n(23)),v=(r(p),n(22)),m=r(v),y=n(3)},function(e,t,n){function o(e){return e&&e.__esModule?e:{"default":e}}function i(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=("undefined"==typeof t?"undefined":r(t))&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":r(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=n(1),f=n(2),d=n(3),l=n(11),p=o(l),v=n(25),m=function(e){function t(e){var n=e.domains,r=e.routes,o=e.store,c=void 0===o?s.createStore:o,d=e.defaultMiddlewareGenerators,l=void 0===d?[]:d,m=e.middlewareGenerators,y=void 0===m?[]:m;return u(this,t),a(this,Object.getPrototypeOf(t).call(this,(0,s.compose)(s.applyMiddleware.apply(void 0,i(l.map(function(e){return e(n)})).concat(i(y.map(function(e){return e(n)})))),(0,f.reduxReactRouter)({routes:r,createHistory:v}))(c)((0,p["default"])(n))))}return c(t,e),t}(d.clientStore["default"]);t["default"]=m},function(e,t,n){var r=n(4),o=n(9);e.exports={devtool:"source-map",context:process.cwd(),debug:!0,target:"web",entry:["./src/index"],output:{path:r.join(process.cwd(),"dist"),filename:"bundle.js",publicPath:"/static/"},plugins:[new o.DefinePlugin({$ES:{CONTEXT:JSON.stringify("BROWSER"),ENV:JSON.stringify("PRODUCTION")}}),new o.DefinePlugin({"process.env":{NODE_ENV:'"production"'}}),new o.optimize.DedupePlugin,new o.optimize.OccurenceOrderPlugin,new o.optimize.UglifyJsPlugin({compress:{warnings:!1}})],resolveLoader:{fallback:r.join(process.cwd(),"node_modules"),alias:{polypack:"callback?polypack"}},callbackLoader:{polypack:function(e){var t="browser_"+"PRODUCTION".toLowerCase();return e?'require("'+e+"/dist/for/"+t+'") //polypacked secondhand':'require("./for/'+t+'") //polypacked by dist'}},module:{loaders:[{test:/\.js$|\.jsx$/,loaders:["babel?presets[]=es2015&presets[]=stage-0&presets[]=react"],exclude:/node_modules/,include:[process.cwd()]},{test:/\.json$/,loader:"json"},{test:/\.css$/,loader:"style!css!postcss"},{test:/\.less$/,loader:"style!css!less"},{test:/\.scss$/,loader:"style-loader!css-loader!sass-loader?outputStyle=expanded&includePaths[]="+r.resolve(process.cwd(),"./node_modules")},{test:/\.woff(2)?(\?.+)?$/,loader:"url?limit=10000&mimetype=application/font-woff"},{test:/\.ttf(\?.+)?$/,loader:"url?limit=10000&mimetype=application/octet-stream"},{test:/\.eot(\?.+)?$/,loader:"file"},{test:/\.svg(\?.+)?$/,loader:"url?limit=10000&mimetype=image/svg+xml"},{test:/\.png$/,loader:"url-loader?limit=100000"},{test:/\.jpg$/,loader:"file-loader"}]},resolve:{modulesDirectories:["src","node_modules","web_modules"],extensions:["",".json",".js",".jsx"],fallback:r.join(process.cwd(),"node_modules"),alias:{react:r.join(process.cwd(),"./node_modules/react")}},node:{__dirname:!0,fs:"empty"}}},function(e,t){e.exports=n(4)},function(e,t){e.exports=n(19)},function(e,t){e.exports=n(20)},function(e,t){e.exports=n(26)},function(e,t){e.exports=n(31)},function(e,t){e.exports=n(32)}])},function(e,t){e.exports=require("async-function-queue")},function(e,t){e.exports=require("child_process")},function(e,t){e.exports=require("deep-equal")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("history/lib/createMemoryHistory")},function(e,t){e.exports=require("json-path")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("pouchdb")},function(e,t){e.exports=require("pouchdb-authentication")},function(e,t){e.exports=require("react-redux")},function(e,t){e.exports=require("react-router")},function(e,t){e.exports=require("redux-router")},function(e,t){e.exports=require("requisition")},function(e,t){e.exports=require("tcomb")},function(e,t){e.exports=require("webpack")},function(e,t){e.exports=require("webpack-dev-middleware")},function(e,t){e.exports=require("webpack-hot-middleware")},function(e,t,n,r){"use strict";e.exports=n(r)}]));
//# sourceMappingURL=node_production.js.map