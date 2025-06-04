    
export interface SuccessLoginResponse {
    message: string;
    token: string;
    me: Me;
    seasons: Season[];
    default_season: Season;
    branches: Branch[];
    default_branche: Branch;
    payment_methods?: PaymentMethod[];
    currencies?: Currency[];
  }
  

  export interface ErrorLoginResponse {
    error: {
      message: string;
      status_code: number;
    };
  }
  

  export type LoginResponse = SuccessLoginResponse | ErrorLoginResponse;
  
  /**
   * @description Login isteğine gönderilen parametreler
   */
  export interface LoginPayload {
    email: string;
    password: string;
  }
  
  /**
   * @description Login durumunu takip eden state yapısı (Redux veya benzer)
   */
  export interface LoginState {
    isLoggedIn?: boolean;
    error?: string | null;
    status?: string; 
    token?: string | null;
  }
  

  export interface Me {
    id: number;
    first_name: string;
    last_name: string;
    email: string | null;
    username: string | null;
    status: number;
    confirmation_code: string | null;
    confirmed: number;
    is_term_accept: number;
    profile_img: string | null;
    cover: string | null;
    bio: string | null;
    country_id: number | null;
    city_id: number | null;
    timezone_id: number | null;
    lang_id: number | null;
    created_by: number;
    updated_by: number | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    platform_id: number;
  }
  
  /** Sezon (seasons / default_season) */
  export interface Season {
    id: number;
    name: string;
    former_id: number | null;
    created_at: string;
    updated_at: string;
    platform_id: number;
  }
  
  /** Şube (branches / default_branche) */
  export interface Branch {
    id: number;
    name: string;
    created_by: number;
    created_at: string;
    updated_at: string;
    platform_id: number;
    type: number | null;
  }
  
  /** Ödeme metotları (payment_methods) */
  export interface PaymentMethod {
    id: number;
    name: string;
    created_at: string | null;
    updated_at: string | null;
    platform_id: number;
    type: number | null;
  }
  
  /** Para birimleri (currencies) */
  export interface Currency {
    id: number;
    name: string;
    code: string;
    symbol: string;
    decimal_places: number;
    exchange_rate: string;
    status: number;
    created_at: string | null;
    updated_at: string | null;
    platform_id: number;
  }
  