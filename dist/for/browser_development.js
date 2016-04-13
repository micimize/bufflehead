require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "02b99926ae5ab20c0bd4"; // eslint-disable-line no-unused-vars
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
/******/ ((function(modules) {
	// Check all modules for deduplicated modules
	for(var i in modules) {
		if(Object.prototype.hasOwnProperty.call(modules, i)) {
			switch(typeof modules[i]) {
			case "function": break;
			case "object":
				// Module can be created from a template
				modules[i] = (function(_m) {
					var args = _m.slice(1), fn = modules[_m[0]];
					return function (a,b,c) {
						fn.apply(this, [a,b,c].concat(args));
					};
				}(modules[i]));
				break;
			default:
				// Module is a copy of another module
				modules[i] = modules[modules[i]];
				break;
			}
		}
	}
	return modules;
}([
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
	
	var _settings2 = __webpack_require__(27);
	
	var _settings3 = _interopRequireDefault(_settings2);
	
	var _strictduckDomainDrivenFullstack = __webpack_require__(5);
	
	var _polypackDomainDrivenPouchdbPersistencePlugin = __webpack_require__(20);
	
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _strictduckDomainDrivenFullstack = __webpack_require__(5);
	
	var _strictduckDomainDrivenFullstack2 = _interopRequireDefault(_strictduckDomainDrivenFullstack);
	
	var _polypackDomainDrivenExpress = __webpack_require__(6);
	
	var _polypackDomainDrivenExpress2 = _interopRequireDefault(_polypackDomainDrivenExpress);
	
	var _polypackDomainDrivenReduxReact = __webpack_require__(9);
	
	var _polypackDomainDrivenReduxReact2 = _interopRequireDefault(_polypackDomainDrivenReduxReact);
	
	var _polypackDomainDrivenPouchdbPersistencePlugin = __webpack_require__(20);
	
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
	        var context = _ref$context === undefined ? ("BROWSER") : _ref$context;
	
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
[28, 7],
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	__webpack_require__(8).install();
	module.exports =
	/******/function (modules) {
		// webpackBootstrap
		/******/var parentHotUpdateCallback = this["webpackHotUpdate"];
		/******/this["webpackHotUpdate"] =
		/******/function webpackHotUpdateCallback(chunkId, moreModules) {
			// eslint-disable-line no-unused-vars
			/******/hotAddUpdateChunk(chunkId, moreModules);
			/******/if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
			/******/
		};
		/******/
		/******/function hotDownloadUpdateChunk(chunkId) {
			// eslint-disable-line no-unused-vars
			/******/var head = document.getElementsByTagName("head")[0];
			/******/var script = document.createElement("script");
			/******/script.type = "text/javascript";
			/******/script.charset = "utf-8";
			/******/script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
			/******/head.appendChild(script);
			/******/
		}
		/******/
		/******/function hotDownloadManifest(callback) {
			// eslint-disable-line no-unused-vars
			/******/if (typeof XMLHttpRequest === "undefined")
				/******/return callback(new Error("No browser support"));
			/******/try {
				/******/var request = new XMLHttpRequest();
				/******/var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
				/******/request.open("GET", requestPath, true);
				/******/request.timeout = 10000;
				/******/request.send(null);
				/******/
			} catch (err) {
				/******/return callback(err);
				/******/
			}
			/******/request.onreadystatechange = function () {
				/******/if (request.readyState !== 4) return;
				/******/if (request.status === 0) {
					/******/ // timeout
					/******/callback(new Error("Manifest request to " + requestPath + " timed out."));
					/******/
				} else if (request.status === 404) {
						/******/ // no update available
						/******/callback();
						/******/
					} else if (request.status !== 200 && request.status !== 304) {
							/******/ // other failure
							/******/callback(new Error("Manifest request to " + requestPath + " failed."));
							/******/
						} else {
								/******/ // success
								/******/try {
									/******/var update = JSON.parse(request.responseText);
									/******/
								} catch (e) {
									/******/callback(e);
									/******/return;
									/******/
								}
								/******/callback(null, update);
								/******/
							}
				/******/
			};
			/******/
		}
		/******/
		/******/
		/******/
		/******/var hotApplyOnUpdate = true;
		/******/var hotCurrentHash = "611b7bb037515696fe36"; // eslint-disable-line no-unused-vars
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
							/******/else if ((typeof dep === "undefined" ? "undefined" : _typeof(dep)) === "object")
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
			} else if (options && (typeof options === "undefined" ? "undefined" : _typeof(options)) === "object") {
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
		var server = (false ? require('./server') : __webpack_require__(4)).default;
		exports.default = server;
	
		/***/
	},
	/* 4 */
	/***/function (module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
	
		var _strictduckDomainDrivenFullstack = __webpack_require__(5);
	
		exports.default = _strictduckDomainDrivenFullstack.server.implement({
			name: 'DomainDrivenExpress',
			constructor: function constructor(_ref) {
				var domains = _ref.Domains;
				var _ref$middlewareGenera = _ref.middlewareGenerators;
				var middlewareGenerators = _ref$middlewareGenera === undefined ? [] : _ref$middlewareGenera;
				var _ref$server = _ref.server;
				var server = _ref$server === undefined ? {} : _ref$server;
	
				server._domains = server._domains || {};
				server.generateMiddleware = function (domains) {
					return this;
				};
				server.generateMiddleware.bind(server)(domains);
				server.use = function () {
					return Error("express requires a node context");
				};
				server.listen = function () {
					return Error("express requires a node context");
				};
				return [server];
			},
			provider: function provider() {
				return this;
			}
		});
	
		/***/
	},
	/* 5 */
	/***/function (module, exports) {
	
		module.exports = __webpack_require__(5);
	
		/***/
	}
	/******/]);
	//# sourceMappingURL=browser_development.js.map

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("source-map-support");

/***/ },
/* 9 */
[28, 10],
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	__webpack_require__(8).install();
	module.exports =
	/******/function (modules) {
		// webpackBootstrap
		/******/var parentHotUpdateCallback = this["webpackHotUpdate"];
		/******/this["webpackHotUpdate"] =
		/******/function webpackHotUpdateCallback(chunkId, moreModules) {
			// eslint-disable-line no-unused-vars
			/******/hotAddUpdateChunk(chunkId, moreModules);
			/******/if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
			/******/
		};
		/******/
		/******/function hotDownloadUpdateChunk(chunkId) {
			// eslint-disable-line no-unused-vars
			/******/var head = document.getElementsByTagName("head")[0];
			/******/var script = document.createElement("script");
			/******/script.type = "text/javascript";
			/******/script.charset = "utf-8";
			/******/script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
			/******/head.appendChild(script);
			/******/
		}
		/******/
		/******/function hotDownloadManifest(callback) {
			// eslint-disable-line no-unused-vars
			/******/if (typeof XMLHttpRequest === "undefined")
				/******/return callback(new Error("No browser support"));
			/******/try {
				/******/var request = new XMLHttpRequest();
				/******/var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
				/******/request.open("GET", requestPath, true);
				/******/request.timeout = 10000;
				/******/request.send(null);
				/******/
			} catch (err) {
				/******/return callback(err);
				/******/
			}
			/******/request.onreadystatechange = function () {
				/******/if (request.readyState !== 4) return;
				/******/if (request.status === 0) {
					/******/ // timeout
					/******/callback(new Error("Manifest request to " + requestPath + " timed out."));
					/******/
				} else if (request.status === 404) {
						/******/ // no update available
						/******/callback();
						/******/
					} else if (request.status !== 200 && request.status !== 304) {
							/******/ // other failure
							/******/callback(new Error("Manifest request to " + requestPath + " failed."));
							/******/
						} else {
								/******/ // success
								/******/try {
									/******/var update = JSON.parse(request.responseText);
									/******/
								} catch (e) {
									/******/callback(e);
									/******/return;
									/******/
								}
								/******/callback(null, update);
								/******/
							}
				/******/
			};
			/******/
		}
		/******/
		/******/
		/******/
		/******/var hotApplyOnUpdate = true;
		/******/var hotCurrentHash = "59fb8adb1730dcdd56df"; // eslint-disable-line no-unused-vars
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
	
		var _provider = (false ? console.log('wat') || require('./provideServerDomain') : __webpack_require__(24)).default;
	
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
	
		var createHistory = true ? __webpack_require__(12).createHistory : require('history/lib/createMemoryHistory');
	
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
	
		/* WEBPACK VAR INJECTION */(function (process) {
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
			/* WEBPACK VAR INJECTION */
		}).call(exports, __webpack_require__(23));
	
		/***/
	},
	/* 23 */
	/***/function (module, exports) {
	
		// shim for using process in browser
	
		var process = module.exports = {};
		var queue = [];
		var draining = false;
		var currentQueue;
		var queueIndex = -1;
	
		function cleanUpNextTick() {
			draining = false;
			if (currentQueue.length) {
				queue = currentQueue.concat(queue);
			} else {
				queueIndex = -1;
			}
			if (queue.length) {
				drainQueue();
			}
		}
	
		function drainQueue() {
			if (draining) {
				return;
			}
			var timeout = setTimeout(cleanUpNextTick);
			draining = true;
	
			var len = queue.length;
			while (len) {
				currentQueue = queue;
				queue = [];
				while (++queueIndex < len) {
					if (currentQueue) {
						currentQueue[queueIndex].run();
					}
				}
				queueIndex = -1;
				len = queue.length;
			}
			currentQueue = null;
			draining = false;
			clearTimeout(timeout);
		}
	
		process.nextTick = function (fun) {
			var args = new Array(arguments.length - 1);
			if (arguments.length > 1) {
				for (var i = 1; i < arguments.length; i++) {
					args[i - 1] = arguments[i];
				}
			}
			queue.push(new Item(fun, args));
			if (queue.length === 1 && !draining) {
				setTimeout(drainQueue, 0);
			}
		};
	
		// v8 likes predictible objects
		function Item(fun, array) {
			this.fun = fun;
			this.array = array;
		}
		Item.prototype.run = function () {
			this.fun.apply(null, this.array);
		};
		process.title = 'browser';
		process.browser = true;
		process.env = {};
		process.argv = [];
		process.version = ''; // empty string to avoid regexp issues
		process.versions = {};
	
		function noop() {}
	
		process.on = noop;
		process.addListener = noop;
		process.once = noop;
		process.off = noop;
		process.removeListener = noop;
		process.removeAllListeners = noop;
		process.emit = noop;
	
		process.binding = function (name) {
			throw new Error('process.binding is not supported');
		};
	
		process.cwd = function () {
			return '/';
		};
		process.chdir = function (dir) {
			throw new Error('process.chdir is not supported');
		};
		process.umask = function () {
			return 0;
		};
	
		/***/
	},
	/* 24 */
	/***/function (module, exports, __webpack_require__) {
	
		"use strict";
	
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.default = renderClient;
	
		var _reactDom = __webpack_require__(25);
	
		function renderClient() {
			(0, _reactDom.render)(this.router, document.getElementById(this.elementId));
		}
	
		/*
	 import createHistory from 'history/lib/createMemoryHistory';
	 import {Server} from "hapi"
	 import React from "react"
	 import { renderToString } from 'react-dom/server'
	 import Router from "react-router";
	 import Main from "../Main"
	 import url from "url"
	 import nodemailer from "nodemailer"
	 import {routes} from "../Routes";
	 	const defaultTemplate = ({title, client, serverUrl}) => `\
	     <!doctype html>\
	     <html lang="en">\
	         <head>\
	             <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />\
	             <meta charset="UTF-8">\
	             <title>${title}</title>\
	             <link rel="icon" type="image/png" href="/assets/logo2.png" />\
	             <link href='http://fonts.googleapis.com/css?family=Inconsolata' rel='stylesheet' type='text/css'>\
	         </head>\
	         <body>\
	             <div id="react-root">${string}</div>\
	         </body>\
	         <script type="text/javascript" src="${serverUrl}/dist/client.js"></script>\
	     </html>\
	 `
	 	export function render({template = defaultTemplate, client}){
	 server.ext("onPreResponse", (request, reply) => {
	 	if (typeof request.response.statusCode !== "undefined") {
	 		return reply.continue();
	 	}
	 	    try {
	         const history = createHistory()
	         const location = history.createLocation(request.url)
	         let reactString = renderToString(
	             <Main>
	                 <Router location={location} history={history} routes={routes} />
	             </Main>
	         )
	         reply(
	             
	         );
	     } catch(error) {
	         reply(error.stack).type("text/plain").code(500);
	     }
	 });
	 	}
	 */
	
		/***/
	},
	/* 25 */
	/***/function (module, exports) {
	
		module.exports = __webpack_require__(19);
	
		/***/
	}
	/******/]);
	//# sourceMappingURL=browser_development.js.map

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

	module.exports = require("history");

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

	module.exports = require("react-dom");

