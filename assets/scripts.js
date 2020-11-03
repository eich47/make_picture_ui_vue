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
            v-bind:components="dimension"></form-element>
            
       <!--цвет картинки-->
       <form-element
            class="color"
            v-bind:title="'Выберите цвет'"
            v-bind:components="color"></form-element>
            
       <!--текст на картике-->
       <form-element
            class="text"
            v-bind:title="'Текст'"
            v-bind:components="text"></form-element>
            
       <!--выбор расширения для файла-->
       <form-element
            class="extension"
            v-bind:title="'Выберите расширение файла'"
            v-bind:components="extension"
       ></form-element>
       
       <!--добавлять или нет текстуру-->
       <form-element
            class="texture"
            v-bind:title="'Добавление текстуры'"
            v-bind:components="texture"
       ></form-element>
       
       
      </form>
    `,
    data: function () {
      return {
        'dimension': [
          {
            name: 'form-element-number',
            label: 'ширина'
          },
          {
            name: 'form-element-number',
            label: 'высота'
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
    template: `
      <div>
        <h2 class="h6" >{{title}}</h2>
        
        <template v-for="c in components">
            <component v-bind:is="c.name" v-bind:label="c.label"></component>
        </template>
        
      </div>
    `
  });
  
  
  /**
   * input type number
   */
  Vue.component('form-element-number', {
    props: ['label'],
    data: function(){
      return {
        'label_id': (Math.random() * (9e9 - 1e9) + 1e9).toFixed(0)
      }
    },
    template: `
        <div class="form-group row">
            <label v-bind:for="label_id" class="col-sm-2 col-md-3 col-form-label">{{label}}</label>
            <div class="col-sm-10 col-md-9">
                <input type="number" class="form-control" name="user_width" v-bind:id="label_id">
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
    template: `
      <div class="form-group row">
          <label v-bind:for="labelId" class="col-sm-2 col-md-3 col-form-label">{{ label }}</label>
          <div class="col-sm-10 col-md-9">
              <input type="color" class="form-control" name="user_color" v-bind:id="labelId">
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
    template: `
      <div class="form-group row">
          <label v-bind:for="labelId" class="col-sm-2 col-md-3 col-form-label">{{ label }}</label>
          <div class="col-sm-10 col-md-9">
              <input type="text" class="form-control" name="user_color" v-bind:id="labelId">
          </div>
      </div>
    `
  })
  
  /**
   * radio button
   */
  Vue.component('form-element-radio',{
    props: ['label'],
    template: `
        <div class="form-group row">
          <label class="col-sm-2 col-md-3">{{label}}</label>
          <div class="col-sm-10 col-md-9">
              <div class="custom-control custom-radio">
                  <input type="radio" checked name="customRadio" class="custom-control-input" id="radiojpg">
                  <label class="custom-control-label" for="radiojpg">jpg</label>
              </div>
              <div class="custom-control custom-radio">
                  <input type="radio" name="customRadio" class="custom-control-input" id="radiogif">
                  <label class="custom-control-label" for="radiogif">gif</label>
              </div>
              <div class="custom-control custom-radio">
                  <input type="radio" name="customRadio" class="custom-control-input" id="radiopng">
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
    template: `
      <div class="form-group row">
        <label class="col-sm-2 col-md-3 ">{{label}}</label>
        <div class="col-sm-10 col-md-9">
          <div class="custom-control custom-checkbox">
              <input type="checkbox" name="user_texture" class="custom-control-input" id="texture">
              <label for="texture" class="custom-control-label">добавить</label>
          </div>
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