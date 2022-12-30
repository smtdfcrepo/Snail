/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["snail"] = factory();
	else
		root["snail"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/binding.js":
/*!********************************!*\
  !*** ./src/scripts/binding.js ***!
  \********************************/
/***/ (() => {

eval("\nwindow.snail_model = {}\n\nfunction getValue(element) {\n  if (element instanceof HTMLInputElement && (element.type == \"checkbox\" || element.type == \"radio\")) {\n    let state = element.checked\n    return state\n  } else {\n    return element.value\n  }\n}\n\nfunction setModel(name, value, ele) {\n  window.snail_model[name] = value\n  document.querySelectorAll(`[data-bind-value=\"${name}\"],[data-bind-checked=\"${name}\"],[data-bind-disabled=\"${name}\"]`).forEach(element => {\n    if (ele !== element) {\n      if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement) {\n        if ((element.type == \"checkbox\" || element.type == \"radio\")) {\n          if (element.dataset.bindChecked) {\n            element.checked = value\n          }\n        } else {\n          if (element.dataset.bindValue) {\n            element.value = value\n          }\n          if (element.dataset.bindDisabled) {\n            element.disabled = value\n          }\n        }\n      }\n    }\n  })\n}\n\nwindow.addEventListener(\"change\",function(e){\n  let target = e.target\n  let hasBind = target.dataset.bind == \"true\"\n  if (hasBind) {\n    if (target instanceof HTMLSelectElement) {\n      let model = target.dataset.bindChecked\n      let newVal = getValue(target)\n      setModel(model, newVal)\n    } \n  }\n})\n\nwindow.addEventListener(\"input\", function(e) {\n  let target = e.target\n  let hasBind = target.dataset.bind == \"true\"\n  if (hasBind) {\n    if (target instanceof HTMLInputElement && (target.type == \"checkbox\" || target.type == \"radio\")) {\n      let model = target.dataset.bindChecked\n      let newVal = getValue(target)\n      setModel(model, newVal)\n    } else {\n      let model = target.dataset.bindValue\n      let newVal = getValue(target)\n      setModel(model, newVal)\n    }\n  }\n})\n\n//# sourceURL=webpack://snail/./src/scripts/binding.js?");

/***/ }),

/***/ "./src/scripts/component.js":
/*!**********************************!*\
  !*** ./src/scripts/component.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SnailComponent\": () => (/* binding */ SnailComponent),\n/* harmony export */   \"registerComponent\": () => (/* binding */ registerComponent)\n/* harmony export */ });\nclass SnailComponent extends HTMLElement {\n  constructor() {\n    super()\n    this.data = {}\n    this.renderDependent = null\n  }\n  getState() {\n    return this.data\n  }\n  setState(name, value) {\n    if (this.renderDependent == null) {\n      this.data[name] = value\n      this.renderHTML(this.render())\n      this.afterRender()\n    } else {\n      this.data[name] = value\n      if (this.renderDependent.includes(name)) {\n        this.renderHTML(this.render())\n        this.afterRender()\n      }\n    }\n  }\n  onMount() {}\n  onUnMount() {}\n  afterRender() {}\n  render() { return \"\" }\n  renderHTML(html) {\n    if (html == undefined)\n      html = ''\n    this.innerHTML = html\n\n  }\n  connectedCallback() {\n    this.onMount()\n    this.renderHTML(this.render())\n    this.afterRender()\n  }\n  disconnectedCallback() {\n    this.onUnMount()\n  }\n}\n\nfunction registerComponent(name, component) {\n  window.customElements.define(name, component)\n}\n\n//# sourceURL=webpack://snail/./src/scripts/component.js?");

/***/ }),

