export {}
interface Person {
  name: string;
  age : number;
}

//* 1.提取接口中的 keys 作为 options
type OptionsOfPerson = {
  [ prop in keyof Person]: boolean
}
