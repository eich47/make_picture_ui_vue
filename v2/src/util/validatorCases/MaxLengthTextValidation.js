import CheckInterface from "./CheckInterface";

//Проверка на максимальное количество символов
class MaxLengthTextValidation extends CheckInterface{
  constructor(value, maxLength){
    super()
    this.value = value
    this.maxLength = maxLength
  }
  
  check(){
    const validationResult = {
      isValid: true,
      invalidMessage: ``,
    }
    if (this.value.length > this.maxLength){
      validationResult.isValid = false
      validationResult.invalidMessage = `Максимальное количество символов ${this.maxLength}`
    }
    return validationResult
  }
}

export default MaxLengthTextValidation