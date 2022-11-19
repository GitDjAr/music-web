import type { ComputedRef } from 'vue'
import { useStore } from "vuex"
import { computed } from 'vue'
const store = useStore()
/**
 * 模拟 mapStore
 * 解析  'c/f'
 * let aa = { a: 10, c: { f: 10 } }
 */
export function mapStore(arr: Array<string>): ComputedRef[] {
  const AR = arr.map(e => computed(item => {
    let el: any = null
    e.split('/').map(f => {
      el ? el = el[f] : el = store.state[f]
    })
    return el
  }))
  return AR
}

/**
 * 模拟 mapGetter
 */
export function mapGetter(arr: Array<string>): ComputedRef[] {
  const AR = arr.map(e => computed(item => store.getters[e]))
  return AR
}


