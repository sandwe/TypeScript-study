// Utility Types

// 1. Partial

interface Assignment {
  studentId: string;
  title: string;
  grade: number;
  verified?: boolean;
}

const updateAssignment = (assign: Assignment, propsToUpdate: Partial<Assignment>): Assignment => {
  return {...assign, ...propsToUpdate};
};

const assign1: Assignment = {
  studentId: "compsci123",
  title: "Final Project",
  grade: 0,
};

console.log(updateAssignment(assign1, {grade: 95}));
const assignGraded: Assignment = updateAssignment(assign1, {grade: 95});

// 2. Required and Readonly
const recordAssignment = (assign: Required<Assignment>): Assignment => {
  // send to database, etc.
  return assign;
};

const assignVerified: Readonly<Assignment> = {
  ...assignGraded,
  verified: true,
};

// recordAssignment(assignGraded); // 에러, assignGraded에 verified 프로퍼티가 없기 때문에 required type에 만족하지 않는다.
recordAssignment({...assignGraded, verified: true});
// assignVerified.grade = 88; // ts: 읽기 전용 속성이므로 'grade'에 할당할 수 없습니다.

// 3. Record
const hexColorMap: Record<string, string> = {
  // key: String, value: String
  red: "FF0000",
  green: "00FF00",
  blue: "0000FF",
};

type Students = "Sara" | "Kelly";
type LetterGrades = "A" | "B" | "C" | "D" | "U";

const finalGrades: Record<Students, LetterGrades> = {
  Sara: "B",
  Kelly: "U",
};

interface Grades {
  assign1: number;
  assign2: number;
}

const gradeData: Record<Students, Grades> = {
  Sara: {assign1: 85, assign2: 93},
  Kelly: {assign1: 76, assign2: 15},
};

// 4. Pick and Omit
type AssignResult = Pick<Assignment, "studentId" | "grade">;

const score: AssignResult = {
  studentId: "k123",
  grade: 85,
};

type AssignPreview = Omit<Assignment, "grade" | "verified">;

const preview: AssignPreview = {
  studentId: "k123",
  title: "Final Project",
};

// 5. Exclude and Extract
// string literal union type

type adjustedGrade = Exclude<LetterGrades, "U">; // "A" | "B" | "C" | "D"

type highGrades = Extract<LetterGrades, "A" | "B">; // "A" | "B"

// 6. NonNullable

type AllPossibleGrades = "Sara" | "Kelly" | null | undefined;
type NamesOnly = NonNullable<AllPossibleGrades>; // "Sara" | "Kelly"

// 7. ReturnType

// type newAssign = {title: string; points: number};

const createNewAssign = (title: string, points: number) => {
  return {title, points};
};

type NewAssign = ReturnType<typeof createNewAssign>;

const tsAssign: NewAssign = createNewAssign("Utility Types", 100);
console.log(tsAssign); // {title: 'Utility Types', points: 100}

// 8. Parameters
type AssignParams = Parameters<typeof createNewAssign>;

const assignArgs: AssignParams = ["Generics", 100];
const tsAssign2: NewAssign = createNewAssign(...assignArgs);
console.log(tsAssign2); // {title: 'Generics', points: 100}

// 9. Awaited - Promise에서 ReturnType과 함께 사용된다.
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
type FetchUsersReturnType = Awaited<ReturnType<typeof fetchUsers>>; // User[]
fetchUsers().then((users) => console.log(users));
