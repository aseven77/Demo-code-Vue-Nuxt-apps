export const useActiveLink = () => {
  const state = useState<number | null>('active-link-id', () => null)

  const setActiveLink = (id: number | null) => {
    state.value = id
  }

  const isLinkActive = (id: number) => {
    return state.value === id
  }

  return {
    activeLinkId: readonly(state),
    setActiveLink,
    isLinkActive,
  }
}
