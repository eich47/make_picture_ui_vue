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
      },
      pictureOptionsValidationStatus:{
        isValidWidth: false,
        isValidHeight: false,
      }
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
  
        //записываем значение в стор
        commit({
          type: 'changeHeightMutation',
          number: height,
        })
      }
    },
    
    getters: {
      isValidWidth: state => {
        return state.pictureOptionsValidationStatus.isValidWidth
      },
      isValidHeight: state => {
        return state.pictureOptionsValidationStatus.isValidHeight
      }
    }
  })
  
  
  
  
  /**
   * сама форма
   */
  Vue.component('form-root', {
    template: `
      <form v-on:submit.prevent="onSubmit">
      <!--размеры картинки-->
        <form-element
            class="dimension"
            v-bind:title="'Задайте ширину и высоту картинки'"
            v-bind:components="dimension"
            v-on:user-data="addDataForPictureOptions"
            ></form-element>
            
       <!--цвет картинки-->
       <form-element
            class="color"
            v-bind:title="'Выберите цвет'"
            v-bind:components="color"
            v-on:user-data="addDataForPictureOptions"></form-element>
            
       <!--текст на картике-->
       <form-element
            class="text"
            v-bind:title="'Задайте текст (не обязательно)'"
            v-bind:components="text"
            v-on:user-data="addDataForPictureOptions"></form-element>
            
       <!--выбор расширения для файла-->
       <form-element
            class="extension"
            v-bind:title="'Выберите расширение файла'"
            v-bind:components="extension"
            v-on:user-data="addDataForPictureOptions"
       ></form-element>
       
       <!--добавлять или нет текстуру-->
       <form-element
            class="texture"
            v-bind:title="'Добавьте текстуру (не обязательно)'"
            v-bind:components="texture"
            v-on:user-data="addDataForPictureOptions"
       ></form-element>
       
       <!--submit button-->
       <form-element-submit></form-element-submit>
      </form>
    `,
    data: function () {
      return {
        'dimension': [
          {
            name: 'form-element-number',
            label: 'ширина',
            inputName: 'width',
            isCorrect: true //если при отправке формы будут не корректные значения, то изменим на false
            //Изменное значение (false) будет передано в дочерний компонент и изменит его состояние
          },
          {
            name: 'form-element-number',
            label: 'высота',
            inputName: 'height',
            isCorrect: true,
          },
        ],
        'color': [
          {
            name: 'form-element-color',
            label: 'Цвет'
          },
        ],
        'text': [
          {
            name: 'form-element-text',
            label: 'Текст'
          }
        ],
        'extension': [
          {
            name: 'form-element-radio',
            label: 'Тип файла'
          }
        ],
        'texture': [
          {
            name: 'form-element-checkbox',
            label: 'Текстура'
          }
        ],
        //параметры которые нужны для отправки запроса к апи, получаем из формы
        pictureOptions: {
          width: 0,
          height: 0,
          user_color: '#c0c0c0',
          user_text: '',
          extension: 'jpg',
          texture: false,
          
        },
        oldUrl: null,
        currentUrl: null
      }
    },
    methods: {
      addDataForPictureOptions: function (dataFromUser) {
        Object.assign(this.pictureOptions, dataFromUser)
      },
      onSubmit: function () {
        // http://satyr.io/80x60
        //color
        // http://satyr.io/80x60/c0ffee
        //text
        //http://satyr.io/105x60?text=hello+world
        //type
        // http://satyr.io/80x60?type=jpg
        // texture
        // http://satyr.io/80x60?texture=cross
        
        // http://satyr.io/800x700/pink/?text=hello+world&type=jpg&texture=cross
        let paramsUrl = this.buildParamsForUrl()
        //если не удалось получить корректные обязательные параметры
        if (paramsUrl === false){
          return
        }
        
        const baseUrl = 'http://satyr.io'
        let url = this.buildUrl(baseUrl, paramsUrl)
        this.currentUrl = url
        //чтобы не обращаться к апи если параметры картинки не были изменены
        if( String(this.currentUrl) !== String(this.oldUrl) ){
          console.log(url)
          this.oldUrl = this.currentUrl
          this.$emit('url-ready', this.currentUrl)
          
          this.$store.commit({
            type: 'changeStatusIsLoadingPictureMutation',
            flag: true,
          })
        } else {
          console.log('url остался прежним!!!')
        }
        
        

      },
      getDimension: function ( {width, height}) {
        //устанавливаем isCorrect в false чтобы известить дочерний компонент
        //что его значения не корректные
        if(width === 0){
          this.dimension[0].isCorrect = false
        }
        if(height === 0){
          this.dimension[1].isCorrect = false
        }
        
        if (width === 0 || height === 0){
          return false
        }
        
        return `${width}x${height}`
      },
      getColor: function ( {user_color} ) {
        let color = false;
        //если пользователей выбрал цвет (например #000080)
        if( user_color.length === 7){
          color = user_color.slice(1)
        }
        return color
      },
      getText: function ({user_text}) {
        if( user_text === ''){
          return false
        }
        return user_text
      },
      getExtension: function ({extension}) {
        if (extension === ''){
          return false
        }
        
        return extension
      },
      getTexture: function ({texture}) {
        return texture
      },
      buildParamsForUrl: function () {
        let params = {}
        
        let dimension = this.getDimension(this.$store.state.pictureOptions)
        //так как ширина и высота обязательные атрибуты то они должны быть корректные,
        //иначе урл к апи будет не правильным
        if ( dimension === false){
          return false
        }
        params.widthAndHeight = dimension
        
        let color = this.getColor(this.pictureOptions)
        params.color = ( color === false ) ? '' : color
        
        let text = this.getText(this.pictureOptions)
        params.text = ( text === false ) ? false : text
        
        let extension = this.getExtension(this.pictureOptions)
        params.type = ( extension === false ) ? false : extension
        
        let texture = this.getTexture(this.pictureOptions)
        params.texture = ( texture === false ) ? false : 'cross'
        
        return params
      },
      //построим урл по которому будем делать запрос к апи
      buildUrl: function (baseUrl, paramsForUrl) {
        let {widthAndHeight, color, ...optionalParam } = paramsForUrl
        let pathName = `/${widthAndHeight}/${color}`
        let urlString = `${baseUrl}${pathName}`
        
        let url = new URL(urlString)
        
        for( let key in optionalParam){
          let value = optionalParam[key]
          if (value !== false ){
            url.searchParams.set(key, value )
          }
        }
        // url.searchParams.set('delay', '3g')
        
        return url
      }
    }
  });
  
  
  /**
   * враппер для элементов формы
   */
  Vue.component('form-element', {
    props: {
      title: {
        type: String,
        required: true,
      },
      components: {
        type: Array,
        required: true,
      }
    },
    methods: {
      inputDataUser: function (data) {
        //пробрасываем событие и данные дальше вверх
        this.$emit('user-data', data)
      }
    },
    template: `
      <div>
        <h2 class="h6 font-weight-bold" >{{title}}</h2>
        
        <template v-for="c in components">
            <component v-bind:is="c.name" v-bind:label="c.label"
             v-on:user-data="inputDataUser"
             v-bind:input-name="c.inputName"
             v-bind:is-correct="c.isCorrect"
             ></component>
        </template>
        
      </div>
    `
  });
  
  
  /**
   * input type number
   */
  Vue.component('form-element-number', {
    props: {
      label: {
        type: String,
        required: true,
      },
      inputName: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
      }
    },
    data: function(){
      return {
        'label_id': (Math.random() * (9e9 - 1e9) + 1e9).toFixed(0),
        // isCorrectNumber: true,
        isNumberToMuch: false,
        //TODO: сделать проверку на макс размер
        maxSize: 5000, //максимальный размер вводимого значения
        // isCorrectData: true, //т.к. нельзя изменять props то запишем их значение в data
        isTouched: false, //пробывал ли пользователь что-то вводить
        currentValue: null, //текущее значение введенное пользователем
      }
    },
    computed: {
      isCorrectNumber(){
        
        if( !this.isTouched || this.currentValue === null ){
          return true
        }
        
        if ( this.inputName === 'width'){
          return this.$store.state.pictureOptionsValidationStatus.isValidWidth
        } else if ( this.inputName === 'height'){
          return this.$store.state.pictureOptionsValidationStatus.isValidHeight
        } else {
          throw Error(`unknown field: ${this.inputName}`)
        }
      }
  
    },
    methods: {
      inputEvent: function (event) {
        //устнавливаем значения по умолчанию, чтобы сбросить ошибки
        // this.isCorrectNumber = true
        this.isNumberToMuch = false
        // this.isCorrectData = true
        
        let inputUser = event.target.value;
        let digital = Number(inputUser)
        this.currentValue = digital
        
        // if(digital <= 0){
        //   this.isCorrectNumber = false
        //   return
        // }
        // if(digital > this.maxSize){
        //   this.isNumberToMuch = true
        //   return
        // }
        
        //передаем родительскому компоненту введенное число и название ключа к которому относится число
        // this.$emit('user-data', {[this.inputName] :digital})
        
        //проверим и сохраним данные в state
        if (this.inputName === 'width'){
          this.$store.dispatch('checkWidth',{
            number: digital,
          })
        } else if (this.inputName === 'height'){
          this.$store.dispatch({
            type: 'checkHeight',
            number: digital,
          })
        } else {
          throw Error(`unknown field: ${this.inputName}`)
        }
        
      },
    },
    watch:{
      // isCorrect: function () {
      //   console.log('isCorrectData ' + this.isCorrect);
      //   return this.isCorrectData = this.isCorrect
      // }
    },
    template: `
        <div class="form-group row">
            <label v-bind:for="label_id" class="col-sm-2 col-md-3 col-form-label">{{label}}</label>
            <div class="col-sm-10 col-md-9">
                <input type="number" class="form-control"
                v-bind:name="inputName"
                v-bind:id="label_id"
                v-on:input.number="inputEvent"
                v-bind:class="[{'is-invalid': !isCorrectNumber}, {'is-invalid': isNumberToMuch}]"
                @focus.once="isTouched = true"
                >
                <div class="invalid-feedback" v-if="!isCorrectNumber">Введите корректный размер (макс. {{maxSize}})</div>
                <div class="invalid-feedback" v-if="isNumberToMuch">Максимальный размер {{maxSize}} px</div>
            </div>
        </div>
    `
  });
  
  
  /**
   * input type color
   */
  Vue.component('form-element-color', {
    props: {
      label: {
        type: String,
        required: true,
      }
    },
    data: function () {
      return {
        labelId: (Math.random() * (9e9 - 1e9) + 1e9).toFixed(0)
      }
    },
    methods: {
      selectColor: function (event) {
        let hexColor = event.target.value
        let hexColorObj = {user_color: hexColor}
        this.$emit('user-data', hexColorObj)
      }
    },
    template: `
      <div class="form-group row">
          <label v-bind:for="labelId" class="col-sm-2 col-md-3 col-form-label">{{ label }}</label>
          <div class="col-sm-10 col-md-9">
              <input type="color" class="form-control" name="user_color"
              v-bind:id="labelId"
              v-on:input="selectColor"
              value="#c0c0c0"
              >
          </div>
      </div>
    `
  })
  
  
  /**
   * input type text
   */
  Vue.component('form-element-text',{
    props: {
      label: {
        type: String,
        required: true,
      }
    },
    data: function () {
      return {
        labelId: (Math.random() * (9e9 - 1e9) + 1e9).toFixed(0)
      }
    },
    methods: {
      inputTextForPicture: function (event) {
        let text = event.target.value
        let textObj = {user_text : text}
        this.$emit('user-data', textObj)
      }
    },
    template: `
      <div class="form-group row">
          <label v-bind:for="labelId" class="col-sm-2 col-md-3 col-form-label">{{ label }}</label>
          <div class="col-sm-10 col-md-9">
              <input type="text" class="form-control" name="user_text"
              v-bind:id="labelId"
              v-on:input="inputTextForPicture">
          </div>
      </div>
    `
  })
  
  /**
   * radio button
   */
  Vue.component('form-element-radio',{
    props: {
      label: {
        type: String,
        required: true,
      }
    },
    data: function() {
      return {
        picked: 'jpg',
      }
    },
    watch:{
      picked: function () {
        let extensionObj = {extension: this.picked}
        return this.$emit('user-data', extensionObj)
        
      }
    },
    template: `
        <div class="form-group row">
          <label class="col-sm-2 col-md-3">{{label}}</label>
          <div class="col-sm-10 col-md-9">
              <div class="custom-control custom-radio">
                  <input type="radio"
                  name="customRadio"
                  class="custom-control-input"
                  id="radiojpg"
                  value="jpg"
                  v-model="picked">
                  <label class="custom-control-label" for="radiojpg">jpg</label>
              </div>
              <div class="custom-control custom-radio">
                  <input type="radio"
                  name="customRadio"
                  class="custom-control-input"
                  id="radiogif"
                  value="gif"
                  v-model="picked">
                  <label class="custom-control-label" for="radiogif">gif</label>
              </div>
              <div class="custom-control custom-radio">
                  <input type="radio"
                  name="customRadio"
                  class="custom-control-input"
                  id="radiopng"
                  value="png"
                  v-model="picked">
                  <label class="custom-control-label" for="radiopng">png</label>
              </div>
          </div>
        </div>
    `
  })
  
  
  /**
   * checkbox
   */
  Vue.component('form-element-checkbox', {
    props: {
      label: {
        type: String,
        required: true,
      }
    },
    data: function(){
      return {
        checked: false
      }
    },
    watch: {
      checked: function () {
        return this.$emit('user-data', {texture: this.checked})
      }
    },
    template: `
      <div class="form-group row">
        <label class="col-sm-2 col-md-3 ">{{label}}</label>
        <div class="col-sm-10 col-md-9">
          <div class="custom-control custom-checkbox">
              <input type="checkbox"
              name="user_texture"
              class="custom-control-input"
              id="texture"
              v-model="checked"
              >
              <label for="texture" class="custom-control-label">добавить</label>
          </div>
        </div>
      </div>
    `
  })
  
  /**
   * submit button
   */
  Vue.component('form-element-submit', {
    computed: {
      isLoading() {
         return this.$store.state.isLoadingPicture
      },
      isValidUserData(){
        return this.$store.getters.isValidWidth
        && this.$store.getters.isValidHeight
      }
    },
    template: `
      <div class="form-group row">
          <div class="col-sm-10 col-md-9 ml-auto">
              <input type="submit"
                        class="form-control bg-light"
                        value="Получить картинку"
                        :disabled="isLoading || !isValidUserData"
                        >
          </div>
      </div>
    `
  })
  
  /**
   * общий компонент для всего приложения
   */
  Vue.component('root-component', {
    data: function(){
      return {
        url: null
      }
    },
    methods: {
      onUrlReady: function (url) {
        console.log(`url = ${url}`);
        this.url = url
      }
    },
    template: `
      <div class="container mt-3">
          <h1 class="h3 text-center mb-3">Создание картинки по параметрам</h1>
          <div class="row">
              <div class="col-md-5">
                  <form-root
                    v-on:url-ready="onUrlReady"
                  ></form-root>
              </div>
              <div class="col">
                <block-image
                    v-bind:url="url"
                ></block-image>
              </div>
          </div>
      </div>
    `
  })
  
  /**
   * Блок для картинки загруженной по апи
   */
  Vue.component('block-image', {
    props: ['url'],
    computed: {
      isParams: function () {
        if ( this.url === null){
          return false
        }
        return true
      },
      isLoadingState() {
        return this.$store.state.isLoadingPicture
      }
    },
    methods: {
      onClick: function () {
        console.log(document);
        let link = document.createElement('a')
        link.setAttribute('href', this.url)
        link.setAttribute('target', '_blank')
        document.body.appendChild(link)
        link.click()
        link.remove()
      },
      onLoadPicture: function () {
        this.$store.commit({
          type: 'changeStatusIsLoadingPictureMutation',
          flag: false,
        })
      }
    },
    template: `
      <div>
      <div v-if="isLoadingState">dfsfsfsd</div>
        <info v-if="!isParams"></info>
        
        <div v-if="isLoadingState && isParams">загрузка....</div>
        
        <template v-if="isParams">
          <div>
            <img v-bind:src="url"
                class="mr-3 img-fluid"
                v-bind:alt="url"
                v-on:load="onLoadPicture"
            >
          </div>
            <div class="mt-3"
                v-if="!isLoadingState"
            >
              <p>Чтобы сохранить картинку, нажмите на ней правой кнопкой мыши и выберите подходящий пункт меню.</p>
              <p>Вы также можете открыть картинку в новой вкладке кликнув по ссылке
                <a href="#"
                   v-on:click.prevent="onClick"
                  >открыть</a>
              </p>
            </div>
        </template>
      </div>
    
    `
  })
  
  /**
   * Сообщение при загруке страницы
   */
  Vue.component('info', {
    template: `
      <div>
        Выберите параметры и нажмите на кнопку "получить картинку"
      </div>
    `
  })
  
  /**
   * vue
   */
  let app = new Vue({
    el: '#app',
    store: storeApp,
  })
}