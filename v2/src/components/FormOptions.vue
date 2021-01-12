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
          isValid: this.$store.state.options.isTextValid,
          invalidMessage: this.$store.state.options.textErrorMessage,
          maxValue: this.$store.state.options.maxLengthText,
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
      buttonSubmit() {
        return {
          label: `Создать картинку`,
          invalidMessage: `заполните обязательные поля`,
          isValidData: this.$store.state.options.isValidAllData, //показать ли сообщение о необходимости заполнить поля
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

      },
      onSelectColor(color){
        this.$store.commit('setColor', color)
      },
      onInputText(text){
        this.$store.dispatch('checkText', text)
      },
      onSelectExensions(selectedExtension){
        this.$store.commit('setExtension', selectedExtension)
      },
      onSelectTexture(isSelected){
        this.$store.commit('setTexture', isSelected )
      },
      onSubmit(){
        this.$store.dispatch('submitting')
      },
    },

  }
</script>

<style scoped>

</style>