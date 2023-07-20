import { DateFormat } from "./type/funType";
import * as DateT from "./type/funType";
export { DateT };

// 时间格式化
export function formatTime(time: number, format: DateFormat = DateFormat.ms) {
  const date = new Date(time);
  const min = date.getMinutes();
  const sec = date.getSeconds();
  return format
    .replace("mm", `${min < 10 ? "0" + min : min}`)
    .replace("ss", `${sec < 10 ? "0" + sec : sec}`);
}

// 年月日
interface DateObj {
  [key: string]: number;
}

export function formatformat(
  date?: string | number | Date,
  fmt: string = "yyyy-MM-dd",
): string {
  const d = new Date(date || new Date());
  const obj: DateObj = {
    y: d.getFullYear(),
    M: d.getMonth() + 1,
    d: d.getDate(),
    q: Math.floor((d.getMonth() + 3) / 3),
    w: d.getDay(),
    H: d.getHours(),
    h: d.getHours() % 12 === 0 ? 12 : d.getHours() % 12,
    m: d.getMinutes(),
    s: d.getSeconds(),
    S: d.getMilliseconds(),
  };
  const week = ["日", "一", "二", "三", "四", "五", "六"];
  const pad = (val: number, len: number): string =>
    val.toString().padStart(len, "0");
  for (const i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      fmt = fmt.replace(new RegExp(`${i}+`, "g"), (m) => {
        const val = obj[i];
        if (i === "w") return (m.length > 2 ? "星期" : "周") + week[val];
        return m.length === 1 ? val.toString() : pad(val, m.length);
      });
    }
  }
  return fmt;
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
