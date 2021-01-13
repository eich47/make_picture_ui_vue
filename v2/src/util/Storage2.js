class Storage2 {
  //принимает классы которые наследуют StorageInterface
  constructor(client){
    this.client = client
  }
  
  getOptions(){
    return this.client.getOptions()
  }
  
  saveOption(option){
    return this.client.saveOptions(option)
  }
  
  remove(option){
    return this.client.removeOption(option)
  }
}

export default Storage2