require("source-map-support").install(),module.exports=function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){e.exports=r(3)},function(e,t){e.exports=require("strictduck-domain-driven-fullstack")},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=r(1),s=n(a),c=r(4)["default"],f=r(5)["default"],l=function(e){function t(e){var r=e.server,n=void 0===r?c:r,u=e.client,a=void 0===u?f:u,s=e.domains;return o(this,t),i(this,Object.getPrototypeOf(t).call(this,{domains:s,server:n,client:a}))}return u(t,e),t}(s["default"]);t["default"]=l},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.Domain=t["default"]=void 0;var o=r(2),i=n(o),u=r(1);t["default"]=i["default"];var a=u.Domain.implementation;u.Domain.Domains;t.Domain=a},function(e,t){e.exports=require("domain-driven-express/node")},function(e,t){e.exports=require("domain-driven-redux-react/node")}]);