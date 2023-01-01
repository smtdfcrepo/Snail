import { SnailElement, createElement ,appendElement} from "./element.js"
import { select } from "./select.js"
import { raiseError } from "./utils.js"
import {$} from "jquery"


if ($ == undefined) {
  console.warn("SnailUI won't work without jquery")
}

export var mainOverlayCounter = 0
export const mainOverlayElement = createElement("div")
mainOverlayElement.classList.add("overlay")
appendElement(mainOverlayElement)
export class MainOverlayControl {

  static open() {
    mainOverlayCounter += 1
    mainOverlayElement.style.display = "block"
  }

  static close() {
    mainOverlayCounter -= 1
    if (mainOverlayCounter <= 0) {
      mainOverlayCounter = 0
      mainOverlayElement.style.display = "none"
    }
  }

}

export class SnailUIComponent {
  constructor() {
    this.root = null
  }
  triggerEvent(name) {
    let event = new CustomEvent(name, {
      detail: {
        component: this,
        time: Date.now()
      }
    })
    window.dispatchEvent(event)
  }
  getState() { return null }
  setState(mode) {}
}

export class SnailUIAccordion extends SnailUIComponent {
  constructor(query) {
    super()
    this.root = select(query)
    this.header = this.root.select(".accordion-header")
    this.body = this.root.select(".accordion-body")
  }
  getState() {
    let state = this.body.style.display
    if (state == "block") {
      state = "open"
    } else {
      state = "close"
    }
    return state
  }
  setState(mode) {
    switch (mode) {
      case "open":
        $(this.body.dom).slideDown()
        break
      case "close":
        $(this.body.dom).slideUp()
        break
      case "auto":
        let state = this.getState()
        if (state == "open") {
          this.setState("close")
        } else {
          this.setState("open")
        }
        break
      default:
        raiseError("InvalidModeError", `Invalid Mode name "${mode}" !`)
    }
  }
}

export class SnailUINavbar extends SnailUIComponent {
  constructor(query) {
    super()
    this.root = select(query)
    this.header = this.root.select(".navbar-head")
    this.items = this.root.select(".navbar-items")
  }
  getState() {
    let state = this.items.style.display
    if (state == "block") {
      state = "open"
    } else {
      state = "close"
    }
    return state
  }
  setState(mode) {
    switch (mode) {
      case "open":
        $(this.items.dom).slideDown()
        break
      case "close":
        $(this.items.dom).slideUp()
        break
      case "auto":
        let state = this.getState()
        if (state == "open") {
          this.setState("close")
        } else {
          this.setState("open")
        }
        break
      default:
        raiseError("InvalidModeError", `Invalid Mode name "${mode}" !`)
    }
  }
}

export class SnailUIPopup extends SnailUIComponent {
  constructor(query) {
    super()
    this.popup = select(query,0,true)
    this.header = this.popup.select(".popup-header",0,true)
    this.body = this.popup.select(".popup-body",0,true)
  }
  getState() {
    let state = this.popup.style.display
    if (state == "block") {
      state = "open"
    } else {
      state = "close"
    }
    return state
  }
  setState(mode) {
    switch (mode) {
      case "open":
        MainOverlayControl.open()
        this.popup.style.display = "block"
        break
      case "close":
        MainOverlayControl.close()
        this.popup.style.display = "none"
        break
      case "auto":
        let state = this.getState()
        if (state == "open") {
          this.setState("close")
        } else {
          this.setState("open")
        }
        break
      default:
        raiseError("InvalidModeError", `Invalid Mode name "${mode}" !`)
    }
  }
}

export class SnailUIOffcanvas extends SnailUIComponent {
  constructor(query) {
    super()
    this.offcanvas = select(query, 0, true)
    this.header = this.offcanvas.select(".offcanvas-header", 0, true)
    this.body = this.offcanvas.select(".offcanvas-body", 0, true)
  }

  getState() {
    let left = this.offcanvas.style.left
    if (left == "0%") {
      return "open"
    } else {
      return "close"
    }
  }

  setState(mode) {
    switch (mode) {
      case "open":
        MainOverlayControl.open()
        this.offcanvas.style.left = "0%"
        break
      case "close":
        MainOverlayControl.close()
        this.offcanvas.style.left = "-100%"
        break
      case "auto":
        let state = this.getState()
        if (state == "open") {
          this.setState("close")
        } else {
          this.setState("open")
        }
        break
      default:
        raiseError("InvalidModeError", `Invalid Mode name "${mode}" !`)
    }
  }
}

export const snail_ui_controller = {
  "control-accordion": function(target, args) {
    let accordion = new SnailUIAccordion(args.accordion)
    accordion.setState(args.mode)
  },
  "control-navbar": function(target, args) {
    let navbar = new SnailUINavbar(args.navbar)
    navbar.setState(args.mode)
  },
  "control-offcanvas": function(target, args) {
    let offcanvas = new SnailUIOffcanvas(args.offcanvas)
    offcanvas.setState(args.mode)
  },
    "control-popup": function(target, args) {
      let popup = new SnailUIPopup(args.popup)
      popup.setState(args.mode)
    },
}

window.addEventListener("click", function(e) {
  let target = new SnailElement(e.target)
  let args = target.dom.dataset
  let action = args.action

  if (action) {
    snail_ui_controller[action](target, args)
  }
})

var prevScrollpos = 0

function checkSubItemStateDisplay(navbar_items) {
  let ul = navbar_items.selectAll("ul.navbar-subitem")
  let displayed = false
  //console.log(ul);
  ul.each(function(element) {
    let state = element.computedStyle().display == "block"
    if (state) {
      displayed = true
    }
  })
  return displayed
}
window.addEventListener("scroll", function() {
  let navbar = select(".navbar.navbar-hide-on-scroll", 0, true)
  var currentScrollPos = window.pageYOffset;
  let navbar_items = navbar.select(".navbar-items", 0, true)
  let subitem_displayed = checkSubItemStateDisplay(navbar_items)
  if (navbar_items.style.display != "block" && !subitem_displayed) {
    navbar.style.transition = "1s"
    if (prevScrollpos > currentScrollPos) {
      navbar.style.top = "0%";
    } else {
      navbar.style.top = "-15%";
    }
    prevScrollpos = currentScrollPos;
  }
});