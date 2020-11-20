import Storage from "../../util/Storage";

const state = () => ({
  lastPictureList: [], //список опций картинок которые создавал пользователь
  isSaveCurrentPictureOptionsSuccess: null,
  isSaveCurrentPictureOptionsFailure: null,
  isLoadSavedOptionsSuccess: null,
  isLoadSavedOptionsFailure: null,
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
  addSaveOptionsToList(state, payload){
    state.lastPictureList = state.lastPictureList.concat(payload)
  },
  loadSavedOptionsSuccess(state, payload){
    state.isSaveCurrentPictureOptionsSuccess = payload
  },
  loadSavedOptionsFailure(state, payload){
    state.isSaveCurrentPictureOptionsFailure = payload
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
  loadSavedOptions(context){
    return new Promise(((resolve, reject) => {
      const result = new Storage(null).getOption()
      if(result){
        context.commit('loadSavedOptionsSuccess', true)
        context.commit('addSaveOptionsToList', result)
        resolve(`список настроек загружен из localStorage`)
      } else {
        context.commit('loadSavedOptionsFailure', true)
        reject(`Error! не удалось загрузить список из localStorage`)
        
      }
    }))
  },
}

export default {
  state,
  mutations,
  actions,
}