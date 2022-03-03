/**
 * 对dom的抽象描述
 * 可以有2种方式
 * 1. 模板
 * 2. js对象
 * 
 * js对象更加灵活，在vue中是一渲染函数的形式来体现的，渲染函数的返回值就是对dom的抽象出来的js对象，即虚拟dom vnode
 * 模板 可以通过编译器转换成渲染函数，即
 * 
 * vnode 类型
 * 1. string
 * 2. function
 * */ 

// 这就是虚拟dom
const vnode = {
    tag: 'div',
    props: {
        onClick: () => alert('hello')
    }, 
    children: 'click me'
}
// 组件
const myComponent = function (props) {
    return {
        tag: 'div',
        props: {
            onClick: () => alert('hello')
        }, 
        children: 'click me'
    }
}
const comp_obj_vnode = {
    render() {
        return {
            tag: 'div',
            props: {
                onClick: () => alert('hello')
            }, 
            children: 'im a obj component'
        }
    }
}
const comp_func_vnode = {
    tag: myComponent
}
const comp_obj = {
    tag: comp_obj_vnode
}
function mountElement(vnode, container) {
    const el = document.createElement(vnode.tag)

    // 属性
    for(const key in vnode.props) {
        if (/^on/.test(key)) {
            const eventName = key.substring(2).toLocaleLowerCase()
            el.addEventListener(eventName, vnode.props[key], false)
        }
    }

    if(vnode.children) {
        if(typeof vnode.children === 'string') {
            el.appendChild(document.createTextNode(vnode.children))
        } else {
            vnode.children.forEach(child => render(child, el));
        }
    }

    container.appendChild(el)
}

function mountComponent(vnode, container) {
    const tag = vnode.tag;
    let subTree ;
    if (typeof tag === 'function') {
        subTree = tag()
    } else {
        subTree = tag.render()
    }
    
    return mountElement(subTree, container)
}

function render(vnode, container) {
    // dom创建
    if (typeof vnode.tag === 'string') {
        mountElement(vnode, container);
    } else {
        mountComponent(vnode, container)
    }
    
}