/***/ },
/* 20 */
[28, 21],
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	__webpack_require__(8).install();
	module.exports =
	/******/function (modules) {
		// webpackBootstrap
		/******/var parentHotUpdateCallback = this["webpackHotUpdate"];
		/******/this["webpackHotUpdate"] =
		/******/function webpackHotUpdateCallback(chunkId, moreModules) {
			// eslint-disable-line no-unused-vars
			/******/hotAddUpdateChunk(chunkId, moreModules);
			/******/if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
			/******/
		};
		/******/
		/******/function hotDownloadUpdateChunk(chunkId) {
			// eslint-disable-line no-unused-vars
			/******/var head = document.getElementsByTagName("head")[0];
			/******/var script = document.createElement("script");
			/******/script.type = "text/javascript";
			/******/script.charset = "utf-8";
			/******/script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
			/******/head.appendChild(script);
			/******/
		}
		/******/
		/******/function hotDownloadManifest(callback) {
			// eslint-disable-line no-unused-vars
			/******/if (typeof XMLHttpRequest === "undefined")
				/******/return callback(new Error("No browser support"));
			/******/try {
				/******/var request = new XMLHttpRequest();
				/******/var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
				/******/request.open("GET", requestPath, true);
				/******/request.timeout = 10000;
				/******/request.send(null);
				/******/
			} catch (err) {
				/******/return callback(err);
				/******/
			}
			/******/request.onreadystatechange = function () {
				/******/if (request.readyState !== 4) return;
				/******/if (request.status === 0) {
					/******/ // timeout
					/******/callback(new Error("Manifest request to " + requestPath + " timed out."));
					/******/
				} else if (request.status === 404) {
						/******/ // no update available
						/******/callback();
						/******/
					} else if (request.status !== 200 && request.status !== 304) {
							/******/ // other failure
							/******/callback(new Error("Manifest request to " + requestPath + " failed."));
							/******/
						} else {
								/******/ // success
								/******/try {
									/******/var update = JSON.parse(request.responseText);
									/******/
								} catch (e) {
									/******/callback(e);
									/******/return;
									/******/
								}
								/******/callback(null, update);
								/******/
							}
				/******/
			};
			/******/
		}
		/******/
		/******/
		/******/
		/******/var hotApplyOnUpdate = true;
		/******/var hotCurrentHash = "bc3d2326b791b670a511"; // eslint-disable-line no-unused-vars
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
							/******/else if ((typeof dep === "undefined" ? "undefined" : _typeof(dep)) === "object")
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
			} else if (options && (typeof options === "undefined" ? "undefined" : _typeof(options)) === "object") {
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
		exports.utils = exports.default = undefined;
	
		var _utils = __webpack_require__(4);
	
		Object.keys(_utils).forEach(function (key) {
			if (key === "default") return;
			Object.defineProperty(exports, key, {
				enumerable: true,
				get: function get() {
					return _utils[key];
				}
			});
		});
	
		var _domainDrivenPouchPersistencePlugin = __webpack_require__(7);
	
		var _domainDrivenPouchPersistencePlugin2 = _interopRequireDefault(_domainDrivenPouchPersistencePlugin);
	
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}
	
		exports.default = _domainDrivenPouchPersistencePlugin2.default;
		var utils = exports.utils = false ? require('./configureServer') : {};
	
		/***/
	},
	/* 4 */
	/***/function (module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.defaultDataFlows = undefined;
	
		var _extends = Object.assign || function (target) {
			for (var i = 1; i < arguments.length; i++) {
				var source = arguments[i];for (var key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
						target[key] = source[key];
					}
				}
			}return target;
		};
	
		exports.requireAuthWithPersister = requireAuthWithPersister;
		exports.requireAuthFromRoute = requireAuthFromRoute;
		exports.provideAuthFromRoute = provideAuthFromRoute;
		exports.authenticateRoutes = authenticateRoutes;
		exports.provideInjectionForDomainRouteHandlers = provideInjectionForDomainRouteHandlers;
		exports.requireInjection = requireInjection;
	
		var _react = __webpack_require__(5);
	
		var _react2 = _interopRequireDefault(_react);
	
		var _dataFlows = __webpack_require__(6);
	
		var _dataFlows2 = _interopRequireDefault(_dataFlows);
	
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}
	
		exports.defaultDataFlows = _dataFlows2.default;
		function requireAuthWithPersister(_ref) {
			var path = _ref.path;
			var persister = _ref.persister;
	
			return function requireAuth(nextState, replace, callback) {
				var redirect = function redirect(_) {
					replace({ nextPathname: nextState.location.pathname }, path);
					callback();
				};
				(persister || this.db).getSession(function (err, response) {
					if (err) {
						console.log(err);
						redirect();
					} else if (!response.userCtx.name) {
						redirect();
					} else {
						callback();
					}
				});
			};
		}
	
		function requireAuthFromRoute(path) {
			return {
				requiresAuthentication: true,
				path: path
			};
		}
	
		function provideAuthFromRoute(component) {
			var placeholder = function placeholder(_) {
				return _;
			};
			Object.assign(placeholder, {
				providesAuthentication: true,
				component: component
			});
			return placeholder;
		}
	
		function authenticateRouteBasedOnOnEnter(_ref2) {
			var route = _ref2.route;
			var persister = _ref2.persister;
	
			return route.props.onEnter && route.props.onEnter.requiresAuthentication ? {
				onEnter: requireAuthWithPersister({ path: route.props.onEnter.path, persister: persister })
			} : {};
		}
	
		function authenticateFromRouteBasedOnComponent(_ref3) {
			var route = _ref3.route;
			var persister = _ref3.persister;
	
			return route.props.component && route.props.component.providesAuthentication ? {
				component: function component(props) {
					return _react2.default.createElement(route.props.component.component, _extends({ auth: persister }, props));
				}
			} : {};
		}
	
		function authenticateRoutes(route, persister) {
			persister = persister || this.db;
			return _react2.default.cloneElement(route, _extends({}, authenticateRouteBasedOnOnEnter({ route: route, persister: persister }), authenticateFromRouteBasedOnComponent({ route: route, persister: persister }), {
				key: route.props.path
			}), route.props.children ? route.props.children.map(function (route) {
				return authenticateRoutes(route, persister);
			}) : undefined);
		}
	
		function provideInjection(dependentFunction, persister) {
			var _this = this;
	
			return function () {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				return dependentFunction.apply(undefined, [persister || _this.db].concat(args));
			};
		}
	
		function provideInjectionToHandlers(route, persister) {
			route.handlers = route.handlers.map(function (handler) {
				return handler.requiresPersister ? provideInjection(handler.dependentFunction, persister) : handler;
			});
			return route;
		}
	
		function expandPersisterBackedDomain(domain, persister) {
			var routes = domain.get('routes');
			Object.keys(domain.get('routes')).map(function (route) {
				return domain.register('routes', route, provideInjectionToHandlers(routes[route], persister));
			});
			return domain;
		}
	
		function provideInjectionForDomainRouteHandlers(domains, persister) {
			persister = persister || this.db;
			return Object.keys(domains).reduce(function (newDomains, k) {
				newDomains[k] = expandPersisterBackedDomain(domains[k], persister);
				return newDomains;
			}, {});
		}
	
		function requireInjection(dependentFunction) {
			return {
				requiresPersister: true,
				dependentFunction: dependentFunction
			};
		}
	
		/***/
	},
	/* 5 */
	/***/function (module, exports) {
	
		module.exports = __webpack_require__(15);
	
		/***/
	},
	/* 6 */
	/***/function (module, exports) {
	
		"use strict";
	
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
	
		function _toConsumableArray(arr) {
			if (Array.isArray(arr)) {
				for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
					arr2[i] = arr[i];
				}return arr2;
			} else {
				return Array.from(arr);
			}
		}
	
		exports.default = {
			INSERT: function INSERT(state, payload) {
				return [payload].concat(_toConsumableArray(state));
			},
			UPDATE: function UPDATE(state, payload) {
				return state.map(function (doc) {
					return doc._id == payload._id ? payload : doc;
				});
			},
			REMOVE: function REMOVE(state, _ref) {
				var _id = _ref._id;
	
				return state.filter(function (doc) {
					return doc._id != _id;
				});
			}
		};
	
		/***/
	},
	/* 7 */
	/***/function (module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
	
		var _strictduckDomainDrivenFullstack = __webpack_require__(8);
	
		var _domainMiddlewareGenerator = __webpack_require__(9);
	
		var _domainMiddlewareGenerator2 = _interopRequireDefault(_domainMiddlewareGenerator);
	
		var _db = __webpack_require__(15);
	
		var _db2 = _interopRequireDefault(_db);
	
		var _utils = __webpack_require__(4);
	
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}
	
		var provide = (false ? require('./configureServer') : __webpack_require__(9)).default;
		var putDb = false ? require('./configureServer').ensureRemoteExistence : function (_) {
			return _;
		};
	
		exports.default = _strictduckDomainDrivenFullstack.storePersistencePlugin.implement({
			name: 'DomainDrivenPouchPersistencePlugin',
			constructor: function constructor(_ref) {
				var db = _ref.Domains.settings.db;
	
				putDb(db);
				return [{
					db: (0, _db2.default)(db),
					middlewareGenerator: _domainMiddlewareGenerator2.default,
					authenticateRoutes: _utils.authenticateRoutes,
					provideAuthFromRoute: _utils.provideAuthFromRoute,
					provideInjectionForDomainRouteHandlers: _utils.provideInjectionForDomainRouteHandlers
				}];
			},
			provider: function provider() {
				return provide.bind(this.db).apply(undefined, arguments);
			}
		});
	
		/***/
	},
	/* 8 */
	/***/function (module, exports) {
	
		module.exports = __webpack_require__(5);
	
		/***/
	},
	/* 9 */
	/***/function (module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.default = domainDrivenReduxMiddleware;
	
		var _redux = __webpack_require__(10);
	
		var _reduxMiddleware = __webpack_require__(11);
	
		var _reduxMiddleware2 = _interopRequireDefault(_reduxMiddleware);
	
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}
	
		function invert(obj) {
			return Object.keys(obj).reduce(function (inversion, key) {
				inversion[obj[key]] = key;
				return inversion;
			}, {});
		}
	
		function dbActions(_ref) {
			var _ref$domain = _ref.domain;
			var _ref$domain$actions = _ref$domain.actions;
			var actions = _ref$domain$actions === undefined ? {} : _ref$domain$actions;
			var _ref$domain$pouchActi = _ref$domain.pouchActionMap;
			var actionMap = _ref$domain$pouchActi === undefined ? { insert: 'insert', update: 'update', remove: 'remove' } : _ref$domain$pouchActi;
	
			var invertedActionMap = invert(actionMap);
			var acts = Object.keys(actions).filter(function (a) {
				return [actionMap.update, actionMap.insert, actionMap.remove].indexOf(a) >= 0;
			}).reduce(function (dbActs, a) {
				dbActs[invertedActionMap[a]] = function (doc) {
					try {
						return actions[a](doc);
					} catch (e) {
						if (e instanceof TypeError) {
							return;
						} else {
							throw e;
						}
					}
				};
				return dbActs;
			}, {});
			return Object.keys(acts).length ? acts : false;
		}
	
		function domainDrivenReduxMiddleware(_ref2) {
			var db = _ref2.db;
			var domains = _ref2.domains;
	
			return (0, _reduxMiddleware2.default)(Object.values(domains).filter(function (domain) {
				return dbActions({ domain: domain });
			}).map(function (domain) {
				return domain;
			}).map(function (domain) {
				return {
					path: '/' + domain.prefix,
					prefix: '' + (domain.dbPrefix || ''),
					db: db,
					actions: dbActions({ domain: domain })
				};
			}));
		}
	
		/***/
	},
	/* 10 */
	/***/function (module, exports) {
	
		module.exports = __webpack_require__(12);
	
		/***/
	},
	/* 11 */
	/***/function (module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
	
		var _createClass = function () {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
				}
			}return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
			};
		}();
	
		var _extends = Object.assign || function (target) {
			for (var i = 1; i < arguments.length; i++) {
				var source = arguments[i];for (var key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
						target[key] = source[key];
					}
				}
			}return target;
		};
	
		exports.default = reduxMiddleware;
	
		var _jsonPath = __webpack_require__(12);
	
		var _jsonPath2 = _interopRequireDefault(_jsonPath);
	
		var _asyncFunctionQueue = __webpack_require__(13);
	
		var _asyncFunctionQueue2 = _interopRequireDefault(_asyncFunctionQueue);
	
		var _deepEqual = __webpack_require__(14);
	
		var _deepEqual2 = _interopRequireDefault(_deepEqual);
	
		var _redux = __webpack_require__(10);
	
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}
	
		function _objectWithoutProperties(obj, keys) {
			var target = {};for (var i in obj) {
				if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
			}return target;
		}
	
		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}
	
		function warn(what) {
			var fn = console.warn || console.log;
			if (fn) {
				fn.call(console, what);
			}
		}
	
		function defaultAction(action) {
			return function () {
				throw new Error('no action provided for ' + action);
			};
		}
	
		var defaultActions = {
			remove: defaultAction('remove'),
			update: defaultAction('update'),
			insert: defaultAction('insert')
		};
	
		function _initFromDb(path) {
			if (!path.lifecycleState) {
				path.lifecycleState = 'INITIALIZING';
				return path.db.allDocs(_extends({
					include_docs: true
				}, path.prefix ? {
					startkey: path.prefix,
					endkey: path.prefix + '￿'
				} : {})).then(function (result) {
					result.rows.forEach(function (row) {
						return onDbChange(path, row);
					});
					path.lifecycleState = 'INITIALIZED';
					listen(path);
				});
			}
		}
	
		function listen(path) {
			var changes = path.db.changes(_extends({
				live: true, since: 'now', include_docs: true
			}, path.prefix ? {
				filter: function filter(_ref) {
					var _id = _ref._id;
					return _id.split('/')[0] == path.prefix;
				}
			} : {}));
			changes.on('change', function (change) {
				return onDbChange(path, change);
			});
		}
	
		function processNewStateForPath(path, state) {
			var docsContainer = _jsonPath2.default.resolve(state, path.path);
	
			/* istanbul ignore else */
			if (docsContainer && docsContainer.length && path.lifecycleState == 'INITIALIZED') {
				docsContainer.forEach(function (docs) {
					var _differences = differences(path.docs, docs);
	
					var updated = _differences.updated;
					var deleted = _differences.deleted;
					var inserted = _differences.inserted;
	
					inserted.concat(updated).forEach(function (doc) {
						return path.insert(doc);
					});
					deleted.forEach(function (doc) {
						return path.remove(doc);
					});
				});
			}
		}
	
		var Path = function () {
			function Path(_ref2) {
				var _ref2$path = _ref2.path;
				var path = _ref2$path === undefined ? '.' : _ref2$path;
				var _ref2$prefix = _ref2.prefix;
				var prefix = _ref2$prefix === undefined ? '' : _ref2$prefix;
				var db = _ref2.db;
				var actions = _ref2.actions;
	
				_classCallCheck(this, Path);
	
				if (!db) {
					throw new Error('path ' + path.path + ' needs a db');
				}
	
				this.queue = (0, _asyncFunctionQueue2.default)(1);
				this.docs = {};
	
				this.db = db;
				this.path = path;
				this.prefix = prefix;
				this.actions = Object.assign({}, defaultActions, actions);
			}
	
			_createClass(Path, [{
				key: 'insert',
				value: function insert(doc) {
					this.docs[doc._id] = doc;
					var db = this.db;
					this.queue.push(function (cb) {
						db.put(doc, cb);
					});
				}
			}, {
				key: 'remove',
				value: function remove(doc) {
					var _this = this;
	
					var db = this.db;
					this.queue.push(function (cb) {
						db.remove(doc, cb);
						delete _this.docs[doc._id];
					});
				}
			}, {
				key: 'wrapActionCreators',
				value: function wrapActionCreators(dispatch) {
					var _this2 = this;
	
					this.propagations = Object.keys(this.actions).reduce(function (propagations, act) {
						propagations[act] = function (doc) {
							var action = _this2.actions[act](doc);
							if (action) dispatch(action);
						};
						return propagations;
					}, {});
				}
			}, {
				key: 'initFromDb',
				value: function initFromDb() {
					var _this3 = this;
	
					_initFromDb(this).catch(function (err) {
						if (err.status == 401) {
							_this3.lifecycleState = false;
							_this3.db.once('login', function (_) {
								return _initFromDb(_this3);
							});
						} else {
							throw err;
						}
					});
				}
			}]);
	
			return Path;
		}();
	
		function differences(oldDocs, newDocs) {
			var inserted = [],
			    updated = [],
			    deleted = Object.keys(oldDocs).map(function (oldDocId) {
				return oldDocs[oldDocId];
			});
	
			newDocs.forEach(function (newDoc) {
				if (!newDoc._id) warn('doc with no id');
	
				deleted = deleted.filter(function (doc) {
					return doc._id !== newDoc._id;
				});
	
				var oldDoc = oldDocs[newDoc._id];
				if (!oldDoc) {
					inserted.push(newDoc);
				} else if (!(0, _deepEqual2.default)(oldDoc, newDoc)) {
					updated.push(newDoc);
				}
			});
			return { inserted: inserted, updated: updated, deleted: deleted };
		}
	
		function onDbChange(path, _ref3) {
			var changeDoc = _ref3.doc;
	
			var change = _objectWithoutProperties(_ref3, ['doc']);
	
			if (changeDoc._deleted) {
				if (path.docs[changeDoc._id]) {
					delete path.docs[changeDoc._id];
					path.propagations.remove(changeDoc);
				}
			} else {
				var oldDoc = path.docs[changeDoc._id];
				path.docs[changeDoc._id] = changeDoc;
				if (oldDoc) {
					path.propagations.update(changeDoc);
				} else {
					path.propagations.insert(changeDoc);
				}
			}
		}
	
		function reduxMiddleware() {
			var paths = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
			if (!Array.isArray(paths)) paths = [paths];
	
			if (!paths.length) throw new Error('PouchMiddleware: no paths');
	
			paths = paths.map(function (options) {
				return new Path(options);
			});
	
			return function (_ref4) {
				var dispatch = _ref4.dispatch;
				var getState = _ref4.getState;
	
				paths.forEach(function (path) {
					path.wrapActionCreators(dispatch);
					path.initFromDb();
				});
				return function (next) {
					return function (action) {
						var nextAction = next(action);
						paths.forEach(function (path) {
							return processNewStateForPath(path, getState());
						});
						return nextAction;
					};
				};
			};
		}
	
		/***/
	},
	/* 12 */
	/***/function (module, exports) {
	
		module.exports = __webpack_require__(22);
	
		/***/
	},
	/* 13 */
	/***/function (module, exports) {
	
		module.exports = __webpack_require__(23);
	
		/***/
	},
	/* 14 */
	/***/function (module, exports) {
	
		module.exports = __webpack_require__(24);
	
		/***/
	},
	/* 15 */
	/***/function (module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.default = db;
	
		var _pouchdb = __webpack_require__(16);
	
		var _pouchdb2 = _interopRequireDefault(_pouchdb);
	
		var _pouchdbAuthentication = __webpack_require__(17);
	
		var _pouchdbAuthentication2 = _interopRequireDefault(_pouchdbAuthentication);
	
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}
	
		_pouchdb2.default.plugin(_pouchdbAuthentication2.default);
	
		function fullUri(_ref) {
			var name = _ref.name;
			var uri = _ref.uri;
	
			return uri + '/' + name;
		}
	
		function db(settings) {
			return new _pouchdb2.default(fullUri(settings), { skipSetup: true });
		}
	
		/***/
	},
	/* 16 */
	/***/function (module, exports) {
	
		module.exports = __webpack_require__(25);
	
		/***/
	},
	/* 17 */
	/***/function (module, exports) {
	
		module.exports = __webpack_require__(26);
	
		/***/
	}
	/******/]);
	//# sourceMappingURL=browser_development.js.map

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("json-path");

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("async-function-queue");

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("deep-equal");

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("pouchdb");

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("pouchdb-authentication");

/***/ },
/* 27 */
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
	    }, flattenForContext(configuration, contextMap[("BROWSER")])));
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__) {

	"use strict";
	
	module.exports = __webpack_require__(__webpack_module_template_argument_0__) //polypacked by dist;

/***/ }
/******/ ])));
//# sourceMappingURL=browser_development.js.map