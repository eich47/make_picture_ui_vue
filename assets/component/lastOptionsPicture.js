export default {
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  computed:{
    text(){
      if (this.options.text.length === 0){
        return 'без текста'
      }
      return this.options.text
    }
  },
  methods: {
    onLoadOption(){
      this.$store.dispatch({
        type: 'loadSelectedOptions',
        options: this.options
      })
    },
    onDeleteOptions(){
      //TODO Дописать удаление сравнивать через json
      this.$emit('onDeleteOptions', this.options)
    },
  },
  template: `
<div class="col-md-6">
      <div class="card border-0">
      <div class="card-body">
          <ul class="list-group">
              <li class="list-group-item text-center">{{options.width}}&nbsp;x {{options.height}}</li>
              <li class="list-group-item d-flex">
                    <span class="flex-grow-1" :style="{backgroundColor: options.color}" >&nbsp;</span>
              </li>
              <li class="list-group-item">Формат: {{options.extension}}</li>
              <li class="list-group-item">Текст: {{text}}</li>
              <li class="list-group-item d-flex"><span class="mr-2">Текстура:</span>
              <span class="custom-control custom-checkbox">
                    <input type="checkbox"
                            :checked="options.texture"
                            class="custom-control-input"
                            >
                            <label class="custom-control-label"></label>
              </span>
              </li>
              <li class="d-flex">
                <button type="button"
                        class="flex-fill btn btn-info"
                        @click="onLoadOption"
                >Загрузить</button>
                <button type="button"
                        class="flex-fill btn btn-warning"
                        @click="onDeleteOptions"
                >Удалить</button>
              </li>
          
          </ul>
      </div>
      </div>
    
    </div>
    
  `
}