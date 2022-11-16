
const Getter = {
  loginStatus: (store: any) => {
    return JSON.stringify(store.app.userInfo) !== '{}'
  },
  userInfo: (store: any) => {
    return store.app.userInfo
  },
  CurPlaySong: (store: any) => {
    return store.app.CurPlaySong
  }
}
export default Getter
