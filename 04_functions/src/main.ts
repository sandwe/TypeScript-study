// Type Aliases
type stringOrNumber = string | number;

type stringOrNumberArray = (string | number)[];

// 타입 별칭으로 타입을 지정해줄 수 있다.
type Guitarlist = {
  name?: string;
  active: boolean;
  albums: stringOrNumberArray;
};

type UserId = stringOrNumber;

// interface PostId = stringOrNumber // error

// Literal types
let myName: "sandwe";

let userName: "sandwe" | "sand" | "we";
userName = "sandwe";

// functions
const add = (a: number, b: number): number => {
  return a + b;
};

const logMsg = (message: any): void => {
  console.log(message);
};

logMsg("Hello");
logMsg(add(2, 3));

let substract = function (c: number, d: number): number {
  return c - d;
};

// math 함수 타입이 같으므로 타입을 지정해보자.
type mathFunction = (a: number, b: number) => number;
// interface mathFunction {
//   (a: number, b: number): number;
// }

let multiply: mathFunction = function (c, d) {
  return c * d;
};

logMsg(multiply(2, 2));

// 옵셔널 매개변수
const addAll = (a: number, b: number, c?: number): number => {
  if (typeof c !== "undefined") {
    return a + b + c;
  }
  return a + b;
};

// 기본 매개변수 설정
const sumAll = (a: number = 10, b: number, c: number = 2): number => {
  return a + b + c;
};

logMsg(addAll(2, 3, 2)); // 7
logMsg(addAll(2, 3)); // 5
logMsg(sumAll(2, 3)); // 7
logMsg(sumAll(undefined, 3)); // 15

// Rest Parameters
const total = (a: number, ...nums: number[]): number => {
  return a + nums.reduce((prev, curr) => prev + curr);
};

logMsg(total(1, 2, 3));

// never type
const createError = (errMsg: string): never => {
  throw new Error(errMsg);
};

const infinite = () => {
  let i: number = 1;
  while (true) {
    i++;
    if (i > 100) break;
  }
};

// Custom Type Guard
const isNumber = (value: any): boolean => {
  return typeof value === "number" ? true : false;
};

const numberOrString = (value: number | string): string => {
  if (typeof value === "string") return "string";
  if (typeof value === "number") return "number";
  return createError("This should never happen!");
};
