export type TableCell = {
  content: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  className?: string;
  style?: React.CSSProperties; 
};

export type TableRow = {
  cells: TableCell[];
  className?: string;
  isHeader?: boolean;
};

export type MultiRowTableProps = {
  rows: TableRow[];
};
