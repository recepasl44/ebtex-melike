export const exampleExamResultsData = {
  quiz_type: "YKS",
  quiz_type_id: 11,
  platform_id: 3,
  platform: {
    post_code: "34000",
    name: "Anlak Öğrenme",
    city: "İstanbul",
    county: "Kadıköy",
  },
  student: {
    student_id: 2,
    first_name: "Ahmet",
    last_name: "Yılmaz",
    identity_no: "12345678901",
    class_id: 2,
    class_name: "10-A",
  },
  quizzes: [
    {
      sub_quiz_id: 1,
      sub_quiz_name: "AYT",
    },
    {
      sub_quiz_id: 3,
      sub_quiz_name: "TYT",
    },
  ],
  booklets: [
    {
      id: 2,
      name: "A",
    },
    {
      id: 3,
      name: "B",
    },
  ],
  main_quiz_date: "2025-01-06",
  results: [
    {
      quiz_id: 3,
      quiz_name: "TYT",
      lessons: [
        {
          lesson_id: 1,
          lesson_name: "Türkçe",
          questions: 44,
          correct: 33,
          wrong: 2,
          empty: 2,
          net: 29.5,
          class_average_net: 5,
          class_net_comparison: "down",
          branch_net: 24,
          general_net: 44,
        },
        {
          lesson_id: 2,
          lesson_name: "Matematik",
          questions: 34,
          correct: 27,
          wrong: 5,
          empty: 2,
          net: 22,
          class_average_net: 6,
          class_net_comparison: "down",
          branch_net: 18,
          general_net: 30,
        },
        {
          lesson_id: 3,
          lesson_name: "Sosyal Bilgiler",
          questions: 23,
          correct: 20,
          wrong: 1,
          empty: 2,
          net: 19,
          class_average_net: 4,
          class_net_comparison: "up",
          branch_net: 17,
          general_net: 20,
        },
      ],
    },
    {
      quiz_id: 4,
      quiz_name: "AYT",
      lessons: [
        {
          lesson_id: 4,
          lesson_name: "Türkçe",
          questions: 50,
          correct: 40,
          wrong: 3,
          empty: 7,
          net: 9,
          class_average_net: 10,
          class_net_comparison: "down",
          branch_net: 30,
          general_net: 45,
        },
        {
          lesson_id: 5,
          lesson_name: "Matematik",
          questions: 40,
          correct: 35,
          wrong: 2,
          empty: 3,
          net: 33,
          class_average_net: 8,
          class_net_comparison: "up",
          branch_net: 28,
          general_net: 32,
        },
        {
          lesson_id: 6,
          lesson_name: "Sosyal Bilgiler",
          questions: 30,
          correct: 28,
          wrong: 1,
          empty: 1,
          net: 6,
          class_average_net: 6,
          class_net_comparison: "right",
          branch_net: 22,
          general_net: 25,
        },
      ],
    },
  ],
  points: [
    {
      point_type_id: 2,
      point_type_name: "SAY",
      point: 333.44,
      success_ordered: {
        class: 1,
        branch: 12,
        county: 55,
        city: 5,
        general: 256,
      },
      joined_number: {
        class: 10,
        branch: 120,
        county: 550,
        city: 50,
        general: 2560,
      },
    },
    {
      point_type_id: 1,
      point_type_name: "TYT",
      point: 444.44,
      success_ordered: {
        class: 2,
        branch: 15,
        county: 60,
        city: 10,
        general: 300,
      },
      joined_number: {
        class: 15,
        branch: 150,
        county: 600,
        city: 100,
        general: 3000,
      },
    },
  ],
  global_joined_number: {
    class: 25,
    branch: 270,
    county: 1150,
    city: 150,
    general: 5560,
  },
  global_success_ordered: {
    class: 1,
    branch: 12,
    county: 55,
    city: 5,
    general: 256,
  },
  graphic_data: [
    {
      lesson_id: 7,
      lesson_name: "Türkçe",
      total_students: 30,
      average_score: 25.4,
      top_score: 44,
    },
    {
      lesson_id: 8,
      lesson_name: "Matematik",
      total_students: 28,
      average_score: 18.7,
      top_score: 34,
    },
    {
      lesson_id: 9,
      lesson_name: "Sosyal Bilgiler",
      total_students: 25,
      average_score: 20.1,
      top_score: 23,
    },
  ],
};

export const exampleExamResultsData2 = {
  quiz_type: "11.Sınıf",
  quiz_type_id: 4,
  platform_id: 2,
  platform: {
    post_code: "34000",
    name: "Anlak Öğrenme",
    city: "İstanbul",
    county: "Kadıköy",
  },
  student: {
    student_id: 2,
    first_name: "Ahmet",
    last_name: "Yılmaz",
    identity_no: "12345678901",
    class_id: 2,
    class_name: "11-A",
  },
  quizzes: [
    {
      sub_quiz_id: 1,
      sub_quiz_name: "TYT TG-1",
    },
  ],
  booklets: [
    {
      id: 2,
      name: "A",
    },
    {
      id: 3,
      name: "B",
    },
  ],
  main_quiz_date: "2025-01-06",
  results: [
    {
      quiz_id: 3,
      quiz_name: "TYT",
      lessons: [
        {
          lesson_id: 10,
          lesson_name: "Türkçe",
          questions: 44,
          correct: 33,
          wrong: 2,
          empty: 2,
          net: 29.5,
          class_average_net: 5,
          class_net_comparison: "down",
          branch_net: 24,
          general_net: 44,
        },
        {
          lesson_id: 11,
          lesson_name: "Matematik",
          questions: 34,
          correct: 27,
          wrong: 5,
          empty: 2,
          net: 22,
          class_average_net: 6,
          class_net_comparison: "down",
          branch_net: 18,
          general_net: 30,
        },
        {
          lesson_id: 12,
          lesson_name: "Sosyal Bilgiler",
          questions: 23,
          correct: 20,
          wrong: 1,
          empty: 2,
          net: 19,
          class_average_net: 4,
          class_net_comparison: "up",
          branch_net: 17,
          general_net: 20,
        },
      ],
    },
  ],
  points: [
    {
      point_type_id: 2,
      point_type_name: "SAY",
      point: 333.44,
      success_ordered: {
        class: 1,
        branch: 12,
        county: 55,
        city: 5,
        general: 256,
      },
      joined_number: {},
    },
    {
      point_type_id: 1,
      point_type_name: "SOZ",
      point: 444.44,
      success_ordered: {
        class: 2,
        branch: 15,
        county: 60,
        city: 10,
        general: 300,
      },
      joined_number: {},
    },
    {
      point_type_id: 1,
      point_type_name: "EA",
      point: 333.44,
      success_ordered: {
        class: 2,
        branch: 15,
        county: 60,
        city: 10,
        general: 300,
      },
      joined_number: {},
    },
  ],
  global_joined_number: {
    class: 25,
    branch: 270,
    county: 1150,
    city: 150,
    general: 5560,
  },
  global_success_ordered: {},
  graphic_data: [
    {
      lesson_id: 13,
      lesson_name: "Türkçe",
      total_students: 30,
      average_score: 25.4,
      top_score: 44,
    },
    {
      lesson_id: 14,
      lesson_name: "Matematik",
      total_students: 28,
      average_score: 18.7,
      top_score: 34,
    },
    {
      lesson_id: 15,
      lesson_name: "Sosyal Bilgiler",
      total_students: 25,
      average_score: 20.1,
      top_score: 23,
    },
  ],
};

