import { Card, Col } from "react-bootstrap"
import SpkTablescomponent from "../../../../../../../../@spk-reusable-components/reusable-tables/tables-component"
import { ParentFeedbackPanel } from "../../../../../type";

interface ParentFeedbackPanelTableProps {
  data: ParentFeedbackPanel[];
}

const ParentFeedbackPanelTable: React.FC<ParentFeedbackPanelTableProps> = ({ data }) => {

const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
}



  return (
    <Col xxl={8} xl={8}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between">
          <Card.Title>Veli Geri Bildirim Paneli</Card.Title>
        </Card.Header>
        <Card.Body className="p-3">
          <div className="table-responsive">
            <SpkTablescomponent
              tableClass="text-wrap"
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
              {data.map((feedback, index) => (
                <tr key={`feedback-${index}`}>
                  <td className="text-nowrap">{feedback.date}</td>
                  <td className="text-truncate" style={{ maxWidth: "150px" }}>
                    {feedback.parent_name}
                  </td>
                  <td className="text-nowrap">
                    <span
                      style={{ padding: "6px 12px" }}
                    >
                      {capitalizeFirstLetter(feedback.category)}
                    </span>
                  </td>
                  <td className="text-nowrap">{feedback.unit_title}</td>
                  <td className="text-nowrap">{feedback.contact_person}</td>
                  <td className="text-truncate" style={{ maxWidth: "200px" }}>
                    {feedback.description}
                  </td>
                </tr>
              ))}
            </SpkTablescomponent>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}



export default ParentFeedbackPanelTable