/***/ "./src/scripts/element.js":
/*!********************************!*\
  !*** ./src/scripts/element.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SnailListAttr\": () => (/* binding */ SnailListAttr),\n/* harmony export */   \"SnailListElement\": () => (/* binding */ SnailListElement),\n/* harmony export */   \"SnailElement\": () => (/* binding */ SnailElement),\n/* harmony export */   \"createElement\": () => (/* binding */ createElement),\n/* harmony export */   \"appendElement\": () => (/* binding */ appendElement)\n/* harmony export */ });\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"./src/scripts/utils.js\");\n\n\n\n\nfunction generateElement(element) {\n  if (element == null || element == undefined) {\n    return null\n  } else {\n    return new SnailElement(element)\n  }\n}\n\n\nclass SnailListAttr {\n  constructor(owner, attr) {\n    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.checkType)([owner,attr], [SnailElement, NamedNodeMap])\n    this.attr = attr\n    this.owner = owner\n  }\n\n  index(idx) {\n    return generateElement(this.attr.item(idx))\n  }\n\n  get(name) {\n    let result = this.attr.getNamedItem(name)\n    if (result == null) {\n      return null\n    } else {\n      return result.value\n    }\n  }\n\n  set(name, value) {\n    let attr = document.createAttribute(name)\n    attr.value = value\n    this.attr.setNamedItem(attr)\n  }\n  \n  remove(name){\n    this.attr.removeNamedItem(name)\n  }\n}\n\nclass SnailListElement {\n  constructor(elements, parent = null) {\n   (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.checkType)([elements],[[HTMLCollection,NodeList]])\n    this.elements = elements\n    this.parent = parent\n\n  }\n  index(idx) {\n    return generateElement(this.elements.item(idx))\n  }\n  get first() {\n    return generateElement(this.elements.item(0))\n  }\n  get last() {\n    return generateElement(this.elements.item(this.elements.length - 1))\n  }\n  each(callback){\n    //console.log(this.elements.length);\n    this.elements.forEach(element=>{\n      \n      callback(generateElement(element))\n    })\n  }\n}\n\n\n\nclass SnailElement {\n  constructor(dom) {\n    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.checkType)([dom], [HTMLElement])\n    this.dom = dom\n  }\n  hide() {\n    this.dom.hidden = \"hidden\"\n  }\n  show() {\n    this.dom.hidden = \"\"\n  }\n  get style() {\n    return this.dom.style\n  }\n  set val(value) {\n    this.dom.value = value\n  }\n  get val() {\n    return this.dom.value\n  }\n  set HTML(html) {\n    this.dom.innerHTML = html\n  }\n  get HTML() {\n    return this.dom.innerHTML\n  }\n  set text(t) {\n    this.dom.textContent = t\n  }\n  get text() {\n    return this.dom.textContent\n  }\n  get attr() {\n    return new SnailListAttr(this, this.dom.attributes)\n  }\n  get child() {\n    return new SnailListElement(this.dom.children);\n  }\n  computedStyle(pseudo_element = undefined ){\n    return getComputedStyle(this.dom,pseudo_element)\n  }\n  \n  select(query, idx = 0, virtual = false) {\n    let result = this.dom.querySelectorAll(query)[idx]\n    if (virtual) {\n      result = new SnailElement(result || document.createElement(\"div\"))\n    } else {\n      result = new SnailElement(result)\n    }\n    return result\n  }\n  selectAll(query){\n    //console.log(this.dom.querySelectorAll(query));\n    return new SnailListElement(this.dom.querySelectorAll(query))\n  }\n  get classList(){\n    return this.dom.classList\n  }\n}\n\nfunction createElement(name){\n  return new SnailElement(document.createElement(name))\n}\n\nfunction appendElement(element,parent = new SnailElement(document.body)){\n  (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.checkType)([element,parent],[SnailElement,SnailElement])\n  parent.dom.appendChild(element.dom)\n}\n\n//# sourceURL=webpack://snail/./src/scripts/element.js?");

/***/ }),

