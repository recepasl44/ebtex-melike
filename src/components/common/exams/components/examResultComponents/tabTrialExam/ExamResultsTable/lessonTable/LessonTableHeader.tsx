type LessonTableHeaderProps = {
  quiz_type_id: number;
};

const LessonTableHeader: React.FC<LessonTableHeaderProps> = ({ quiz_type_id }) => {
  const headers = [
    [1, 2, 3, 4].includes(quiz_type_id) ? "Sınav" : null,
    "Dersler",
    "Soru",
    "Doğru",
    "Yanlış",
    "Boş",
    "Net",
    "Sınıf Net",
    "Kurum Net",
    "Genel Net",
  ].filter(Boolean);

  const columnWidths = [
    [1, 2, 3, 4].includes(quiz_type_id) ? "80px" : null,
    "146px", // Dersler
    "91px",  // Soru
    "90px",  // Doğru
    "90px",  // Yanlış
    "89px",  // Boş
    "118px",  // Net
    "118px",  // Sınıf Net
    "118px",  // Kurum Net
    "119px",  // Genel Net
  ].filter(Boolean);

  return (
    <thead
    style={{
      color: "#5c67f7",
      fontSize: "0.8rem",
      fontWeight: 600,
    }}
    className="text-center list-group-item-action align-middle table">
      <tr>
        {headers.map((header, index) => (
          <th
            key={index}
            style={{
              backgroundColor: "#dbddfa",
              width: columnWidths[index] || "80px",
              padding: "4px",
              fontSize: "0.8rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
              verticalAlign: "middle",
              textAlign: "center",
            }}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};


export default LessonTableHeader;
