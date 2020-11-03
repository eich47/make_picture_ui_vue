document.addEventListener('DOMContentLoaded', ready)

function ready() {
  
  /**
   * сама форма
   */
  Vue.component('form-root', {
    template: `
      <form>
      
        <form-element
            class="dimension"
            v-bind:title="'Задайте ширину и высоту картинки'"></form-element>
            
      </form>
    `
  });
  
  
  /**
   * враппер для элементов формы
   */
  Vue.component('form-element', {
    props: [
      'title',
    ],
    template: `
      <div>
        <h2 class="h6" >{{title}}</h2>
        
        <form-element-number
            v-bind:label="'ширина'"></form-element-number>
            
        <form-element-number
            v-bind:label="'высота'"></form-element-number>
            
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
   * vue
   */
  let app = new Vue({
    el: '#app',
  })
}