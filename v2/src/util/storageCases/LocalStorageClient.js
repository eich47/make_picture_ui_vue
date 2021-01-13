import StorageInterface from "./StorageInterface";

class LocalStorageClient extends StorageInterface{
  
  keyInStorage = 'pictureOptionsV2'
  
  //удалить сохраненные опции картинки
  removeOption(option){
    //получим опции из localStore в array
    const optionsFromStorageArray = this.getOptions()
    if (optionsFromStorageArray === false){
      return false
    }
  
    //оставим все опции кроме переданной
    const filteredArray = optionsFromStorageArray.filter(o => {
      return o.id !== option.id
    })
  
    //сохраним обратно в storage (перезапишется существующее значение)
    const optionsJson = JSON.stringify(filteredArray)
    localStorage.setItem(this.keyInStorage, optionsJson)
  
    return true
  }
  
  //сохранить опции картинки
  saveOptions(option){
    //получим данные которые есть в localstorage
    const storageData = this.getOptions()
    if (storageData === false){
      return false
    }
  
    //добавим опции
    storageData.unshift(option)
  
    //запишем обновленные опции в storage
    const optionJson = JSON.stringify(storageData)
    localStorage.setItem(this.keyInStorage, optionJson)
  
    return true
  }
  
  //получить все сохранные раньше опции
  getOptions(){
    const optionsJson = this._getJsonFromStorage(this.keyInStorage)
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
  
  _getJsonFromStorage(key) {
    return localStorage.getItem(key)
  }
}

export default LocalStorageClient