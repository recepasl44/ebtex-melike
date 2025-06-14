
const Dashboardicon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 side-menu__icon"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0
         .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621
         0 1.125.504 1.125 1.125V21h4.125c.621
         0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
    />
  </svg>
);

export const MENUITEMS: any = [
  //  ----- MAIN TITLE -----
  {
    menutitle: "MAIN",
  },

  // ----- LİSTE YÖNETİMİ -----
  {
    title: "Liste Yönetimi",
    icon: Dashboardicon,
    type: "sub",
    children: [
      {
        title: "Öğrenciler",
        path: "listManagement/students/index",
        type: "link",
      },
    ],
  },

  // ----- ÖĞRENCİLER -----
  {
    title: "Öğrenciler",
    icon: Dashboardicon,
    type: "sub",
    children: [
      { title: "Ön Kayıt", path: "/pre-register", type: "link" },
      { title: "Kayıt", path: "/final-register", type: "link" },
    ],
  },
  //ödev
  {
    title: "Ödev Takip",
    icon: Dashboardicon,
    type: "sub",
    active: false,
    children: [
      {
        path: "/homework/index",
        type: "link",
        active: false,
        selected: false,
        title: "Ödev Takip",
      },
    ],
  },
  //yoklamna yönetimi
  //yoklama
  {
    title: "Yoklama Yönetimi",
    icon: Dashboardicon,
    type: "sub",
    children: [
      {
        path: "pollingManagement/index",
        type: "link",
        title: "Sınıf-Ders Yoklaması",
      },
      {
        path: "pollingManagement/teachersIndex",
        type: "link",
        title: "Öğretmen Yoklaması"
      },
      {
        path: "pollingManagement/parentIndex",
        type: "link",
        title: "Veli Talep Girişi",
      },
      {
        path: "pollingManagement/idareİndex",
        type: "link",
        title: "Okul-İdare Ve Destek Kadrosu",
      },
      {
        path: "pollingManagement/clupindex",
        type: "link",
        title: "Kulüp Yoklaması",
      },
      {
        path: "pollingManagement/foodindex",
        type: "link",
        title: "Yemek Yoklaması",
      },
      {
        path: "pollingManagement/OneToOneManagementPageİndex",
        type: "link",
        title: "Bire Bir Yoklama",
      },
      {
        path: "pollingManagement/staffindex",
        type: "link",
        title: "Personel Öğretmen Yoklaması",
      },
      {
        path: "pollingManagement/studyindex",
        type: "link",
        title: "Etüt Yoklaması",
      },
    ],
  },

  {
    title: "Rehberlik Takip",
    icon: Dashboardicon,
    type: "sub",
    active: false,
    children: [
      {
        path: "/guidance/studentMonitoring",
        type: "link",
        active: false,
        selected: false,
        title: "Öğrenci İzleme",
      },
      {
        path: "/guidance/work-schedule",
        type: "link",
        active: false,
        selected: false,
        title: "Çalışma Takvimi",
      },
    ],
  },

  // ----- OKUL YÖNETİMİ -----
  {
    title: "Okul Yönetimi",
    icon: Dashboardicon,
    type: "sub",
    children: [
      // Matches route -> path: /school
      {
        path: "/school",
        type: "link",
        title: "Okullar",
      },
      // Matches route -> path: /school-type
      {
        path: "/school-type",
        type: "link",
        title: "Okul Tipleri",
      },
    ],
  },

  // ----- SEZON YÖNETİMİ -----
  {
    title: "Sezon Yönetimi",
    icon: Dashboardicon,
    type: "sub",
    children: [
      // Matches route -> path: /seasons
      {
        path: "/seasons",
        type: "link",
        title: "Sezonlar",
      },
    ],
  },

  // ----- PARAMETRELER -----
  {
    title: "Parametreler",
    icon: Dashboardicon,
    type: "sub",
    children: [
      // If you don’t have a route for /parameters/country, remove or comment out:
      {
        path: "/parameters/country",
        type: "link",
        title: "Adres Yönetimi",
      },
    ],
  },

  // ----- AKADEMİK -----
  {
    title: "Akademik",
    icon: Dashboardicon,
    type: "sub",
    children: [
      // Matches route -> path: /educational-structure
      {
        path: "/educational-structure",
        type: "link",
        title: "Eğitim Yapısı",
      },
    ],
  },
  {
    title: "Sınav Yönetimi",
    icon: Dashboardicon,
    type: "sub",
    children: [
      // Matches route -> path: /educational-structure
      {
        path: "/quiz/scholar/scholarmain",
        type: "link",
        title: "Bursluluk Sınavları",
      },
    ],
  },

  // ----- FINANS VE MUHASEBE -----
  {
    title: "Finans ve Muhasebe",
    icon: Dashboardicon,
    type: "sub",
    children: [
      {
        title: "Günlük İşlemler",
        path: "/daily",
        type: "link",
      },

      {
        title: "Gelirler",
        type: "sub",
        children: [
          { title: "Gelir Kayıtları", path: "/incomes", type: "link" },
          { title: "Farklı Gelirler", path: "/other-income", type: "link" },
        ],
      },
      {
        title: "Giderler",
        type: "sub",
        children: [
          { title: "Gider Kayıtları", path: "/expenses", type: "link" },
          { title: "Kira Giderleri", path: "/rents", type: "link" },
        ],
      },
      {
        title: "Ödeme Detayı",
        path: "/paydetail",
        type: "link",
      },
      {
        title: "Tedarikçiler",
        path: "/supplier",
        type: "link",
      },
      {
        title: "Çek Yönetimi",
        path: "/checkManagement",
        type: "link",
      },
      {
        title: "Personel Yönetimi",
        type: "sub",
        children: [
          { title: "Personeller", path: "/personel", type: "link" },
          { title: "Finansal Özet", path: "/personel/financial-summary", type: "link" },
          { title: "Maliyet Planlama", path: "/personel/cost-planning", type: "link" },
          { title: "Tahmini Maliyetler", path: "/budget-estimate", type: "link" },

          {
            title: "Ders & Ek Ücretler",
            type: "sub",
            children: [
              { title: "Ders Ücreti", path: "/personelTuitionFeeCrud", type: "link" },
              { title: "Kupon Ücreti", path: "/personelCouponCrud", type: "link" },
              { title: "Özel Ders", path: "/personelSpecialCrud", type: "link" },
              { title: "Koçluk", path: "/personelCoachingCrud", type: "link" },
            ],
          },
          {
            title: "Çalışma ve Hakediş",
            type: "sub",
            children: [
              { title: "Haftalık Ders Sayısı", path: "/personelWeeklyLessonCrud", type: "link" },
              { title: "Ücret Bilgileri", path: "/personelcrud", type: "link" },
              { title: "Maaş Borç", path: "/personelCompensationCrud", type: "link" },
              { title: "Maaş Ödeme", path: "/personelSalaryPaymentCrud", type: "link" },
            ],
          },
          {
            title: "Ekstra İşlemler",
            type: "sub",
            children: [
              { title: "Prim", path: "/personelPrimlerCrud", type: "link" },
              { title: "Kesinti", path: "/personelKesintiCrud", type: "link" },
              { title: "Tazminat", path: "/personelCompensationCrud", type: "link" },
              { title: "İade", path: "/personelIadeCrud", type: "link" },
            ],
          },
        ],
      },
      {
        title: "Fatura Yönetimi",
        type: "sub",
        children: [
          {
            title: "Fatura İşleme",
            path: `${import.meta.env.BASE_URL}invoice`,
            type: "link",
          },
          {
            title: "Fatura İstatistiği",
            path: `${import.meta.env.BASE_URL}invoice/stat`,
            type: "link",
          },
        ],
      },
      { title: "Kart Yönetimi", path: "/creditcards", type: "link" },
      { title: "Transferler", path: "/transfer", type: "link" },
      { title: "Finansal Özet", path: "/financial-summary", type: "link" },
      { title: "Finans Notları", path: "/finance-notes", type: "link" },
    ],
  },

  {
    title: "Sınav Takip",
    icon: Dashboardicon,
    type: "sub",
    children: [
      {
        path: "/exams/examResult",
        type: "link",
        title: "Sınav Sonuç",
      },
      {
        path: "/exams/examAnalysis",
        type: "link",
        title: "Analiz Raporları",
      },
    ],
  },

  //  ----- WEB APPS -----
  {
    menutitle: "WEB APPS",
  },
];
