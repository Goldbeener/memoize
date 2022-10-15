const arr = [2, 9, 6, 3, 7, 10, 8, 12];

/**
 * 选择排序
 * 分为已排序区和待排序区
 * 每一轮从待排序区选择一个最小的元素，放在已排序区的末尾
 * 
*/

function selectSort(arr) {
    let i = 0;
    for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] > arr[j]) {
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
}

/**
 * 快速排序
 * 1. 找出基准值，并且从原数组摘除
 * 2. 遍历数组，对比基准值，放在左右两个数组中
 * 3. 对左右两个数组递归操作
*/

// version 1
function quickSort(arr) {

    if(arr.length <= 1) return arr; 

    let midIndex = Math.floor(arr.length / 2);
    let mid = arr.splice(midIndex, 1)[0];
    let left = [];
    let right = [];

    for(let j = 0; j < arr.length; j++) {
        if (arr[j] < mid) {
            left.push(arr[j])
        } else {
            right.push(arr[j])
        }
    }

    return [...quickSort(left), mid, ...quickSort(right)];

}

/**
 * 优点：
 *  1. 代码简洁易懂，可读性强
 * 缺点
 *  1. 空间复杂度高，每次递归会新增2个数组空间
 *  2. splice 产生了O(n)复杂度
 * 
*/


/***
 * 快速排序的核心思想： 分治
 * 通过一趟排序，找到一个基数，将要排序的数据分成独立的2部分
 *  其中一部分都比基数小
 *  另一部分都比基数大
 * 
 * 然后再分别针对这两部分数据做递归快排
*/

function swap(arr, i, j) {
    if ( i === j) return;
    let _ = arr[i];
    arr[i] = arr[j];
    arr[j] = _;
}
//这一步找到 数组最后一项x在数组中的确定位置 并且把数组分成左右2部分
function divide(arr, s, e) {
    const x = arr[e - 1]; // 数组最后一项做基数
    let i = s - 1;

    // i代表比基数小的值的最大的索引

    for (let j = s; j < e - 1; j++) {
        if(arr[j] < x) {
            i++;
            swap(arr, i, j);
        }
    }
    // i+1 就是基数在排序完的数组中的位置
    swap(arr, i + 1, e - 1)
    return i + 1;
}
/**
 * @param arr 排序数组
 * @param start 起始序号
 * @param end 结束序号
*/
function qsr(arr, start = 0, end = arr.length) {
    if (start < end - 1) {
        const q = divide(arr, start, end);
        qsr(arr, start, q);
        qsr(arr, q + 1, end);
    }
    return arr
}

console.log('>>>>', qsr(arr));

/**
 * 快速选择排序
*/
