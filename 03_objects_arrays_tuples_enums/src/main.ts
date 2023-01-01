// Array
let stringArr = ["one", "hey", "sandwe"];

let artist = ["John Mayer", "Charlie Puth", 2023];

let mixedData = ["EVH", 1984, true];

stringArr[0] = 42; // ts: number 형식은 string에 할당할 수 없습니다.
stringArr.push("hey"); // ts: number 형식은 string에 할당할 수 없습니다.

artist[0] = 1984;
artist.unshift("Bruno Mars");

stringArr = artist; // ts: (string | number)[]' 형식은 'string[]' 형식에 할당할 수 없습니다.
artist = stringArr;
mixedData = artist;
artist = mixedData; // ts: (string | number | boolean)[]' 형식은 '(string | number)[]' 형식에 할당할 수 없습니다.

let test = [];
let bands: string[] = [];
bands.push("Van Halen");
bands.push(false); // 'boolean' 형식의 인수는 'string' 형식의 매개 변수에 할당될 수 없습니다.

// Tuples
let myTuple: [string, number, boolean] = ["sandwe", 20, true];

let mixed = ["sand", 1, false];

mixed = myTuple;
myTuple = mixed; // ts: '(string | number | boolean)[]' 형식은 '[string, number, boolean]' 형식에 할당할 수 없습니다. 대상에 3개 요소가 필요하지만, 소스에 더 적게 있을 수 있습니다.
myTuple[3] = 42; // ts: '42' 형식은 'undefined' 형식에 할당할 수 없습니다. 길이가 '3'인 튜플 형식 '[string, number, boolean]'의 인덱스 '3'에 요소가 없습니다.
myTuple[1] = 42;

// Objects
let myObj: object;
myObj = [];
console.log(typeof myObj); // object
myObj = bands;
myObj = {};

const exampleObj = {
  prop1: "sand",
  prop2: true,
};

exampleObj.prop1 = "sandwe";
exampleObj.prop2 = false;

// Object의 타입을 미리 지정해놓고, 타입을 사용하면 프로퍼티의 타입까지 알 수 있다.
// type 또는 interface로 타입을 지정한다.
// type Guitarlist = {
//   name?: string;
//   active?: boolean;
//   albums: (string | number)[];
// };

interface Guitarlist {
  name?: string; // 옵셔널 프로퍼티, 있어도 되고 없어도 된다.
  active: boolean;
  albums: (string | number)[];
}

let evh: Guitarlist = {
  name: "Eddie",
  active: false,
  albums: [1984, 5150, "OU812"],
};

let jP: Guitarlist = {
  name: "Jimmy",
  active: true,
  albums: ["I", "II", "IV"],
};

const greetGuitarist = (guitarist: Guitarlist) => {
  if (guitarist.name) {
    return `Hello ${guitarist.name.toUpperCase()}!`;
  }
  return "Hello!";
};

console.log(greetGuitarist(jP));
evh = jP;
evh.years = 40; // ts: 'Guitarlist' 형식에 'years' 속성이 없습니다.

// Enums
enum Grade {
  U = 1,
  D,
  C,
  B,
  A,
}

console.log(Grade.U);
