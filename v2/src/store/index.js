import Vue from 'vue'
import Vuex from 'vuex'
import UrlMaker from "../util/UrlMaker";
import picture from "./modules/picture";
import lastPicture from "./modules/lastPicture";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false, //загрузка картинки
    isUserSendForm: false, //создал ли пользователь хоть одну картинку,
                          // на основании этого некоторые сообщения показываются 1 раз.
    url: "", //для обращения к апи
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
    setIsUserSendForm(state, payload){
      state.isUserSendForm = payload
    },
    setUrl(state){
      const url = new UrlMaker(state.options).buildUrl()
      const urlString = url.toString()
      state.url = urlString
    },
  },
  actions: {
  },
  modules: {
    picture,
    lastPicture,
  },
  getters: {
    getUrl: state => {
      return state.url
    },
    getIsUserSendForm: state => {
      return state.isUserSendForm
    },
  },
})
