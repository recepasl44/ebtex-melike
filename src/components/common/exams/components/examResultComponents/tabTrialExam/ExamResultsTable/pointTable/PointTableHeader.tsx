const PointsTableHeader: React.FC<{ quiz_type_id: number }> = ({
  quiz_type_id,
}) => {

  const headerStyle = {
    background: "#dbddfa",
    color: "#5c67f7",
  };

  return (
    <thead>
      <tr>
      {[1, 2, 3, 4,6].includes(quiz_type_id) && (
          <>
            <th
              className="px-4 py-2 text-left"
              style={headerStyle}
            >
              Puan Türü
            </th>
            <th
              className="px-4 py-2 text-left"
              style={headerStyle}
            >
              Puan
            </th>
          </>
        )}
        <th
          className="px-4 py-2 text-left"
          style={headerStyle}
        ></th>
        {(quiz_type_id === 5 ||
          quiz_type_id === 7 ||
          quiz_type_id === 8 ||
          quiz_type_id === 9 ||
          quiz_type_id === 10 ||
          quiz_type_id === 11) && (
          <>
            <th
              className="px-4 py-2 text-left"
              style={headerStyle}
            ></th>
            <th
              className="px-4 py-2 text-left"
              style={headerStyle}
            ></th>
          </>
        )}
        <th
          className="px-4 py-2 text-center"
          style={headerStyle}
        >
          Sınıf
        </th>
        <th
          className="px-4 py-2 text-center"
          style={headerStyle}
        >
          Kurum
        </th>
        <th
          className="px-4 py-2 text-center"
          style={headerStyle}
        >
          İlçe
        </th>
        <th
          className="px-4 py-2 text-center"
          style={headerStyle}
        >
          İl
        </th>
        <th
          className="px-4 py-2 text-center"
          style={headerStyle}
        >
          Genel
        </th>
      </tr>
    </thead>
  );
};

export default PointsTableHeader;