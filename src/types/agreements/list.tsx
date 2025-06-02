
export interface AgreementItem {
  id: number;
  name?: string;
  [key: string]: any;
}

export interface AgreementsListResponse {
  data: AgreementItem[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface AgreementsListArg {
  enabled?: boolean;
  [key: string]: any;
}
