export default class UrlMaker{
  
  //класс для создания урл который будет использоваться для доступа к api
  
  baseUrl = 'http://satyr.io'
  
  constructor({width, height, color, text, extension, texture}){
    //ширина, высота являются обязательными параметрами
    this.width = width <= 0 ? throw new Error(`Error: ширина не корректная (${width})`) : width
    this.height = height <=0 ? throw new Error(`Error: высота не корректная (${height})`) : height
    this.color = color
    this.text = text
    this.extension = extension
    this.texture = texture
  }
  
  
  buildUrl () {
    
    const pathName = this.makePathName();
        
    const url = new URL(pathName)
    
    const urlWithOptional = this.addOptionalPart(url)
    
    return urlWithOptional
  }
  
  makeWidthAndHeightPart(){
    return `${this.width}x${this.height}`
  }
  
  makePathName(){
    //#ffffff -> ffffff
    const color = this.color.slice(1)
    return `${this.baseUrl}/${this.makeWidthAndHeightPart()}/${color}`
  }
  
  addOptionalPart(url){
    
    const optionalParametrs = new Map();
    
    if(this.text.trim().length > 0) {
      optionalParametrs.set('text', this.text)
    }
    if(this.extension.trim().length > 0) {
      optionalParametrs.set('type', this.extension)
    }
    if(this.texture) {
      optionalParametrs.set('texture', 'cross')
    }
    
    for (let [key, value] of optionalParametrs){
      url.searchParams.set(key, value)
    }
    
    return url
  }
  
  
}