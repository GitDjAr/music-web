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