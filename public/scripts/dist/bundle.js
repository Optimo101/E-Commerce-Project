/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/scripts/dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _views_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./views/base */ \"./src/views/base.js\");\n/* harmony import */ var _views_mainMenuView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./views/mainMenuView */ \"./src/views/mainMenuView.js\");\n/* harmony import */ var _views_submenuView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./views/submenuView */ \"./src/views/submenuView.js\");\n\n\n // ============= ADD IDs to DOM ELEMENTS =============\n\nvar addModClass = function addModClass(nodeList, prefix) {\n  var elementList = nodeList;\n  var num = 1;\n  var _iteratorNormalCompletion = true;\n  var _didIteratorError = false;\n  var _iteratorError = undefined;\n\n  try {\n    for (var _iterator = elementList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n      var item = _step.value;\n      item.classList.add(\"\".concat(prefix, \"--\").concat(num));\n      num++;\n    }\n  } catch (err) {\n    _didIteratorError = true;\n    _iteratorError = err;\n  } finally {\n    try {\n      if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n        _iterator[\"return\"]();\n      }\n    } finally {\n      if (_didIteratorError) {\n        throw _iteratorError;\n      }\n    }\n  }\n\n  ;\n}; // ============= CREATE EVENT LISTENERS FOR... =============\n\n\nvar setUpEventListeners = function setUpEventListeners() {\n  // HEADER NOTICE CLOSE BUTTON\n  _views_base__WEBPACK_IMPORTED_MODULE_0__[\"elements\"].headerNoticeBtn.addEventListener('click', function () {\n    Object(_views_base__WEBPACK_IMPORTED_MODULE_0__[\"hideElement\"])(_views_base__WEBPACK_IMPORTED_MODULE_0__[\"elements\"].headerNotice);\n  }); // OPEN/CLOSE MAIN MENU\n\n  _views_base__WEBPACK_IMPORTED_MODULE_0__[\"elements\"].mainMenuBtn.addEventListener('click', function () {\n    _views_mainMenuView__WEBPACK_IMPORTED_MODULE_1__[\"toggleDropdown\"](_views_base__WEBPACK_IMPORTED_MODULE_0__[\"elements\"].mainMenuDropdown);\n  }); // CLOSE MAIN MENU WHEN CLICK ANYWHERE OUTSIDE OF MAIN MENU\n\n  document.addEventListener('click', function (event) {\n    _views_mainMenuView__WEBPACK_IMPORTED_MODULE_1__[\"hideOnClickOutside\"](event, _views_base__WEBPACK_IMPORTED_MODULE_0__[\"elements\"].mainMenuDropdown);\n  });\n}; // OPEN/CLOSE SUBMENU\n\n\nvar setUpSubmenusEvent = function setUpSubmenusEvent(eventType, method) {\n  var _loop = function _loop(i) {\n    document.querySelector(\".main-menu__item--\".concat(i)).addEventListener(eventType, function () {\n      if (document.querySelector(\".submenu--\".concat(i))) {\n        method(document.querySelector(\".submenu--\".concat(i)));\n      }\n\n      ;\n    });\n  };\n\n  for (var i = 1; i < _views_base__WEBPACK_IMPORTED_MODULE_0__[\"elements\"].mainMenuItems.length; i++) {\n    _loop(i);\n  }\n\n  ;\n};\n\nvar init = function init() {\n  addModClass(_views_base__WEBPACK_IMPORTED_MODULE_0__[\"elements\"].mainMenuItems, 'main-menu__item');\n  addModClass(_views_base__WEBPACK_IMPORTED_MODULE_0__[\"elements\"].submenuItems, 'submenu');\n  setUpEventListeners();\n  setUpSubmenusEvent('mouseover', _views_submenuView__WEBPACK_IMPORTED_MODULE_2__[\"showSubMenu\"]);\n  setUpSubmenusEvent('mouseleave', _views_submenuView__WEBPACK_IMPORTED_MODULE_2__[\"hideSubMenu\"]);\n};\n\ninit();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/views/base.js":
/*!***************************!*\
  !*** ./src/views/base.js ***!
  \***************************/
