export function getImgsColor(img: string, isReverse = false): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext("2d");
    const imgObj = new Image();
    // 处理跨域  https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
    imgObj.crossOrigin = "Anonymous";
    imgObj.src = img;
    imgObj.onload = () => {
      if (!ctx) {
        reject(new Error("Canvas 环境不支持"));
        return;
      }
      ctx.drawImage(imgObj, 0, 0);
      const data = ctx.getImageData(0, 0, 100, 100).data;
      // color = `rgb(${data[0]},${data[1]},${data[2]})`
      resolve(getMainColor(data, isReverse));
    };
    imgObj.onerror = () => {
      reject(new Error(`Failed to load image: ${img}`));
    };
  });
}

function getMainColor(data: Uint8ClampedArray, isReverse = false): string {
  const temp: { [key: string]: number } = {};
  const len = data.length;

  let max = 0;
  let color = "";
  let i = 0;
  while (i < len) {
    if (data[i + 3] !== 0) {
      const k = `${data[i]}, ${data[i + 1]}, ${data[i + 2]}, ${
        data[i + 3] / 255
      }`;
      temp[k] = temp[k] ? temp[k] + 1 : 1;
      if (temp[k] > max) {
        max = temp[k];
        color = k;
      }
    }
    i += 4;
  }
  // let c = color.split(',').map(item => parseInt(item))
  // if (getContrastYIQ(c)) {
  if (isReverse) {
    return reverseColor(color);
  }
  return `rgba(${color})`;
}

// 颜色反转 rgba
export function reverseColor(color: string): string {
  const colorArr = color.split(",");
  const len = colorArr.length;
  let i = 0;
  while (i < len) {
    colorArr[i] = (255 - parseInt(colorArr[i])).toString();
    i++;
  }
  const rgba = colorArr.join(",");
  return `rgba(${rgba})`;
}

/**
 * 将 RGB 颜色值转换为十六进制颜色代码。
 *
 * @param {number} r -红色值 (0-255)。
 * @param {number} g -绿色值 (0-255)。
 * @param {number} b -蓝色值 (0-255)。
 * @return {string} 十六进制颜色代码。
 */
export function rgbToHex(r: number, g: number, b: number) {
  let hex = ((r << 16) | (g << 8) | b).toString(16);
  return "#" + ("000000" + hex).slice(-6);
}

// 适配 文本
export function getContrastYIQ(color: number[]): boolean {
  const [r, g, b] = color;
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  // return (yiq >= 128) ? 'black' : 'white';
  return yiq >= 128;
}
