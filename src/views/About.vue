<!--  -->
<template>
  <div class=''></div>
</template>

<script lang='ts' setup>
import { ref, reactive, Ref, isRef, toRef, toRefs, unref} from 'vue'
function aa(x:Ref|string){
  // if(isRef(x)){
    //   console.log(x.value)
  // }else{
    //   console.log(x)
  // }
    console.log(unref(x))
}
let b = ref({
  a:1,
  bc:2
})
let c = toRefs(b)

const state = reactive({
  count: 0,
})

</script>
<style scoped lang='scss'>

</style>
