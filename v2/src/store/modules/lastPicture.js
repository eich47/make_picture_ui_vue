import Storage from "../../util/Storage";

const state = () => ({
  lastPictureList: [], //список опций картинок которые создавал пользователь
  isSaveCurrentPictureOptionsSuccess: null,
  isSaveCurrentPictureOptionsFailure: null,
})

const mutations = {
  saveCurrentPictureOptionsSuccess(state, payload){
    state.isSaveCurrentPictureOptionsSuccess = payload
  },
  saveCurrentPictureOptionsFailure(state, payload){
    state.isSaveCurrentPictureOptionsFailure = payload
  },
  addCurrentOptionsToList(state, payload){
    state.lastPictureList.unshift(payload)
  },
}

const actions = {
  saveCurrentPictureOptions(context) {
    const currentOptions = context.rootState.options
    return new Promise((resolve, reject) => {
      const result = new Storage(currentOptions).saveOptions()
      if (result){
        context.commit('saveCurrentPictureOptionsSuccess', true)
        context.commit('addCurrentOptionsToList', currentOptions)
        resolve()
      } else {
        context.commit('saveCurrentPictureOptionsFailure', true)
        reject(`ошибка при работе с хранилищем`)
      }
    })
  },
}

export default {
  state,
  mutations,
  actions,
}