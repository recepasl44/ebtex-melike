import React from "react";
import { Table } from "react-bootstrap";
import { playBtn, editBtn } from "../../../../../assets/images/exam/index";

interface Props {
  activeTestIndex: number | null;
  data: {
    results: {
      question_no: number;
      achievement: string;
      correct_answer: number;
      example_answer: number;
      solution: string;
    }[];
  }[];
  width?: string;
  height?: string;
}

const AnalysisTable: React.FC<Props> = ({
  activeTestIndex,
  data,
  width = "100%",
  height = "auto",
}) => {
  const test = activeTestIndex !== null ? data[activeTestIndex] : null;

  const cellStyle = {
    height: "20px",
    padding: "0 10px",
    alignItems: "center",
    flexShrink: 0,
  };

  // Tablo başlıkları
  const headers = [
    { label: "Soru No", width: "60px"},
    { label: "Kazanım" },
    { label: "DC", width: "60px" },
    { label: "ÖC", width: "60px" },
    { label: "Çözüm", width: "60px" },
    { label: "Detay", width: "60px" },
  ];

  return (
    <div style={{ width, height, overflow: "auto" }}>
      <Table
        className="mb-0 table-sm table-bordered text-center"
        style={{
          backgroundColor: "#F9FAFC",
          borderColor: "#E6EFF3",
        }}
      >
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                style={{
                  color: "#5c67f7",
                  backgroundColor: "#dbddfa",
                  width: header.width || "auto",
                  ...cellStyle,
                  height: "26px",
                  fontSize: "11px",
                  fontWeight: 400,
                }}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        {test && (
          <tbody>
            {test.results.map((result, i) => (
              <tr
                key={i}
                style={{
                  backgroundColor:
                    i % 2 === 0 ? "#F9FAFC !important" : "#FFFFFF !important",
                }}
              >
                <td style={cellStyle}>{result.question_no}.</td>
                <td className="text-start" style={cellStyle}>
                  {result.achievement}
                </td>
                <td style={cellStyle}>{result.correct_answer}</td>
                <td
                  style={{
                    ...cellStyle,
                    color: result.example_answer ? "#21CE9E" : "#FB4242",
                  }}
                >
                  {result.example_answer}
                </td>
                <td style={cellStyle}>
                  <img
                    src={playBtn}
                    alt="play"
                    style={{
                      cursor: "pointer",
                      backgroundColor: "lightblue",
                      borderRadius: "50%",
                      padding: "5px",
                      width: "24px",
                      height: "24px",
                      transition: "transform 0.2s ease-in-out", // Hover animasyonu
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                    onClick={() => {
                      console.log(
                        `Solution for question ${result.question_no}`
                      );
                    }}
                  />
                </td>
                <td style={cellStyle}>
                  <img
                    src={editBtn}
                    alt="edit"
                    style={{
                      cursor: "pointer",
                      width: "28px",
                      height: "28px",
                      transition: "transform 0.2s ease-in-out", // Hover animasyonu
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                    onClick={() => {
                      console.log(`Detail for question ${result.question_no}`);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
    </div>
  );
};

export default AnalysisTable;
