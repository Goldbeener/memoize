
/**
 * ## 快速排序
 * 核心思想：分治 就地排序
 * 找到一个基数
 * 根据这个基数，按照比这个基数大或者小，将数组分成2个
 * 针对这两个数组 递归使用快排
*/

const arr = [2, 9, 6, 13, 7, 10, 8, 12];

function quickSort(arr, s = 0, e = arr.length) {
  if (s < e - 1) {
    const m = partition(arr, s, e);
    quickSort(arr, s, m);
    quickSort(arr, m + 1, e)
  }
  return arr;
}

function partition(arr, s, e) {
  const base = arr[e - 1]
  let i = s - 1;

  for (let j = s; j < e - 1; j++) {
    if (arr[j] < base) {
      i++;
      swap(arr, i, j)
    }
  }
  swap(arr, i + 1, e - 1);
  return i + 1;
}

// 交换数组内的两个元素的位置
function swap(arr, s, e) {
  if (s === e) return;
  [arr[s], arr[e]] = [arr[e], arr[s]]
}

console.log('>>>>', quickSort(arr));


function majax({ method, url, params, data }) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHTTPRequest();

    method = method.toLowerCase();
    const qs = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&');
    url = url + '?' + qs

    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4 && xhr.status === 200){
        resolve(xhr.response)
      } else {
        reject(xhr.response)
      }
    }

    xhr.open(method, url, true)

    const reqBody = undefined
    if(method === 'POST'){
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.responseType = 'json'
      reqBody = JSON.stringify(data);
    }

    xhr.send(reqBody);
  })
}