/***/ "./src/scripts/main.js":
/*!*****************************!*\
  !*** ./src/scripts/main.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"version\": () => (/* binding */ version),\n/* harmony export */   \"Element\": () => (/* binding */ Element),\n/* harmony export */   \"ListAttr\": () => (/* binding */ ListAttr),\n/* harmony export */   \"ListElement\": () => (/* binding */ ListElement),\n/* harmony export */   \"Component\": () => (/* binding */ Component),\n/* harmony export */   \"initComponent\": () => (/* binding */ initComponent),\n/* harmony export */   \"UIComponent\": () => (/* binding */ UIComponent),\n/* harmony export */   \"UIAccordion\": () => (/* binding */ UIAccordion),\n/* harmony export */   \"UINavbar\": () => (/* binding */ UINavbar),\n/* harmony export */   \"$\": () => (/* binding */ $)\n/* harmony export */ });\n/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component.js */ \"./src/scripts/component.js\");\n/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./element.js */ \"./src/scripts/element.js\");\n/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui.js */ \"./src/scripts/ui.js\");\n/* harmony import */ var _binding_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./binding.js */ \"./src/scripts/binding.js\");\n/* harmony import */ var _binding_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_binding_js__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nconsole.log(\"Snail is ready !\")\nconst version = \"0.0 .1\"\nconst Element = _element_js__WEBPACK_IMPORTED_MODULE_1__.SnailElement\nconst ListAttr = _element_js__WEBPACK_IMPORTED_MODULE_1__.SnailListAttr\nconst ListElement = _element_js__WEBPACK_IMPORTED_MODULE_1__.SnailListElement\nconst Component = _component_js__WEBPACK_IMPORTED_MODULE_0__.SnailComponent\nconst initComponent = _component_js__WEBPACK_IMPORTED_MODULE_0__.registerComponent\nconst UIComponent = _ui_js__WEBPACK_IMPORTED_MODULE_2__.SnailUIComponent\nconst UIAccordion = _ui_js__WEBPACK_IMPORTED_MODULE_2__.SnailUIAccordion\nconst UINavbar = _ui_js__WEBPACK_IMPORTED_MODULE_2__.SnailUINavbar\nconst $ = window.$\n\n//# sourceURL=webpack://snail/./src/scripts/main.js?");

/***/ }),

/***/ "./src/scripts/select.js":
/*!*******************************!*\
  !*** ./src/scripts/select.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"select\": () => (/* binding */ select),\n/* harmony export */   \"selectAll\": () => (/* binding */ selectAll)\n/* harmony export */ });\n/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element.js */ \"./src/scripts/element.js\");\n\n\nfunction select(query,idx=0,virtual=false){\n  let result = document.querySelectorAll(query)[idx]\n  if (virtual) {\n    result = new _element_js__WEBPACK_IMPORTED_MODULE_0__.SnailElement(result || document.createElement(\"div\"))\n  }else{\n    result = new _element_js__WEBPACK_IMPORTED_MODULE_0__.SnailElement(result)\n  }\n  return result\n}\n\nfunction selectAll(query){\n  let result = document.querySelectorAll(query)\n  return new _element_js__WEBPACK_IMPORTED_MODULE_0__.SnailListElement(result)\n}\n\n//# sourceURL=webpack://snail/./src/scripts/select.js?");

/***/ }),

