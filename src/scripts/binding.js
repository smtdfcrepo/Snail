
window.snail_model = {}

function getValue(element) {
  if (element instanceof HTMLInputElement && (element.type == "checkbox" || element.type == "radio")) {
    let state = element.checked
    return state
  } else {
    return element.value
  }
}

function setModel(name, value, ele) {
  window.snail_model[name] = value
  document.querySelectorAll(`[data-bind-value="${name}"],[data-bind-checked="${name}"],[data-bind-disabled="${name}"]`).forEach(element => {
    if (ele !== element) {
      if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement) {
        if ((element.type == "checkbox" || element.type == "radio")) {
          if (element.dataset.bindChecked) {
            element.checked = value
          }
        } else {
          if (element.dataset.bindValue) {
            element.value = value
          }
          if (element.dataset.bindDisabled) {
            element.disabled = value
          }
        }
      }
    }
  })
}

window.addEventListener("change",function(e){
  let target = e.target
  let hasBind = target.dataset.bind == "true"
  if (hasBind) {
    if (target instanceof HTMLSelectElement) {
      let model = target.dataset.bindChecked
      let newVal = getValue(target)
      setModel(model, newVal)
    } 
  }
})

window.addEventListener("input", function(e) {
  let target = e.target
  let hasBind = target.dataset.bind == "true"
  if (hasBind) {
    if (target instanceof HTMLInputElement && (target.type == "checkbox" || target.type == "radio")) {
      let model = target.dataset.bindChecked
      let newVal = getValue(target)
      setModel(model, newVal)
    } else {
      let model = target.dataset.bindValue
      let newVal = getValue(target)
      setModel(model, newVal)
    }
  }
})

function deleteModel(name){
  delete window.snail_model[name]
}