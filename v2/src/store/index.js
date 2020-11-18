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
      state.options.width = payload
    },
    setHeight(state, payload){
      state.options.height = payload
    },
    setColor(state, payload){
      state.options.color = payload
    },
    setText(state, payload){
      state.options.text = payload
    },
    setExtension(state, payload){
      state.options.extension = payload
    },
    setTexture(state, payload){
      state.options.texture = payload
    },
    setIsValidData(state, payload){
      state.options.isValidAllData = payload
    },
    setIsLoading(state, payload){
      state.isLoading = payload
    },
  },
  actions: {
  },
  modules: {
  },
})
