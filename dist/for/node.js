require("source-map-support").install(),module.exports=function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(3)},function(e,t){e.exports=require("strictduck-domain-driven-fullstack")},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=n(1),a=r(s),c=n(5)["default"],f=n(8)["default"],l=n(7)["default"],d=function(e){function t(e){var n=e.server,r=void 0===n?c:n,u=e.client,s=void 0===u?f:u,a=e.persister,d=void 0===a?l:a,p=e.domains,v=e.context,m=void 0===v?"NODE":v;return o(this,t),i(this,Object.getPrototypeOf(t).call(this,{context:m,domains:p,server:r,client:s,persister:d}))}return u(t,e),t}(a["default"]);t["default"]=d},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.defaultPersistenceDataFlows=t.Domain=t.settings=t["default"]=void 0;var o=n(2),i=r(o),u=n(4),s=r(u),a=n(1),c=n(6);t["default"]=i["default"],t.settings=s["default"];var f=a.Domain.implementation;a.Domain.Domains;t.Domain=f,t.defaultPersistenceDataFlows=c.defaultDataFlows},function(e,t,n){"use strict";function r(e,t){var n=arguments.length<=2||void 0===arguments[2]?["server","client"]:arguments[2];return e=Object.assign(e,e[t]||{}),Object.keys(e).filter(function(e){return n.indexOf(e)<0}).reduce(function(o,i){return o[i]="object"==u(e[i])?r(e[i],t,n):e[i],o},{})}function o(e){var t=arguments.length<=1||void 0===arguments[1]?{NODE:"server",BROWSER:"client"}:arguments[1];return new s.Domain.implementation(i({name:"settings"},r(e,t.NODE)))}Object.defineProperty(t,"__esModule",{value:!0});var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};t["default"]=o;var s=n(1)},function(e,t){e.exports=require("domain-driven-express/node")},function(e,t){e.exports=require("domain-driven-pouchdb-persistence-plugin")},function(e,t){e.exports=require("domain-driven-pouchdb-persistence-plugin/node")},function(e,t){e.exports=require("domain-driven-redux-react/node")}]);
//# sourceMappingURL=node.js.map