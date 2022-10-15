/**
 * 2个目标
 * 1. dom diff
 * 2. dom 操作
 */

/**
 * @param { oldVnode } 老的vnode / el
 * @param { newVnode } 新的vnode
 *
 * @return { vnode }  更新后的vnode
 */
function patch(oldVnode, newVnode) {
  // TODO pre hook

  // 对oldVnode格式化
  if (isElement(api, oldVnode)) {
    oldVnode = emptyNodeAt(oldVnode);
  } else if (isDocumentFragment(api, oldVnode)) {
    oldVnode = emptyDocumentFragmentAt(oldVnode);
  }

  if (sameVnode(oldVnode, newVnode)) {
    // 相同节点 patch node
    patchVnode(oldVnode, newVnode, insertedVnodeQueue);
  } else {
    // 不同节点
    elm = oldVnode.elm;
    parent = api.parentNode(elm);

    createElm(vnode, insertedVnodeQueue);

    if (parent !== null) {
      api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
      removeVnodes(parent, [oldVnode], 0, 0);
    }
  }

  for (i = 0; i < insertedVnodeQueue.length; i++) {
    insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
  }

  return vnode;
}
