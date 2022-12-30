export class SnailComponent extends HTMLElement {
  constructor() {
    super()
    this.data = {}
    this.renderDependent = null
  }
  getState() {
    return this.data
  }
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
  onMount() {}
  onUnMount() {}
  afterRender() {}
  render() { return "" }
  renderHTML(html) {
    if (html == undefined)
      html = ''
    this.innerHTML = html

  }
  connectedCallback() {
    this.onMount()
    this.renderHTML(this.render())
    this.afterRender()
  }
  disconnectedCallback() {
    this.onUnMount()
  }
}

export function registerComponent(name, component) {
  window.customElements.define(name, component)
}