export const AnalysisData = [
  {
    name: "Fen Bilimleri Testi",
    results: [
      {
        question_no: 1,
        achievement: "Fizik - Kuvvet",
        correct_answer: "A",
        example_answer: "B",
        solution: "https://youtube.com/fen1",
      },
      {
        question_no: 2,
        achievement: "Kimya - Maddelerin Halleri",
        correct_answer: "C",
        example_answer: "C",
        solution: "https://youtube.com/fen2",
      },
      {
        question_no: 3,
        achievement: "Biyoloji - Hücre",
        correct_answer: "D",
        example_answer: "A",
        solution: "https://youtube.com/fen3",
      },
      {
        question_no: 4,
        achievement: "Fizik - Elektrik",
        correct_answer: "B",
        example_answer: "B",
        solution: "https://youtube.com/fen4",
      },
      {
        question_no: 5,
        achievement: "Kimya - Asit Baz",
        correct_answer: "A",
        example_answer: "D",
        solution: "https://youtube.com/fen5",
      },
    ],
  },
  {
    name: "Matematik Testi",
    results: [
      {
        question_no: 1,
        achievement: "Denklem Kurma",
        correct_answer: "C",
        example_answer: "C",
        solution: "https://youtube.com/mat1",
      },
      {
        question_no: 2,
        achievement: "Problemler",
        correct_answer: "D",
        example_answer: "B",
        solution: "https://youtube.com/mat2",
      },
      {
        question_no: 3,
        achievement: "Geometri - Açılar",
        correct_answer: "A",
        example_answer: "A",
        solution: "https://youtube.com/mat3",
      },
      {
        question_no: 4,
        achievement: "Fonksiyonlar",
        correct_answer: "B",
        example_answer: "C",
        solution: "https://youtube.com/mat4",
      },
      {
        question_no: 5,
        achievement: "Olasılık",
        correct_answer: "D",
        example_answer: "D",
        solution: "https://youtube.com/mat5",
      },
    ],
  },
  {
    name: "Türkçe Testi",
    results: [
      {
        question_no: 1,
        achievement: "Anlam Bilgisi",
        correct_answer: "A",
        example_answer: "A",
        solution: "https://youtube.com/tr1",
      },
      {
        question_no: 2,
        achievement: "Dil Bilgisi",
        correct_answer: "B",
        example_answer: "C",
        solution: "https://youtube.com/tr2",
      },
      {
        question_no: 3,
        achievement: "Yazım Kuralları",
        correct_answer: "C",
        example_answer: "C",
        solution: "https://youtube.com/tr3",
      },
      {
        question_no: 4,
        achievement: "Noktalama İşaretleri",
        correct_answer: "D",
        example_answer: "D",
        solution: "https://youtube.com/tr4",
      },
      {
        question_no: 5,
        achievement: "Paragraf Yorumu",
        correct_answer: "A",
        example_answer: "B",
        solution: "https://youtube.com/tr5",
      },
    ],
  },
];

export const courseExamData = {
  quiz_name: "DERS PERFORMANS SINAVI 1",
  student_id: 1,
  student: {
    first_name: "Recep",
    last_name: "Aslan",
  },
  level_id: 1,
  level: {
    name: "7",
  },
  classroom_id: 2,
  classroom: {
    name: "11-B",
    level: {
      name: "11",
    },
  },
  results: [
    {
      lesson: "Kimya",
      lesson_results: {
        question: "D",
        correct: 15,
        wrong: 22,
        empty: 21,
        net: 12.23,
        success_point: 54.54,
        class_success_rate: 12,
        branch_success_rate: 23,
      },
    },
    {
      lesson: "Türkçe",
      lesson_results: {
        question: "D",
        correct: 15,
        wrong: 22,
        empty: 21,
        net: 12.23,
        success_point: 54.54,
        class_success_rate: 12,
        branch_success_rate: 23,
      },
    },
  ],
};

