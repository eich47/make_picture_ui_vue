import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false, //загрузка картинки
    options:{
      width: 0,
      height: 0,
      color: '#c0c0c0',
      text: ``,
      extension: 'jpg',
      texture: false,
      isValidAllData: false, //все ли параметры для картики корректны
    },
  },
  mutations: {
    setWidth(state, payload){
      state.width = payload
    },
    setHeight(state, payload){
      state.height = payload
    },
    setColor(state, payload){
      state.color = payload
    },
    setText(state, payload){
      state.text = payload
    },
    setExtension(state, payload){
      state.extension = payload
    },
    setTexture(state, payload){
      state.texture = payload
    },
    setIsValidData(state, payload){
      state.isValidAllData = payload
    },
  },
  actions: {
  },
  modules: {
  },
})
