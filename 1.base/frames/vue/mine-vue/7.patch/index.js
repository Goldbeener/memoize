import { remove } from "fs-extra";

export default function patch(oldVnode, vnode, isServerRender, removeOnly) {
  if (!oldVnode) {
    // empty mount  可能是组件 创建一个新的root el
    createElm(vnode);
  } else {
    const isRealEl = oldVnode.nodeType;
    if (!isRealEl && sameNode(oldVnode, vnode)) {
      patchVnode(oldVnode, vnode);
    } else {
      if (isRealEl) {
        oldVnode = emptyNodeAt(oldVnode);
      }

      createElm(vnode);

      if (parentElm) {
        removeVnodes([oldVnode]);
      } else if (oldVnode.tag) {
        invokeDestroyHook(oldVnode);
      }
    }
  }
  return vnode.elm;
}

function sameVNode() {}

function patchVnode() {}
