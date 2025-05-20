import React from "react";

type StudentInfoHeaderRowProps = {
  quiz_type_id: number;
};

const headerCellStyle: React.CSSProperties = {
  color: "#000",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
  padding: "8px", // Hücre içi boşluk eklendi
  textAlign: "center",
  borderBottom: "1px solid #ddd", // Sadece alt kenarlık eklendi
  height: "26px",
};

const StudentInfoHeaderRow: React.FC<StudentInfoHeaderRowProps> = ({ quiz_type_id }) => (
  <tr>
    <th style={headerCellStyle}>Adı Soyadı</th>
    <th style={headerCellStyle}>TC No</th>
    <th style={headerCellStyle}>Sınıfı</th>
    <th style={headerCellStyle}>Sınav Adı</th>
    {(quiz_type_id === 1 || quiz_type_id === 2 || quiz_type_id === 3 || quiz_type_id === 4 || quiz_type_id === 6) && (
      <th style={headerCellStyle}>Sınav Adı</th>
    )}
    <th style={headerCellStyle}>Kitapçık Türü</th>
    <th style={headerCellStyle}>Tarih</th>
  </tr>
);

export default StudentInfoHeaderRow;