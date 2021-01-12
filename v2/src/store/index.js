import Vue from 'vue'
import Vuex from 'vuex'
import UrlMaker from "../util/UrlMaker";
import picture from "./modules/picture";
import lastPicture from "./modules/lastPicture";
import Validator from "../util/Validator";
import WidthIsCorrectValidation from "../util/validatorCases/WidthIsCorrectValidation";
import WidthMaxValueValidation from "../util/validatorCases/WidthMaxValueValidation";
import MaxLengthTextValidation from "../util/validatorCases/MaxLengthTextValidation";

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
      isWidthValid: false, //обязательное поле
      isHeightValid: false, //обязательное поле
      maxWidth: 5000, //максимальная ширина/высота картинки
      widthErrorMessage: ``, //текст ошибки если значение ширины картинки не валидное
      heightErrorMessage: ``, //текст ошибки если значение высоты картинки не валидное
      maxLengthText: 200, //максимальное количество символов для текста
      isTextValid: true, //не обязательное поле
      textErrorMessage: ``, //текст ошибки если введенный текст не валидный
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
    setCurrentOptions(state, payload){
      const clone = Object.assign({}, payload)
      const res = delete clone.id
      if (!res){
        console.log(`не удалось удалить id из объекта ${clone}`);
      }
      state.options = clone
    },
    setIsFieldValid(state, payload){
      const {fieldName, value} = payload
      state.options[fieldName] = value
    },
    //сообщение о некорректном значении для ширины
    setWidthErrorMessage(state, payload){
      state.options.widthErrorMessage = payload
    },
    //сообщение о некорректном значении для высоты
    setHeightErrorMessage(state, payload){
      state.options.heightErrorMessage = payload
    },
    //сообщение о не корректном значении для текста
    setTextErrorMessage(state, payload){
      state.options.textErrorMessage = payload
    },
    
  },
  actions: {
    checkWidth(context, width){
      //добавим в state введнное пользователем значение
      context.commit('setWidth', width)
      //провалидируем введенное пользователем значение
      const maxWidth = context.state.options.maxWidth
      const result = new Validator([
        new WidthIsCorrectValidation(width, maxWidth),
        new WidthMaxValueValidation(width, maxWidth),
      ]).checking()

      context.commit('setIsFieldValid', {
        fieldName: 'isWidthValid',
        value: result.isValid,
      })
      context.commit('setWidthErrorMessage', result.invalidMessage)
    },
    //ширина картинки
    checkHeight(context, height){
      //добавим в state введнное пользователем значение
      context.commit('setHeight', height)
      //провалидируем введенное пользователем значение
      const maxWidth = context.state.options.maxWidth
      const result = new Validator([
        new WidthIsCorrectValidation(height, maxWidth),
        new WidthMaxValueValidation(height, maxWidth),
      ]).checking()
      context.commit('setIsFieldValid', {
        fieldName: 'isHeightValid',
        value: result.isValid,
      })
      context.commit('setHeightErrorMessage', result.invalidMessage)
    },
    checkText(context, text){
      context.commit('setText', text)
      const maxLength = context.state.options.maxLengthText
      const result = new Validator([
        new MaxLengthTextValidation(text, maxLength),
      ]).checking()
      
      context.commit('setIsFieldValid', {
        fieldName: 'isTextValid',
        value: result.isValid,
      })
      context.commit('setTextErrorMessage', result.invalidMessage)
    },
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
