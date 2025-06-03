export type HomeworkData = {
  id: number;
  name: string;
  units: Unit[];
};

export type Unit = {
  unit_id: number;
  unit_name: string;
  achievements: Achievement[];
};

export type Achievement = {
  achievements_id: number;
  achievements_name: string;
  status: "İyi" | "Orta" | "Kötü" | string; 
  teacher: string;
  source: {
    name: string;
  };
  startDate: string; 
  endDate: string;
  finalStatus: "Yapıldı" | "Aktif" | "Gelmedi" | "Yapmadı" | "Eksik" | string; 
};
