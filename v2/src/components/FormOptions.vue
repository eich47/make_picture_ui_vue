<template>
    <b-form @submit.prevent="onSubmit" :novalidate="true">
    <FormInputNumber
        :label="'Ширина'"
        :generatedId="generateId()"
        :value="width.value"
        @input="onInputWidth"
        :isValidValueEnteredUser="width.isValid"
        :invalidMessage="width.invalidMessage"
    />
    <!--высота картинки-->
    <FormInputNumber
            :label="'Высота'"
            :generatedId="generateId()"
            :value="height.value"
            @input="onInputHeight"
            :isValidValueEnteredUser="height.isValid"
            :invalidMessage="height.invalidMessage"
    />
        <!--цвет картинки-->
        <FormSelectColor
            :label="'Цвет'"
            :generatedId="generateId()"
            :value="color.value"
            @input="onSelectColor"
        ></FormSelectColor>
        <!--текст для картинки-->
        <FormInputText
            :label="'Текст'"
            :generatedId="generateId()"
            :value="text.value"
            @input="onInputText"
            :isValidValueEnteredUser="text.isValid"
            :invalidMessage="text.invalidMessage"
        ></FormInputText>
        <!--выбор расширения файла-->
        <FormRadioButton
            :label="'Тип файла'"
            :options="extension.options"
            :selected="extension.selected"
            @change="onSelectExensions"
        ></FormRadioButton>
<!--        выбор текстуры-->
        <FormCheckbox
            :label="texture.label"
            :checkboxText="texture.checkboxText"
            :generatedId="generateId()"
            :checked="texture.isChecked"
            :name="texture.name"
        >

        </FormCheckbox>
<!--        кнопка создать-->
        <FormButtonSubmit
            :label="buttonSubmit.label"
            :invalidMessage="buttonSubmit.invalidMessage"
            :isValidData="buttonSubmit.isValidData"
        ></FormButtonSubmit>
    </b-form>
</template>

<script>
  import FormInputNumber from "./FormInputNumber";
  import FormSelectColor from "./FormSelectColor";
  import FormInputText from "./FormInputText";
  import FormRadioButton from "./FormRadioButton";
  import FormCheckbox from "./FormCheckbox";
  import FormButtonSubmit from "./FormButtonSubmit";
  export default {
    name: "FormOptions",
    components: {FormButtonSubmit, FormCheckbox, FormRadioButton, FormInputText, FormSelectColor, FormInputNumber},
    data(){
      return {
        text: {
          value: this.$store.state.options.text,
          isValid: true, //не обязательное поле для заполнения
          invalidMessage: ``,
          maxValue: 200,
        },
        extension:{
          selected: this.$store.state.options.extension,
          options: [
            {text: 'jpg', value: 'jpg'},
            {text: 'gif', value: 'gif'},
            {text: 'png', value: 'png'},
          ],
        },
        texture: {
          label: `Текстура`,
          checkboxText: `добавить`,
          name: `texture`,
          isChecked: this.$store.state.options.texture,

        },
        buttonSubmit: {
            label: `Создать картинку`,
            invalidMessage: `заполните обязательные поля`,
            isValidData: true,
        },
      }
    },
    computed: {
      width() {
        return {
            value: this.$store.state.options.width,
            isValid: false, //обязательное поле
            invalidMessage: ``,
            maxValue: 5000,
        }
      },
      height() {
        return {
          value: this.$store.state.options.height,
          isValid: false, //обязательное поле
          invalidMessage: ``,
          maxValue: 5000,
        }
      },
      color() {
        return {
          value: this.$store.state.options.color,
        }
      },
    },
    methods: {
      generateId(){
        return (Math.random() * (9e9 - 1e9) + 1e9).toFixed(0)
      },
      onInputWidth(value){
        //скроем ошибки
        this.width.isValid = true
        value = Number(value)
        this.$store.commit('setWidth', value)

        const {isValid, invalidMessage} = this.validationNumber(value, this.width);
        this.width.isValid = isValid
        this.width.invalidMessage = invalidMessage

      },
      onInputHeight(value){
        this.height.isValid = true
        this.$store.commit('setHeight', Number(value))

        const {isValid, invalidMessage} = this.validationNumber(value, this.height)
        this.height.isValid = isValid
        this.height.invalidMessage = invalidMessage

      },
      onSelectColor(color){
        this.$store.commit('setColor', color)
      },
      onInputText(text){
        this.text.value = text
        console.log(text);
        this.text.isValid = true
        const {isValid, invalidMessage} = this.validationText(text, this.text)
        this.text.isValid = isValid
        this.text.invalidMessage = invalidMessage
      },
      onSelectExensions(selectedExtension){
        this.extension.selected = selectedExtension
      },
      onSubmit(){
        const isValid = this.isValidData(this.width, this.height, this.text)
        if(isValid){
          console.log('valid');
        } else {
          console.log('no valid');
          this.buttonSubmit.isValidData = false
          setTimeout(() => {
            this.buttonSubmit.isValidData = true
          }, 2000)
        }
      },
      isValidData(width, height, text){
        return width.isValid && height.isValid && text.isValid
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
      },

      validationText(value, {maxValue}){
        const validationResult = {
          isValid: true,
          invalidMessage: ``,
        }
        if (value.length > maxValue){
          validationResult.isValid = false
          validationResult.invalidMessage = `Максимальное количество символов ${maxValue}`
        }
        return validationResult
      },

    },

  }
</script>

<style scoped>

</style>