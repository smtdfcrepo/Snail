import {raiseError} from "./utils.js"
/**
 * Snail Components 
 */
export class SnailComponent extends HTMLElement {
  constructor() {
    super()
    this.data = {}
    this.renderDependent = null
    this.values = {}
  }
  
  /**
   * Get all state of the component
   */
  get state() {
    return this.data
  }
  
  /**
   * Set a state for the component 
   * @param {String} name name of state value
   * @param {Any} vamue value of state
   */
  setState(name, value) {
    if (this.renderDependent == null) {
      this.data[name] = value
      this.renderHTML(this.render())
      this.afterRender()
    } else {
      this.data[name] = value
      if (this.renderDependent.includes(name)) {
        this.renderHTML(this.render())
        this.afterRender()
      }
    }
  }
  
  /**
   * This function will be called when the component is added to the DOM
   */
  onMount() {}
  onUnMount() {}
  afterRender() {}
  render() { return "" }
  renderHTML(html) {
    if (html == undefined)
      html = ''
    this.innerHTML = html

  }
  handle(){
    return {
    }
  }
  connectedCallback() {
    this.onMount()
    this.renderHTML(this.render())
    this.afterRender()
  }
  disconnectedCallback() {
    this.onUnMount()
  }
  emptyContent(){
    this.innerHTML = ""
    this.textContent = ""
  }
}

export class SnailExprComponent extends SnailComponent{
  constructor(){
    super()
    this.renderDependent = []
    this.setState("expr",this.textContent)
    this.emptyContent()
  }
  onMount(){
    try{
    this.setState("res",eval(this.state.expr))
    }catch(e){
      raiseError("RenderContentError","Expression has error :\n"+e.stack)
    }
    this.renderDependent = null
  }
  render(){
    return this.state.res
  }
}

export function registerComponent(name, component) {
  window.customElements.define(name, component)
}

registerComponent("s-expr",SnailExprComponent)