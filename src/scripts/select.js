import {SnailElement,SnailListElement} from "./element.js"

export function select(query,idx=0,virtual=false){
  let result = document.querySelectorAll(query)[idx]
  if (virtual) {
    result = new SnailElement(result || document.createElement("div"))
  }else{
    result = new SnailElement(result)
  }
  return result
}

export function selectAll(query){
  let result = document.querySelectorAll(query)
  return new SnailListElement(result)
}