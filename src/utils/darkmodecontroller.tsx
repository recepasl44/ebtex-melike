interface DarkModeController {
  dataThemeMode: "dark" | "light";
  toggle: () => void;
  subscribe: (callback: () => void) => () => void;
}

// Tüm abone olan bileşenler için callback fonksiyonları
const subscribers = new Set<() => void>();

// Tema değiştiğinde tüm aboneleri haberdar et
const notifySubscribers = () => {
  subscribers.forEach((callback) => callback());
};

// Dark mode durumunu belirleme
const getThemeMode = (): "dark" | "light" =>
  typeof window !== "undefined" && localStorage.getItem("xintradarktheme")
    ? "dark"
    : "light";

// Dark mode controller nesnemiz
const darkcontrol: DarkModeController = {
  get dataThemeMode() {
    return getThemeMode();
  },

  toggle() {
    if (typeof window === "undefined") return;

    const current = this.dataThemeMode;
    if (current === "dark") {
      localStorage.removeItem("xintradarktheme");
    } else {
      localStorage.setItem("xintradarktheme", "dark");
    }

    // Tüm aboneleri bilgilendir
    notifySubscribers();
  },

  // Abonelik mekanizması
  subscribe(callback: () => void) {
    subscribers.add(callback);

    // Abonelikten çıkma fonksiyonu
    return () => {
      subscribers.delete(callback);
    };
  },
};

export default darkcontrol;
