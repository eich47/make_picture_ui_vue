import CheckInterface from "./CheckInterface";

//проверка введено ли корректное значение (допускаются только цифры > 0)
class WidthIsCorrectValidation extends CheckInterface{
  constructor(value, maxWidthInfo) {
    super()
    this.value = value
    this.maxWidthInfo = maxWidthInfo
  }
  
  check(){
    const result = {
      isValid: true,
      invalidMessage: ``,
    }
    const valueDigit = Number(this.value)
    console.log('valueDigit', valueDigit);
    if( valueDigit  <= 0){
      result.isValid = false
      result.invalidMessage = `Введите корректное значение (макс. ${this.maxWidthInfo})`
    }
    
    return result
  }
}

export default WidthIsCorrectValidation