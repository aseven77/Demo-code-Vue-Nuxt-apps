import type { Ref } from 'vue'
import { ref } from 'vue'

export function useAsyncAction(
  loading?: Ref<boolean>,
  onError?: (error: unknown) => void,
) {
  const _loading = loading ?? ref(false)

  async function run<T>(action: () => Promise<T>): Promise<T | undefined> {
    try {
      _loading.value = true
      return await action()
    }
    catch (error: unknown) {
      onError?.(error)
      return undefined
    }
    finally {
      _loading.value = false
    }
  }

  return { loading: _loading, run }
}
