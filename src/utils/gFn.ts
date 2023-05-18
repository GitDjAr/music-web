import { Notification } from "@arco-design/web-vue";
/**
 * 节流
 */
export function throttle(fn: Function, delay: number): Function {
  let timer: any;
  let args: any;
  return (...params: any) => {
    args = params; // 缓存函数的参数

    if (!timer) {
      if (args) {
        fn.apply(window, args); // 在定时器结束后再次调用函数，确保所有参数都被处理
        args = null;
      }
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
      }, delay);
    }
  };
}
// 定义一个防抖函数
export function debounce(fn: Function, delay: number): Function {
  let timeout: any;
  let args: any;
  return (...params: any) => {
    args = params; // 缓存函数的参数
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (args) {
        fn.apply(window, args); // 在定时器结束后再次调用函数，确保所有参数都被处理
        args = null;
      }
    }, delay);
  };
}

/**
 * 复制文本到剪贴板
 * @param {String} text 需要复制的文本
 * @returns {Boolean} 是否复制成功
 */
export function copyText(text: string) {
  // 创建一个textarea元素，并将文本内容赋值给它
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  // 执行复制操作
  let successful = false;
  try {
    successful = document.execCommand("copy");
    Notification.success("复制成功");
  } catch (err) {
    console.error("Unable to copy text: ", err);
  }

  // 移除创建的textarea元素
  document.body.removeChild(textarea);

  // 返回复制操作是否成功
  return successful;
}

/**
 * 计算 img 比例
 */
export function ImgProportion(url: string, seep: number = 2): Promise<string> {
  const { rendomImgurl = "" }: any = window;
  const imgObj = new Image();
  imgObj.src = url;
  return new Promise((resolve, reject) => {
    imgObj.width;
    imgObj.onerror = function () {
      resolve(rendomImgurl);
    };
    imgObj.onload = function () {
      let c = imgObj.width / imgObj.height >= seep ? url : rendomImgurl;
      resolve(c);
      imgObj.onload = null; //避免重复加载
    };
  });
}
/**
 * 计算 video 比例
 */
export function Vproportion(url: string, seep: number = 2): Promise<string> {
  const imgObj = new Image();
  imgObj.src = url;
  return new Promise((resolve, reject) => {
    imgObj.width;
    imgObj.onerror = function () {
      resolve("rendomImgurl");
    };
    imgObj.onload = function () {
      let c = imgObj.width / imgObj.height >= seep ? url : "rendomImgurl";
      resolve(c);
      imgObj.onload = null; //避免重复加载
    };
  });
}

/**
 * 随机 array
 */
export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * 检查给定 HTTP URL 的可访问性的函数。
 *
 * @param {string} url -检查可访问性的 URL。
 */
export function checkHTTP(url: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    var http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.onreadystatechange = function () {
      if (http.readyState == 4) {
        if (http.status == 200) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    };
    http.send(null);
  });
}
