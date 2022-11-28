import { ref } from 'vue'
export default function useLoading() {
  const loading = ref<boolean>(false)
  const setLoading = (v: boolean) => {
    loading.value = v
  }
  return { setLoading, loading }
}