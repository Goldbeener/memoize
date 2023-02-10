// 简易的MVVM框架
class MVVM {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    this.$template = document.querySelector(this.$el);

    this.observe(this.$data);
    this.compile(this.$template);
  }

  observe(obj) {
    Object.keys(obj).forEach((key) => {
      let value = obj[key];
      Object.defineProperty(obj, key, {
        get() {
          return value;
        },
        set(newValue) {
          value = newValue;
          this.compile(this.$template);
        },
      });
    });
  }

  compile(template) {
    const childNodes = template.childNodes;
    childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        this.compileElementNode(node);
      } else if (node.nodeType === Node.TEXT_NODE) {
        this.compileTextNode(node);
      }

      if (node.childNodes && node.childNodes.length) {
        this.compile(node);
      }
    });
  }

  compileElementNode(node) {
    Array.from(node.attributes).forEach((attribute) => {
      if (attribute.name === "v-model") {
        node.value = this.$data[attribute.value];

        node.addEventListener("input", (e) => {
          this.$data[attribute.value] = e.target.value;
        });
      }
    });
  }

  compileTextNode(node) {
    const reg = /\{\{(.*)\}\}/;
    if (reg.test(node.textContent)) {
      const key = RegExp.$1.trim();
      node.textContent = node.textContent.replace(reg, this.$data[key]);

      new Observer(this.$data, key, (value) => {
        node.textContent = node.textContent.replace(reg, value);
      });
    }
  }
}
