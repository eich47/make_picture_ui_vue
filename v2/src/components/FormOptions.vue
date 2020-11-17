<template>
    <div>
    <FormInputNumber
        :label="'Ширина'"
        :generatedId="generateId()"
        :value="startWidth"
        @input="onInputWidth"
        :isValidValueEnteredUser="width.isValid"
        :invalidMessage="width.invalidMessage"
    />
    <!--высота картинки-->
    <FormInputNumber
            :label="'Высота'"
            :generatedId="generateId()"
            :value="startHeight"
            @input="onInputHeight"
            :isValidValueEnteredUser="height.isValid"
            :invalidMessage="height.invalidMessage"
    />
    </div>
</template>

<script>
  import FormInputNumber from "./FormInputNumber";
  export default {
    name: "FormOptions",
    components: {FormInputNumber},
    data(){
      return {
        width: {
          value: 0,
          isValid: true,
          invalidMessage: ``,
          maxValue: 5000,
        },
        height: {
          value: 0,
          isValid: true,
          invalidMessage: ``,
          maxValue: 5000,
        },
      }
    },
    computed: {
      //начальное значение при загрузке формы
      startWidth() {
        //потом будет забираться из store
        return 0
      },
      startHeight(){
        return 0
      },
    },
    methods: {
      generateId(){
        return (Math.random() * (9e9 - 1e9) + 1e9).toFixed(0)
      },
      onInputWidth(value){
        //скроем ошибки
        this.width.isValid = true
        //потом будет записываться в стор
        this.width.value = value

        const {isValid, invalidMessage} = this.validationNumber(value, this.width);
        this.width.isValid = isValid
        this.width.invalidMessage = invalidMessage

      },
      onInputHeight(value){
        this.height.isValid = true
        this.height.value = value

        const {isValid, invalidMessage} = this.validationNumber(value, this.height)
        this.height.isValid = isValid
        this.height.invalidMessage = invalidMessage

      },
      validationNumber(value, {maxValue}){
        const validationResult = {
          isValid: true,
          invalidMessage: ``,
        }
        if (value <= 0){
          validationResult.isValid = false
          validationResult.invalidMessage = `Введите корректное значение (макс. ${maxValue})`
        } else if( value > 5000 ){
          validationResult.isValid = false
          validationResult.invalidMessage = `Максимальный размер ${maxValue}`
        }

        return validationResult
      }

    },

  }
</script>

<style scoped>

</style>