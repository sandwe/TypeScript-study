type One = string;
type Two = string | number;
type Three = "hello";

// convert to more or less specific
let a: One = "hello";

// keyword 'as'
let b = a as Two; // less specific
let c = a as Three; // more specific

// angle bracket
// react의 tsx 파일에선 사용 불가하다.
let d = <One>"world";
let e = <string | number>"world";

const addOrConcat = (a: number, b: number, c: "add" | "concat"): number | string => {
  if (c === "add") return a + b;
  return "" + a + b;
};

let myVal: string = addOrConcat(2, 2, "concat") as string;
// 주의! TypeScript는 문제를 찾지 못한다. 리턴 타입은 string이다.
let nextVal: number = addOrConcat(2, 2, "concat") as number;

// double casting
// 10 as string;
10 as unknown as string;

// DOM
const img = document.querySelector("img")!;
const myImg = document.querySelector("#img") as HTMLImageElement;
const nextImg = <HTMLImageElement>document.querySelector("#img");

img.src;
myImg.src;
