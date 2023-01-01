"use strict";
// interface PostId = stringOrNumber // error
// Literal types
let myName;
let userName;
userName = "sandwe";
// functions
const add = (a, b) => {
    return a + b;
};
const logMsg = (message) => {
    console.log(message);
};
logMsg("Hello");
logMsg(add(2, 3));
let substract = function (c, d) {
    return c - d;
};
// interface mathFunction {
//   (a: number, b: number): number;
// }
let multiply = function (c, d) {
    return c * d;
};
logMsg(multiply(2, 2));
// 옵셔널 매개변수
const addAll = (a, b, c) => {
    if (typeof c !== "undefined") {
        return a + b + c;
    }
    return a + b;
};
// 기본 매개변수 설정
const sumAll = (a = 10, b, c = 2) => {
    return a + b + c;
};
logMsg(addAll(2, 3, 2)); // 7
logMsg(addAll(2, 3)); // 5
logMsg(sumAll(2, 3)); // 7
logMsg(sumAll(undefined, 3)); // 15
// Rest Parameters
const total = (a, ...nums) => {
    return a + nums.reduce((prev, curr) => prev + curr);
};
logMsg(total(1, 2, 3));
// never type
const createError = (errMsg) => {
    throw new Error(errMsg);
};
const infinite = () => {
    let i = 1;
    while (true) {
        i++;
        if (i > 100)
            break;
    }
};
// Custom Type Guard
const isNumber = (value) => {
    return typeof value === "number" ? true : false;
};
const numberOrString = (value) => {
    if (typeof value === "string")
        return "string";
    if (typeof value === "number")
        return "number";
    return createError("This should never happen!");
};
