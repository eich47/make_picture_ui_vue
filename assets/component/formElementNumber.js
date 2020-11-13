export default {
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
    },
    isValidMaxSize(){
      if ( this.inputName === 'width'){
        return this.$store.state.pictureOptionsValidationStatus.isValidMaxSizeWidth
      } else if ( this.inputName === 'height'){
        return this.$store.state.pictureOptionsValidationStatus.isValidMaxSizeHeight
      } else {
        throw Error(`unknown field: ${this.inputName}`)
      }
    },
    maxSize(){
      return this.$store.state.pictureOptions.maxSizeDimension
    },
    value(){
      if (this.inputName === 'width') {
        return this.$store.getters.getWidth
      } else if (this.inputName === 'height'){
        return this.$store.getters.getHeight
      } else {
          throw Error(`unknown field: ${this.inputName}`)
      }
    }
  },
  methods: {
    inputEvent: function (event) {
      //устнавливаем значения по умолчанию, чтобы сбросить ошибки
      // this.isCorrectNumber = true
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
                v-bind:class="[{'is-invalid': !isCorrectNumber}, {'is-invalid': !isValidMaxSize}]"
                @focus.once="isTouched = true"
                :value="value"
                >
                <div class="invalid-feedback" v-if="!isCorrectNumber">Введите корректный размер (макс. {{maxSize}})</div>
                <div class="invalid-feedback" v-if="!isValidMaxSize">Максимальный размер {{maxSize}} px</div>
            </div>
        </div>
    `
}