export interface DateObj {
  y: number;
  M: number;
  d: number;
  q: number;
  w: number;
  H: number;
  h: number;
  m: number;
  s: number;
  S: number;
}

export enum DateFormat {
  year = 'yyyy-MM-dd HH:mm:ss',
  ymd = 'yyyy-MM-dd',
  yM = 'yyyy-MM',
  y = 'yyyy',
  day = 'MM-dd HH:mm:ss',
  MdHm = 'MM-dd HH:mm',
  Md = 'MM-dd',
  M = 'MM',
  dHms = 'dd HH:mm:ss',
  dHm = 'dd HH:mm',
  dH = 'dd HH',
  Hms = 'HH:mm:ss',
  Hm = 'HH:mm',
  H = 'HH',
  ms = 'mm:ss',
  m = 'mm',
  s = 'ss',
}
