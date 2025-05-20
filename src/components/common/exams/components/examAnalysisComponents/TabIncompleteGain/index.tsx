import React, { useEffect, useState } from "react";
import { TableCell, TableRow } from "../FlexibleAccordionTable/types";
import FlexibleAccordionTable from "../FlexibleAccordionTable";
import { Modal, Table } from "react-bootstrap";
import { IncomplateGainType } from "../../../../../../types/exam/incomplateGainType";

interface TabIncomplateGainTypeProps {
  initialData: IncomplateGainType[];
}

const IncomplateGain: React.FC<TabIncomplateGainTypeProps> = ({
  initialData,
}) => {
  const [examData, setExamData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  // unUsed const
  console.log("selectedRow", selectedRow);

  useEffect(() => {
    setExamData(initialData);
  }, [initialData]);

  const headerStyle: React.CSSProperties = {
    height: "26px",
    textAlign: "center" as const,
    fontSize: "12px",
    fontWeight: "bold",
    color: "#5c67f7",
    background: "#dbddfa",
  };

  const cellStyle: React.CSSProperties = {
    textAlign: "center",
    fontSize: "12px",
    color: "#000000",
    background: "#F9F9F9",
    height: "26px",
    width: "125px",
  };

  const unitColumnStyle: React.CSSProperties = {
    ...cellStyle,
    width: "420px",
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
      { content: data.net.toFixed(2), style: cellStyle },
      { content: data.successRate.toFixed(1), style: cellStyle },
      {
        content: (
          <button
            onClick={() => handleAction(index)}
            style={{
              background: "transparent",
              border: "none",
              color: "#5c67f7",
              cursor: "pointer",
              textDecoration: "underline",
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
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "1rem" }}>
            Öğrenci Listesi
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-1">
          <div className="table-responsive">
            <Table bordered size="sm" className="mb-0 text-nowrap small">
              <thead>
                <tr>
                  <th style={{ width: "40px" }}>Sınıf</th>
                  <th style={{ width: "80px" }}>Adı Soyadı</th>
                  <th style={{ width: "80px" }}>Başarı</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>9/A</td>
                  <td>Ahmet Yılmaz</td>
                  <td>85%</td>
                </tr>
                <tr>
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
