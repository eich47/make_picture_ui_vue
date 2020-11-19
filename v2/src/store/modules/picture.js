const state = () => ({
  isStartLoadingImage: false,
  isLoadedSuccess: null,
  isLoadedFailure: null,
})

const mutations = {
  loadImageStart(state, payload) {
    state.isStartLoadingImage = payload
  },
  loadImageSuccess(state) {
    state.isLoadedSuccess = true
  },
  loadImageFailure(state) {
    state.isLoadedFailure = true
  },
}

const actions = {
  loadImage(context){
    context.commit('setUrl')
    context.commit('loadImageStart', true)
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = function () {
        context.commit('loadImageStart', false)
        context.commit('loadImageSuccess', true)
        resolve(true)
      }
      img.onerror = function() {
        context.commit('loadImageStart', false)
        context.commit('loadImageFailure', true)
        reject(context.rootState.url)
      }
      img.src = context.rootState.url
    })
  },
}

export default {
  state,
  actions,
  mutations,
}