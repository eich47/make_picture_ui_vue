<template>
    <b-form @submit.prevent="onSubmit" :novalidate="true">
    <BaseTitleForSection
        text="Задайте ширину и высоту картинки"
    />
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
        <BaseTitleForSection
                text="Выберите цвет"
        />
        <FormSelectColor
            :label="'Цвет'"
            :generatedId="generateId()"
            :value="color.value"
            @input="onSelectColor"
        ></FormSelectColor>
        <!--текст для картинки-->
        <BaseTitleForSection
                text="Задайте текст (не обязательно)"
        />
        <FormInputText
            :label="'Текст'"
            :generatedId="generateId()"
            :value="text.value"
            @input="onInputText"
            :isValidValueEnteredUser="text.isValid"
            :invalidMessage="text.invalidMessage"
        ></FormInputText>
        <!--выбор расширения файла-->
        <BaseTitleForSection
                text="Выберите расширение файла"
        />
        <FormRadioButton
            :label="'Тип файла'"
            :options="extension.options"
            :selected="extension.selected"
            @change="onSelectExensions"
        ></FormRadioButton>
<!--        выбор текстуры-->
        <BaseTitleForSection
                text="Добавьте текстуру (не обязательно)"
        />
        <FormCheckbox
            :label="texture.label"
            :checkboxText="texture.checkboxText"
            :generatedId="generateId()"
            :checked="texture.isChecked"
            :name="texture.name"
            @change="onSelectTexture"
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
  import BaseTitleForSection from "./BaseTitleForSection";
  export default {
    name: "FormOptions",
    components: {
      BaseTitleForSection,
      FormButtonSubmit, FormCheckbox, FormRadioButton, FormInputText, FormSelectColor, FormInputNumber},
    data(){
      return {
        buttonSubmit: {
            label: `Создать картинку`,
            invalidMessage: `заполните обязательные поля`,
            isValidData: true, //показать ли сообщение о необходимости заполнить поля
        },
      }
    },
    computed: {
      width() {
        return {
            value: this.$store.state.options.width,
            isValid: this.$store.state.options.isWidthValid,
            invalidMessage: this.$store.state.options.widthErrorMessage,
            maxValue: this.$store.state.options.maxWidth,
        }
      },
      height() {
        return {
          value: this.$store.state.options.height,
          isValid: this.$store.state.options.isHeightValid,
          invalidMessage: this.$store.state.options.heightErrorMessage,
          maxValue: this.$store.state.options.maxWidth,
        }
      },
      color() {
        return {
          value: this.$store.state.options.color,
        }
      },
      text() {
        return {
          value: this.$store.state.options.text,
          isValid: true, //не обязательное поле для заполнения
          invalidMessage: ``,
          maxValue: 200,
        }
      },
      extension() {
        return {
          selected: this.$store.state.options.extension,
          options: [
            {text: 'jpg', value: 'jpg'},
            {text: 'gif', value: 'gif'},
            {text: 'png', value: 'png'},
          ],
        }
      },
      texture() {
        return {
          label: `Текстура`,
          checkboxText: `добавить`,
          name: `texture`,
          isChecked: this.$store.state.options.texture,
        }
      },
    },
    methods: {
      generateId(){
        return (Math.random() * (9e9 - 1e9) + 1e9).toFixed(0)
      },
      onInputWidth(value){
        this.$store.dispatch('checkWidth', value)
      },
      onInputHeight(value){
        this.$store.dispatch('checkHeight', value)
        // this.$store.commit('setIsFieldValid', {
        //   fieldName: 'isHeightValid',
        //   value: true,
        // })
        // this.$store.commit('setHeight', value)
        // value = Number(value)
        // const {isValid, invalidMessage} = this.validationNumber(value, this.height)
        // this.$store.commit('setIsFieldValid', {
        //   fieldName: 'isHeightValid',
        //   value: isValid,
        // })
        // this.height.invalidMessage = invalidMessage

      },
      onSelectColor(color){
        this.$store.commit('setColor', color)
      },
      onInputText(text){
        this.$store.commit('setText', text)
        this.text.isValid = true
        const {isValid, invalidMessage} = this.validationText(text, this.text)
        this.text.isValid = isValid
        this.text.invalidMessage = invalidMessage
      },
      onSelectExensions(selectedExtension){
        this.$store.commit('setExtension', selectedExtension)
      },
      onSelectTexture(isSelected){
        this.$store.commit('setTexture', isSelected )
      },
      onSubmit(){
        const isValid = this.isValidData(this.width, this.height, this.text)
        this.$store.commit('setIsValidData', isValid)

        if(isValid){
          console.log('valid');
          this.$store.commit('setIsUserSendForm', true)
          this.$store.commit('setIsLoading', true)
          this.$store.dispatch('loadImage')
            .then(() => {
              //если картинка успешно создана, сохраним ее параметры в localStore
              return this.$store.dispatch('saveCurrentPictureOptions')
            })
            .catch((error) => {
              console.log(`Error onload picture, src= ${error}`);
            })
            .finally( () =>{
              this.$store.commit('setIsLoading', false)
          })
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
        const maxWidth = this.$store.state.options.maxWidth
        if (value <= 0){
          validationResult.isValid = false
          validationResult.invalidMessage = `Введите корректное значение (макс. ${maxValue})`
        } else if( value > maxWidth ){
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