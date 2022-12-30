import { SnailComponent, registerComponent } from "./component.js"
import {
  SnailElement,
  SnailListAttr,
  SnailListElement
} from "./element.js"
import {
  SnailUIComponent,
  SnailUIAccordion,
  SnailUINavbar
} from "./ui.js"
import {} from "./binding.js"

console.log("Snail is ready !")
export const version = "0.0 .1"
export const Element = SnailElement
export const ListAttr = SnailListAttr
export const ListElement = SnailListElement
export const Component = SnailComponent
export const initComponent = registerComponent
export const UIComponent = SnailUIComponent
export const UIAccordion = SnailUIAccordion
export const UINavbar = SnailUINavbar
export const $ = window.$