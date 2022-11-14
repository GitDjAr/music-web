// 时间格式化
export function formatTime(time: number, format: string = 'mm:ss') {
  const date = new Date(time)
  const min = date.getMinutes()
  const sec = date.getSeconds()
  return format.replace('mm', min < 10 ? `${min}` : min).replace('ss', sec < 10 ? `0${sec}` : sec)
}

