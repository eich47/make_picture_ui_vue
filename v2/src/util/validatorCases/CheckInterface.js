class CheckInterface {
  //этот метод вызывается в классе Validator, поэтому он должен быть у классов
  //которые передаются в конструктор класса Validator
  check(){
    throw Error(`check method should be implemented`)
  }
}

export default CheckInterface