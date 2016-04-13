require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch(e) {
/******/ 			return callback();
/******/ 		}
/******/ 		callback(null, update);
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "7a8eba3919fa8d7c26fd"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(Object.defineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(Object.defineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
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
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	/*globals __resourceQuery */
	if(true) {
		var hotPollInterval = +(__resourceQuery.substr(1)) || (10 * 60 * 1000);
	
		function checkForUpdate(fromUpdate) {
			if(module.hot.status() === "idle") {
				module.hot.check(true, function(err, updatedModules) {
					if(err) {
						if(module.hot.status() in {
								abort: 1,
								fail: 1
							}) {
							console.warn("[HMR] Cannot apply update.");
							console.warn("[HMR] " + err.stack || err.message);
							console.warn("[HMR] You need to restart the application!");
						} else {
							console.warn("[HMR] Update failed: " + err.stack || err.message);
						}
						return;
					}
					if(!updatedModules) {
						if(fromUpdate) console.log("[HMR] Update applied.");
						return;
					}
					__webpack_require__(2)(updatedModules, updatedModules);
					checkForUpdate(true);
				});
			}
		}
		setInterval(checkForUpdate, hotPollInterval);
	} else {
		throw new Error("[HMR] Hot Module Replacement is disabled.");
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, "?1000"))

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(updatedModules, renewedModules) {
		var unacceptedModules = updatedModules.filter(function(moduleId) {
			return renewedModules && renewedModules.indexOf(moduleId) < 0;
		});
	
		if(unacceptedModules.length > 0) {
			console.warn("[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
			unacceptedModules.forEach(function(moduleId) {
				console.warn("[HMR]  - " + moduleId);
			});
		}
	
		if(!renewedModules || renewedModules.length === 0) {
			console.log("[HMR] Nothing hot updated.");
		} else {
			console.log("[HMR] Updated modules:");
			renewedModules.forEach(function(moduleId) {
				console.log("[HMR]  - " + moduleId);
			});
		}
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.persister = exports.Domain = exports.settings = exports.default = undefined;
	
	var _DomainDrivenFullstackApplication = __webpack_require__(4);
	
	var _DomainDrivenFullstackApplication2 = _interopRequireDefault(_DomainDrivenFullstackApplication);
	
	var _settings2 = __webpack_require__(26);
	
	var _settings3 = _interopRequireDefault(_settings2);
	
	var _strictduckDomainDrivenFullstack = __webpack_require__(5);
	
	var _domainDrivenPouchdbPersistencePlugin = __webpack_require__(27);
	
	var _persister = _interopRequireWildcard(_domainDrivenPouchdbPersistencePlugin);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _DomainDrivenFullstackApplication2.default;
	exports.settings = _settings3.default;
	var implementation = _strictduckDomainDrivenFullstack.Domain.implementation;
	var Domains = _strictduckDomainDrivenFullstack.Domain.Domains;
	exports.Domain = implementation;
	exports.persister = _persister;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _strictduckDomainDrivenFullstack = __webpack_require__(5);
	
	var _strictduckDomainDrivenFullstack2 = _interopRequireDefault(_strictduckDomainDrivenFullstack);
	
	var _polypackDomainDrivenReduxReact = __webpack_require__(6);
	
	var _polypackDomainDrivenReduxReact2 = _interopRequireDefault(_polypackDomainDrivenReduxReact);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DDExpress = ( true ? __webpack_require__(24) : require('domain-driven-express/dist/for/browser')).default;
	
	var DDPouchDb = ( true ? __webpack_require__(25) : require('domain-driven-pouchdb-persistence-plugin/dist/for/browser')).default;
	
	var Bufflehead = function (_Fullstack) {
	    _inherits(Bufflehead, _Fullstack);
	
	    function Bufflehead(_ref) {
	        var _ref$server = _ref.server;
	        var server = _ref$server === undefined ? DDExpress : _ref$server;
	        var _ref$client = _ref.client;
	        var client = _ref$client === undefined ? _polypackDomainDrivenReduxReact2.default : _ref$client;
	        var _ref$persister = _ref.persister;
	        var persister = _ref$persister === undefined ? DDPouchDb : _ref$persister;
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
/* 5 */
/***/ function(module, exports) {

	module.exports = require("strictduck-domain-driven-fullstack");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = {
	    default: __webpack_require__(7) //polypacked by dist
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	__webpack_require__(8).install();
	module.exports =
	/******/function (modules) {
		// webpackBootstrap
		/******/function hotDownloadUpdateChunk(chunkId) {
			// eslint-disable-line no-unused-vars
			/******/var chunk = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
			/******/hotAddUpdateChunk(chunk.id, chunk.modules);
			/******/
		}
		/******/
		/******/function hotDownloadManifest(callback) {
			// eslint-disable-line no-unused-vars
			/******/try {
				/******/var update = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
				/******/
			} catch (e) {
				/******/return callback();
				/******/
			}
			/******/callback(null, update);
			/******/
		}
		/******/
		/******/
		/******/
		/******/var hotApplyOnUpdate = true;
		/******/var hotCurrentHash = "752507ea8cee6ce98dcd"; // eslint-disable-line no-unused-vars
		/******/var hotCurrentModuleData = {};
		/******/var hotCurrentParents = []; // eslint-disable-line no-unused-vars
		/******/
		/******/function hotCreateRequire(moduleId) {
			// eslint-disable-line no-unused-vars
			/******/var me = installedModules[moduleId];
			/******/if (!me) return __webpack_require__;
			/******/var fn = function fn(request) {
				/******/if (me.hot.active) {
					/******/if (installedModules[request]) {
						/******/if (installedModules[request].parents.indexOf(moduleId) < 0)
							/******/installedModules[request].parents.push(moduleId);
						/******/if (me.children.indexOf(request) < 0)
							/******/me.children.push(request);
						/******/
					} else hotCurrentParents = [moduleId];
					/******/
				} else {
						/******/console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
						/******/hotCurrentParents = [];
						/******/
					}
				/******/return __webpack_require__(request);
				/******/
			};
			/******/for (var name in __webpack_require__) {
				/******/if (Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
					/******/if (Object.defineProperty) {
						/******/Object.defineProperty(fn, name, function (name) {
							/******/return {
								/******/configurable: true,
								/******/enumerable: true,
								/******/get: function get() {
									/******/return __webpack_require__[name];
									/******/
								},
								/******/set: function set(value) {
									/******/__webpack_require__[name] = value;
									/******/
								}
								/******/ };
							/******/
						}(name));
						/******/
					} else {
							/******/fn[name] = __webpack_require__[name];
							/******/
						}
					/******/
				}
				/******/
			}
			/******/
			/******/function ensure(chunkId, callback) {
				/******/if (hotStatus === "ready")
					/******/hotSetStatus("prepare");
				/******/hotChunksLoading++;
				/******/__webpack_require__.e(chunkId, function () {
					/******/try {
						/******/callback.call(null, fn);
						/******/
					} finally {
						/******/finishChunkLoading();
						/******/
					}
					/******/
					/******/function finishChunkLoading() {
						/******/hotChunksLoading--;
						/******/if (hotStatus === "prepare") {
							/******/if (!hotWaitingFilesMap[chunkId]) {
								/******/hotEnsureUpdateChunk(chunkId);
								/******/
							}
							/******/if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
								/******/hotUpdateDownloaded();
								/******/
							}
							/******/
						}
						/******/
					}
					/******/
				});
				/******/
			}
			/******/if (Object.defineProperty) {
				/******/Object.defineProperty(fn, "e", {
					/******/enumerable: true,
					/******/value: ensure
					/******/ });
				/******/
			} else {
					/******/fn.e = ensure;
					/******/
				}
			/******/return fn;
			/******/
		}
		/******/
		/******/function hotCreateModule(moduleId) {
			// eslint-disable-line no-unused-vars
			/******/var hot = {
				/******/ // private stuff
				/******/_acceptedDependencies: {},
				/******/_declinedDependencies: {},
				/******/_selfAccepted: false,
				/******/_selfDeclined: false,
				/******/_disposeHandlers: [],
				/******/
				/******/ // Module API
				/******/active: true,
				/******/accept: function accept(dep, callback) {
					/******/if (typeof dep === "undefined")
						/******/hot._selfAccepted = true;
						/******/else if (typeof dep === "function")
							/******/hot._selfAccepted = dep;
							/******/else if ((typeof dep === "undefined" ? "undefined" : _typeof2(dep)) === "object")
								/******/for (var i = 0; i < dep.length; i++) {
									/******/hot._acceptedDependencies[dep[i]] = callback;
								} /******/else
								/******/hot._acceptedDependencies[dep] = callback;
					/******/
				},
				/******/decline: function decline(dep) {
					/******/if (typeof dep === "undefined")
						/******/hot._selfDeclined = true;
						/******/else if (typeof dep === "number")
							/******/hot._declinedDependencies[dep] = true;
							/******/else
							/******/for (var i = 0; i < dep.length; i++) {
								/******/hot._declinedDependencies[dep[i]] = true;
							} /******/
				},
				/******/dispose: function dispose(callback) {
					/******/hot._disposeHandlers.push(callback);
					/******/
				},
				/******/addDisposeHandler: function addDisposeHandler(callback) {
					/******/hot._disposeHandlers.push(callback);
					/******/
				},
				/******/removeDisposeHandler: function removeDisposeHandler(callback) {
					/******/var idx = hot._disposeHandlers.indexOf(callback);
					/******/if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
					/******/
				},
				/******/
				/******/ // Management API
				/******/check: hotCheck,
				/******/apply: hotApply,
				/******/status: function status(l) {
					/******/if (!l) return hotStatus;
					/******/hotStatusHandlers.push(l);
					/******/
				},
				/******/addStatusHandler: function addStatusHandler(l) {
					/******/hotStatusHandlers.push(l);
					/******/
				},
				/******/removeStatusHandler: function removeStatusHandler(l) {
					/******/var idx = hotStatusHandlers.indexOf(l);
					/******/if (idx >= 0) hotStatusHandlers.splice(idx, 1);
					/******/
				},
				/******/
				/******/ //inherit from previous dispose call
				/******/data: hotCurrentModuleData[moduleId]
				/******/ };
			/******/return hot;
			/******/
		}
		/******/
		/******/var hotStatusHandlers = [];
		/******/var hotStatus = "idle";
		/******/
		/******/function hotSetStatus(newStatus) {
			/******/hotStatus = newStatus;
			/******/for (var i = 0; i < hotStatusHandlers.length; i++) {
				/******/hotStatusHandlers[i].call(null, newStatus);
			} /******/
		}
		/******/
		/******/ // while downloading
		/******/var hotWaitingFiles = 0;
		/******/var hotChunksLoading = 0;
		/******/var hotWaitingFilesMap = {};
		/******/var hotRequestedFilesMap = {};
		/******/var hotAvailibleFilesMap = {};
		/******/var hotCallback;
		/******/
		/******/ // The update info
		/******/var hotUpdate, hotUpdateNewHash;
		/******/
		/******/function toModuleId(id) {
			/******/var isNumber = +id + "" === id;
			/******/return isNumber ? +id : id;
			/******/
		}
		/******/
		/******/function hotCheck(apply, callback) {
			/******/if (hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
			/******/if (typeof apply === "function") {
				/******/hotApplyOnUpdate = false;
				/******/callback = apply;
				/******/
			} else {
					/******/hotApplyOnUpdate = apply;
					/******/callback = callback || function (err) {
						/******/if (err) throw err;
						/******/
					};
					/******/
				}
			/******/hotSetStatus("check");
			/******/hotDownloadManifest(function (err, update) {
				/******/if (err) return callback(err);
				/******/if (!update) {
					/******/hotSetStatus("idle");
					/******/callback(null, null);
					/******/return;
					/******/
				}
				/******/
				/******/hotRequestedFilesMap = {};
				/******/hotAvailibleFilesMap = {};
				/******/hotWaitingFilesMap = {};
				/******/for (var i = 0; i < update.c.length; i++) {
					/******/hotAvailibleFilesMap[update.c[i]] = true;
				} /******/hotUpdateNewHash = update.h;
				/******/
				/******/hotSetStatus("prepare");
				/******/hotCallback = callback;
				/******/hotUpdate = {};
				/******/var chunkId = 0;
				/******/{
					// eslint-disable-line no-lone-blocks
					/******/ /*globals chunkId */
					/******/hotEnsureUpdateChunk(chunkId);
					/******/
				}
				/******/if (hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
					/******/hotUpdateDownloaded();
					/******/
				}
				/******/
			});
			/******/
		}
		/******/
		/******/function hotAddUpdateChunk(chunkId, moreModules) {
			// eslint-disable-line no-unused-vars
			/******/if (!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
				/******/return;
			/******/hotRequestedFilesMap[chunkId] = false;
			/******/for (var moduleId in moreModules) {
				/******/if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
					/******/hotUpdate[moduleId] = moreModules[moduleId];
					/******/
				}
				/******/
			}
			/******/if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
				/******/hotUpdateDownloaded();
				/******/
			}
			/******/
		}
		/******/
		/******/function hotEnsureUpdateChunk(chunkId) {
			/******/if (!hotAvailibleFilesMap[chunkId]) {
				/******/hotWaitingFilesMap[chunkId] = true;
				/******/
			} else {
					/******/hotRequestedFilesMap[chunkId] = true;
					/******/hotWaitingFiles++;
					/******/hotDownloadUpdateChunk(chunkId);
					/******/
				}
			/******/
		}
		/******/
		/******/function hotUpdateDownloaded() {
			/******/hotSetStatus("ready");
			/******/var callback = hotCallback;
			/******/hotCallback = null;
			/******/if (!callback) return;
			/******/if (hotApplyOnUpdate) {
				/******/hotApply(hotApplyOnUpdate, callback);
				/******/
			} else {
					/******/var outdatedModules = [];
					/******/for (var id in hotUpdate) {
						/******/if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
							/******/outdatedModules.push(toModuleId(id));
							/******/
						}
						/******/
					}
					/******/callback(null, outdatedModules);
					/******/
				}
			/******/
		}
		/******/
		/******/function hotApply(options, callback) {
			/******/if (hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
			/******/if (typeof options === "function") {
				/******/callback = options;
				/******/options = {};
				/******/
			} else if (options && (typeof options === "undefined" ? "undefined" : _typeof2(options)) === "object") {
					/******/callback = callback || function (err) {
						/******/if (err) throw err;
						/******/
					};
					/******/
				} else {
						/******/options = {};
						/******/callback = callback || function (err) {
							/******/if (err) throw err;
							/******/
						};
						/******/
					}
			/******/
			/******/function getAffectedStuff(module) {
				/******/var outdatedModules = [module];
				/******/var outdatedDependencies = {};
				/******/
				/******/var queue = outdatedModules.slice();
				/******/while (queue.length > 0) {
					/******/var moduleId = queue.pop();
					/******/var module = installedModules[moduleId];
					/******/if (!module || module.hot._selfAccepted)
						/******/continue;
					/******/if (module.hot._selfDeclined) {
						/******/return new Error("Aborted because of self decline: " + moduleId);
						/******/
					}
					/******/if (moduleId === 0) {
						/******/return;
						/******/
					}
					/******/for (var i = 0; i < module.parents.length; i++) {
						/******/var parentId = module.parents[i];
						/******/var parent = installedModules[parentId];
						/******/if (parent.hot._declinedDependencies[moduleId]) {
							/******/return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
							/******/
						}
						/******/if (outdatedModules.indexOf(parentId) >= 0) continue;
						/******/if (parent.hot._acceptedDependencies[moduleId]) {
							/******/if (!outdatedDependencies[parentId])
								/******/outdatedDependencies[parentId] = [];
							/******/addAllToSet(outdatedDependencies[parentId], [moduleId]);
							/******/continue;
							/******/
						}
						/******/delete outdatedDependencies[parentId];
						/******/outdatedModules.push(parentId);
						/******/queue.push(parentId);
						/******/
					}
					/******/
				}
				/******/
				/******/return [outdatedModules, outdatedDependencies];
				/******/
			}
			/******/
			/******/function addAllToSet(a, b) {
				/******/for (var i = 0; i < b.length; i++) {
					/******/var item = b[i];
					/******/if (a.indexOf(item) < 0)
						/******/a.push(item);
					/******/
				}
				/******/
			}
			/******/
			/******/ // at begin all updates modules are outdated
			/******/ // the "outdated" status can propagate to parents if they don't accept the children
			/******/var outdatedDependencies = {};
			/******/var outdatedModules = [];
			/******/var appliedUpdate = {};
			/******/for (var id in hotUpdate) {
				/******/if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
					/******/var moduleId = toModuleId(id);
					/******/var result = getAffectedStuff(moduleId);
					/******/if (!result) {
						/******/if (options.ignoreUnaccepted)
							/******/continue;
						/******/hotSetStatus("abort");
						/******/return callback(new Error("Aborted because " + moduleId + " is not accepted"));
						/******/
					}
					/******/if (result instanceof Error) {
						/******/hotSetStatus("abort");
						/******/return callback(result);
						/******/
					}
					/******/appliedUpdate[moduleId] = hotUpdate[moduleId];
					/******/addAllToSet(outdatedModules, result[0]);
					/******/for (var moduleId in result[1]) {
						/******/if (Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
							/******/if (!outdatedDependencies[moduleId])
								/******/outdatedDependencies[moduleId] = [];
							/******/addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
							/******/
						}
						/******/
					}
					/******/
				}
				/******/
			}
			/******/
			/******/ // Store self accepted outdated modules to require them later by the module system
			/******/var outdatedSelfAcceptedModules = [];
			/******/for (var i = 0; i < outdatedModules.length; i++) {
				/******/var moduleId = outdatedModules[i];
				/******/if (installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
					/******/outdatedSelfAcceptedModules.push({
						/******/module: moduleId,
						/******/errorHandler: installedModules[moduleId].hot._selfAccepted
						/******/ });
				/******/
			}
			/******/
			/******/ // Now in "dispose" phase
			/******/hotSetStatus("dispose");
			/******/var queue = outdatedModules.slice();
			/******/while (queue.length > 0) {
				/******/var moduleId = queue.pop();
				/******/var module = installedModules[moduleId];
				/******/if (!module) continue;
				/******/
				/******/var data = {};
				/******/
				/******/ // Call dispose handlers
				/******/var disposeHandlers = module.hot._disposeHandlers;
				/******/for (var j = 0; j < disposeHandlers.length; j++) {
					/******/var cb = disposeHandlers[j];
					/******/cb(data);
					/******/
				}
				/******/hotCurrentModuleData[moduleId] = data;
				/******/
				/******/ // disable module (this disables requires from this module)
				/******/module.hot.active = false;
				/******/
				/******/ // remove module from cache
				/******/delete installedModules[moduleId];
				/******/
				/******/ // remove "parents" references from all children
				/******/for (var j = 0; j < module.children.length; j++) {
					/******/var child = installedModules[module.children[j]];
					/******/if (!child) continue;
					/******/var idx = child.parents.indexOf(moduleId);
					/******/if (idx >= 0) {
						/******/child.parents.splice(idx, 1);
						/******/
					}
					/******/
				}
				/******/
			}
			/******/
			/******/ // remove outdated dependency from module children
			/******/for (var moduleId in outdatedDependencies) {
				/******/if (Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
					/******/var module = installedModules[moduleId];
					/******/var moduleOutdatedDependencies = outdatedDependencies[moduleId];
					/******/for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
						/******/var dependency = moduleOutdatedDependencies[j];
						/******/var idx = module.children.indexOf(dependency);
						/******/if (idx >= 0) module.children.splice(idx, 1);
						/******/
					}
					/******/
				}
				/******/
			}
			/******/
			/******/ // Not in "apply" phase
			/******/hotSetStatus("apply");
			/******/
			/******/hotCurrentHash = hotUpdateNewHash;
			/******/
			/******/ // insert new code
			/******/for (var moduleId in appliedUpdate) {
				/******/if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
					/******/modules[moduleId] = appliedUpdate[moduleId];
					/******/
				}
				/******/
			}
			/******/
			/******/ // call accept handlers
			/******/var error = null;
			/******/for (var moduleId in outdatedDependencies) {
				/******/if (Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
					/******/var module = installedModules[moduleId];
					/******/var moduleOutdatedDependencies = outdatedDependencies[moduleId];
					/******/var callbacks = [];
					/******/for (var i = 0; i < moduleOutdatedDependencies.length; i++) {
						/******/var dependency = moduleOutdatedDependencies[i];
						/******/var cb = module.hot._acceptedDependencies[dependency];
						/******/if (callbacks.indexOf(cb) >= 0) continue;
						/******/callbacks.push(cb);
						/******/
					}
					/******/for (var i = 0; i < callbacks.length; i++) {
						/******/var cb = callbacks[i];
						/******/try {
							/******/cb(outdatedDependencies);
							/******/
						} catch (err) {
							/******/if (!error)
								/******/error = err;
							/******/
						}
						/******/
					}
					/******/
				}
				/******/
			}
			/******/
			/******/ // Load self accepted modules
			/******/for (var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
				/******/var item = outdatedSelfAcceptedModules[i];
				/******/var moduleId = item.module;
				/******/hotCurrentParents = [moduleId];
				/******/try {
					/******/__webpack_require__(moduleId);
					/******/
				} catch (err) {
					/******/if (typeof item.errorHandler === "function") {
						/******/try {
							/******/item.errorHandler(err);
							/******/
						} catch (err) {
							/******/if (!error)
								/******/error = err;
							/******/
						}
						/******/
					} else if (!error)
							/******/error = err;
					/******/
				}
				/******/
			}
			/******/
			/******/ // handle errors in accept handlers and self accepted module load
			/******/if (error) {
				/******/hotSetStatus("fail");
				/******/return callback(error);
				/******/
			}
			/******/
			/******/hotSetStatus("idle");
			/******/callback(null, outdatedModules);
			/******/
		}
		/******/
		/******/ // The module cache
		/******/var installedModules = {};
		/******/
		/******/ // The require function
		/******/function __webpack_require__(moduleId) {
			/******/
			/******/ // Check if module is in cache
			/******/if (installedModules[moduleId])
				/******/return installedModules[moduleId].exports;
			/******/
			/******/ // Create a new module (and put it into the cache)
			/******/var module = installedModules[moduleId] = {
				/******/exports: {},
				/******/id: moduleId,
				/******/loaded: false,
				/******/hot: hotCreateModule(moduleId),
				/******/parents: hotCurrentParents,
				/******/children: []
				/******/ };
			/******/
			/******/ // Execute the module function
			/******/modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
			/******/
			/******/ // Flag the module as loaded
			/******/module.loaded = true;
			/******/
			/******/ // Return the exports of the module
			/******/return module.exports;
			/******/
		}
		/******/
		/******/
		/******/ // expose the modules object (__webpack_modules__)
		/******/__webpack_require__.m = modules;
		/******/
		/******/ // expose the module cache
		/******/__webpack_require__.c = installedModules;
		/******/
		/******/ // __webpack_public_path__
		/******/__webpack_require__.p = "";
		/******/
		/******/ // __webpack_hash__
		/******/__webpack_require__.h = function () {
			return hotCurrentHash;
		};
		/******/
		/******/ // Load entry module and return exports
		/******/return hotCreateRequire(0)(0);
		/******/
	}(
	/************************************************************************/
	/******/[
	/* 0 */
	/***/function (module, exports, __webpack_require__) {
	
		__webpack_require__(1);
		module.exports = __webpack_require__(3);
	
		/***/
	},
	/* 1 */
	/***/function (module, exports, __webpack_require__) {
	
		/* WEBPACK VAR INJECTION */(function (__resourceQuery) {
			/*
	  MIT License http://www.opensource.org/licenses/mit-license.php
	  Author Tobias Koppers @sokra
	  */
			/*globals __resourceQuery */
			if (true) {
				var hotPollInterval;
	
				(function () {
					var checkForUpdate = function checkForUpdate(fromUpdate) {
						if (module.hot.status() === "idle") {
							module.hot.check(true, function (err, updatedModules) {
								if (err) {
									if (module.hot.status() in {
										abort: 1,
										fail: 1
									}) {
										console.warn("[HMR] Cannot apply update.");
										console.warn("[HMR] " + err.stack || err.message);
										console.warn("[HMR] You need to restart the application!");
									} else {
										console.warn("[HMR] Update failed: " + err.stack || err.message);
									}
									return;
								}
								if (!updatedModules) {
									if (fromUpdate) console.log("[HMR] Update applied.");
									return;
								}
								__webpack_require__(2)(updatedModules, updatedModules);
								checkForUpdate(true);
							});
						}
					};
	
					hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;
	
					setInterval(checkForUpdate, hotPollInterval);
				})();
			} else {
				throw new Error("[HMR] Hot Module Replacement is disabled.");
			}
	
			/* WEBPACK VAR INJECTION */
		}).call(exports, "?1000");
	
		/***/
	},
	/* 2 */
	/***/function (module, exports) {
	
		/*
	 	MIT License http://www.opensource.org/licenses/mit-license.php
	 	Author Tobias Koppers @sokra
	 */
		module.exports = function (updatedModules, renewedModules) {
			var unacceptedModules = updatedModules.filter(function (moduleId) {
				return renewedModules && renewedModules.indexOf(moduleId) < 0;
			});
	
			if (unacceptedModules.length > 0) {
				console.warn("[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
				unacceptedModules.forEach(function (moduleId) {
					console.warn("[HMR]  - " + moduleId);
				});
			}
	
			if (!renewedModules || renewedModules.length === 0) {
				console.log("[HMR] Nothing hot updated.");
			} else {
				console.log("[HMR] Updated modules:");
				renewedModules.forEach(function (moduleId) {
					console.log("[HMR]  - " + moduleId);
				});
			}
		};
	
		/***/
	},
	/* 3 */
	/***/function (module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.default = undefined;
	
		var _client = __webpack_require__(4);
	
		var _client2 = _interopRequireDefault(_client);
	
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}
	
		exports.default = _client2.default;
	
		/***/
	},
	/* 4 */
	/***/function (module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
	
		var _strictduck = __webpack_require__(5);
	
		var _strictduckDomainDrivenFullstack = __webpack_require__(6);
	
		var _store = __webpack_require__(7);
	
		var _store2 = _interopRequireDefault(_store);
	
		var _createRouter = __webpack_require__(13);
	
		var _createRouter2 = _interopRequireDefault(_createRouter);
	
		var _domainRouteGenerator = __webpack_require__(16);
	
		var _domainRouteGenerator2 = _interopRequireDefault(_domainRouteGenerator);
	
		var _expandReduxDomains = __webpack_require__(18);
	
		var _expandReduxDomains2 = _interopRequireDefault(_expandReduxDomains);
	
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}
	
		var _provider = (true ? __webpack_require__(23) : require('./render')).default;
	
		exports.default = _strictduckDomainDrivenFullstack.reactiveClient.implement({
			name: 'DomainDrivenReduxReactClient',
			constructor: function constructor(_ref) {
				var domains = _ref.Domains;
				var _ref$elementId = _ref.elementId;
				var elementId = _ref$elementId === undefined ? 'app' : _ref$elementId;
				var _ref$DomainDrivenClie = _ref.DomainDrivenClientStore;
				var Store = _ref$DomainDrivenClie === undefined ? _store2.default : _ref$DomainDrivenClie;
				var persister = _ref.DomainDrivenStorePersistencePlugin;
				var routes = _ref.routes;
				var _ref$middlewareGenera = _ref.middlewareGenerators;
				var middlewareGenerators = _ref$middlewareGenera === undefined ? [] : _ref$middlewareGenera;
				var _ref$client = _ref.client;
				var client = _ref$client === undefined ? {} : _ref$client;
	
				if (!(persister instanceof Error)) middlewareGenerators.push(function (domains) {
					return persister.middlewareGenerator({ db: persister.db, domains: domains });
				});
	
				if (Store instanceof Error) Store = _store2.default;
	
				domains = (0, _expandReduxDomains2.default)(domains);
	
				Object.assign(client, {
					routes: routes || client.routes || (0, _domainRouteGenerator2.default)(domains),
					elementId: elementId
				});
				if (persister && persister.authenticateRoutes) client.routes = persister.authenticateRoutes(client.routes);
	
				client.store = new Store({ domains: domains, routes: client.routes, middlewareGenerators: middlewareGenerators });
				client.router = (0, _createRouter2.default)(client.store, client.routes);
	
				return [client];
			},
			provider: function provider() {
				return _provider.bind(this)();
			}
		});
	
		/***/
	},
	/* 5 */
	/***/function (module, exports) {
	
		module.exports = __webpack_require__(11);
	
		/***/
	},
	/* 6 */
	/***/function (module, exports) {
	
		module.exports = __webpack_require__(5);
	
		/***/
	},
	/* 7 */
	/***/function (module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
	
		var _redux = __webpack_require__(8);
	
		var _reduxRouter = __webpack_require__(9);
	
		var _strictduckDomainDrivenFullstack = __webpack_require__(6);
	
		var _combineAllDomainReducers = __webpack_require__(10);
	
		var _combineAllDomainReducers2 = _interopRequireDefault(_combineAllDomainReducers);
	
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}
	
		function _toConsumableArray(arr) {
			if (Array.isArray(arr)) {
				for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
					arr2[i] = arr[i];
				}return arr2;
			} else {
				return Array.from(arr);
			}
		}
	
		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}
	
		function _possibleConstructorReturn(self, call) {
			if (!self) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
		}
	
		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
			}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
		}
	
		var createHistory = false ? require('history').createHistory : __webpack_require__(12);
	
		var DomainDrivenReduxStore = function (_ddStore$default) {
			_inherits(DomainDrivenReduxStore, _ddStore$default);
	
			function DomainDrivenReduxStore(_ref) {
				var domains = _ref.domains;
				var routes = _ref.routes;
				var _ref$store = _ref.store;
				var store = _ref$store === undefined ? _redux.createStore : _ref$store;
				var _ref$defaultMiddlewar = _ref.defaultMiddlewareGenerators;
				var defaultMiddlewareGenerators = _ref$defaultMiddlewar === undefined ? [] : _ref$defaultMiddlewar;
				var _ref$middlewareGenera = _ref.middlewareGenerators;
				var middlewareGenerators = _ref$middlewareGenera === undefined ? [] : _ref$middlewareGenera;
	
				_classCallCheck(this, DomainDrivenReduxStore);
	
				return _possibleConstructorReturn(this, Object.getPrototypeOf(DomainDrivenReduxStore).call(this, (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, _toConsumableArray(defaultMiddlewareGenerators.map(function (generator) {
					return generator(domains);
				})).concat(_toConsumableArray(middlewareGenerators.map(function (generator) {
					return generator(domains);
				})))), (0, _reduxRouter.reduxReactRouter)({ routes: routes, createHistory: createHistory }))(store)((0, _combineAllDomainReducers2.default)(domains))));
			}
	
			return DomainDrivenReduxStore;
		}(_strictduckDomainDrivenFullstack.clientStore.default);
	
		exports.default = DomainDrivenReduxStore;
	
		/***/
	},
	/* 8 */
	/***/function (module, exports) {
	
		module.exports = __webpack_require__(12);
	
		/***/
	},
	/* 9 */
	/***/function (module, exports) {
	
		module.exports = __webpack_require__(13);
	
		/***/
	},
	/* 10 */
	/***/function (module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.default = combineAllDomainReducers;
	
		var _combineReducers = __webpack_require__(11);
	
		var _combineReducers2 = _interopRequireDefault(_combineReducers);
	
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}
	
		function combineAllDomainReducers(domains) {
			return (0, _combineReducers2.default)(Object.keys(domains).filter(function (key) {
				return domains[key].reducer;
			}).reduce(function (map, key) {
				map[key] = domains[key].reducer;
				return map;
			}, {}));
		}
	
		/***/
	},
	/* 11 */
	/***/function (module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
	
		var _extends = Object.assign || function (target) {
			for (var i = 1; i < arguments.length; i++) {
				var source = arguments[i];for (var key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
						target[key] = source[key];
					}
				}
			}return target;
		};
	
		var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
			return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
		} : function (obj) {
			return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
		};
	
		exports.default = function (reducers) {
			if ((typeof reducers === 'undefined' ? 'undefined' : _typeof(reducers)) !== 'object') {
				throw "Reactuate reducers should be an object (and not a function)";
			}
			return (0, _redux.combineReducers)(_extends({ router: _reduxRouter.routerStateReducer }, reducers));
		};
	
		var _redux = __webpack_require__(8);
	
		var _reduxRouter = __webpack_require__(9);
	
		/***/
	},
	/* 12 */
	/***/function (module, exports) {
	
		module.exports = __webpack_require__(14);
	
		/***/
	},
	/* 13 */
	/***/function (module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.default = createRouter;
	
		var _react = __webpack_require__(14);
	
		var _react2 = _interopRequireDefault(_react);
	
		var _reduxRouter = __webpack_require__(9);
	
		var _reactRedux = __webpack_require__(15);
	
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}
	
		function createRouter(store, routes) {
			return _react2.default.createElement(_reactRedux.Provider, { store: store }, _react2.default.createElement(_reduxRouter.ReduxRouter, null, routes));
		}
	
		/***/
	},
	/* 14 */
	/***/function (module, exports) {
	
		module.exports = __webpack_require__(15);
	
		/***/
	},
	/* 15 */
	/***/function (module, exports) {
	
		module.exports = __webpack_require__(16);
	
		/***/
	},
	/* 16 */
	/***/function (module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.swapRouteComponentForContainer = swapRouteComponentForContainer;
		exports.default = domainRouteGenerator;
	
		var _react = __webpack_require__(14);
	
		var _react2 = _interopRequireDefault(_react);
	
		var _reactRouter = __webpack_require__(17);
	
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}
	
		function filterDomainsForType(domains, type) {
			return Object.keys(domains).map(function (k) {
				return domains[k];
			}).filter(function (domain) {
				return Object.keys(domain.get(type)).length;
			});
		}
	
		function route(domain) {
			return domain.get('route').route || _react2.default.createElement(_reactRouter.Route, { path: '/', component: domain.get('route').component });
		}
	
		function extractRootRoute(domains) {
			return filterDomainsForType(domains, 'route').filter(function (domain) {
				return domain.get('route').path == '/';
			}).map(route)[0];
		}
	
		function findContainerizedRoutes(domains) {
			return filterDomainsForType(domains, 'route').map(function (d) {
				return d.get('route');
			}).filter(function (route) {
				return route.isContainer;
			});
		}
	
		function swapRouteComponentForContainer(_ref) {
			var route = _ref.route;
			var domainRoutes = _ref.domainRoutes;
	
			var match = domainRoutes.filter(function (r) {
				return r.original == route.props.component;
			})[0];
			return _react2.default.cloneElement(route, match ? {
				component: match.component,
				key: route.props.key || route.props.path
			} : { key: route.props.key || route.props.path }, route.props.children ? route.props.children.map(function (route) {
				return swapRouteComponentForContainer({ route: route, domainRoutes: domainRoutes });
			}) : undefined);
		}
	
		function swapContainersIntoRoutes(route, domains) {
			return swapRouteComponentForContainer({
				route: route,
				domainRoutes: findContainerizedRoutes(domains)
			});
		}
	
		function domainRouteGenerator(domains) {
			return swapContainersIntoRoutes(extractRootRoute(domains), domains);
		}
	
		/***/
	},
	/* 17 */
	/***/function (module, exports) {
	
		module.exports = __webpack_require__(17);
	
		/***/
	},
	/* 18 */
	/***/function (module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.domainReduxConnector = domainReduxConnector;
		exports.connectDomainRoutes = connectDomainRoutes;
		exports.expandReduxDomain = expandReduxDomain;
		exports.default = expandReduxDomains;
	
		var _redux = __webpack_require__(8);
	
		var _reactRedux = __webpack_require__(15);
	
		var _dataFlow = __webpack_require__(19);
	
		function _defineProperty(obj, key, value) {
			if (key in obj) {
				Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
			} else {
				obj[key] = value;
			}return obj;
		}
	
		function domainReduxConnector(domain) {
			if (!(domain.get('actions') && Object.keys(domain.get('actions')).length)) domain = (0, _dataFlow.unpackDataFlowsIntoDomain)(domain);
			return (0, _reactRedux.connect)(function (state) {
				return _defineProperty({}, domain.prefix, state[domain.prefix]);
			}, function (dispatch) {
				return {
					actions: (0, _redux.bindActionCreators)(domain.get('actions'), dispatch)
				};
			})(domain.get('route').component);
		}
	
		function connectDomainRoutes(domain) {
			if (!(domain.get('actions') && Object.keys(domain.get('actions')).length)) {
				domain = (0, _dataFlow.unpackDataFlowsIntoDomain)(domain);
			}
			domain.register('route', 'original', domain.get('route').component);
			domain.register('route', 'component', domainReduxConnector(domain));
			domain.register('route', 'isContainer', true);
			return domain;
		}
	
		function expandReduxDomain(domain) {
			var dataFlows = domain.get('dataFlows');
			var component = domain.get('route').component;
			if (Object.keys(dataFlows).length && component) {
				domain = connectDomainRoutes(domain);
			}
			return domain;
		}
	
		function expandReduxDomains(domains) {
			return Object.keys(domains).reduce(function (newDomains, k) {
				newDomains[k] = expandReduxDomain(domains[k]);
				return newDomains;
			}, {});
		}
	
		/***/
	},
	/* 19 */
	/***/function (module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.unpackDataFlowsIntoDomain = unpackDataFlowsIntoDomain;
		exports.default = unpackDataFlowsIntoDomains;
	
		var _createReducer = __webpack_require__(20);
	
		var _createReducer2 = _interopRequireDefault(_createReducer);
	
		var _createAction = __webpack_require__(22);
	
		var _createAction2 = _interopRequireDefault(_createAction);
	
		var _strictduck = __webpack_require__(5);
	
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}
	
		function nameActionCreator(_ref) {
			var name = _ref.name;
	
			return name.toLowerCase().replace(/_([a-z])/g, function (g) {
				return g[1].toUpperCase();
			});
		}
	
		function actionType(_ref2) {
			var prefix = _ref2.prefix;
			var name = _ref2.name;
	
			return '@@' + prefix + '/' + name;
		}
	
		function flowToAction(prefix, name) {
			return _strictduck.utils.nameObj({
				name: nameActionCreator({ prefix: prefix, name: name }),
				object: function object(payload) {
					return {
						type: actionType({ prefix: prefix, name: name }),
						payload: payload
					};
				}
			});
		}
	
		function flowToReducer(prefix, name, reducerCase) {
			return function (state, _ref3) {
				var type = _ref3.type;
				var payload = _ref3.payload;
				return type === actionType({ prefix: prefix, name: name }) ? reducerCase(state, payload) : state;
			};
		}
	
		function mergeReducers(initialState, reducers) {
			return function () {
				var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
				var action = arguments[1];
				return reducers.reduce(function (state, reducer) {
					return reducer(state, action);
				}, state);
			};
		}
	
		function unpackDataFlowsIntoDomain(domain) {
			var dataFlows = domain.get('dataFlows');
			var prefix = domain.prefix;
			if (dataFlows && Object.keys(dataFlows).length) {
				Object.keys(dataFlows).forEach(function (name) {
					domain.register('actions', nameActionCreator({ prefix: prefix, name: name }), flowToAction(prefix, name));
				});
				domain.reducer = mergeReducers(domain.initialState || [], Object.keys(dataFlows).map(function (name) {
					return flowToReducer(prefix, name, dataFlows[name]);
				}));
			}
			return domain;
		}
	
		function unpackDataFlowsIntoDomains(domains) {
			return Object.keys(domains).reduce(function (newDomains, k) {
				newDomains[k] = unpackDataFlowsIntoDomains(domains[k]);
				return newDomains;
			}, {});
		}
	
		/***/
	},
	/* 20 */
	/***/function (module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
	
		exports.default = function (domain, initialState) {
			for (var _len = arguments.length, cases = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
				cases[_key - 2] = arguments[_key];
			}
	
			var reducer = function reducer() {
				var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
				var action = arguments[1];
	
				var typedAction = action;
				if (action['type'] === '@@reactuate/action') {
					var actionCreator = domain.get('actions')[domain.withoutPrefix(action.payload.type)];
					if (!_tcomb2.default.Nil.is(actionCreator)) {
						typedAction = actionCreator(action.payload.payload, action.payload.error, action.payload.meta);
					}
				}
				Object.freeze(state);
				var stateCases = cases.map(function (f) {
					if (typeof f === 'function' && typeof f.meta === 'undefined') {
						return function (handler) {
							return f(state, handler);
						};
					} else {
						return f;
					}
				});
				return _tcomb2.default.match.apply(_tcomb2.default, [typedAction].concat(_toConsumableArray(stateCases), [_tcomb2.default.Any, function () {
					return state;
				}]));
			};
			domain.reducer = reducer;
			return reducer;
		};
	
		var _tcomb = __webpack_require__(21);
	
		var _tcomb2 = _interopRequireDefault(_tcomb);
	
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}
	
		function _toConsumableArray(arr) {
			if (Array.isArray(arr)) {
				for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
					arr2[i] = arr[i];
				}return arr2;
			} else {
				return Array.from(arr);
			}
		}
	
		/***/
	},
	/* 21 */
	/***/function (module, exports) {
	
		module.exports = __webpack_require__(18);
	
		/***/
	},
	/* 22 */
	/***/function (module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
	
		exports.default = function (domain, action) {
			var payload = arguments.length <= 2 || arguments[2] === undefined ? _tcomb2.default.Any : arguments[2];
			var defaultValue = arguments.length <= 3 || arguments[3] === undefined ? undefined : arguments[3];
			var meta = arguments.length <= 4 || arguments[4] === undefined ? _tcomb2.default.Any : arguments[4];
	
			var actionString = domain.withPrefix(action);
			function ActionCreator() {
				var value = arguments.length <= 0 || arguments[0] === undefined ? defaultValue : arguments[0];
				var error = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
				var metaValue = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];
				var path = arguments.length <= 3 || arguments[3] === undefined ? [payload.displayName] : arguments[3];
	
				if (ActionCreator.is(value)) {
					return value;
				}
	
				value = payload(value);
	
				if (typeof metaValue !== 'undefined') {
					metaValue = meta(metaValue);
				}
	
				if (!(this instanceof ActionCreator)) {
					return new ActionCreator(value, error, metaValue, path);
				}
	
				this.type = actionString;
				this.payload = value;
	
				if (!!error) {
					this.error = true;
				}
	
				if (typeof metaValue !== 'undefined') {
					this.meta = metaValue;
				}
	
				if (process.env.NODE_ENV !== 'production') {
					Object.freeze(this);
				}
			}
	
			ActionCreator.meta = {
				kind: 'actionCreator',
				payload: payload,
				name: actionString,
				identity: false
			};
	
			ActionCreator.displayName = 'Action ' + actionString + '(' + payload.displayName + ')';
			ActionCreator.actionCreator = true;
			ActionCreator.action = action;
	
			ActionCreator.is = function (x) {
				return x instanceof ActionCreator;
			};
	
			domain.register('actions', action, ActionCreator);
			return ActionCreator;
		};
	
		var _tcomb = __webpack_require__(21);
	
		var _tcomb2 = _interopRequireDefault(_tcomb);
	
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}
	
		/***/
	},
	/* 23 */
	/***/function (module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.default = serverDomain;
	
		var _webpack = __webpack_require__(24);
	
		var _webpack2 = _interopRequireDefault(_webpack);
	
		var _path = __webpack_require__(25);
	
		var _path2 = _interopRequireDefault(_path);
	
		var _webpackDevMiddleware = __webpack_require__(26);
	
		var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);
	
		var _webpackHotMiddleware = __webpack_require__(27);
	
		var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);
	
		var _express = __webpack_require__(28);
	
		var _express2 = _interopRequireDefault(_express);
	
		var _webpackConfig = __webpack_require__(29);
	
		var _webpackConfig2 = _interopRequireDefault(_webpackConfig);
	
		var _strictduckDomainDrivenFullstack = __webpack_require__(6);
	
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}
	
		function serverDomain() {
			var compiler = (0, _webpack2.default)(_webpackConfig2.default);
			return new _strictduckDomainDrivenFullstack.Domain.implementation({
				name: '',
				middleware: true ? [(0, _webpackDevMiddleware2.default)(compiler, { noInfo: true, publicPath: _webpackConfig2.default.output.publicPath }), (0, _webpackHotMiddleware2.default)(compiler), _express2.default.static('static')] : [_express2.default.static('static')],
				routes: {
					'*': {
						methods: ['get'],
						handlers: [function (req, res, next) {
							return res.sendFile(_path2.default.join(process.cwd(), 'index.html'));
						}]
					}
				}
			});
		}
	
		/***/
	},
	/* 24 */
	/***/function (module, exports) {
	
		module.exports = __webpack_require__(19);
	
		/***/
	},
	/* 25 */
	/***/function (module, exports) {
	
		module.exports = __webpack_require__(20);
	
		/***/
	},
	/* 26 */
	/***/function (module, exports) {
	
		module.exports = __webpack_require__(21);
	
		/***/
	},
	/* 27 */
	/***/function (module, exports) {
	
		module.exports = __webpack_require__(22);
	
		/***/
	},
	/* 28 */
	/***/function (module, exports) {
	
		module.exports = __webpack_require__(23);
	
		/***/
	},
	/* 29 */
	/***/function (module, exports, __webpack_require__) {
	
		'use strict';
	
		var path = __webpack_require__(25);
		var webpack = __webpack_require__(24);
	
		module.exports = {
			devtool: 'source-map',
			context: process.cwd(),
			debug: true,
			entry: ['webpack-hot-middleware/client', './src/index'],
			output: {
				path: path.join(process.cwd(), "dist"),
				filename: 'bundle.js',
				publicPath: '/static/'
			},
			plugins: [new webpack.DefinePlugin({ $ES: { CONTEXT: JSON.stringify('BROWSER'), ENV: JSON.stringify('PRODUCTION') } }), new webpack.optimize.OccurenceOrderPlugin(), new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin()],
			module: {
				loaders: [{
					test: /\.js$|\.jsx$/,
					loaders: ["babel?presets[]=es2015&presets[]=stage-0&presets[]=react"],
					exclude: /node_modules/,
					include: [process.cwd()]
				}, {
					test: /\.json$/, loader: 'json'
				}, {
					test: /\.css$/, loader: 'style!css!postcss'
				}, {
					test: /\.less$/, loader: 'style!css!less'
				}, {
					test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&' + "includePaths[]=" + path.resolve(process.cwd(), "./node_modules")
				}, {
					test: /\.woff(2)?(\?.+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"
				}, {
					test: /\.ttf(\?.+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"
				}, {
					test: /\.eot(\?.+)?$/, loader: "file"
				}, {
					test: /\.svg(\?.+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"
				}, {
					test: /\.png$/, loader: "url-loader?limit=100000"
				}, {
					test: /\.jpg$/, loader: "file-loader"
				}]
			},
			resolve: {
				modulesDirectories: ["src", "node_modules", "web_modules"],
				extensions: ["", ".json", ".js", ".jsx"],
				fallback: path.join(process.cwd(), "node_modules"),
				alias: {
					react: path.join(process.cwd(), './node_modules/react')
				}
			},
			resolveLoader: { fallback: path.join(process.cwd(), "node_modules") },
			node: {
				__dirname: true,
				fs: 'empty'
			}
		};
	
		/***/
	}
	/******/]);
	//# sourceMappingURL=node_development.js.map

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("source-map-support");

/***/ },
/* 9 */
/***/ function(module, exports) {

	function webpackContext(req) {
		throw new Error("Cannot find module '" + req + "'.");
	}
	webpackContext.keys = function() { return []; };
	webpackContext.resolve = webpackContext;
	module.exports = webpackContext;
	webpackContext.id = 9;


/***/ },
/* 10 */
/***/ function(module, exports) {

	function webpackContext(req) {
		throw new Error("Cannot find module '" + req + "'.");
	}
	webpackContext.keys = function() { return []; };
	webpackContext.resolve = webpackContext;
	module.exports = webpackContext;
	webpackContext.id = 10;


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("strictduck");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("redux-router");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("history/lib/createMemoryHistory");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("tcomb");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("webpack-dev-middleware");

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("webpack-hot-middleware");

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("domain-driven-express/dist/for/node");

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("domain-driven-pouchdb-persistence-plugin/dist/for/node");

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.default = settings;
	
	var _strictduckDomainDrivenFullstack = __webpack_require__(5);
	
	function flattenForContext(obj, key) {
	    var contexts = arguments.length <= 2 || arguments[2] === undefined ? ['server', 'client'] : arguments[2];
	
	    obj = Object.assign(obj, obj[key] || {});
	    return Object.keys(obj).filter(function (k) {
	        return contexts.indexOf(k) < 0;
	    }).reduce(function (resp, k) {
	        resp[k] = !Array.isArray(obj[k]) && _typeof(obj[k]) == 'object' ? flattenForContext(obj[k], key, contexts) : obj[k];
	        return resp;
	    }, {});
	}
	
	function settings(configuration) {
	    var contextMap = arguments.length <= 1 || arguments[1] === undefined ? { NODE: 'server', BROWSER: 'client' } : arguments[1];
	
	    return new _strictduckDomainDrivenFullstack.Domain.implementation(_extends({
	        name: 'settings'
	    }, flattenForContext(configuration, contextMap[("NODE")])));
	}

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("domain-driven-pouchdb-persistence-plugin");

/***/ }
/******/ ]);
//# sourceMappingURL=node_development.js.map