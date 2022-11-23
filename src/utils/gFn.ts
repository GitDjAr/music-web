/**
 * 节流
 */
export function throttle(fn: Function, delay: number): Function {
  let timer: any;
  return function () {
    if (!timer) {
      fn.apply(this, arguments)
      timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null
      }, delay)
    }
  }
}
// 定义一个防抖函数
export function debounce(fn: Function, delay: number): Function {
  let timeout: any;
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

/**
 * 计算 img 比例
 */
export function ImgProportion(url: string, seep: number = 2): Promise<string> {
  const { rendomImgurl } = window
  const imgObj = new Image()
  imgObj.src = url
  return new Promise((resolve, reject) => {
    imgObj.width
    imgObj.onerror = function () {
      resolve(rendomImgurl)
    };
    imgObj.onload = function () {
      let c = imgObj.width / imgObj.height >= seep ? url : rendomImgurl
      resolve(c)
      imgObj.onload = null;//避免重复加载
    }
  })
}