import CheckInterface from "./CheckInterface";

//проверяет валидны ли все данные которые ввел пользователь
class FormDataValidation extends CheckInterface{
  
  constructor(isWidth, isHeight, isText){
    super()
    this.width = isWidth;
    this.height = isHeight;
    this.text = isText;
  }
  
  check(){
    const validationResult = {
      isValid: true,
    }
    
    const isValid = this.width && this.height && this.text
    
    if(isValid === false){
      validationResult.isValid = false
    }
    
    return validationResult
  }
}

export default FormDataValidation