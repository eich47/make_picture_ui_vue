//в этот класс передаются валидаторы,
//у них есть метод check, который содержит логику валидации
class Validator {
  constructor(fields = []){
    this.fields = fields
  }
  
  checking(){
    const validationResult = {
      isValid: true,
      invalidMessage: ``,
    }
    
    this.fields.forEach(field => {
      const result = field.check()
      if(result.isValid === false){
        validationResult.isValid = result.isValid
        validationResult.invalidMessage = result.invalidMessage
      }
      
    })
    
    
    return validationResult
  }
  
}

export default Validator