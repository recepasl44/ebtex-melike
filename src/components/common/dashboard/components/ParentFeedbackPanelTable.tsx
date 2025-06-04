import { Card, Col } from "react-bootstrap"
import SpkTablescomponent from "../../../../@spk-reusable-components/reusable-tables/tables-component.tsx"
import { ParentFeedbackPanel } from "../type.ts";

interface ParentFeedbackPanelTableProps {
  data: ParentFeedbackPanel[];
}

const ParentFeedbackPanelTable: React.FC<ParentFeedbackPanelTableProps> = ({ data }) => {

  const capitalizeFirstLetter = (text: string) => {
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
  }
  
  // Fixed height table container style
  const tableContainerStyle = {
    height: '300px', // Fixed height for 5 rows + header
    maxHeight: '300px', // Ensure it doesn't expand
    overflow: 'hidden', // Hide overflow initially
    display: 'flex',
    flexDirection: 'column' as const
  };
  
  // Inner scrollable container style
  const scrollContainerStyle = {
    overflowY: 'auto' as const, // Enable vertical scrolling
    flex: 1, // Take up all available space
    height: '100%' // Fill the container
  };
  
  // Prepare table data with empty rows if needed
  const prepareTableData = () => {
    const feedbackData = [...data];
    
    // If less than 5 rows, add empty rows to maintain height
    if (feedbackData.length < 5) {
      const emptyRowsNeeded = 5 - feedbackData.length;
      for (let i = 0; i < emptyRowsNeeded; i++) {
        // Add empty placeholder row
        feedbackData.push({} as ParentFeedbackPanel);
      }
    }
    
    return feedbackData;
  };

  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between">
          <Card.Title>Veli Geri Bildirim Paneli</Card.Title>
        </Card.Header>
        <Card.Body className="p-3">
          {/* Fixed height table container with vertical scroll */}
          <div className="table-responsive" style={tableContainerStyle}>
            <div style={scrollContainerStyle}>
              <SpkTablescomponent
                tableClass="text-wrap table-fixed"
                tBodyClass="table-group-divider"
                header={[
                  { title: "Tarih" },
                  { title: "Veli Adı" },
                  { title: "Kategori" },
                  { title: "Konu Başlığı" },
                  { title: "İlgili Kişi / Bölüm" },
                  { title: "Açıklamalar" },
                ]}
              >
                {prepareTableData().map((feedback, index) => {
                  // Check if this is an empty row
                  const isEmpty = !feedback.parent_name;
                  
                  return isEmpty ? (
                    <tr key={`empty-${index}`} style={{ height: '48px' }}>
                      <td colSpan={6}>&nbsp;</td>
                    </tr>
                  ) : (
                    <tr key={`feedback-${index}`}>
                      <td className="text-nowrap">{feedback.date}</td>
                      <td className="text-truncate" style={{ maxWidth: "150px" }}>
                        {feedback.parent_name}
                      </td>
                      <td className="text-nowrap">
                        <span style={{ padding: "6px 12px" }}>
                          {capitalizeFirstLetter(feedback.category)}
                        </span>
                      </td>
                      <td className="text-nowrap">{feedback.unit_title}</td>
                      <td className="text-nowrap">{feedback.contact_person}</td>
                      <td className="text-truncate" style={{ maxWidth: "200px" }}>
                        {feedback.description}
                      </td>
                    </tr>
                  );
                })}
              </SpkTablescomponent>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ParentFeedbackPanelTable;