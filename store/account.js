export const state = () => ({
  address: null,
})

export const mutations = {
  set(state, address) {
    state.address = address
  },
  unset(state) {
    state.address = null
  },
}
