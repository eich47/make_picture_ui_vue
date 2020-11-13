import formElementSubmit from './component/formElementSubmit.js'
import rootComponent from './component/rootComponent.js'
import formRoot from './component/formRoot.js'
import formElement from './component/formElement.js'
import formElementNumber from './component/formElementNumber.js'
import formElementColor from './component/formElementColor.js'
import formElementText from './component/formElementText.js'
import formElementRadio from './component/formElementRadio.js'
import formElementCheckbox from './component/formElementCheckbox.js'
import blockImage from './component/blockImage.js'
import info from './component/info.js'
import {pictureOptions} from './component/constant.js'
import lastPicture from './component/lastPicture.js'
import lastOptionsPicture from './component/lastOptionsPicture.js'

document.addEventListener('DOMContentLoaded', ready)

function ready() {
  
  /**
   * vues store
   */
  const storeApp = new Vuex.Store({
    state:{
      isLoadingPicture: false, //загружается картинка
      pictureOptions: {
        width: 0, //ширина картинки
        height: 0, //высота картинки
        color: '#c0c0c0', //цвет по умолчанию
        text: '', //текст
        extension: 'jpg', //расширение картинки
        texture: false, //добавлять ли текстуру
        maxSizeDimension: 5000, //максимальная ширина/высота картинки
      },
      pictureOptionsValidationStatus:{
        isValidWidth: false,
        isValidHeight: false,
        isValidMaxSizeWidth: true,
        isValidMaxSizeHeight: true,
      },
      lastPicturesList: [], //список параметров последних созданных картинок
    },
    mutations: {
      changeStatusIsLoadingPictureMutation(state, payload){
        state.isLoadingPicture = payload.flag
        // console.trace('111')
      },
      //изменение в сторе ширины
      changeWidthMutation(state, payload){
        state.pictureOptions.width = payload.number
      },
      //прошла ли ширина валидацию
      changeValidWidthMutation(state, payload){
        state.pictureOptionsValidationStatus.isValidWidth = payload.valid
      },
      //изменение в сторе высоты
      changeHeightMutation(state, payload){
        state.pictureOptions.height = payload.number
      },
      //прошла ли высота валидацию
      changeValidHeightMutation(state, payload){
        state.pictureOptionsValidationStatus.isValidHeight = payload.valid
      },
      //меньше ли ширина максимального размера
      setValidMaxSizeWidthMutation(state, payload){
        state.pictureOptionsValidationStatus.isValidMaxSizeWidth = payload.valid
      },
      //меньше ли высота максимального размера
      setValidMaxSizeHeightMutation(state, payload){
        state.pictureOptionsValidationStatus.isValidMaxSizeHeight = payload.valid
      },
      setColor(state, payload){
        state.pictureOptions.color = payload.color
      },
      setText(state, payload){
        state.pictureOptions.text = payload.text
      },
      setExtension(state, payload){
        state.pictureOptions.extension = payload.extension
      },
      setTexture(state, payload){
        state.pictureOptions.texture = payload.texture
      },
      loadSavedPictures(state, payload){
        state.lastPicturesList = payload.lastPic
      },
      loadSelectedOptionsMutation(state, payload){
        state.pictureOptions = payload.options
      },
      deleteSelectedOptions(state, payload){
        const selectedOptions = payload.options
        const listAfterDelete = state.lastPicturesList.filter((options)=>{
          const optionsJson = JSON.stringify(options)
          const selectedOptionsJson = JSON.stringify(selectedOptions)
          return optionsJson !== selectedOptionsJson
        })
        state.lastPicturesList = listAfterDelete
        localStorage.setItem('pictureOptions', listAfterDelete)
      }
    },
    actions: {
      checkWidth({commit, state}, payload){
        let {number: width} = payload
        if (width <= 0){
          //указываем что валидация не прошла
          commit({
            type: 'changeValidWidthMutation',
            valid: false,
          });
        } else {
          commit({
            type: 'changeValidWidthMutation',
            valid: true,
          })
        }
        
        if (width > state.pictureOptions.maxSizeDimension){
          commit({
            type: 'setValidMaxSizeWidthMutation',
            valid: false
          })
        } else {
          commit({
            type: 'setValidMaxSizeWidthMutation',
            valid: true
          })
        }
  
        //записываем значение в стор
        commit({
          type: 'changeWidthMutation',
          number: width,
        })
      },
  
      checkHeight({commit, state}, payload){
        let {number: height} = payload
        if (height <= 0){
          //указываем что валидация не прошла
          commit({
            type: 'changeValidHeightMutation',
            valid: false,
          })
        } else {
          commit({
            type: 'changeValidHeightMutation',
            valid: true,
          })
        }
  
  
        if (height > state.pictureOptions.maxSizeDimension){
          commit({
            type: 'setValidMaxSizeHeightMutation',
            valid: false
          })
        } else {
          commit({
            type: 'setValidMaxSizeHeightMutation',
            valid: true
          })
        }
        
        //записываем значение в стор
        commit({
          type: 'changeHeightMutation',
          number: height,
        })
      },
      
      getLastPicture({commit, state}){
        let picturesListString = window.localStorage.getItem(pictureOptions)
        if(picturesListString !== ""){
          let picturesList = JSON.parse(picturesListString)
          commit({
            type: 'loadSavedPictures',
            lastPic: picturesList,
          })
        }
      },
      
      loadSelectedOptions({commit, state, dispatch}, payload){
        const o = payload.options
        const clone = Object.assign({}, o)
        
        commit({
          type: 'loadSelectedOptionsMutation',
          options: clone
        });
        
        dispatch({
          type: 'checkWidth',
          number: clone.width
        });
        
        dispatch({
          type: 'checkHeight',
          number: clone.height
        })
        
        
      }
    },
    
    getters: {
      isValidWidth: state => {
        return state.pictureOptionsValidationStatus.isValidWidth
      },
      isValidHeight: state => {
        return state.pictureOptionsValidationStatus.isValidHeight
      },
      isValidMaxSize: state => {
        return state. pictureOptionsValidationStatus.isValidMaxSizeWidth
          && state.pictureOptionsValidationStatus.isValidMaxSizeHeight
      },
      getWidth: state => {
        return state.pictureOptions.width
      },
      getHeight: state => {
        return state.pictureOptions.height
      },
      getColor: state => {
        return state.pictureOptions.color
      },
      getExtension: state => {
        return state.pictureOptions.extension
      },
      getTexture: state => {
        return state.pictureOptions.texture
      },
      getText: state => {
        return state.pictureOptions.text
      }
    }
  })
  
  
  
  
  /**
   * сама форма
   */
  Vue.component('form-root',formRoot );
  
  
  /**
   * враппер для элементов формы
   */
  Vue.component('form-element', formElement );
  
  
  /**
   * input type number
   */
  Vue.component('form-element-number', formElementNumber);
  
  
  /**
   * input type color
   */
  Vue.component('form-element-color', formElementColor)
  
  
  /**
   * input type text
   */
  Vue.component('form-element-text', formElementText)
  
  /**
   * radio button
   */
  Vue.component('form-element-radio', formElementRadio)
  
  
  /**
   * checkbox
   */
  Vue.component('form-element-checkbox', formElementCheckbox)
  
  /**
   * submit button
   */
  Vue.component('form-element-submit', formElementSubmit)
  
  /**
   * общий компонент для всего приложения
   */
  Vue.component('root-component', rootComponent)
  
  /**
   * Блок для картинки загруженной по апи
   */
  Vue.component('block-image', blockImage)
  
  /**
   * Сообщение при загруке страницы
   */
  Vue.component('info', info )
  
  /**
   * Список параметров последних картинок
   */
  Vue.component('last-picture-list', lastPicture)
  
  /**
   * Компонент для отображении ранее введенных опций картинки
   */
  Vue.component('last-options-picture', lastOptionsPicture )
  
  
  /**
   * vue
   */
  let app = new Vue({
    el: '#app',
    store: storeApp,
  })
}