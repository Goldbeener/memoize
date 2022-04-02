// trans obj to reactive
function convert(obj) {
  Object.keys(obj).forEach(key => {
    let newValue;
    Object.defineProperty(obj, key, {
      get() {
        return newValue || obj[key]
      },
      set(value) {
        newValue = value
      }
    })
  });
}


/**
 * proxy
 * reflect
 * */ 
