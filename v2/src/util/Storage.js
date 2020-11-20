export default class Storage {
  
  keyInStorage = 'pictureOptions'
  
  constructor(options){
    this.options = options
  }
  
  saveOptions(){
    //получим данные которые есть в localstorage
    const storageData = this.getOption()
    if (storageData === false){
      return false
    }
    
    //добавим опции
    storageData.unshift(this.options)
    
    //запишем обновленные опции в storage
    const optionJson = JSON.stringify(storageData)
    localStorage.setItem(this.keyInStorage, optionJson)
    
    return true
  }
  
  getOption(){
    const optionsJson = this.getJsonFromStorage(this.keyInStorage)
    if (optionsJson === null){
      return []
    }
    try {
      const optionsArray = JSON.parse(optionsJson)
      if( !Array.isArray(optionsArray)){
        throw new Error(`Ожидается массив! Получено: ${optionsArray}`)
      }
      
      return optionsArray
      
    } catch (e) {
      console.log(`Error parse json: ${optionsJson} , error: ${e}`)
      return false
    }
    
  }
  
  getJsonFromStorage(key) {
    return localStorage.getItem(key)
  }
}