<script setup lang="ts">
const url = useRequestURL()

const code = url.searchParams.get('code')
const stateFromUrl = url.searchParams.get('state')
const deviceId = url.searchParams.get('device_id') ?? ''

const cookieState = useCookie('vk_state')
const cookieVerifier = useCookie('vk_verifier')

if (!code || !stateFromUrl) {
  throw createError({
    statusCode: 400,
    statusMessage: 'Отсутствуют обязательные параметры авторизации (code/state)',
  })
}
if (!cookieState.value || !cookieVerifier.value) {
  throw createError({
    statusCode: 400,
    statusMessage: 'Отсутствуют сохранённые параметры авторизации (state/verifier)',
  })
}
if (stateFromUrl !== cookieState.value) {
  throw createError({
    statusCode: 400,
    statusMessage: 'Некорректный параметр state',
  })
}

const body = {
  code,
  state: stateFromUrl,
  code_verifier: cookieVerifier.value,
  device_id: deviceId,
  redirect: 'follow',
}

const authStore = useAuthStore()
await useAuthCallback('vk-auth', () => authStore.vkAuth(body), {
  onSuccess: () => {
    cookieState.value = undefined
    cookieVerifier.value = undefined
  },
})
</script>
