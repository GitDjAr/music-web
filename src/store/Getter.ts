
const Getter = {
  loginStatus:(store:any)=>{
    return store.app.loginStatus
  },
  userInfo:(store:any)=>{
    return store.app.userInfo
  }
}
export default Getter