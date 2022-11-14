// 获取图片主要色彩
export function getImgeColor(img: string, Isreverse: boolean = false) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    canvas.width = 100
    canvas.height = 100
    const ctx = canvas.getContext('2d')
    const imgObj = new Image()
    // 处理跨域  https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
    imgObj.crossOrigin = "Anonymous";
    imgObj.src = img
    let color = ''
    imgObj.onload = () => {
      ctx?.drawImage(imgObj, 0, 0)
      const data = ctx?.getImageData(0, 0, 100, 100).data
      // color = `rgb(${data[0]},${data[1]},${data[2]})`
      resolve(getMainColor(data, Isreverse))
    }
  })
}

function getMainColor(data, Isreverse: boolean = false) {
  const temp = {}
  const len = data.length

  let max = 0;
  let color = ''
  let i = 0
  while (i < len) {
    if (data[i + 3] !== 0) {
      const k = `${data[i]}, ${data[i + 1]}, ${data[i + 2]}, ${(data[i + 3] / 255)}`
      temp[k] = temp[k] ? temp[k] + 1 : 1
      if (temp[k] > max) {
        max = temp[k]
        color = k
      }
    }
    i += 4
  }
  // let c = color.split(',').map(item => parseInt(item))
  // if (getContrastYIQ(c)) {
  if (Isreverse) {
    return reverseColor(color)
  }
  return `rgba(${color})`
}

// 颜色反转 rgba
export function reverseColor(color: string) {
  const colorArr = color.split(',')
  const len = colorArr.length
  let i = 0
  while (i < len) {
    colorArr[i] = 255 - parseInt(colorArr[i])
    i++
  }
  const rgba = colorArr.join(',')
  return `rgba(${rgba})`
}
// 适配 文本
export function getContrastYIQ(color: number[]) {
  const [r,g,b,a] = color
  var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  // return (yiq >= 128) ? 'black' : 'white';
  return (yiq >= 128)
}
