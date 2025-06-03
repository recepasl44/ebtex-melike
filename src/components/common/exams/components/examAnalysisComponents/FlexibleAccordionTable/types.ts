export interface TableCell {
    content: React.ReactNode;
    isHeader?: boolean;
    isAccordion?: boolean;
    className?: string;
    style?: React.CSSProperties;
    colSpan?: number;
    rowSpan?: number;
    action?: boolean;
  }

  export interface Colnum {
    name: string;
    cell: React.ReactNode;
    col: {
      name: string
      cell: string | number | undefined
      rate?: any
    }
  }

  export interface TableRow {
    id: string;
    isAccordion?: boolean;
    isOpenDefault?: boolean;
    rowClassName?: string;
    cells: TableCell[];
    children?: TableRow[];
    colnums?: Colnum[];
  }

  export interface FlexibleAccordionTableProps {
    headers: TableCell[][];
    rows: TableRow[];
    onCellAction?: (rowId: string, cellIndex: number, actionType: string) => void;
    isDark?: boolean;
  }
