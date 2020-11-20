import Storage from "../../util/Storage";

const state = () => ({
  lastPictureList: [], //список опций картинок которые создавал пользователь
  isSaveCurrentPictureOptionsSuccess: null,
  isSaveCurrentPictureOptionsFailure: null,
  isLoadSavedOptionsSuccess: null,
  isLoadSavedOptionsFailure: null,
  isDeleteSelectedOptionsFromStorageSuccess: null,
  isDeleteSelectedOptionsFromStorageFailure: null,
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
  addSavedOptionsToList(state, payload){
    state.lastPictureList = state.lastPictureList.concat(payload)
  },
  loadSavedOptionsSuccess(state, payload){
    state.isSaveCurrentPictureOptionsSuccess = payload
  },
  loadSavedOptionsFailure(state, payload){
    state.isSaveCurrentPictureOptionsFailure = payload
  },
  deleteSelectedOptionsFromList(state, selectedOption) {
    state.lastPictureList = state.lastPictureList.filter(options => {
      return options.id !== selectedOption.id
    })
  },
  deleteSelectedOptionsFromStorageSuccess(state, payload) {
    state.isDeleteSelectedOptionsFromStorageSuccess = payload
  },
  deleteSelectedOptionsFromStorageFailure(state, payload) {
    state.isDeleteSelectedOptionsFromStorageFailure = payload
  },
}

const actions = {
  saveCurrentPictureOptions(context) {
    const currentOptions = context.rootState.options
    //добавим id для объекта с текущими опциями
    //получим первый элемент из списка опций
    const firstOptions = context.state.lastPictureList[0]
    let lastId = 0
    if (firstOptions !== undefined){
      lastId = firstOptions.id
    }
    currentOptions.id = ++lastId
    
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
        context.commit('addSavedOptionsToList', result)
        resolve(`список настроек загружен из localStorage`)
      } else {
        context.commit('loadSavedOptionsFailure', true)
        reject(`Error! не удалось загрузить список из localStorage`)
        
      }
    }))
  },
  deleteSelectedOptionsFromStorage(context, selectedOptions){
    return new Promise((resolve, reject) => {
      const isSuccess = new Storage(selectedOptions).remove()
      if (! isSuccess){
        context.commit('deleteSelectedOptionsFromStorageFailure', true)
        reject(`Ошибка при удалении ${selectedOptions} из localstorage`)
      } else {
        context.commit('deleteSelectedOptionsFromStorageSuccess', true)
        context.commit('deleteSelectedOptionsFromList', selectedOptions)
      }
    })
  },
}

export default {
  state,
  mutations,
  actions,
}