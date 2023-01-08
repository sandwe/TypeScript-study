// 제네릭한 함수 만들기
// 아래 함수에 어떤 타입이든 넘길 수 있다.
const echo = <T>(arg: T): T => arg;

const isObj = <T>(arg: T): boolean => {
  return typeof arg === "object" && !Array.isArray(arg) && arg !== null;
};

// 인자로 다양한 타입의 값을 받을 수 있다.
console.log(isObj(true));
console.log(isObj("John"));
console.log(isObj([1, 2, 3]));
console.log(isObj({name: "John"}));
console.log(isObj(null));

////////////////////////////////////////////////////////////

const isTrue = <T>(arg: T): {arg: T; is: boolean} => {
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

////////////////////////////////////////////////////////////

interface BoolCheck<T> {
  value: T;
  is: boolean;
}

const checkBoolValue = <T>(arg: T): BoolCheck<T> => {
  if (Array.isArray(arg) && !arg.length) {
    return {value: arg, is: false};
  }
  // 빈 객체인 경우
  if (isObj(arg) && !Object.keys(arg as keyof T).length) {
    return {value: arg, is: false};
  }
  return {value: arg, is: !!arg};
};

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

// 클래스에서 제네릭 사용하기
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
console.log(store.state);
store.state = "sand";
// store.state = 12; // ts: 'number' 형식은 'string' 형식에 할당할 수 없습니다.

const myState = new StateObject<(string | number | boolean)[]>([15]);
myState.state = ["sandwe", 2, true];
console.log(myState.state);