/***/ "./src/scripts/ui.js":
/*!***************************!*\
  !*** ./src/scripts/ui.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"mainOverlayCounter\": () => (/* binding */ mainOverlayCounter),\n/* harmony export */   \"mainOverlayElement\": () => (/* binding */ mainOverlayElement),\n/* harmony export */   \"MainOverlayControl\": () => (/* binding */ MainOverlayControl),\n/* harmony export */   \"SnailUIComponent\": () => (/* binding */ SnailUIComponent),\n/* harmony export */   \"SnailUIAccordion\": () => (/* binding */ SnailUIAccordion),\n/* harmony export */   \"SnailUINavbar\": () => (/* binding */ SnailUINavbar),\n/* harmony export */   \"SnailUIOffcanvas\": () => (/* binding */ SnailUIOffcanvas),\n/* harmony export */   \"snail_ui_controller\": () => (/* binding */ snail_ui_controller)\n/* harmony export */ });\n/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element.js */ \"./src/scripts/element.js\");\n/* harmony import */ var _select_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./select.js */ \"./src/scripts/select.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ \"./src/scripts/utils.js\");\n\n\n\nconst $ = window.$\nif ($ == undefined) {\n  console.warn(\"SnailUI won't work without jquery\")\n}\n\nvar mainOverlayCounter = 0\nconst mainOverlayElement = (0,_element_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"div\")\nmainOverlayElement.classList.add(\"overlay\")\n;(0,_element_js__WEBPACK_IMPORTED_MODULE_0__.appendElement)(mainOverlayElement)\nclass MainOverlayControl {\n\n  static open() {\n    mainOverlayCounter += 1\n    mainOverlayElement.style.display = \"block\"\n  }\n\n  static close() {\n    mainOverlayCounter -= 1\n    if (mainOverlayCounter <= 0) {\n      mainOverlayCounter = 0\n      mainOverlayElement.style.display = \"none\"\n    }\n  }\n\n}\n\nclass SnailUIComponent {\n  constructor() {\n    this.root = null\n  }\n  triggerEvent(name) {\n    let event = new CustomEvent(name, {\n      detail: {\n        component: this,\n        time: Date.now()\n      }\n    })\n    window.dispatchEvent(event)\n  }\n  getState() { return null }\n  setState(mode) {}\n}\n\nclass SnailUIAccordion extends SnailUIComponent {\n  constructor(query) {\n    super()\n    this.root = (0,_select_js__WEBPACK_IMPORTED_MODULE_1__.select)(query)\n    this.header = this.root.select(\".accordion-header\")\n    this.body = this.root.select(\".accordion-body\")\n  }\n  getState() {\n    let state = this.body.style.display\n    if (state == \"block\") {\n      state = \"open\"\n    } else {\n      state = \"close\"\n    }\n    return state\n  }\n  setState(mode) {\n    switch (mode) {\n      case \"open\":\n        $(this.body.dom).slideDown()\n        break\n      case \"close\":\n        $(this.body.dom).slideUp()\n        break\n      case \"auto\":\n        let state = this.getState()\n        if (state == \"open\") {\n          this.setState(\"close\")\n        } else {\n          this.setState(\"open\")\n        }\n        break\n      default:\n        ;(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.raiseError)(\"InvalidModeError\", `Invalid Mode name \"${mode}\" !`)\n    }\n  }\n}\n\nclass SnailUINavbar extends SnailUIComponent {\n  constructor(query) {\n    super()\n    this.root = (0,_select_js__WEBPACK_IMPORTED_MODULE_1__.select)(query)\n    this.header = this.root.select(\".navbar-head\")\n    this.items = this.root.select(\".navbar-items\")\n  }\n  getState() {\n    let state = this.items.style.display\n    if (state == \"block\") {\n      state = \"open\"\n    } else {\n      state = \"close\"\n    }\n    return state\n  }\n  setState(mode) {\n    switch (mode) {\n      case \"open\":\n        $(this.items.dom).slideDown()\n        break\n      case \"close\":\n        $(this.items.dom).slideUp()\n        break\n      case \"auto\":\n        let state = this.getState()\n        if (state == \"open\") {\n          this.setState(\"close\")\n        } else {\n          this.setState(\"open\")\n        }\n        break\n      default:\n        ;(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.raiseError)(\"InvalidModeError\", `Invalid Mode name \"${mode}\" !`)\n    }\n  }\n}\n\nclass SnailUIOffcanvas extends SnailUIComponent {\n  constructor(query) {\n    super()\n    this.offcanvas = (0,_select_js__WEBPACK_IMPORTED_MODULE_1__.select)(query, 0, true)\n    this.header = this.offcanvas.select(\".offcanvas-header\", 0, true)\n    this.body = this.offcanvas.select(\".offcanvas-body\", 0, true)\n  }\n\n  getState() {\n    let left = this.offcanvas.style.left\n    if (left == \"0%\") {\n      return \"open\"\n    } else {\n      return \"close\"\n    }\n  }\n\n  setState(mode) {\n    switch (mode) {\n      case \"open\":\n        MainOverlayControl.open()\n        this.offcanvas.style.left = \"0%\"\n        break\n      case \"close\":\n        MainOverlayControl.close()\n        this.offcanvas.style.left = \"-100%\"\n        break\n      case \"auto\":\n        let state = this.getState()\n        if (state == \"open\") {\n          this.setState(\"close\")\n        } else {\n          this.setState(\"open\")\n        }\n        break\n      default:\n        ;(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.raiseError)(\"InvalidModeError\", `Invalid Mode name \"${mode}\" !`)\n    }\n  }\n}\n\nconst snail_ui_controller = {\n  \"control-accordion\": function(target, args) {\n    let accordion = new SnailUIAccordion(args.accordion)\n    accordion.setState(args.mode)\n  },\n  \"control-navbar\": function(target, args) {\n    let navbar = new SnailUINavbar(args.navbar)\n    navbar.setState(args.mode)\n  },\n  \"control-offcanvas\": function(target, args) {\n    let offcanvas = new SnailUIOffcanvas(args.offcanvas)\n    offcanvas.setState(args.mode)\n  },\n}\n\nwindow.addEventListener(\"click\", function(e) {\n  let target = new _element_js__WEBPACK_IMPORTED_MODULE_0__.SnailElement(e.target)\n  let args = target.dom.dataset\n  let action = args.action\n\n  if (action) {\n    snail_ui_controller[action](target, args)\n  }\n})\n\nvar prevScrollpos = 0\n\nfunction checkSubItemStateDisplay(navbar_items) {\n  let ul = navbar_items.selectAll(\"ul.navbar-subitem\")\n  let displayed = false\n  //console.log(ul);\n  ul.each(function(element) {\n    let state = element.computedStyle().display == \"block\"\n    if (state) {\n      displayed = true\n    }\n  })\n  return displayed\n}\nwindow.addEventListener(\"scroll\", function() {\n  let navbar = (0,_select_js__WEBPACK_IMPORTED_MODULE_1__.select)(\".navbar.navbar-hide-on-scroll\", 0, true)\n  var currentScrollPos = window.pageYOffset;\n  let navbar_items = navbar.select(\".navbar-items\", 0, true)\n  let subitem_displayed = checkSubItemStateDisplay(navbar_items)\n  if (navbar_items.style.display != \"block\" && !subitem_displayed) {\n    navbar.style.transition = \"1s\"\n    if (prevScrollpos > currentScrollPos) {\n      navbar.style.top = \"0%\";\n    } else {\n      navbar.style.top = \"-15%\";\n    }\n    prevScrollpos = currentScrollPos;\n  }\n});\n\n//# sourceURL=webpack://snail/./src/scripts/ui.js?");

/***/ }),

/***/ "./src/scripts/utils.js":
/*!******************************!*\
  !*** ./src/scripts/utils.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"raiseError\": () => (/* binding */ raiseError),\n/* harmony export */   \"checkType\": () => (/* binding */ checkType)\n/* harmony export */ });\nfunction raiseError(name, msg) {\n  console.log(`%c[ERROR] : SnailError : ${name} : ${msg}`, \"color:red;\")\n  throw new Error(`SnailError: ${name} :${msg}`)\n}\n\nfunction checkType(obj, type) {\n  type.forEach((t, i) => {\n    if (t instanceof Array) {\n      let passed = false\n      t.forEach(k => {\n        if (!(obj[i] instanceof k)) {\n          passed = true\n        }\n      })\n      if(!passed)\n        raiseError(\"ArgumentError\", `Argument ${i} must be ${t.join(\" , \")}`)\n    }else{\n    if (!(obj[i] instanceof t)) {\n      raiseError(\"ArgumentError\", `Argument ${i} must be ${t}`)\n    }}\n  })\n}\n\n\n\n//# sourceURL=webpack://snail/./src/scripts/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/main.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});