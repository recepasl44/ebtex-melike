export interface AnalysisListType {
  quiz: string
  quiz_type_id: number
  platform_id: number
  ordered_list_type: number
  platform: Platform
  joined_number: JoinedNumber
  main_quiz_date: string
  results: Results
}

export interface Platform {
  post_code: string
  name: string
  city: string
  county: string
}

export interface JoinedNumber {
  class: number
  branch: number
  county: number
  city: number
  general: number
}

export interface Results {
  students: Student[]
  general_avarage: GeneralAvarage[]
  branch_avarage: BranchAvarage[]
  TYT?: string 
}

export interface Student {
  id: number
  first_name: string
  last_name: string
  class_id: number
  class_name: string
  ordered: number
  test_booklet: TestBooklet[]
  quiz_result: QuizResult
  TYT?: string 
}

export interface TestBooklet {
  id: number
  name: string
  lessons: Lesson[]
}

export interface Lesson {
  id: number
  name: string
  answer: Answer
}

export interface Answer {
  Doğru: number
  Yanlış: number
  Net: number
}

export interface QuizResult {
  total: Total
  puan: number
  general: number
  course_result: CourseResult
  course_ordered: CourseOrdered
  ordered: Ordered
}

export interface Total {
  D: number
  Y: number
  N: number
}

export interface CourseResult {
  course_id: number
  course: string
  point: number
  general: number
}

export interface CourseOrdered {
  course: string
  class: number
  branch: number
  county: number
  city: number
  general: number
}

export interface Ordered {
  course: string
  class: number
  branch: number
  county: number
  city: number
  general: number
}

export interface GeneralAvarage {
  test_booklet: TestBooklet2[]
  quiz_result: QuizResult2
  TYT?: string 
}

export interface TestBooklet2 {
  id: number
  name: string
  lessons: Lesson2[]
}

export interface Lesson2 {
  id: number
  name: string
  answer: Answer2
}

export interface Answer2 {
  Doğru: number
  Yanlış: number
  Net: number
}

export interface QuizResult2 {
  total: Total2
  puan: number
  general: number
  course_result: CourseResult2
  course_ordered: CourseOrdered2
  ordered: Ordered2
}

export interface Total2 {
  D: number
  Y: number
  N: number
}

export interface CourseResult2 {
  course_id: number
  course: string
  point: number
  general: number
}

export interface CourseOrdered2 {
  course: string
  class: number
  branch: number
  county: number
  city: number
  general: number
}

export interface Ordered2 {
  course: string
  class: number
  branch: number
  county: number
  city: number
  general: number
}

export interface BranchAvarage {
  test_booklet: TestBooklet3[]
  quiz_result: QuizResult3
  TYT?: string // Added missing TYT field
}

export interface TestBooklet3 {
  id: number
  name: string
  lessons: Lesson3[]
}

export interface Lesson3 {
  id: number
  name: string
  answer: Answer3
}

export interface Answer3 {
  Doğru: number
  Yanlış: number
  Net: number
}

export interface QuizResult3 {
  total: Total3
  puan: number
  general: number
  course_result: CourseResult3
  course_ordered: CourseOrdered3
  ordered: Ordered3
}

export interface Total3 {
  D: number
  Y: number
  N: number
}

export interface CourseResult3 {
  course_id: number
  course: string
  point: number
  general: number
}

export interface CourseOrdered3 {
  course: string
  class: number
  branch: number
  county: number
  city: number
  general: number
}

export interface Ordered3 {
  course: string
  class: number
  branch: number
  county: number
  city: number
  general: number
}