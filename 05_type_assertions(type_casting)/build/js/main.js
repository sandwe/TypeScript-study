"use strict";
// convert to more or less specific
let a = "hello";
// keyword 'as'
let b = a; // less specific
let c = a; // more specific
// angle bracket
// react의 tsx 파일에선 사용 불가하다.
let d = "world";
let e = "world";
const addOrConcat = (a, b, c) => {
    if (c === "add")
        return a + b;
    return "" + a + b;
};
let myVal = addOrConcat(2, 2, "concat");
// 주의! TypeScript는 문제를 찾지 못한다. 리턴 타입은 string이다.
let nextVal = addOrConcat(2, 2, "concat");
// double casting
// 10 as string;
10;
// DOM
const img = document.querySelector("img");
const myImg = document.querySelector("#img");
const nextImg = document.querySelector("#img");
img.src;
myImg.src;
