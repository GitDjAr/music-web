
const Getter = {
  loginStatus:(store:any)=>{
    return store.app.loginStatus
  },
  userInfo:(store:any)=>{
    return store.app.userInfo
  },
  CurPlaySong:(store:any)=>{
    return store.app.CurPlaySong
  }
}
export default Getter
