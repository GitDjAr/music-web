import { DateObj, DateFormat } from './type/funType'

// 时间格式化
export function formatTime(time: number, format: DateFormat = DateFormat.ms) {
  const date = new Date(time)
  const min = date.getMinutes()
  const sec = date.getSeconds()
  return format.replace('mm', `${min < 10 ? '0' + min : min}`).replace('ss', `${sec < 10 ? '0' + sec : sec}`)
}

// 年月日
export function formatformat(date?: string | number | Date, fmt: DateFormat = DateFormat.year) {
  date = new Date(date || new Date())
  var obj: DateObj = {
    y: date.getFullYear(), // 年份，注意必须用getFullYear
    M: date.getMonth() + 1, // 月份，注意是从0-11
    d: date.getDate(), // 日期
    q: Math.floor((date.getMonth() + 3) / 3), // 季度
    w: date.getDay(), // 星期，注意是0-6
    H: date.getHours(), // 24小时制
    h: date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 12小时制
    m: date.getMinutes(), // 分钟
    s: date.getSeconds(), // 秒
    S: date.getMilliseconds() // 毫秒
  }
  var week = ['天', '一', '二', '三', '四', '五', '六']
  for (var i in obj) {
    fmt = <DateFormat>fmt.replace(new RegExp(i + '+', 'g'), function (m) {
      var val = obj[i] + ''
      if (i === 'w') return (m.length > 2 ? '星期' : '周') + week[val]
      for (var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val
      return m.length === 1 ? val : val.substring(val.length - m.length)
    })
  }
  return fmt
}

/**
 * 计算两个时间之间相差的天数
 * @param date1 第一个时间字符串或时间戳
 * @param date2 第二个时间字符串或时间戳
 * @returns 两个时间之间相差的天数，如果参数无效返回 NaN
 */
export function diffDays(date1: string | number | Date, date2 = null): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2 || new Date());
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    return NaN;
  }
  const diff = Math.abs(d2.getTime() - d1.getTime());
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}