export const sampleData = {
  platform: {
    name: "Anlak Öğrenme",
    city: "İstanbul",
    county: "Kadıköy",
  },
  student: {
    first_name: "Ahmet",
    last_name: "Yılmaz",
    class_name: "11-A",
  },
  quizzes: [{ sub_quiz_id: 1, sub_quiz_name: "TYT TG-1" }],
  results: [
    {
      quiz_name: "TYT",
      lessons: [
        {
          lesson_name: "Türkçe",
          questions: 44,
          correct: 33,
          wrong: 2,
          empty: 2,
          net: 29.5,
          class_average_net: 5,
        },
        {
          lesson_name: "Matematik",
          questions: 34,
          correct: 27,
          wrong: 5,
          empty: 2,
          net: 22,
          class_average_net: 6,
        },
        {
          lesson_name: "Sosyal Bilgiler",
          questions: 23,
          correct: 20,
          wrong: 1,
          empty: 2,
          net: 19,
          class_average_net: 4,
        },
      ],
    },
  ],
};

 export const  AnalysisListDataOption1 = {
  quiz: "TYT DERSLERE GÖRE NET SIRALI LİSTE",
  quiz_type_id: 1,
  platform_id: 2,
  ordered_list_type: 1,
  platform: {
    post_code: "34000",
    name: "Anlak Öğrenme",
    city: "İstanbul",
    county: "Kadıköy",
  },
  joined_number: {
    class: 10,
    branch: 120,
    county: 550,
    city: 50,
    general: 2560,
  },
  main_quiz_date: "2025-01-06",
  results: {
    students: [
      {
        id: 1,
        first_name: "recep",
        last_name: "Aslan",
        class_id: 2,
        class_name: "7.sınıf",
        ordered: 32,
        test_booklet: [
          {
            id: 2,
            name: "Sözel Test",
            lessons: [
              {
                id: 4,
                name: "türkçe",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 5,
                name: "hayat bilgisi",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "din kültürü",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "Yabancı dil",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              }
            ],
          },
          {
            id: 3,
            name: "Sayısal Test",
            lessons: [
              {
                id: 6,
                name: "matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: "fen bilimleri",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    general_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "Sözel Test",
            lessons: [
              {
                id: 4,
                name: "türkçe",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 5,
                name: "matematik",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "din kültürü",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "Yabancı dil",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              }
            ],
          },
          {
            id: 3,
            name: "Sayısal Test",
            lessons: [
              {
                id: 6,
                name: "türkçe",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: "matematik",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    branch_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "Sözel Test",
            lessons: [
              {
                id: 4,
                name: "türkçe",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 5,
                name: "hayat bilgisi",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "din yabancı dil",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "Yabancı dil",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              }
            ],
          },
          {
            id: 3,
            name: "Sayısal Test",
            lessons: [
              {
                id: 6,
                name: "matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: "fen bilimleri",
                answer: {
                  Doğru: 3,
                  Yanlış: 44,
                  Net: 84,
                },
              },
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 27,
          },
          puan: 333,
          general: 533,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
  },
};

export const  AnalysisListDataOption4 = {
  quiz: "TYT DERSLERE GÖRE NET SIRALI LİSTE",
  quiz_type_id: 2,
  platform_id: 2,
  ordered_list_type: 4,
  platform: {
    post_code: "34000",
    name: "Anlak Öğrenme",
    city: "İstanbul",
    county: "Kadıköy",
  },
  joined_number: {
    class: 10,
    branch: 120,
    county: 550,
    city: 50,
    general: 2560,
  },
  main_quiz_date: "2025-01-06",
  results: {
    students: [
      {
        id: 1,
        first_name: "recep",
        last_name: "Aslan",
        class_id: 2,
        class_name: "7.sınıf",
        ordered: 32,
        test_booklet: [
          {
            id: 2,
            name: "Sözel Test",
            lessons: [
              {
                id: 4,
                name: "türkçe",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 5,
                name: "hayat bilgisi",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "din kültürü",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "Yabancı dil",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              }
            ],
          },
          {
            id: 3,
            name: "Sayısal Test",
            lessons: [
              {
                id: 6,
                name: "matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: "fen bilimleri",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    general_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "Sözel Test",
            lessons: [
              {
                id: 4,
                name: "türkçe",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 5,
                name: "matematik",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "din kültürü",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "Yabancı dil",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              }
            ],
          },
          {
            id: 3,
            name: "Sayısal Test",
            lessons: [
              {
                id: 6,
                name: "türkçe",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: "matematik",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    branch_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "Sözel Test",
            lessons: [
              {
                id: 4,
                name: "türkçe",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 5,
                name: "hayat bilgisi",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "din yabancı dil",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "Yabancı dil",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              }
            ],
          },
          {
            id: 3,
            name: "Sayısal Test",
            lessons: [
              {
                id: 6,
                name: "matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: "fen bilimleri",
                answer: {
                  Doğru: 3,
                  Yanlış: 44,
                  Net: 84,
                },
              },
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 27,
          },
          puan: 333,
          general: 533,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
  },
};
export const  AnalysisListDataOption5 = {
  quiz: "TYT DERSLERE GÖRE NET SIRALI LİSTE",
  quiz_type_id: 2,
  platform_id: 2,
  ordered_list_type: 5,
  platform: {
    post_code: "34000",
    name: "Anlak Öğrenme",
    city: "İstanbul",
    county: "Kadıköy",
  },
  joined_number: {
    class: 10,
    branch: 120,
    county: 550,
    city: 50,
    general: 2560,
  },
  main_quiz_date: "2025-01-06",
  results: {
    students: [
      {
        id: 1,
        first_name: "recep",
        last_name: "Aslan",
        class_id: 2,
        class_name: "7.sınıf",
        ordered: 32,
        test_booklet: [
          
          {
           id:33,
            name: "T .Edebiyatı",
            lessons: [
              {
                id: 4,
                name: "Edebiyat",
                answer: {
                  Doğru: 12,
                  Yanlış: 22, 
                  Net: 4,
                },
          },
        ],
      },
          {
            id: 2,
            name: "Sosyal Bilimler",
            lessons: [
              {
                id: 4,
                name: "tarih",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 5,
                name: "Coğrafya",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "Din / Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              }
            ],
          },
          {
            id: 3,
            name: "Matematik",
            lessons: [
              {
                id: 6,
                name: "matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id:33,
             name: "Fen Bilimleri",
             lessons: [
               {
                 id: 4,
                 name: "Fizik",
                 answer: {
                   Doğru: 12,
                   Yanlış: 22, 
                   Net: 4,
                 },
           },
           {
            id: 4,
            name: "Kimya",
            answer: {
              Doğru: 12,
              Yanlış: 22, 
              Net: 4,
            },
      },
      {
        id: 4,
        name: "Biyoloji",
        answer: {
          Doğru: 12,
          Yanlış: 22, 
          Net: 4,
        },
         },
         ],
       },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    general_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "T .Edebiyatı",
            lessons: [
              {
                id: 4,
                name: "Edebiyat",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },   
            ],
          },
          {
            id: 3,
            name: "Sosyal Bilimler",
            lessons: [
              {
                id: 6,
                name: "Tarih",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: ",Coğrafya",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
              {
                id: 7,
                name: ",Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
              {
                id: 7,
                name: ",Din / Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Matematik",
            lessons: [
              {
                id: 6,
                name: "Matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Fen Bilimleri",
            lessons: [
              {
                id: 6,
                name: "Fizik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 6,
                name: "Kimya",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 6,
                name: "Biyoloji",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    branch_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "T .Edebiyatı",
            lessons: [
              {
                id: 4,
                name: "Edebiyat",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Sosyal Bilimler",
            lessons: [
              {
                id: 6,
                name: "Tarih",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: "Coğrafya",
                answer: {
                  Doğru: 3,
                  Yanlış: 44,
                  Net: 84,
                },
              },
              {
                id: 5,
                name: "Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "Din / Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              }
            ],
          },
          {
            id: 2,
            name: "Matematik",
            lessons: [
              {
                id: 4,
                name: "Matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 2,
            name: "Fen Bilimleri",
            lessons: [
              {
                id: 4,
                name: "Fizik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 4,
                name: "Kimya",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 4,
                name: "Biyoloji",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              }, 
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 27,
          },
          puan: 333,
          general: 533,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
  },
};


export const  AnalysisListDataOption6 = {
  quiz: "TYT DERSLERE GÖRE NET SIRALI LİSTE",
  quiz_type_id: 2,
  platform_id: 2,
  ordered_list_type: 6,
  platform: {
    post_code: "34000",
    name: "Anlak Öğrenme",
    city: "İstanbul",
    county: "Kadıköy",
  },
  joined_number: {
    class: 10,
    branch: 120,
    county: 550,
    city: 50,
    general: 2560,
  },
  main_quiz_date: "2025-01-06",
  results: {
    students: [
      {
        id: 1,
        first_name: "recep",
        last_name: "Aslan",
        class_id: 2,
        class_name: "7.sınıf",
        ordered: 32,
        test_booklet: [
          {
            id: 2,
            name: "Sözel Test",
            lessons: [
              {
                id: 4,
                name: "türkçe",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 5,
                name: "hayat bilgisi",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "din kültürü",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "Yabancı dil",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              }
            ],
          },
          {
            id: 3,
            name: "Sayısal Test",
            lessons: [
              {
                id: 6,
                name: "matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: "fen bilimleri",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    general_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "T .Edebiyatı",
            lessons: [
              {
                id: 4,
                name: "Edebiyat",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Sosyal Bilimler",
            lessons: [
              {
                id: 6,
                name: "Sosyal Bilimler",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Matematik",
            lessons: [
              {
                id: 6,
                name: "Matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Fen Bilimleri",
            lessons: [
              {
                id: 6,
                name: "Fen Bilimleri",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    branch_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "T .Edebiyatı",
            lessons: [
              {
                id: 4,
                name: "Edebiyat",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Sosyal Bilimler",
            lessons: [
              {
                id: 6,
                name: "Sosyal Bilimler",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Matematik",
            lessons: [
              {
                id: 6,
                name: "Matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Fen Bilimleri",
            lessons: [
              {
                id: 6,
                name: "Fen Bilimleri",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 27,
          },
          puan: 333,
          general: 533,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
  },
};
export const  AnalysisListDataOption7 = {
  quiz: "TYT DERSLERE GÖRE NET SIRALI LİSTE",
  quiz_type_id: 2,
  platform_id: 2,
  ordered_list_type: 7,
  platform: {
    post_code: "34000",
    name: "Anlak Öğrenme",
    city: "İstanbul",
    county: "Kadıköy",
  },
  joined_number: {
    class: 10,
    branch: 120,
    county: 550,
    city: 50,
    general: 2560,
  },
  main_quiz_date: "2025-01-06",
  results: {
    students: [
      {
        id: 1,
        first_name: "recep",
        last_name: "Aslan",
        class_id: 2,
        class_name: "7.sınıf",
        ordered: 32,
        test_booklet: [
          {
           id:33,
            name: "T .Edebiyatı",
            lessons: [
              {
                id: 4,
                name: "Edebiyat",
                answer: {
                  Doğru: 12,
                  Yanlış: 22, 
                  Net: 4,
                },
          },
        ],
      },
          {
            id: 2,
            name: "Sosyal Bilimler",
            lessons: [
              {
                id: 4,
                name: "tarih",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 5,
                name: "Coğrafya",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "Din / Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              }
            ],
          },
          {
            id: 3,
            name: "Matematik",
            lessons: [
              {
                id: 6,
                name: "matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id:33,
             name: "Fen Bilimleri",
             lessons: [
               {
                 id: 4,
                 name: "Fizik",
                 answer: {
                   Doğru: 12,
                   Yanlış: 22, 
                   Net: 4,
                 },
           },
           {
            id: 4,
            name: "Kimya",
            answer: {
              Doğru: 12,
              Yanlış: 22, 
              Net: 4,
            },
      },
      {
        id: 4,
        name: "Biyoloji",
        answer: {
          Doğru: 12,
          Yanlış: 22, 
          Net: 4,
        },
         },
         ],
       },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    general_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "T .Edebiyatı",
            lessons: [
              {
                id: 4,
                name: "Edebiyat",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },   
            ],
          },
          {
            id: 3,
            name: "Sosyal Bilimler",
            lessons: [
              {
                id: 6,
                name: "Tarih",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: ",Coğrafya",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
              {
                id: 7,
                name: ",Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
              {
                id: 7,
                name: ",Din / Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Matematik",
            lessons: [
              {
                id: 6,
                name: "Matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Fen Bilimleri",
            lessons: [
              {
                id: 6,
                name: "Fizik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 6,
                name: "Kimya",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 6,
                name: "Biyoloji",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    branch_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "T .Edebiyatı",
            lessons: [
              {
                id: 4,
                name: "Edebiyat",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Sosyal Bilimler",
            lessons: [
              {
                id: 6,
                name: "Tarih",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: "Coğrafya",
                answer: {
                  Doğru: 3,
                  Yanlış: 44,
                  Net: 84,
                },
              },
              {
                id: 5,
                name: "Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "Din / Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              }
            ],
          },
          {
            id: 2,
            name: "Matematik",
            lessons: [
              {
                id: 4,
                name: "Matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 2,
            name: "Fen Bilimleri",
            lessons: [
              {
                id: 4,
                name: "Fizik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 4,
                name: "Kimya",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 4,
                name: "Biyoloji",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              }, 
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 27,
          },
          puan: 333,
          general: 533,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
  },
};

export const  AnalysisListDataOption8 = {
  quiz: "TYT DERSLERE GÖRE NET SIRALI LİSTE",
  quiz_type_id: 2,
  platform_id: 2,
  ordered_list_type: 8,
  platform: {
    post_code: "34000",
    name: "Anlak Öğrenme",
    city: "İstanbul",
    county: "Kadıköy",
  },
  joined_number: {
    class: 10,
    branch: 120,
    county: 550,
    city: 50,
    general: 2560,
  },
  main_quiz_date: "2025-01-06",
  results: {
    students: [
      {
        id: 1,
        first_name: "recep",
        last_name: "Aslan",
        class_id: 2,
        class_name: "7.sınıf",
        ordered: 32,
        test_booklet: [
          {
            id: 2,
            name: "Sözel Test",
            lessons: [
              {
                id: 4,
                name: "türkçe",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 5,
                name: "hayat bilgisi",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "din kültürü",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "Yabancı dil",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              }
            ],
          },
          {
            id: 3,
            name: "Sayısal Test",
            lessons: [
              {
                id: 6,
                name: "matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: "fen bilimleri",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    general_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "T .Edebiyatı",
            lessons: [
              {
                id: 4,
                name: "Edebiyat",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Sosyal Bilimler",
            lessons: [
              {
                id: 6,
                name: "Sosyal Bilimler",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Matematik",
            lessons: [
              {
                id: 6,
                name: "Matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Fen Bilimleri",
            lessons: [
              {
                id: 6,
                name: "Fen Bilimleri",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    branch_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "T .Edebiyatı",
            lessons: [
              {
                id: 4,
                name: "Edebiyat",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Sosyal Bilimler",
            lessons: [
              {
                id: 6,
                name: "Sosyal Bilimler",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Matematik",
            lessons: [
              {
                id: 6,
                name: "Matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Fen Bilimleri",
            lessons: [
              {
                id: 6,
                name: "Fen Bilimleri",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 27,
          },
          puan: 333,
          general: 533,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
  },
};

export const  AnalysisListDataOption9 = {
  quiz: "TYT DERSLERE GÖRE NET SIRALI LİSTE",
  quiz_type_id: 2,
  platform_id: 2,
  ordered_list_type: 9,
  platform: {
    post_code: "34000",
    name: "Anlak Öğrenme",
    city: "İstanbul",
    county: "Kadıköy",
  },
  joined_number: {
    class: 10,
    branch: 120,
    county: 550,
    city: 50,
    general: 2560,
  },
  main_quiz_date: "2025-01-06",
  results: {
    students: [
      {
        id: 1,
        first_name: "recep",
        last_name: "Aslan",
        class_id: 2,
        class_name: "7.sınıf",
        ordered: 32,
        test_booklet: [
          {
           id:33,
            name: "T .Edebiyatı",
            lessons: [
              {
                id: 4,
                name: "Edebiyat",
                answer: {
                  Doğru: 12,
                  Yanlış: 22, 
                  Net: 4,
                },
          },
        ],
      },
          {
            id: 2,
            name: "Sosyal Bilimler",
            lessons: [
              {
                id: 4,
                name: "tarih",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 5,
                name: "Coğrafya",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "Din / Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              }
            ],
          },
          {
            id: 3,
            name: "Matematik",
            lessons: [
              {
                id: 6,
                name: "matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id:33,
             name: "Fen Bilimleri",
             lessons: [
               {
                 id: 4,
                 name: "Fizik",
                 answer: {
                   Doğru: 12,
                   Yanlış: 22, 
                   Net: 4,
                 },
           },
           {
            id: 4,
            name: "Kimya",
            answer: {
              Doğru: 12,
              Yanlış: 22, 
              Net: 4,
            },
      },
      {
        id: 4,
        name: "Biyoloji",
        answer: {
          Doğru: 12,
          Yanlış: 22, 
          Net: 4,
        },
         },
         ],
       },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    general_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "T .Edebiyatı",
            lessons: [
              {
                id: 4,
                name: "Edebiyat",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },   
            ],
          },
          {
            id: 3,
            name: "Sosyal Bilimler",
            lessons: [
              {
                id: 6,
                name: "Tarih",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: ",Coğrafya",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
              {
                id: 7,
                name: ",Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
              {
                id: 7,
                name: ",Din / Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Matematik",
            lessons: [
              {
                id: 6,
                name: "Matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Fen Bilimleri",
            lessons: [
              {
                id: 6,
                name: "Fizik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 6,
                name: "Kimya",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 6,
                name: "Biyoloji",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    branch_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "T .Edebiyatı",
            lessons: [
              {
                id: 4,
                name: "Edebiyat",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Sosyal Bilimler",
            lessons: [
              {
                id: 6,
                name: "Tarih",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: "Coğrafya",
                answer: {
                  Doğru: 3,
                  Yanlış: 44,
                  Net: 84,
                },
              },
              {
                id: 5,
                name: "Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "Din / Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              }
            ],
          },
          {
            id: 2,
            name: "Matematik",
            lessons: [
              {
                id: 4,
                name: "Matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 2,
            name: "Fen Bilimleri",
            lessons: [
              {
                id: 4,
                name: "Fizik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 4,
                name: "Kimya",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 4,
                name: "Biyoloji",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              }, 
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 27,
          },
          puan: 333,
          general: 533,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
  },
};

export const  AnalysisListDataOption10 = {
  quiz: "TYT DERSLERE GÖRE NET SIRALI LİSTE",
  quiz_type_id: 2,
  platform_id: 2,
  ordered_list_type: 8,
  platform: {
    post_code: "34000",
    name: "Anlak Öğrenme",
    city: "İstanbul",
    county: "Kadıköy",
  },
  joined_number: {
    class: 10,
    branch: 120,
    county: 550,
    city: 50,
    general: 2560,
  },
  main_quiz_date: "2025-01-06",
  results: {
    students: [
      {
        id: 1,
        first_name: "recep",
        last_name: "Aslan",
        class_id: 2,
        class_name: "7.sınıf",
        ordered: 32,
        test_booklet: [
          {
            id: 2,
            name: "Sözel Test",
            lessons: [
              {
                id: 4,
                name: "türkçe",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 5,
                name: "hayat bilgisi",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "din kültürü",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "Yabancı dil",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              }
            ],
          },
          {
            id: 3,
            name: "Sayısal Test",
            lessons: [
              {
                id: 6,
                name: "matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: "fen bilimleri",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    general_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "T .Edebiyatı",
            lessons: [
              {
                id: 4,
                name: "Edebiyat",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Sosyal Bilimler",
            lessons: [
              {
                id: 6,
                name: "Sosyal Bilimler",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Matematik",
            lessons: [
              {
                id: 6,
                name: "Matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Fen Bilimleri",
            lessons: [
              {
                id: 6,
                name: "Fen Bilimleri",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    branch_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "T .Edebiyatı",
            lessons: [
              {
                id: 4,
                name: "Edebiyat",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Sosyal Bilimler",
            lessons: [
              {
                id: 6,
                name: "Sosyal Bilimler",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Matematik",
            lessons: [
              {
                id: 6,
                name: "Matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Fen Bilimleri",
            lessons: [
              {
                id: 6,
                name: "Fen Bilimleri",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 27,
          },
          puan: 333,
          general: 533,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
  },
};

export const  AnalysisListDataOption11 = {
  quiz: "TYT DERSLERE GÖRE NET SIRALI LİSTE",
  quiz_type_id: 2,
  platform_id: 2,
  ordered_list_type: 11,
  platform: {
    post_code: "34000",
    name: "Anlak Öğrenme",
    city: "İstanbul",
    county: "Kadıköy",
  },
  joined_number: {
    class: 10,
    branch: 120,
    county: 550,
    city: 50,
    general: 2560,
  },
  main_quiz_date: "2025-01-06",
  results: {
    students: [
      {
        id: 1,
        first_name: "recep",
        last_name: "Aslan",
        class_id: 2,
        class_name: "7.sınıf",
        ordered: 32,
        test_booklet: [
          {
           id:33,
            name: "T .Edebiyatı",
            lessons: [
              {
                id: 4,
                name: "Edebiyat",
                answer: {
                  Doğru: 12,
                  Yanlış: 22, 
                  Net: 4,
                },
          },
        ],
      },
          {
            id: 2,
            name: "Sosyal Bilimler",
            lessons: [
              {
                id: 4,
                name: "tarih",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 5,
                name: "Coğrafya",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "Din / Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              }
            ],
          },
          {
            id: 3,
            name: "Matematik",
            lessons: [
              {
                id: 6,
                name: "matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id:33,
             name: "Fen Bilimleri",
             lessons: [
               {
                 id: 4,
                 name: "Fizik",
                 answer: {
                   Doğru: 12,
                   Yanlış: 22, 
                   Net: 4,
                 },
           },
           {
            id: 4,
            name: "Kimya",
            answer: {
              Doğru: 12,
              Yanlış: 22, 
              Net: 4,
            },
      },
      {
        id: 4,
        name: "Biyoloji",
        answer: {
          Doğru: 12,
          Yanlış: 22, 
          Net: 4,
        },
         },
         ],
       },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    general_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "T .Edebiyatı",
            lessons: [
              {
                id: 4,
                name: "Edebiyat",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },   
            ],
          },
          {
            id: 3,
            name: "Sosyal Bilimler",
            lessons: [
              {
                id: 6,
                name: "Tarih",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: ",Coğrafya",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
              {
                id: 7,
                name: ",Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
              {
                id: 7,
                name: ",Din / Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Matematik",
            lessons: [
              {
                id: 6,
                name: "Matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Fen Bilimleri",
            lessons: [
              {
                id: 6,
                name: "Fizik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 6,
                name: "Kimya",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 6,
                name: "Biyoloji",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    branch_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "T .Edebiyatı",
            lessons: [
              {
                id: 4,
                name: "Edebiyat",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Sosyal Bilimler",
            lessons: [
              {
                id: 6,
                name: "Tarih",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: "Coğrafya",
                answer: {
                  Doğru: 3,
                  Yanlış: 44,
                  Net: 84,
                },
              },
              {
                id: 5,
                name: "Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "Din / Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              }
            ],
          },
          {
            id: 2,
            name: "Matematik",
            lessons: [
              {
                id: 4,
                name: "Matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 2,
            name: "Fen Bilimleri",
            lessons: [
              {
                id: 4,
                name: "Fizik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 4,
                name: "Kimya",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 4,
                name: "Biyoloji",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              }, 
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 27,
          },
          puan: 333,
          general: 533,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
  },
};
export const  AnalysisListDataOption12 = {
  quiz: "TYT DERSLERE GÖRE NET SIRALI LİSTE",
  quiz_type_id: 2,
  platform_id: 2,
  ordered_list_type: 12,
  platform: {
    post_code: "34000",
    name: "Anlak Öğrenme",
    city: "İstanbul",
    county: "Kadıköy",
  },
  joined_number: {
    class: 10,
    branch: 120,
    county: 550,
    city: 50,
    general: 2560,
  },
  main_quiz_date: "2025-01-06",
  results: {
    students: [
      {
        id: 1,
        first_name: "recep",
        last_name: "Aslan",
        class_id: 2,
        class_name: "7.sınıf",
        ordered: 32,
        test_booklet: [
          {
            id: 2,
            name: "Sözel Test",
            lessons: [
              {
                id: 4,
                name: "türkçe",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 5,
                name: "hayat bilgisi",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "din kültürü",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "Yabancı dil",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              }
            ],
          },
          {
            id: 3,
            name: "Sayısal Test",
            lessons: [
              {
                id: 6,
                name: "matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: "fen bilimleri",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    general_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "T .Edebiyatı",
            lessons: [
              {
                id: 4,
                name: "Edebiyat",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Sosyal Bilimler",
            lessons: [
              {
                id: 6,
                name: "Sosyal Bilimler",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Matematik",
            lessons: [
              {
                id: 6,
                name: "Matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Fen Bilimleri",
            lessons: [
              {
                id: 6,
                name: "Fen Bilimleri",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    branch_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "T .Edebiyatı",
            lessons: [
              {
                id: 4,
                name: "Edebiyat",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Sosyal Bilimler",
            lessons: [
              {
                id: 6,
                name: "Sosyal Bilimler",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Matematik",
            lessons: [
              {
                id: 6,
                name: "Matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Fen Bilimleri",
            lessons: [
              {
                id: 6,
                name: "Fen Bilimleri",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 27,
          },
          puan: 333,
          general: 533,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
  },
};
export const  AnalysisListDataOption13 = {
  quiz: "TYT DERSLERE GÖRE NET SIRALI LİSTE",
  quiz_type_id: 2,
  platform_id: 2,
  ordered_list_type: 13,
  platform: {
    post_code: "34000",
    name: "Anlak Öğrenme",
    city: "İstanbul",
    county: "Kadıköy",
  },
  joined_number: {
    class: 10,
    branch: 120,
    county: 550,
    city: 50,
    general: 2560,
  },
  main_quiz_date: "2025-01-06",
  results: {
    students: [
      {
        id: 1,
        first_name: "recep",
        last_name: "Aslan",
        class_id: 2,
        class_name: "7.sınıf",
        ordered: 32,
        test_booklet: [
          {
           id:33,
            name: "T .Edebiyatı",
            lessons: [
              {
                id: 4,
                name: "Edebiyat",
                answer: {
                  Doğru: 12,
                  Yanlış: 22, 
                  Net: 4,
                },
          },
        ],
      },
          {
            id: 2,
            name: "Sosyal Bilimler",
            lessons: [
              {
                id: 4,
                name: "tarih",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 5,
                name: "Coğrafya",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "Din / Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              }
            ],
          },
          {
            id: 3,
            name: "Matematik",
            lessons: [
              {
                id: 6,
                name: "matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id:33,
             name: "Fen Bilimleri",
             lessons: [
               {
                 id: 4,
                 name: "Fizik",
                 answer: {
                   Doğru: 12,
                   Yanlış: 22, 
                   Net: 4,
                 },
           },
           {
            id: 4,
            name: "Kimya",
            answer: {
              Doğru: 12,
              Yanlış: 22, 
              Net: 4,
            },
      },
      {
        id: 4,
        name: "Biyoloji",
        answer: {
          Doğru: 12,
          Yanlış: 22, 
          Net: 4,
        },
         },
         ],
       },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    general_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "T .Edebiyatı",
            lessons: [
              {
                id: 4,
                name: "Edebiyat",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },   
            ],
          },
          {
            id: 3,
            name: "Sosyal Bilimler",
            lessons: [
              {
                id: 6,
                name: "Tarih",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: ",Coğrafya",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
              {
                id: 7,
                name: ",Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
              {
                id: 7,
                name: ",Din / Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Matematik",
            lessons: [
              {
                id: 6,
                name: "Matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Fen Bilimleri",
            lessons: [
              {
                id: 6,
                name: "Fizik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 6,
                name: "Kimya",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 6,
                name: "Biyoloji",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    branch_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "T .Edebiyatı",
            lessons: [
              {
                id: 4,
                name: "Edebiyat",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Sosyal Bilimler",
            lessons: [
              {
                id: 6,
                name: "Tarih",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: "Coğrafya",
                answer: {
                  Doğru: 3,
                  Yanlış: 44,
                  Net: 84,
                },
              },
              {
                id: 5,
                name: "Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "Din / Felsefe",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              }
            ],
          },
          {
            id: 2,
            name: "Matematik",
            lessons: [
              {
                id: 4,
                name: "Matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 2,
            name: "Fen Bilimleri",
            lessons: [
              {
                id: 4,
                name: "Fizik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 4,
                name: "Kimya",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 4,
                name: "Biyoloji",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              }, 
            ],
          },
        ],
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 27,
          },
          puan: 333,
          general: 533,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
  },
};

export const  AnalysisListDataOption14 = {
  quiz: "TYT DERSLERE GÖRE NET SIRALI LİSTE",
  quiz_type_id: 2,
  platform_id: 2,
  ordered_list_type: 14,
  platform: {
    post_code: "34000",
    name: "Anlak Öğrenme",
    city: "İstanbul",
    county: "Kadıköy",
  },
  joined_number: {
    class: 10,
    branch: 120,
    county: 550,
    city: 50,
    general: 2560,
  },
  main_quiz_date: "2025-01-06",
  results: {
    students: [
      {
        id: 1,
        first_name: "recep",
        last_name: "Aslan",
        class_id: 2,
        class_name: "7.sınıf",
        ordered: 32,
        test_booklet: [
          {
            id: 2,
            name: "Sözel Test",
            lessons: [
              {
                id: 4,
                name: "türkçe",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 5,
                name: "hayat bilgisi",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "din kültürü",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },{
                id: 5,
                name: "Yabancı dil",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              }
            ],
          },
          {
            id: 3,
            name: "Sayısal Test",
            lessons: [
              {
                id: 6,
                name: "matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: "fen bilimleri",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
            ],
          },
        ],
        TYT: "323,32",
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    general_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "T .Edebiyatı",
            lessons: [
              {
                id: 4,
                name: "Edebiyat",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Sosyal Bilimler",
            lessons: [
              {
                id: 6,
                name: "Sosyal Bilimler",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Matematik",
            lessons: [
              {
                id: 6,
                name: "Matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Fen Bilimleri",
            lessons: [
              {
                id: 6,
                name: "Fen Bilimleri",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
        ],
        TYT: "323,32",
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    branch_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "T .Edebiyatı",
            lessons: [
              {
                id: 4,
                name: "Edebiyat",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Sosyal Bilimler",
            lessons: [
              {
                id: 6,
                name: "Sosyal Bilimler",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Matematik",
            lessons: [
              {
                id: 6,
                name: "Matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
          {
            id: 3,
            name: "Fen Bilimleri",
            lessons: [
              {
                id: 6,
                name: "Fen Bilimleri",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
        ],
        TYT: "323,32",
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 27,
          },
          puan: 333,
          general: 533,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
  },
};

export const  AnalysisListDataOption15 = {
  quiz: "TYT DERSLERE GÖRE NET SIRALI LİSTE",
  quiz_type_id: 1,
  platform_id: 2,
  ordered_list_type: 15,
  platform: {
    post_code: "34000",
    name: "Anlak Öğrenme",
    city: "İstanbul",
    county: "Kadıköy",
  },
  joined_number: {
    class: 10,
    branch: 120,
    county: 550,
    city: 50,
    general: 2560,
  },
  main_quiz_date: "2025-01-06",
  results: {
    students: [
      {
        id: 1,
        first_name: "recep",
        last_name: "Aslan",
        class_id: 2,
        class_name: "7.sınıf",
        ordered: 32,
        test_booklet: [
          {
            id: 2,
            name: "AYT Matematik",
            lessons: [
              {
                id: 4,
                name: "Matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 5,
                name: "Geometri",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
            ],
          },
          {
            id: 3,
            name: "AYT Fen Bilimleri",
            lessons: [
              {
                id: 6,
                name: "Fizik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: "Kimya",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
              {
                id: 7,
                name: "Biyoloji",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
            ],
          },
        ],
        TYT: "323,32",
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    general_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "AYT Matematik",
            lessons: [
              {
                id: 4,
                name: "Matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 5,
                name: "Geometri",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
            ],
          },
          {
            id: 3,
            name: "AYT Fen Bilimleri",
            lessons: [
              {
                id: 6,
                name: "Fizik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: "Kimya",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
              {
                id: 7,
                name: "Biyoloji",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
            ],
          },
        ],
        TYT: "323,32",
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    branch_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "AYT Matematik",
            lessons: [
              {
                id: 4,
                name: "Matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 5,
                name: "Geometri",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
            ],
          },
          {
            id: 3,
            name: "AYT Fen Bilimleri",
            lessons: [
              {
                id: 6,
                name: "Fizik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: "Kimya",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
              {
                id: 7,
                name: "Biyoloji",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
            ],
          },
        ],
        TYT: "323,32",
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 27,
          },
          puan: 333,
          general: 533,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
  },
};
export const  AnalysisListDataOption16 = { // 16 . 17 .18 Aynı yapı
  quiz: "TYT DERSLERE GÖRE NET SIRALI LİSTE",
  quiz_type_id: 2,
  platform_id: 2,
  ordered_list_type: 16,
  platform: {
    post_code: "34000",
    name: "Anlak Öğrenme",
    city: "İstanbul",
    county: "Kadıköy",
  },
  joined_number: {
    class: 10,
    branch: 120,
    county: 550,
    city: 50,
    general: 2560,
  },
  main_quiz_date: "2025-01-06",
  results: {
    students: [
      {
        id: 1,
        first_name: "recep",
        last_name: "Aslan",
        class_id: 2,
        class_name: "7.sınıf",
        ordered: 32,
        test_booklet: [
          {
            id: 2,
            name: "AYT Matematik",
            lessons: [
              {
                id: 4,
                name: "Matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 5,
                name: "Geometri",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
            ],
          },
          {
            id: 3,
            name: "AYT Fen Bilimleri",
            lessons: [
              {
                id: 6,
                name: "Fizik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: "Kimya",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
              {
                id: 7,
                name: "Biyoloji",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
            ],
          },
        ],
        TYT: "323,32",
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    general_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "AYT Matematik",
            lessons: [
              {
                id: 4,
                name: "Matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 5,
                name: "Geometri",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
            ],
          },
          {
            id: 3,
            name: "AYT Fen Bilimleri",
            lessons: [
              {
                id: 6,
                name: "Fizik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: "Kimya",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
              {
                id: 7,
                name: "Biyoloji",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
            ],
          },
        ],
        TYT: "323,32",
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    branch_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "AYT Matematik",
            lessons: [
              {
                id: 4,
                name: "Matematik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 5,
                name: "Geometri",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
            ],
          },
          {
            id: 3,
            name: "AYT Fen Bilimleri",
            lessons: [
              {
                id: 6,
                name: "Fizik",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
              {
                id: 7,
                name: "Kimya",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
              {
                id: 7,
                name: "Biyoloji",
                answer: {
                  Doğru: 33,
                  Yanlış: 44,
                  Net: 44,
                },
              },
            ],
          },
        ],
        TYT: "323,32",
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 27,
          },
          puan: 333,
          general: 533,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
  },
};

export const  AnalysisListDataOption19 = { 
  quiz: "TYT DERSLERE GÖRE NET SIRALI LİSTE",
  quiz_type_id: 2,
  platform_id: 2,
  ordered_list_type: 19,
  platform: {
    post_code: "34000",
    name: "Anlak Öğrenme",
    city: "İstanbul",
    county: "Kadıköy",
  },
  joined_number: {
    class: 10,
    branch: 120,
    county: 550,
    city: 50,
    general: 2560,
  },
  main_quiz_date: "2025-01-06",
  results: {
    students: [
      {
        id: 1,
        first_name: "recep",
        last_name: "Aslan",
        class_id: 2,
        class_name: "7.sınıf",
        ordered: 32,
        test_booklet: [
          {
            id: 2,
            name: "Yabancı Dil Testi",
            lessons: [
              {
                id: 4,
                name: "Yabancı Dil",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
        ],
        TYT: "323,32",
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    general_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "Yabancı Dil Testi",
            lessons: [
              {
                id: 4,
                name: "Yabancı Dil",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
        ],
        TYT: "323,32",
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 12,
          },
          puan: 333,
          general: 233,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
    branch_avarage: [
      {
        test_booklet: [
          {
            id: 2,
            name: "Yabancı Dil Testi",
            lessons: [
              {
                id: 4,
                name: "Yabancı Dil",
                answer: {
                  Doğru: 12,
                  Yanlış: 22,
                  Net: 4,
                },
              },
            ],
          },
        ],
        TYT: "323,32",
        quiz_result: {
          total: {
            D: 22,
            Y: 21,
            N: 27,
          },
          puan: 333,
          general: 533,
          course_result: {
            course_id: 1,
            course: "sayısal",
            point: 234,
            general: 234,
          },
          course_ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
          ordered: {
            course: "TYTY Sıralaması",
            class: 12,
            branch: 31,
            county: 23,
            city: 234,
            general: 234,
          },
        },
      },
    ],
  },
};
