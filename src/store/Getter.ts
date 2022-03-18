
const Getter = {
  loginStatus:(store)=>{
    return store.app.loginStatus
  },
  userInfo:(store)=>{
    return store.app.userInfo
  }
}
export default Getter