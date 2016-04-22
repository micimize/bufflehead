require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("strictduck-domain-driven-fullstack");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("domain-driven-pouchdb-persistence-plugin/dist/for/node_development");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _strictduckDomainDrivenFullstack = __webpack_require__(1);
	
	var _strictduckDomainDrivenFullstack2 = _interopRequireDefault(_strictduckDomainDrivenFullstack);
	
	var _polypackDomainDrivenExpress = __webpack_require__(8);
	
	var _polypackDomainDrivenExpress2 = _interopRequireDefault(_polypackDomainDrivenExpress);
	
	var _polypackDomainDrivenReduxReact = __webpack_require__(9);
	
	var _polypackDomainDrivenReduxReact2 = _interopRequireDefault(_polypackDomainDrivenReduxReact);
	
	var _polypackDomainDrivenPouchdbPersistencePlugin = __webpack_require__(2);
	
	var _polypackDomainDrivenPouchdbPersistencePlugin2 = _interopRequireDefault(_polypackDomainDrivenPouchdbPersistencePlugin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Bufflehead = function (_Fullstack) {
	    _inherits(Bufflehead, _Fullstack);
	
	    function Bufflehead(_ref) {
	        var _ref$server = _ref.server;
	        var server = _ref$server === undefined ? _polypackDomainDrivenExpress2.default : _ref$server;
	        var _ref$client = _ref.client;
	        var client = _ref$client === undefined ? _polypackDomainDrivenReduxReact2.default : _ref$client;
	        var _ref$persister = _ref.persister;
	        var persister = _ref$persister === undefined ? _polypackDomainDrivenPouchdbPersistencePlugin2.default : _ref$persister;
	        var domains = _ref.domains;
	        var _ref$context = _ref.context;
	        var context = _ref$context === undefined ? ("NODE") : _ref$context;
	
	        _classCallCheck(this, Bufflehead);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Bufflehead).call(this, { context: context, domains: domains, server: server, client: client, persister: persister }));
	    }
	
	    return Bufflehead;
	}(_strictduckDomainDrivenFullstack2.default);
	
	exports.default = Bufflehead;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.persister = exports.Domain = exports.settings = exports.default = undefined;
	
	var _DomainDrivenFullstackApplication = __webpack_require__(3);
	
	var _DomainDrivenFullstackApplication2 = _interopRequireDefault(_DomainDrivenFullstackApplication);
	
	var _settings2 = __webpack_require__(6);
	
	var _settings3 = _interopRequireDefault(_settings2);
	
	var _strictduckDomainDrivenFullstack = __webpack_require__(1);
	
	var _polypackDomainDrivenPouchdbPersistencePlugin = __webpack_require__(2);
	
	var _persister = _interopRequireWildcard(_polypackDomainDrivenPouchdbPersistencePlugin);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _DomainDrivenFullstackApplication2.default;
	exports.settings = _settings3.default;
	var implementation = _strictduckDomainDrivenFullstack.Domain.implementation;
	var Domains = _strictduckDomainDrivenFullstack.Domain.Domains;
	exports.Domain = implementation;
	exports.persister = _persister;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _argparse = __webpack_require__(7);
	
	var _fs = __webpack_require__(10);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var parser = new _argparse.ArgumentParser({
	    version: '0.0.1',
	    addHelp: true,
	    description: 'get settings path'
	});
	
	parser.addArgument(['--settings', '-s'], {
	    dest: 'settings',
	    help: 'pass in environment settings. Objects under the keys "client" and "server" will be unpacked into the parent object or removed from the environment accordingly'
	});
	
	module.exports = function deriveSettings() {
	    var settingsFile = parser.parseArgs().settings;
	    return settingsFile ? JSON.parse(_fs2.default.readFileSync(settingsFile, 'utf8')) : {};
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.default = settings;
	
	var _strictduckDomainDrivenFullstack = __webpack_require__(1);
	
	function flattenForContext(original, key) {
	    var contexts = arguments.length <= 2 || arguments[2] === undefined ? ['server', 'client'] : arguments[2];
	
	    var obj = Object.assign({}, original);
	    obj = Object.assign(obj, obj[key] || {});
	    return Object.keys(obj).filter(function (k) {
	        return contexts.indexOf(k) < 0;
	    }).reduce(function (resp, k) {
	        resp[k] = !Array.isArray(obj[k]) && _typeof(obj[k]) == 'object' ? flattenForContext(obj[k], key, contexts) : obj[k];
	        return resp;
	    }, {});
	}
	
	var deriveSettingsFromEnv =  true ? __webpack_require__(5) : require('./browserSettings');
	
	function settings(literal) {
	    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    var _ref$context = _ref.context;
	    var context = _ref$context === undefined ? ("NODE") : _ref$context;
	    var _ref$fullstack = _ref.fullstack;
	    var fullstack = _ref$fullstack === undefined ? true : _ref$fullstack;
	    var _ref$contextMap = _ref.contextMap;
	    var contextMap = _ref$contextMap === undefined ? { NODE: 'server', BROWSER: 'client' } : _ref$contextMap;
	
	    var configuration = Object.assign(deriveSettingsFromEnv(), literal);
	    return new _strictduckDomainDrivenFullstack.Domain.implementation(_extends({
	        name: 'settings'
	    }, flattenForContext(configuration, contextMap[context]), fullstack && context == 'NODE' ? { client: flattenForContext(configuration, 'client') } : {}));
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("argparse");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("domain-driven-express/dist/for/node_development");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("domain-driven-redux-react/dist/for/node_development");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ }
/******/ ]);
//# sourceMappingURL=node_development.js.map