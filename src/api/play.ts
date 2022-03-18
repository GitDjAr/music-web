import requier from "../utils/requiers"
type Data = Object | string

export function GetSong(data: Data = {}, method?: any) {
  return requier({
    url: "/song/url",
    method: method || "POST",
    data: data,
    show: true,
  })
}
