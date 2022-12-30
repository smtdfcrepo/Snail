export function raiseError(name, msg) {
  console.log(`%c[ERROR] : SnailError : ${name} : ${msg}`, "color:red;")
  throw new Error(`SnailError: ${name} :${msg}`)
}

export function checkType(obj, type) {
  type.forEach((t, i) => {
    if (t instanceof Array) {
      let passed = false
      t.forEach(k => {
        if (!(obj[i] instanceof k)) {
          passed = true
        }
      })
      if(!passed)
        raiseError("ArgumentError", `Argument ${i} must be ${t.join(" , ")}`)
    }else{
    if (!(obj[i] instanceof t)) {
      raiseError("ArgumentError", `Argument ${i} must be ${t}`)
    }}
  })
}

