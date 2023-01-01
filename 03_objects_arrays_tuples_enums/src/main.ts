// 타입스크립트는 타입을 추론하기도 하지만 다음과 같이 명시적으로 타입을 지정해준다.
let myName: string = "sandwe1";
let meaningOfLife: number;
let isLoading: boolean;
let album: any;
// union type
let albums: string | number;

myName = "sandwe2";
meaningOfLife = 42;
isLoading = true;
album = 1984;
albums = 20;
albums = "This is albums.";

// 파라미터 값이 무슨 타입인지 알 수 없다.
// Parameter 'a' implicitly has an 'any' type.
// const sum = (a, b) => {
//   return a + b;
// };

const sum = (a: number, b: number) => {
  return a + b;
};

let postId: string | number;
let isActive: number | boolean;

let re: RegExp = /\w+/g;
