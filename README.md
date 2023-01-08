# TypeScript-study

> [Dave Grey - TypeScript for Beginners](https://www.youtube.com/watch?v=MOO5vrtTUTE&list=PL0Zuz27SZ-6NS8GXt5nPrcYpust89zq_b&index=1)

## 목차

[1. typescript 컴파일 및 tsconfig.json 설정](#01-starter-lesson)

[2. Basic Type](#02-basic-types)

[3. Objects, Arrays, Tuples & Enums](#03-objects-arrays-tuples--enums)

[4. Functions](#04-functions)

[5.Type Assertions (Type Casting)](#05-type-assertions-type-casting)

[6. Classes](#06-classes)

[7. Index Signature, keyof Assertions, record utility type](#07-index-signature-keyof-assertions-record-utility-type)

[8. Generics](#08-generics)

[9. Utility Type](#09-utility-type)

<br>

## [01. Starter Lesson](https://github.com/sandwe/TypeScript-study/tree/main/01_start)

타입스크립트 파일을 자바스크립트 파일로 컴파일해보자. `tsc main.ts main.js` 를 터미널에 입력하면 자바스크립트로 컴파일한다. 이때, 파일 이름이 동일하면 뒤에 `main.js`를 생략할 수 있다.

```jsx
let username = "Sandwe";
console.log(username);
```

```jsx
var username = "Sandwe";
console.log(username);
```

- 컴파일된 main.js에는 `let`이 `var`로 변경되어 있다.타입스크립트는 레거시 브라우저에서도 사용가능하도록 자바스크립트를 컴파일할 수 있다.

### tsconfig.json

- 터미널에 `tsc —init` 을 입력하면 `tsconfig.json`이 생성된다.
- tsc -w를 입력하면 TypeScript 파일을 저장할 때마다 컴파일되어 JavaScript 파일이 생성된다.
- tsconfig.json에는 TypeScript 파일을 JavaScript 파일로 컴파일하는 것에 대한 설정을 한다.
- 해당 강의에서 설명한 config는 다음과 같다.

```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */

    /* Language and Environment */
    "target": "es2016" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,

    /* Modules */
    "rootDir": "./src" /* Specify the root folder within your source files. */,

    /* Emit */
    "outDir": "./build/js" /* Specify an output folder for all emitted files. */,

    "noEmitOnError": true /* Disable emitting files if any type checking errors are reported. */
  },
  "include": ["src"]
}
```

- `rootDir` : TypeScript 파일이 위치할 루트 디렉토리를 설정한다. `outDir`는 컴파일된 JavaScript 파일이 위치할 디렉토리 설정한다.
- `target`은 컴파일된 JavaScript 파일의 자바스크립트 버전을 설정한다.
- `“include”: [”src”]` 는 `tsc -w`를 입력해 컴파일을 자동으로 실행할 폴더 범위를 설정한다.
- `"noEmitOnError"` : 값이 true이면 TypeScript 파일에서 에러가 발생하면 JavaScript 파일로 컴파일 되지 않도록 설정한다.

`"noEmitOnError": false` ⇒ 타입스크립트에서는 문자열 타입을 계산하려고 하니 에러가 발생하지만 자바스크립트에서는 자동 형변환되므로 에러가 아니다.

![스크린샷 2022-12-31 오후 10.29.24.png](/imgs/01_1.png)

`"noEmitOnError": true` ⇒ 타입스크립트에서 발생한 에러로 컴파일이 되지 않았고, build/js/ 폴더 내에 자바스크립트 파일이 생성되지 않는다. 따라서, index.html은 js파일을 읽지 못하고, 에러가 난다.

![스크린샷 2022-12-31 오후 10.43.44.png](/imgs/01_2.png)

만약, tsconfig.json에 `"noEmitOnError": false` 설정을 해도 터미널에 `tsc —noEmitOnError -w` 하면 tsconfig.json 내의 설정이 덮어씌운다.

<br>

## [02. Basic Types](https://github.com/sandwe/TypeScript-study/tree/main/02_basic_types)

### TypeScript와 JavaScript의 차이

- TypeScript는 정적 타입 언어로, 타입들이 컴파일 타임에 검사된다.
- JavaScript는 동적 타입 언어로, 타입들이 런타임에 검사된다.

### 명시적 타입 지정

- 타입스크립트는 값을 보고 타입을 추론한다.
- 타입스크립트 사용 시 다음과 같이 명시적으로 타입을 지정해준다.
- 따라서, 컴파일 전 개발할 때 에러를 발견할 수 있어 유용하다.

```tsx
let myName: string;
let meaningOfLife: number;
let isLoading: boolean;
let album: **any**;
// union type
let albums: string | number;

myName = 42; // error: Type 'number' is not assignable to type 'string'.
myName = "sandwe2";
meaningOfLife = 42;
isLoading = true;
album = 1984;
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
```

<br>

## [03. Objects, Arrays, Tuples & Enums](https://github.com/sandwe/TypeScript-study/tree/main/03_objects_arrays_tuples_enums)

### Arrays

```tsx
let stringArr = ["one", "hey", "sandwe"]; // type: string[]

let artist = ["John Mayer", "Charlie Puth", 2023]; // type: (string | number)[]

let mixedData = ["EVH", 1984, true]; // type: (string | number | boolean)[]

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
bands.push(false); // ts: 'boolean' 형식의 인수는 'string' 형식의 매개 변수에 할당될 수 없습니다.
```

### Tuples

- 튜플은 배열의 길이가 정해져 있고, 각 요소의 타입이 정해져 있기 때문에 배열보다 엄격하다.

```tsx
let myTuple: [string, number, boolean] = ["sandwe", 20, true];

let mixed = ["sand", 1, false];

mixed = myTuple;
myTuple = mixed; // ts: '(string | number | boolean)[]' 형식은 '[string, number, boolean]' 형식에 할당할 수 없습니다. 대상에 3개 요소가 필요하지만, 소스에 더 적게 있을 수 있습니다.
myTuple[3] = 42; // ts: '42' 형식은 'undefined' 형식에 할당할 수 없습니다. 길이가 '3'인 튜플 형식 '[string, number, boolean]'의 인덱스 '3'에 요소가 없습니다.
myTuple[1] = 42;
```

### Objects

```tsx
let myObj: object;
let bands: string[] = [];
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
```

<aside>
💡 타입 지정
타입은 `type` 또는 `interface`로 지정할 수 있다.

```tsx
type Guitarlist = {
  name?: string; // 옵셔널 프로퍼티, 있어도 되고 없어도 된다.
  active: boolean;
  albums: (string | number)[];
};
```

```tsx
interface Guitarlist {
  name?: string; // type: string | undefined
  active: boolean;
  albums: (string | number)[];
}
```

</aside>

위 콜아웃에서 지정한 타입을 사용해보자.

```tsx
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

console.log(greetGuitarist(jP)); // Hello Jimmy!

evh = jP;
evh.years = 40; // ts: 'Guitarlist' 형식에 'years' 속성이 없습니다.
```

### Enums

```tsx
enum Grade {
  U = 1,
  D,
  C,
  B,
  A,
}

console.log(Grade.U); // 1
console.log(Grade.D); // 2
console.log(Grade.C); // 3
console.log(Grade.B); // 4
console.log(Grade.A); // 5
```

<br>

## [04. Functions](https://github.com/sandwe/TypeScript-study/tree/main/04_functions)

### Type Alias(타입 별칭)

```tsx
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
```

\***\*type vs interface\*\***

- 타입 별칭과 인터페이스의 가장 큰 차이점은 타입의 확장 가능 / 불가능 여부이다.
- 인터페이스는 확장이 가능하지만 타입 별칭은 확장이 불가능하다. 따라서,  `type`
   보다는 `interface`로 선언해 사용하는 것을 추천한다. 좋은 소프트웨어는 언제나 확장이 용이해야 한다는 원칙 때문이다.

### Literal Type

- `var`또는 `let`으로 변수를 선언할 경우 이 변수의 값이 변경될 가능성이 있음을 컴파일러에게 알린다. 이때 변수에 저장될 값의 경우의 수를 좁히기 위해 리터럴 타입을 사용할 수 있다.
- userName에 저장될 수 있는 값을 3가지로 좁혀서 userName에 값을 저장하려 할때 vsc에서 자동으로 지정된 3가지 값을 보여준다.

![스크린샷 2023-01-01 오후 5.22.06.png](/imgs/04_1.png)

### Functions

- 함수는 파라미터로 전달되는 값의 타입과 리턴되는 값의 타입을 명시한다.
- 리턴되는 값이 없다면 `void`라고 명시한다.

```tsx
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
```

위의 연산 관련 함수에 전달되는 파라미터의 값은 number, 반환되는 값도 number로 동일하다. 이를 타입 별칭으로 지정하고, 해당 타입 별칭을 참조해서 함수를 만들어보자.

```tsx
type mathFunction = (a: number, b: number) => number;

let multiply: mathFunction = function (c, d) {
  return c * d;
};
```

interface로도 타입 지정이 가능하다. 함수의 타입을 지정할 때 다음과 같이 작성한다.

```tsx
interface mathFunction {
  (a: number, b: number): number;
}
```

### optional parameters

만약, 함수에 전달되는 파라미터 중 옵셔널한 파라미터가 있다면 c가 number 또는 undefined 타입이 될 수 있으므로 타입스크립트가 에러를 뿜을 것이다.

```tsx
const addAll = (a: number, b: number, c?: number): number => {
  return a + b + c; // error: 'c' is possibly 'undefined'.
};
```

이럴 때는 **type guard**를 해야 한다. type guard는 변수에 지정된 값의 타입을 좀더 좁히는 것을 말한다.

```tsx
const addAll = (a: number, b: number, c?: number): number => {
  if (typeof c !== "undefined") {
    return a + b + c;
  }
  return a + b;
};
```

또는, 기본 매개변수를 설정할 수도 있다. 하지만 type, interface로 지정된 타입을 참고해 함수를 선언하는 경우에는 기본 매개변수 적용이 되지 않는다.

```tsx
const sumAll = (a: number = 10, b: number, c: number = 2): number => {
  return a + b + c;
};

logMsg(addAll(2, 3, 2)); // 7
logMsg(addAll(2, 3)); // 5
logMsg(sumAll(2, 3)); // 7
logMsg(sumAll(undefined, 3)); // 15
```

### `never` type

- 함수의 리턴타입으로 사용된다.
- **항상 에러를 출력**하거나 **리턴 값을 절대로 내보내지 않는다는 것**을 의미한다.
- 또는 함수 안에 무한 루프가 있을 경우 사용한다.

```tsx
// 에러를 출력하는 함수
const createError = (errMsg: string): never => {
  throw new Error(errMsg);
};

// 함수 내에 무한루프가 존재하는 함수
const infinite = () => {
  let i: number = 1;
  while (true) {
    i++;
    if (i > 100) break; // break 문이 없다면 함수 내에 무한 루프가 발생하고, 리턴 타입은 never이다.
  }
};
```

💡 **never type을 주로 어떻게 사용할까?**

아래의 함수는 type guard를 하기 위해 조건문을 사용해 각각의 타입에 따라 리턴문을 반환한다. 하지만 항상 string 타입인 값을 반환해야 한다.

```tsx
const numberOrString = (value: number | string): string => {
  if (typeof value === "string") return "string";
  if (typeof value === "number") return "number";
  // ts: 함수에 끝 return 문이 없으며 반환 형식에 'undefined'가 포함되지 않습니다
};
```

이때, 두 조건문을 모두 만족하지 못할 경우 에러를 출력하도록 할 수 있다.

```tsx
const createError = (errMsg: string): never => {
  throw new Error(errMsg);
};

const numberOrString = (value: number | string): string => {
  if (typeof value === "string") return "string";
  if (typeof value === "number") return "number";
  return createError("This should never happen!");
};
```

Type Guard를 커스텀하여 적용할 수도 있다. 아래 함수는 어떤 값의 타입이 숫자인지 확인한다.

```tsx
const isNumber = (value: any): boolean => {
  return typeof value === "number" ? true : false;
};
```

<br>

## [05. Type Assertions (Type Casting)](<https://github.com/sandwe/TypeScript-study/tree/main/05_type_assertions(type_casting)>)

TypeScript는 코드 내 값의 타입을 추론할 수 있다. 하지만 컴파일러에게 우리가 훨씬 타입에 대해 잘 알고 있고, 타입 표명을 통해 우리가 어떤 타입인지 알고 있다는 것을 알려줄 때 Type Assertions(타입 표명) 메커니즘이 사용된다.

### `as` 키워드

```tsx
type One = string;
type Two = string | number;
type Three = "hello";

// convert to more or less specific
let a: One = "hello";

// keyword 'as'
let b = a as Two; // less specific
let c = a as Three; // more specific
```

- 함수 `addOrConcat`의 리턴 타입은 `number` 또는 `string`이므로 `myVal`의 타입을 `string`으로만 지정하면 에러가 발생한다. 따라서, 타입 표명을 통해 `addOrConcat(2, 2, “concat”)`의 리턴 타입은 무조건 `string`일 것이라고 알려준다.

```tsx
const addOrConcat = (a: number, b: number, c: "add" | "concat"): number | string => {
  if (c === "add") return a + b;
  return "" + a + b;
};

let myVal: string = addOrConcat(2, 2, "concat") as string;
```

- 우리는 타입 표명시 실수를 할 수도 있다. 때때로, TypeScript는 이러한 실수를 찾지 못할 수도 있으므로 주의해야 한다.

```tsx
// 주의! TypeScript는 문제를 찾지 못한다. 리턴 타입은 string이다.
let nextVal: number = addOrConcat(2, 2, "concat") as number;
```

<aside>
💡 `angle bracket` `<>`
꺽쇠 스타일로도 타입 표명을 할 수 있지만 이는 react의 tsx파일에서 문법적으로 모호한 상황이 발생되었다. 따라서 현재는 타입 표명을 위해 `as`를 사용하는 것이 권장된다.

</aside>

### DOM

- TypeScript는 연결된 특정 DOM 요소를 상세하게 파악하지 못한다.

먼저, `document` 내의 `img` 요소를 가져와 이미지의 주소를 참조해보자.

```tsx
const img = document.querySelector("img"); // HTMLImageElement | null

img.src; // ts: 'img'은(는) 'null'일 수 있습니다.
```

요소의 타입은 `HTMLImageElement` 또는 `null` 일 수 있으므로 주소 참조시 에러를 발생된다. 이때, **non-null assertion(!)**를 사용해 `null` 타입은 아니라고 명시해줄 수 있다.

```tsx
const img = document.querySelector("img")!; // HTMLImageElement

img.src;
```

다음으로, 요소의 `id`가 `img`인 태그를 가져와보자. 해당 요소가 `img` 요소일 것이라고 생각하여 이미지의 주소를 참조했더니 다음과 같은 에러가 발생했다.

```tsx
const myImg = document.querySelector("#img"); // Element | null

myImg.src; // ts: 'myImg'은(는) 'null'일 수 있습니다. 'Element' 형식에 'src' 속성이 없습니다.
```

요소의 타입이 `null`이라면 `src`를 참조할 수 없을 것이고, `Element`는 전체 요소를 포괄하므로 `img` 요소가 아니라면 `src` 속성이 없을 것이므로 에러가 발생한다. 요소의 타입을 `HTMLImageElement` 로 명시해주면 두 문제 모두 해결된다.

```tsx
const myImg = document.querySelector("#img") as HTMLImageElement;

myImg.src;
```

### 예제

```tsx
// Original JS code
// const year = document.getElementById("year")
// const thisYear = new Date().getFullYear()
// year.setAttribute("datetime", thisYear)
// year.textContent = thisYear

// 1st variation: (Beginner)
// let year: HTMLElement | null;
// year = document.getElementById("year");
// let thisYear: string;
// thisYear = new Date().getFullYear().toString();
// if (year) {
//   year.setAttribute("datetime", thisYear);
//   year.textContent = thisYear;
// }

// 2nd variation: (Type Assertion)
const year = document.getElementById("year") as HTMLSpanElement;
const thisYear: string = new Date().getFullYear().toString();
year.setAttribute("datetime", thisYear);
year.textContent = thisYear;
```

## [06. classes](https://github.com/sandwe/TypeScript-study/tree/main/06_classes)

```tsx
class Coder {
  name: string;
  music: string;
  age: number;
  lang: string;

  constructor(name: string, music: string, age: number, lang: string) {
    this.name = name;
    this.music = music;
    this.age = age;
    this.lang = lang;
  }
}
```

타입을 중복해서 지정해주고 있는데 visibility modifiers를 사용하면 다음과 같이 타입 중복을 제거할 수 있다.

```tsx
class Coder {
  secondLang!: string;

  constructor(public readonly name: string, public music: string, private age: number, protected lang: string = "TypeScript") {
    this.name = name;
    this.music = music;
    this.age = age;
    this.lang = lang;
  }

  public getAge() {
    return `Hello, I'm ${this.age}`;
  }
}

const developer = new Coder("sandwe", "Pop", 22);
console.log(developer.getAge());
// console.log(developer.age);
// console.log(developer.lang);
```

```tsx
class WebDev extends Coder {
  constructor(public computer: string, name: string, music: string, age: number) {
    super(name, music, age);
    this.computer = computer;
  }

  public getLang() {
    return `I write ${this.lang}`;
  }
}

const Sara = new WebDev("Mac", "Sara", "Lofi", 25);
console.log(Sara.getLang());
// console.log(Sara.lang)
```

interface로 클래스를 정의하고 클래스에 `implements` 키워드를 사용해 interface를 설정할 수 있다.

```tsx
interface Musician {
  name: string;
  instrument: string;
  play(action: string): string;
}

class Guitarist implements Musician {
  name: string;
  instrument: string;

  constructor(name: string, instrument: string) {
    this.name = name;
    this.instrument = instrument;
  }

  play(action: string) {
    return `${this.name} ${action} the ${this.instrument}`;
  }
}

const Page = new Guitarist("Jimmy", "guitar");
console.log(Page.play("strums"));
```

static 키워드를 사용해 정적 프로퍼티와 메소드를 정의할 수 있다.

```tsx
class Peeps {
  static count: number = 0;

  static getCount(): number {
    return Peeps.count;
  }

  public id: number;

  constructor(public name: string) {
    this.name = name;
    this.id = ++Peeps.count;
  }
}

const John = new Peeps("John");
const Steve = new Peeps("Steve");
const Amy = new Peeps("Amy");

console.log(John.id);
console.log(Steve.id);
console.log(Amy.id);
console.log(Peeps.count); // 3
```

getter, setter 메소드를 사용해 프로퍼티처럼 사용할 수 있다.

```tsx
class Bands {
  private dataState: string[];

  constructor() {
    this.dataState = [];
  }

  public get data(): string[] {
    return this.dataState;
  }

  public set data(value: string[]) {
    if (Array.isArray(value) && value.every((el) => typeof el === "string")) {
      this.dataState = value;
      return; // setter 함수에서 empty return은 가능하다.
    } else throw new Error("Param is not an array of strings");
  }
}

const MyBands = new Bands();
MyBands.data = ["Neil Young", "Led Zep"];
console.log(MyBands.data);
MyBands.data = [...MyBands.data, "ZZ Top"];
console.log(MyBands.data);
```

<br>

## [07. Index Signature, keyof Assertions, record utility type](https://github.com/sandwe/TypeScript-study/tree/main/07_index%20Signatures_keyof%20Assertions_Record%20Utility%20Type)

### Index Signature(인덱스 서명)

JavaScript에서 객체의 프로퍼티 값을 읽으려면 점 표기법이나 대괄호 표기법을 이용한다. 대괄호 표기법으로 값을 읽는 경우에는 키를 문자열로 따옴표로 묶어서 작성해야 한다.

```tsx
interface TransactionObj {
  Pizza: number;
  Books: number;
  Job: number;
}

const todaysTransactions: TransactionObj = {
  Pizza: -10,
  Books: -5,
  Job: 50,
};

console.log(todaysTransactions.Pizza);
console.log(todaysTransactions["Pizza"]);
```

이때 변수에 string 값을 담아서 대괄호 표기법의 키로 전달할 수 있는데 타입스크립트는 에러를 발생시킨다.

```tsx
let prop: string = "Pizza";
console.log(todaysTransactions[prop]); // ts: 'TransactionObj' 형식에서 'string' 형식의 매개 변수가 포함된 인덱스 시그니처를 찾을 수 없습니다.

const todaysNet = (transactions: TransactionObj): number => {
  let total = 0;
  for (const transaction in transactions) {
    total += transactions[transaction];
  }
  return total;
};

console.log(todaysNet(todaysTransactions));
```

따라서, interface로 객체의 타입 지정시 key와 value의 타입을 지정해준다.

```tsx
interface TransactionObj {
  readonly **[index: string]**: number;

  Pizza: number;
  Books: number;
  Job: number;
}

const todaysTransactions: TransactionObj = {
  Pizza: -10,
  Books: -5,
  Job: 50,
};

console.log(todaysTransactions.Pizza);
console.log(todaysTransactions["Pizza"]);

let prop: string = "Pizza";
console.log(todaysTransactions[prop]);

const todaysNet = (transactions: TransactionObj): number => {
  let total = 0;
  for (const transaction in transactions) {
    total += transactions[transaction];
  }
  return total;
};

console.log(todaysNet(todaysTransactions));
// todaysTransactions.Pizza = 40; // ts: 'TransactionObj' 형식의 인덱스 시그니처는 읽기만 허용됩니다.

console.log(todaysTransactions["sandwe"]);
```

### `keyof` assertions

interface로 객체 내의 타입 지정 시 인덱스 서명을 통해 key, value의 타입을 미리 지정했다.

```tsx
interface Student {
  [key: string]: string | number | number[] | undefined;
  name: string;
  GPA: number;
  classes?: number[];
}

const student: Student = {
  name: "Doug",
  GPA: 3.5,
  classes: [100, 200],
};

// console.log(student.test);

for (const key in student) {
  console.log(`${key}: ${student[key]}`);
}
```

`keyof`는 객체 형태의 타입을, 따로 속성들만 뽑아 모아 유니온 타입으로 만들어주는 연산자이다. 이를 타입 표명과 같이 사용하여 key의 타입을 지정할 수도 있다.

```tsx
interface Student {
  name: string;
  GPA: number;
  classes?: number[];
}

const student: Student = {
  name: "Doug",
  GPA: 3.5,
  classes: [100, 200],
};

// console.log(student.test);

for (const key in student) {
  console.log(`${key}: ${student[key **as keyof Student**]}`);
}

Object.keys(student).map((key) => {
  console.log(student[key **as keyof typeof student**]);
});

const logStudentKey = (student: Student, key: **keyof Student**): void => {
  console.log(`Student ${key}: ${student[key]}`);
};

logStudentKey(student, "GPA");
```

### record utility type

- 객체에 literal type을 지정하고 싶을 때 사용한다.
- `Record<Keys, Type>`
  - 프로퍼티의 키는 `Keys`의 literal type에 해당한다.
  - 프로퍼티의 값은 `Type`의 타입에 해당한다.

```tsx
type Streams = "salary" | "bonus" | "sidehustle";

type Incomes  = Record<Streams, number>
/* type Incomes = {
     salary: number;
     bonus: number;
     sidehustle: number;
	 }
*/

const monthlyIncomes: Incomes = {
  salary: 500,
  bonus: 100,
  sidehustle: 250,
};

for (const revenue in monthlyIncomes) {
  console.log(monthlyIncomes[revenue **as keyof Incomes**]);
}
```

<br>

## [08. Generics](https://github.com/sandwe/TypeScript-study/tree/main/08_Generics)

### 제네릭한 함수 만들기

- 아래와 같이 함수를 generic하게 만들면 어떤 타입이든 인자로 넘길 수도 있고, 리턴값의 타입도 무엇이든 가능하다.

```tsx
const echo = <T,>(arg: T): T => arg;
```

```tsx
const isObj = <T,>(arg: T): boolean => {
  return typeof arg === "object" && !Array.isArray(arg) && arg !== null;
};

// 인자로 다양한 타입의 값을 받을 수 있다.
console.log(isObj(true));
console.log(isObj("John"));
console.log(isObj([1, 2, 3]));
console.log(isObj({name: "John"}));
console.log(isObj(null));
```

```tsx
const isTrue = <T,>(arg: T): {arg: T; is: boolean} => {
  if (Array.isArray(arg) && !arg.length) {
    return {arg, is: false};
  }
  // 빈 객체인 경우
  if (isObj(arg) && !Object.keys(arg as keyof T).length) {
    return {arg, is: false};
  }
  return {arg, is: !!arg};
};

console.log(isTrue(false));
console.log(isTrue(0));
console.log(isTrue(true));
console.log(isTrue(1));
console.log(isTrue("Dave"));
console.log(isTrue(""));
console.log(isTrue(null));
console.log(isTrue(undefined));
console.log(isTrue({})); // modified
console.log(isTrue({name: "Dave"}));
console.log(isTrue([])); // modified
console.log(isTrue([1, 2, 3]));
console.log(isTrue(NaN));
console.log(isTrue(-0));
```

위의 `isTrue` 함수를 **interface**를 사용해 다시 작성해보자.

```tsx
interface BoolCheck<T> {
  value: T;
  is: boolean;
}

const checkBoolValue = <T>(arg: T): **BoolCheck<T>** => {
  if (Array.isArray(arg) && !arg.length) {
    return {value: arg, is: false};
  }
  // 빈 객체인 경우
  if (isObj(arg) && !Object.keys(arg as keyof T).length) {
    return {value: arg, is: false};
  }
  return {value: arg, is: !!arg};
};
```

interface를 사용해 제네릭 타입의 범위를 좁혀서 지정할 수도 있다.

예제 1)

```tsx
interface HasID {
  id: number;
}

// narrowing generic type
const processUser = <T extends HasID>(user: T): T => {
  // process the user with logic here
  return user;
};

console.log(processUser({id: 1, name: "sandwe"}));
// console.log(processUser({name: "sandwe"})); // ts: 개체 리터럴은 알려진 속성만 지정할 수 있으며 'HasID' 형식에 'name'이(가) 없습니다.
```

예제 2) `keyof` assertion 사용해 타입 좁히기

```tsx
const getUsersProperty = <T extends HasID, K extends keyof T>(users: T[], key: K): T[K][] => {
  return users.map((user) => user[key]);
};

const usersArray = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      geo: {
        lat: "-43.9509",
        lng: "-34.4618",
      },
    },
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains",
    },
  },
];

console.log(getUsersProperty(usersArray, "email"));
console.log(getUsersProperty(usersArray, "username"));
```

### 클래스에서 제네릭 사용하기

```tsx
class StateObject<T> {
  private data: T;

  constructor(value: T) {
    this.data = value;
  }

  get state(): T {
    return this.data;
  }

  set state(value: T) {
    this.data = value;
  }
}

const store = new StateObject("sandwe");
// constructor StateObject<string>(value: string): StateObject<string>
console.log(store.state);
store.state = "sand";
// store.state = 12; // ts: 'number' 형식은 'string' 형식에 할당할 수 없습니다.

const myState = new StateObject<(string | number | boolean)[]>([15]);
myState.state = ["sandwe", 2, true];
console.log(myState.state);
```

인스턴스 생성시 문자열 타입인 `sandwe`를 넘겨주게 되면 타입스크립트는 **문자열**이 state의 타입이라고 추론한다.

<br>

## [09. Utility Type](https://github.com/sandwe/TypeScript-study/tree/main/09_utility_types)

### 1. `Partial`

- 특정 타입의 부분 집합을 만족하는 타입을 정의할 수 있다.

```tsx
interface Assignment {
  studentId: string;
  title: string;
  grade: number;
  verified?: boolean;
}

const updateAssignment = (assign: Assignment, **propsToUpdate: Partial<Assignment>**): Assignment => {
  return {...assign, ...propsToUpdate};
};

const assign1: Assignment = {
  studentId: "compsci123",
  title: "Final Project",
  grade: 0,
};

console.log(updateAssignment(assign1, {grade: 95}));
const assignGraded: Assignment = updateAssignment(assign1, {grade: 95});
```

### 2. `Required` and `Readonly`

- Required Type: 인터페이스 타입의 모든 프로퍼티가 `required`로 변경한다.
- Readonly Type: 인터페이스 타입의 모든 프로퍼티를 `readonly`로 변경한다.

```tsx
interface Assignment {
  studentId: string;
  title: string;
  grade: number;
  verified?: boolean;
}

const recordAssignment = (assign: **Required<Assignment>**): Assignment => {
  // send to database, etc.
  return assign;
};

const assignVerified: **Readonly<Assignment**> = {
  ...assignGraded,
  verified: true,
};

// recordAssignment(assignGraded); // 에러, assignGraded에 verified 프로퍼티가 없기 때문에 required type에 만족하지 않는다.
recordAssignment({...assignGraded, verified: true});

// assignVerified.grade = 88; // ts: 읽기 전용 속성이므로 'grade'에 할당할 수 없습니다.
```

### 3. `Record`

- 객체의 키, 값의 타입을 지정한다. (인덱스 서명도 객체의 타입을 지정할 수 있다. 개인적으로, Record Utility Type의 구문이 더 깔끔해보인다.)
- `Records<Keys, Type>`
- `Keys`: 프로퍼티 키 타입
- `Type`: 프로퍼티 값 타입

```tsx
const hexColorMap: **Record<string, string>** = {
  // key: String, value: String
  red: "FF0000",
  green: "00FF00",
  blue: "0000FF",
};

type Students = "Sara" | "Kelly";
type LetterGrades = "A" | "B" | "C" | "D" | "U";

const finalGrades: **Record<Students, LetterGrades>** = {
  Sara: "B",
  Kelly: "U",
};

interface Grades {
  assign1: number;
  assign2: number;
}

const gradeData: **Record<Students, Grades>** = {
  Sara: {assign1: 85, assign2: 93},
  Kelly: {assign1: 76, assign2: 15},
};
```

### 4. `Pick` and `Omit`

- `Pick<Type, Keys>`: 특정 객체 타입에서 필요한 프로퍼티만 가져와 새로운 타입을 구성한다.
- `Omit<Type, Keys>`: 특정 객체 타입에서 `Keys`로 명시한 프로퍼티를 제거해 새로운 타입을 구성한다.

```tsx
type AssignResult = **Pick<Assignment, "studentId" | "grade">**;

const score: AssignResult = {
  studentId: "k123",
  grade: 85,
};

type AssignPreview = **Omit<Assignment, "grade" | "verified">**;

const preview: AssignPreview = {
  studentId: "k123",
  title: "Final Project",
};
```

### 5.`Exclude` and `Extract`

- **Pick, Omit Utility Type**과 역할이 비슷하지만 **Union Type**을 활용한다.
- `Exclude<UnionType, ExcludedMembers>`: `UnionType` 에서 `ExcludedMembers` 를 제외하고 새로운 Union Type을 구성한다.
- `Extract<Type, Union>` : `Type` 에서 `Union` 을 추출하여 새로운 Union Type을 구성한다.

```tsx
type LetterGrades = "A" | "B" | "C" | "D" | "U";

type adjustedGrade = **Exclude<LetterGrades, "U">**; // "A" | "B" | "C" | "D"

type highGrades = **Extract<LetterGrades, "A" | "B">**; // "A" | "B"
```

### 6. `NonNullable`

- 특정 타입에서 `null`과 `undefined`를 제외하고 타입을 구성한다.

```tsx
type AllPossibleGrades = "Sara" | "Kelly" | null | undefined;
type NamesOnly = NonNullable<AllPossibleGrades>; // "Sara" | "Kelly"
```

### 7. `ReturnType`

보통, 함수 선언 시에 **파라미터 타입, 리턴 타입**을 명시한다.

```tsx
type newAssign = {title: string; points: number};

const createNewAssign = (title: string, points: number): newAssign => {
  return {title, points};
};
```

위와 같이 리턴 타입을 함수 선언 전 지정하고, 함수 선언 시에 리턴 값의 타입을 지정할 수 있다. 그러나 이는 `createNewAssign` 함수 내 리턴 값이 변경되면 타입도 함께 변경해야 하는 번거로움이 있다.

이때, `ReturnType<Type>` 을 사용해 `createNewAssign` 함수의 리턴값의 타입에 따라 유동적으로 타입을 지정할 수 있다.

```tsx
const createNewAssign = (title: string, points: number) => {
  return {title, points};
};

type NewAssign = **ReturnType<typeof createNewAssign>**

const tsAssign: NewAssign = createNewAssign("Utility Types", 100);
console.log(tsAssign); // {title: 'Utility Types', points: 100}
```

- `ReturnType`은 내가 직접 선언한 함수가 아닌 **라이브러리 등의 함수**를 사용해 리턴 값이 변경되는 경우에 유용하다.

### 8. `Parameters`

- `Parameters<Type>` : 함수 타입의 파라미터 타입을 **튜플** 형태로 구성한다.

```tsx
type AssignParams = Parameters<typeof createNewAssign>; // [title: string, points: number]

const assignArgs: AssignParams = ["Generics", 100];
const tsAssign2: NewAssign = createNewAssign(...assignArgs);
console.log(tsAssign2); // {title: 'Generics', points: 100}
```

### 9. `Awaited`

- fetch 시 await과 비슷하게 동작한다.
- Promise 객체에서 ReturnType을 한번더 감싸서 **Promise 객체 내 전달된 데이터를 바로 꺼내올 때** 유용하다.

```tsx
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const data = await fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      if (err instanceof Error) console.log(err.message);
    });
  return data;
};

// type FetchUsersReturnType = ReturnType<typeof fetchUsers>; // Promise<User[]>
type FetchUsersReturnType = **Awaited<ReturnType<typeof fetchUsers>>**; // **User[]**
fetchUsers().then((users) => console.log(users));
```
