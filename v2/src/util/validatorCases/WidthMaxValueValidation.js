import CheckInterface from "./CheckInterface";

//проверка чтобы ширина картинки была меньше максимального размера
//эта же проверка используется и для высоты, т.к. логика проверки одинаковая
class WidthMaxValueValidation extends CheckInterface{
  constructor(value, maxValue) {
    super()
    this.value = value
    this.maxValue = maxValue
  }
  
  check(){
    const result = {
      isValid: true,
      invalidMessage: ``,
    }
    const valueDigit = Number(this.value)
    if( valueDigit  > this.maxValue){
      result.isValid = false
      result.invalidMessage = `Максимальный размер ${this.maxValue}`
    }
    
    return result
  }
}

export default WidthMaxValueValidation