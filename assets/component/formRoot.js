export default {
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
    getColor: function ( {color: user_color} ) {
      let color = false;
      //если пользователей выбрал цвет (например #000080)
      if( user_color.length === 7){
        color = user_color.slice(1)
      }
      return color
    },
    getText: function ({text: user_text}) {
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
      
      let color = this.getColor(this.$store.state.pictureOptions)
      params.color = ( color === false ) ? '' : color
      
      let text = this.getText(this.$store.state.pictureOptions)
      params.text = ( text === false ) ? false : text
      
      let extension = this.getExtension(this.$store.state.pictureOptions)
      params.type = ( extension === false ) ? false : extension
      
      let texture = this.getTexture(this.$store.state.pictureOptions)
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
}