// 缓存接口
// export function cache(key: string, value: any, expire: number = 0) {
//   if (expire > 0) {
//     localStorage.setItem(key, JSON.stringify({ value, expire }));
//   } else {
//     localStorage.setItem(key, JSON.stringify(value));
//   }
// }

import LRUCache from "lru-cache";
const options = {
  max: 1000,
  ttl: 1000 * 60 * 60 * 24,
  // sizeCalculation : ()  =>  { 
  //   return  1 
  // } ,
};
const Cache = new LRUCache(options);

export default Cache
