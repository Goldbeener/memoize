/**
 * 快速排序
 * 基本思想是分治、递归
 * 找一个基数
 *  根据这个基数，按照比基数大、比基数小将数组分成2个部分
 *  在针对这两个数组递归处理
 * 
 * 就地排序
 * 
 * 需要注意的点
 * 始终是左闭右开
*/

const arr = [2, 9, 16, 3, 7, 10, 8, 12];

function quickSort(arr, s = 0, e = arr.length) {
  if ( s < e - 1) {
    const m = partition(arr, s, e);
    quickSort(arr, s, m);
    quickSort(arr, m + 1, e);
  }
  return arr;
}

function partition(arr, s, e) {
  const base = arr[e -1];
  let i = s - 1;

  for (let j = s; j < e - 1; j++) {
    if(arr[j] < base) {
      i++;
      swap(arr, j, i)
    }
  }
  swap(arr, i + 1, e - 1);
  return i + 1;
}

function swap(arr, s, e) {
  if(s === e) return
  [arr[s], arr[e]] = [arr[e], arr[s]]
}

console.log('>>>>', quickSort(arr));



/**
 * 手写xhr
*/

function ajax({ url, method, data, success, fail }) {
  let xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  xhr.open(method, url);

  xhr.withCredentials = true;
  xhr.responseType = 'json'
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.timeout = 3000;

  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4) {
      // 网络请求结束 无论成功失败都会走到
      if (xhr.status === 200) {
        success(xhr.response)
      } else {
        // cors \ 非2xx  bad connection
        fail(xhr.response);
      }
    }
  }

  xhr.addEventListener('loadstart/load/loadend/abort/error/progress/timeout', function (e) {}, false);
  xhr.onload = function () {
    // 请求成功
  }
  xhr.onloadend = function() {
    // 无论成功失败，都会到这 有finally的味道
  }
  xhr.onerror = function() {
    // cors \ bad connection
  }
  xhr.onabort = function() {

  }
  xhr.ontimeout = function() {

  }
  xhr.onprogress = function(e){
    const { lengthComputable, loaded, total } = e;

    if (lengthComputable) {
      const process = (loaded / total * 100).toFixed(2) + '%'; 
    }
  }
  const params = method === 'GET' ? undefined : JSON.stringify(data);
  xhr.send(params)
  return xhr;
}

// 取消
xhr.abort();


function ajaxPromise({ url, method, params, data }) {

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    method = method.toUpperCase();
    let queryString = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&')
    url = `${url}?${queryString}`;

    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        if(xhr.status === 200 || xhr.status === 304) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      }
    }

    xhr.open(method, url);
    xhr.withCredentials = true;

    let sendData;
    if (method === 'POST') {
      xhr.setRequestheader('Content-Type', 'application/json');
      xhr.responseType = 'json';
      sendData = JSON.stringify(data);
    }

    xhr.send(sendData);
  })
}

ajaxPromise().then()