/*! exports provided: elements, hideElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"elements\", function() { return elements; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hideElement\", function() { return hideElement; });\nvar elements = {\n  headerNotice: document.querySelector('.header-notice'),\n  headerNoticeBtn: document.querySelector('.header-notice__close-icon'),\n  mainMenuBtn: document.querySelector('.main-menu__btn'),\n  mainMenuDropdown: document.querySelector('.main-menu__dropdown'),\n  shadowOverlay: document.querySelector('.shadow-overlay'),\n  mainMenuItems: document.querySelectorAll('.main-menu__item'),\n  submenuItems: document.querySelectorAll('.submenu')\n}; // ============== SIMPLE HIDE ELEMENT FUNCTION ==============\n\nvar hideElement = function hideElement(element) {\n  element.style.display = 'none';\n};\n\n//# sourceURL=webpack:///./src/views/base.js?");

/***/ }),

/***/ "./src/views/mainMenuView.js":
/*!***********************************!*\
  !*** ./src/views/mainMenuView.js ***!
  \***********************************/
/*! exports provided: showDropdown, hideDropdown, toggleDropdown, hideOnClickOutside */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"showDropdown\", function() { return showDropdown; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hideDropdown\", function() { return hideDropdown; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toggleDropdown\", function() { return toggleDropdown; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hideOnClickOutside\", function() { return hideOnClickOutside; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./src/views/base.js\");\n // ============== MAINMENU FUNCTIONS ==============\n\nvar showDropdown = function showDropdown(element) {\n  // Gets the natural height of an element\n  var getHeight = function getHeight() {\n    element.style.display = 'block'; // Make it visible\n\n    var height = element.scrollHeight + 'px'; // Get height\n\n    element.style.display = '';\n    return height;\n  };\n\n  var height = getHeight(); // Gets natural height\n\n  element.classList.add('is-visible'); // Make element visible\n\n  element.style.height = height; // Update the max-height\n\n  _base__WEBPACK_IMPORTED_MODULE_0__[\"elements\"].shadowOverlay.style.display = 'block'; // show background overlay\n  // Once transition is complete, remove the inline max-height so content can scale responsively.\n\n  window.setTimeout(function () {\n    element.style.height = '';\n    element.style.overflow = 'visible'; // Show overflow for submenus\n  }, 250);\n};\nvar hideDropdown = function hideDropdown(element) {\n  // Give element a height to change from as 'auto' (from 'is-visible' class) does not work\n  element.style.height = element.scrollHeight + 'px'; // Set height back to 0 and overflow to hidden\n\n  window.setTimeout(function () {\n    element.style.height = '0';\n    element.style.overflow = 'hidden';\n  }, 1); // When transition is complete, hide it\n\n  window.setTimeout(function () {\n    element.classList.remove('is-visible');\n    _base__WEBPACK_IMPORTED_MODULE_0__[\"elements\"].shadowOverlay.style.display = 'none';\n  }, 250);\n};\nvar toggleDropdown = function toggleDropdown(element) {\n  // If menu is visible, hide it\n  if (element.classList.contains('is-visible')) {\n    hideDropdown(element);\n    return;\n  } //Otherwise, show it\n\n\n  showDropdown(element);\n};\nvar hideOnClickOutside = function hideOnClickOutside(event, element) {\n  if (element.classList.contains('is-visible') && event.target.closest('.main-menu__btn') === null && event.target.closest('.main-menu__dropdown') === null) {\n    hideDropdown(element);\n  }\n};\n\n//# sourceURL=webpack:///./src/views/mainMenuView.js?");

/***/ }),

/***/ "./src/views/submenuView.js":
/*!**********************************!*\
  !*** ./src/views/submenuView.js ***!
  \**********************************/
/*! exports provided: showSubMenu, hideSubMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"showSubMenu\", function() { return showSubMenu; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hideSubMenu\", function() { return hideSubMenu; });\n// ============== SUBMENU FUNCTIONS ==============\nvar showSubMenu = function showSubMenu(element) {\n  // Gets the natural height of an element\n  var getHeight = function getHeight() {\n    element.style.display = 'block'; // Make it visible\n\n    var height = element.scrollHeight + 'px'; // Get height\n\n    return height;\n  };\n\n  element.style.display = 'block';\n  element.style.height = getHeight();\n  element.style.opacity = 1;\n};\nvar hideSubMenu = function hideSubMenu(element) {\n  element.style.height = '0';\n  element.style.opacity = '0';\n  window.setTimeout(function () {\n    element.style.display = 'none';\n  }, 250);\n};\n\n//# sourceURL=webpack:///./src/views/submenuView.js?");

/***/ })

/******/ });