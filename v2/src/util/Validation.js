class Validation {
  constructor(){}
  
  //проверка на масимальное и минимальное допустимое значение
  validationNumber(value, {maxValue}){
    const validationResult = {
      isValid: true,
      invalidMessage: ``,
    }
    value = Number(value)
    console.log(value);
    console.log(maxValue);
    if (value <= 0){
      validationResult.isValid = false
      validationResult.invalidMessage = `Введите корректное значение (макс. ${maxValue})`
    } else if( value > maxValue ){
      validationResult.isValid = false
      validationResult.invalidMessage = `Максимальный размер ${maxValue}`
    }
    
    return validationResult
  }
  
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
  
  }
}

export default Validation

// const v = new Validation()
// const res = v.validationNumber(444, {maxValue:100})
// console.log(res);