export function useAuthSocial() {
  const config = useRuntimeConfig()

  const platforms = [
    {
      name: `Google`,
      icon: 'custom:google',
      to: `${config.public.urlApi}/auth/google`,
    },
    {
      name: `Apple`,
      icon: 'custom:apple',
      to: `/auth/apple/start`,
    },
    {
      name: 'Telegram',
      icon: 'custom:telegram',
      to: `/auth/tg/start`,
    },
    // {
    //   name: 'VK',
    //   icon: 'custom:vk',
    //   to: `/auth/vk/start`,
    // },
  ]

  return { platforms }
}
