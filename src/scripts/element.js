import { raiseError, checkType } from "./utils.js"

function generateElement(element) {
  if (element == null || element == undefined) {
    return null
  } else {
    return new SnailElement(element)
  }
}


export class SnailListAttr {
  constructor(owner, attr) {
    checkType([owner,attr], [SnailElement, NamedNodeMap])
    this.attr = attr
    this.owner = owner
  }

  index(idx) {
    return generateElement(this.attr.item(idx))
  }

  get(name) {
    let result = this.attr.getNamedItem(name)
    if (result == null) {
      return null
    } else {
      return result.value
    }
  }

  set(name, value) {
    let attr = document.createAttribute(name)
    attr.value = value
    this.attr.setNamedItem(attr)
  }
  
  remove(name){
    this.attr.removeNamedItem(name)
  }
}

export class SnailListElement {
  constructor(elements, parent = null) {
   checkType([elements],[[HTMLCollection,NodeList]])
    this.elements = elements
    this.parent = parent

  }
  index(idx) {
    return generateElement(this.elements.item(idx))
  }
  get first() {
    return generateElement(this.elements.item(0))
  }
  get last() {
    return generateElement(this.elements.item(this.elements.length - 1))
  }
  each(callback){
    //console.log(this.elements.length);
    this.elements.forEach(element=>{
      
      callback(generateElement(element))
    })
  }
}



export class SnailElement {
  constructor(dom) {
    checkType([dom], [HTMLElement])
    this.dom = dom
  }
  hide() {
    this.dom.hidden = "hidden"
  }
  show() {
    this.dom.hidden = ""
  }
  get style() {
    return this.dom.style
  }
  set val(value) {
    this.dom.value = value
  }
  get val() {
    return this.dom.value
  }
  set HTML(html) {
    this.dom.innerHTML = html
  }
  get HTML() {
    return this.dom.innerHTML
  }
  set text(t) {
    this.dom.textContent = t
  }
  get text() {
    return this.dom.textContent
  }
  get attr() {
    return new SnailListAttr(this, this.dom.attributes)
  }
  get child() {
    return new SnailListElement(this.dom.children);
  }
  computedStyle(pseudo_element = undefined ){
    return getComputedStyle(this.dom,pseudo_element)
  }
  
  select(query, idx = 0, virtual = false) {
    let result = this.dom.querySelectorAll(query)[idx]
    if (virtual) {
      result = new SnailElement(result || document.createElement("div"))
    } else {
      result = new SnailElement(result)
    }
    return result
  }
  selectAll(query){
    //console.log(this.dom.querySelectorAll(query));
    return new SnailListElement(this.dom.querySelectorAll(query))
  }
  get classList(){
    return this.dom.classList
  }
  set id(ID){
    this.dom.id = ID
  }
  get id(){
    return this.dom.id
  }
  on(event,callback){
    this.dom.addEventListener(event,callback) 
  }
}

export function createElement(name){
  return new SnailElement(document.createElement(name))
}

export function appendElement(element,parent = new SnailElement(document.body)){
  checkType([element,parent],[SnailElement,SnailElement])
  parent.dom.appendChild(element.dom)
}