import {reactive,watch} from 'vue'
import { Howler, Howl } from 'howler';
class Player {
  constructor(name,option){
    // this.name = name
    this.options = {
      playstatus: false,
      ...option,
    }
  }
  playFun(){
    console.log('playFun',this);
    // options.playstatus = !options.playstatus
  }
  spuse(){

  }
  next(){

  }
  prov(){

  }

  get playstatus():boolean{
    return this.options.playstatus
  }
  
}
// const Play = reactive(new Player('palyer-sound',{}) )

// setTimeout(() => {
//   console.log(Play.playstatus);
  
// Play.playFun = ()=>{}    
// console.log(Play.playstatus);

// }, 1000);
// watch(()=>Play,(newVal)=>{
//   console.log(newVal);
// })
let b = new Player('palyer-sound',{})
b.playFun()
export default Player