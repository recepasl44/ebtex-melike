export interface data {
  id: number;
  title: string;
  content: string;
  category_id: number;
  start_date: string;
  end_date: string;
  created_by: number;
  createdby: any | null;
  status: number;
  group_id: number;
  group: any | null;
}

export interface meta {
  current_page: number;
  from: number;
  last_page: number;
  links: [
    {
      url: string | null;
      label: string;
      active: boolean;
    }
  ];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface ListBulletinResponse {
  data: data[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: meta;
}

export interface BulletinListArg {
  enabled?: boolean;
  [key: string]: any;
}
