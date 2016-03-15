exports.id = 0;
exports.modules = {

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _strictduckDomainDrivenFullstack = __webpack_require__(5);
	
	var _expressDomainDriver = __webpack_require__(6);
	
	var _expressDomainDriver2 = _interopRequireDefault(_expressDomainDriver);
	
	var _reduxReactDomainDriver = __webpack_require__(7);
	
	var _reduxReactDomainDriver2 = _interopRequireDefault(_reduxReactDomainDriver);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//import DDPouchDb from 'pouchdb-fullstack-store'
	
	exports.default = _strictduckDomainDrivenFullstack.fullstack.implement({
	    name: 'Bufflehead',
	    constructor: function constructor(_ref) {
	        var _ref$Server = _ref.Server;
	        var Server = _ref$Server === undefined ? _expressDomainDriver2.default : _ref$Server;
	        var _ref$Client = _ref.Client;
	        var Client = _ref$Client === undefined ? _reduxReactDomainDriver2.default : _ref$Client;
	        var
	        //Store=DDPouchDb,
	        Domains = _ref.Domains;
	
	        return [Domains, Server, Client /*Store,*/];
	    }
	});

/***/ }

};
//# sourceMappingURL=0.fc040ebe997fae0e9c21.hot-update.js.map