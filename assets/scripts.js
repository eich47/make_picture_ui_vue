document.addEventListener('DOMContentLoaded', ready)

function ready() {
  
  /**
   * сама форма
   */
  Vue.component('form-root', {
    template: `
      <form>
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
            v-bind:title="'Текст'"
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
            v-bind:title="'Добавление текстуры'"
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
            inputName: 'width'
          },
          {
            name: 'form-element-number',
            label: 'высота',
            inputName: 'height'
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
            label: 'Введите текст'
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
          user_color: '',
          user_text: '',
          extension: '',
          texture: false,
          
        }
      }
    },
    methods: {
      addDataForPictureOptions: function (dataFromUser) {
        Object.assign(this.pictureOptions, dataFromUser)
      }
    }
  });
  
  
  /**
   * враппер для элементов формы
   */
  Vue.component('form-element', {
    props: [
      'title',
      'components'
    ],
    methods: {
      inputDataUser: function (data) {
        //пробрасываем событие и данные дальше вверх
        this.$emit('user-data', data)
      }
    },
    template: `
      <div>
        <h2 class="h6" >{{title}}</h2>
        
        <template v-for="c in components">
            <component v-bind:is="c.name" v-bind:label="c.label"
             v-on:user-data="inputDataUser"
             v-bind:input-name="c.inputName"></component>
        </template>
        
      </div>
    `
  });
  
  
  /**
   * input type number
   */
  Vue.component('form-element-number', {
    props: ['label', 'inputName'],
    data: function(){
      return {
        'label_id': (Math.random() * (9e9 - 1e9) + 1e9).toFixed(0),
        isCorrectNumber: true,
        isNumberToMuch: false,
        maxSize: 5000 //максимальный размер вводимого значения
      }
    },
    methods: {
      inputEvent: function (event) {
        //устнавливаем значения по умолчанию, чтобы сбросить ошибки
        this.isCorrectNumber = true
        this.isNumberToMuch = false
        
        let inputUser = event.target.value;
        let digital = Number(inputUser)
        
        if(digital <= 0){
          this.isCorrectNumber = false
          return
        }
        if(digital > this.maxSize){
          this.isNumberToMuch = true
          return
        }
        //передаем родительскому компоненту введенное число и название ключа к которому относится число
        this.$emit('user-data', {[this.inputName] :digital})
      }
    },
    template: `
        <div class="form-group row">
            <label v-bind:for="label_id" class="col-sm-2 col-md-3 col-form-label">{{label}}</label>
            <div class="col-sm-10 col-md-9">
                <input type="number" class="form-control"
                v-bind:name="inputName"
                v-bind:id="label_id"
                v-on:input="inputEvent"
                v-bind:class="[{'is-invalid': !isCorrectNumber}, {'is-invalid': isNumberToMuch}]"
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
    props: ['label'],
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
              v-on:input="selectColor">
          </div>
      </div>
    `
  })
  
  
  /**
   * input type text
   */
  Vue.component('form-element-text',{
    props: ['label'],
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
    props: ['label'],
    data: function() {
      return {
        picked: '',
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
    props: ['label'],
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
    template: `
      <div class="form-group row">
          <div class="col-sm-10 col-md-9 ml-auto">
              <input type="submit" class="form-control bg-light" value="Получить картинку">
          </div>
      </div>
    `
  })
  
  /**
   * vue
   */
  let app = new Vue({
    el: '#app',
  })
}