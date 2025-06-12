import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TableCell, TableRow } from "../FlexibleAccordionTable/types";
import FlexibleAccordionTable from "../FlexibleAccordionTable";
import { Modal, Table } from "react-bootstrap";
import { IncomplateGainType } from "../../../../../../types/exam/incomplateGainType";
import { RootState } from "../../../../../../store";

interface TabIncomplateGainTypeProps {
  initialData: IncomplateGainType[];
}

const IncomplateGain: React.FC<TabIncomplateGainTypeProps> = ({
  initialData,
}) => {
  const [examData, setExamData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  console.log("selectedRow", selectedRow);

  // Get theme mode from Redux
  const localVariable = useSelector((state: RootState) => state.ui);
  const isDark = localVariable.dataThemeMode === "dark";

  useEffect(() => {
    setExamData(initialData);
  }, [initialData]);

  // Regular cell text styling
  const cellTextStyle = {
    leadingTrim: "both",
    textEdge: "cap",
    fontFamily: "Inter",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "150%" /* 18px */,
    textTransform: "capitalize" as const,
  };

  const headerStyle = {
    width: "125px",
    height: "26px",
    textAlign: "center" as const,
    flexShrink: 0,
    fontFamily: "Inter",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    color: "#9e5cf7",
    background: "#9e5cf71a",
    border: `1px solid ${isDark ? "#374151" : "#FFF"}`,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  };

  const cellStyle = {
    ...cellTextStyle,
    textAlign: "center" as const,
    width: "125px",
    background: isDark ? "#1E293B" : "#F9F9F9",
    color: isDark ? "#E2E8F0" : "#000000",
  };

  const unitColumnStyle = {
    ...cellTextStyle,
    textAlign: "left" as const,
    width: "420px",
    padding: "0px 10px",
    background: isDark ? "#1E293B" : "#F9F9F9",
    color: isDark ? "#E2E8F0" : "#000000",
  };

  const modalHeaderStyle = {
    backgroundColor: isDark ? "#1E293B" : "#ffffff",
    color: isDark ? "#E2E8F0" : "#000000",
    borderBottom: isDark ? "1px solid #2D3748" : "1px solid #dee2e6",
  };

  const modalBodyStyle = {
    backgroundColor: isDark ? "#0F172A" : "#ffffff",
    color: isDark ? "#E2E8F0" : "#000000",
  };

  const tableHeaderStyle = {
    backgroundColor: isDark ? "#263548" : "#dbddfa",
    color: isDark ? "#E2E8F0" : "#5c67f7",
  };

  const tableRowStyle = {
    backgroundColor: isDark ? "#1E293B" : "#F9F9F9",
    color: isDark ? "#E2E8F0" : "#000000",
  };

  const headers: TableCell[][] = [
    [
      {
        content: "Sınıflar",
        isHeader: true,
        style: { ...headerStyle, width: "125px" },
      },
      {
        content: "Dersler",
        isHeader: true,
        style: { ...headerStyle, width: "125px" },
      },
      {
        content: "Üniteler/Bölümler",
        isHeader: true,
        style: { ...headerStyle, width: "420px" },
      },
      {
        content: "Soru",
        isHeader: true,
        style: { ...headerStyle, width: "125px" },
      },
      {
        content: "Doğru",
        isHeader: true,
        style: { ...headerStyle, width: "125px" },
      },
      {
        content: "Yanlış",
        isHeader: true,
        style: { ...headerStyle, width: "125px" },
      },
      {
        content: "Boş",
        isHeader: true,
        style: { ...headerStyle, width: "125px" },
      },
      {
        content: "Net",
        isHeader: true,
        style: { ...headerStyle, width: "125px" },
      },
      {
        content: "Başarı Oranı (%)",
        isHeader: true,
        style: { ...headerStyle, width: "125px" },
      },
      {
        content: "İşlemler",
        isHeader: true,
        style: { ...headerStyle, width: "125px" },
      },
    ],
  ];

  const rows: TableRow[] = examData.map((data, index) => ({
    id: `row-${index}`,
    isAccordion: false,
    isOpenDefault: false,
    cells: [
      { content: data.grade, style: cellStyle },
      { content: data.subject, style: cellStyle },
      { content: data.unit, style: unitColumnStyle },
      { content: data.questionCount.toString(), style: cellStyle },
      { content: data.correct.toString(), style: cellStyle },
      { content: data.incorrect.toString(), style: cellStyle },
      { content: data.blank.toString(), style: cellStyle },
      { content: data.net.toFixed(1), style: cellStyle },
      { content: data.successRate.toFixed(1), style: cellStyle },
      {
        content: (
          <button
            onClick={() => handleAction(index)}
            style={{
              background: "transparent",
              border: "none",
              color: isDark ? "#5c67f7" : "#5c67f7",
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: "12px",
              fontFamily: "Inter",
            }}
          >
            Liste
          </button>
        ),
        style: cellStyle,
      },
    ],
  }));

  const handleAction = (rowIndex: number) => {
    setSelectedRow(rowIndex);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedRow(null);
  };

  return (
    <div className="mt-4">
      <FlexibleAccordionTable headers={headers} rows={rows} />
      <Modal show={showModal} onHide={handleClose} centered size="sm">
        <Modal.Header closeButton style={modalHeaderStyle}>
          <Modal.Title style={{ fontSize: "1rem", fontFamily: "Inter" }}>
            Öğrenci Listesi
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-1" style={modalBodyStyle}>
          <div className="table-responsive">
            <Table bordered size="sm" className="mb-0 text-nowrap small">
              <thead>
                <tr style={tableHeaderStyle}>
                  <th style={{ width: "40px" }}>Sınıf</th>
                  <th style={{ width: "80px" }}>Adı Soyadı</th>
                  <th style={{ width: "80px" }}>Başarı</th>
                </tr>
              </thead>
              <tbody>
                <tr style={tableRowStyle}>
                  <td>9/A</td>
                  <td>Ahmet Yılmaz</td>
                  <td>85%</td>
                </tr>
                <tr style={tableRowStyle}>
                  <td>9/A</td>
                  <td>Ahmet Yılmaz-B</td>
                  <td>78%</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default IncomplateGain;
