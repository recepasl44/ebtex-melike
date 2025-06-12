export interface Colnum {
  name: string;
  cell: number;
  rate?: string;
}

export interface Lesson {
  lesson_name: string;
  colnums: Colnum[];
}

export interface TestBooklet {
  booklet_id: number;
  booklet_name: string;
  lessons: Lesson[];
  colnums: Colnum[];
}

export interface ExamPerformanceData {
  data: {
    point_avarage: Colnum[];
    success_rate: Colnum[];
    total_net_avarage: Colnum[];
    test_lesson_avarage: Colnum[];
    test_booklets: TestBooklet[];
  };
}