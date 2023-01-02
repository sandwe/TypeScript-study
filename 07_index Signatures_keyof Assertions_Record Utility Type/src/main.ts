// Index Signatures

// interface TransactionObj {
//   // 인덱스 서명
//   // 키는 모두 string이고, 값은 모두 number라고 정의한다.
//   readonly [index: string]: number;
// }

interface TransactionObj {
  readonly [index: string]: number;

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

/////////////////////////////////////////////
interface Student {
  // [key: string]: string | number | number[] | undefined;
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
  console.log(`${key}: ${student[key as keyof Student]}`);
}

Object.keys(student).map((key) => {
  console.log(student[key as keyof typeof student]);
});

const logStudentKey = (student: Student, key: keyof Student): void => {
  console.log(`Student ${key}: ${student[key]}`);
};

logStudentKey(student, "GPA");

/////////////////////////////////////////////
// interface Incomes {
//   [key: string]: number;
// }

// Record Utility Type
type Streams = "salary" | "bonus" | "sidehustle";

// Record<Keys, Type>
type Incomes = Record<Streams, number>;

const monthlyIncomes: Incomes = {
  salary: 500,
  bonus: 100,
  sidehustle: 250,
};

for (const revenue in monthlyIncomes) {
  console.log(monthlyIncomes[revenue as keyof Incomes]);
}
