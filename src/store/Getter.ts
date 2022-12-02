
const Getter = {
  loginStatus: (store: any): boolean => {
    return JSON.stringify(store.app.userInfo) !== '{}'
  },
  userInfo: (store: any): object => {
    return store.app.userInfo
  },
  CurPlaySong: (store: any) => {
    return store.app.CurPlaySong
  },
  tagColor: (store: any): string => {
    let i = Math.floor(Math.random() * 14)
    return store?.app?.tagColor?.[i]
  }
}
export default Getter
