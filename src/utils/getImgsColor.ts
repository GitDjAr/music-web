/**
 * 获取图片颜色
 * @param img url
 * @param isReverse 是否反转颜色
 */

function getImgsColor(img: string, isReverse = false): Promise<string> {
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

/**
 *  获取图片颜色
 * @param data
 * @param isReverse 是否反转颜色
 */
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
  if (isReverse) {
    color = reverseColor(color);
  }
  let arr = color.split(",").map((e) => +e);
  return rgbToHex(arr[0], arr[1], arr[2]);
}

/**
 * 颜色反转 rgba
 * @param color
 */
function reverseColor(color: string): string {
  const colorArr = color.split(",");
  const len = colorArr.length;
  let i = 0;
  while (i < len) {
    colorArr[i] = (255 - parseInt(colorArr[i])).toString();
    i++;
  }
  return colorArr.join(",");
}

/**
 * 将 RGB 颜色值转换为十六进制颜色代码。
 *
 * @param {number} r -红色值 (0-255)。
 * @param {number} g -绿色值 (0-255)。
 * @param {number} b -蓝色值 (0-255)。
 * @return {string} 十六进制颜色代码。
 */
function rgbToHex(r: number, g: number, b: number) {
  let hex = ((r << 16) | (g << 8) | b).toString(16);
  return "#" + ("000000" + hex).slice(-6);
}

// 将给定的颜色转换为 RGB 数组
function hexToRgb(hex: string = ""): [number, number, number] {
  const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  const result = regex.exec(hex);

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return [r, g, b];
}

/**
 *
 *  示例用法：
 *  const givenColor = "#e66982";
 *  const closestColor = findClosestColor(givenColor);
 *  console.log(closestColor);
 * 给定一个颜色,返回匹配最相近的颜色
 * @returns {string} 一个颜色
 */
function findClosestColor(
  color: string = "#fcf582",
  colorList: string[] = [
    // "#ff5c60",
    "#ffbb73",
    "#fcf582",
    "#6ec7fc",
    "#bb7ff3",
    "#bb7ff3",
    "#ff54cf",
  ]
) {
  // 将十六进制颜色值转换为 RGB 数组
  const targetColor = typeof color === "string" ? hexToRgb(color) : color;

  // 初始化最小差异程度和最接近颜色的索引
  let minDiff = Infinity;
  let closestColorIndex = -1;

  // 遍历颜色列表，找到与目标颜色最接近的颜色
  for (let i = 0; i < colorList.length; i++) {
    const currentColor = hexToRgb(colorList[i]);
    const diff = getColorDifference(targetColor, currentColor);
    if (diff < minDiff) {
      minDiff = diff;
      closestColorIndex = i;
    }
  }

  // 返回最接近颜色值
  return colorList[closestColorIndex];
}

// 计算两个颜色的差异程度
function getColorDifference(color1: number[], color2: number[]) {
  const [r1, g1, b1] = color1;
  const [r2, g2, b2] = color2;
  const diff = Math.sqrt((r2 - r1) ** 2 + (g2 - g1) ** 2 + (b2 - b1) ** 2);
  return diff;
}

export {
  getImgsColor,
  hexToRgb,
  findClosestColor,
  reverseColor,
  rgbToHex,
  getColorDifference,
};
