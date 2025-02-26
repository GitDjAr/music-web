import request from "../utils/requires.js";
// 获取歌曲详情
export const getMusicDetail = (ids: Array<number>) => {
  return request({
    url: "/song/detail",
    method: "get",
    params: { ids: ids.join(",") },
  });
};
