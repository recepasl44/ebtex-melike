import React from "react";
import { Card, Col } from "react-bootstrap";
import { FinancialTasksAndReminder } from "../type.ts";
import SpkTablescomponent from "../../../../@spk-reusable-components/reusable-tables/tables-component.tsx";

interface FinancialTasksandRemindersTableProps {
  financialTasksAndReminders: FinancialTasksAndReminder[];
}

const FinancialTasksandRemindersTable: React.FC<FinancialTasksandRemindersTableProps> = ({
  financialTasksAndReminders
}) => {
  // Fixed height container style
  const containerStyle = {
    height: '300px', // Fixed height for 5 rows + header
    maxHeight: '300px', // Ensure it doesn't expand
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden' // Hide overflow initially
  };
  
  // Inner scrollable container style
  const scrollContainerStyle = {
    overflowY: 'auto' as const, // Enable vertical scrolling
    flex: 1, // Take up all available space
    height: '100%' // Fill the container
  };

  // Status renkli metin formatı
  const getStatusText = (status: string) => {
    const statusLower = status.toLowerCase();

    if (statusLower.includes("bekliyor")) {
      return <span className="text-warning fw-medium">Bekliyor</span>;
    } else if (statusLower.includes("tamamland") || statusLower.includes("ödendi")) {
      return <span className="text-success fw-medium">Tamamlandı</span>;
    } else if (statusLower.includes("devam")) {
      return <span className="text-info fw-medium">Devam Ediyor</span>;
    } else {
      return <span className="text-secondary fw-medium">{status}</span>;
    }
  };

  // Tarih formatlaması
  const formatDate = (dateString: string) => {
    // Eğer tarih "22/12/2024" formatındaysa "22-Ara-24" formatına dönüştür
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const day = parts[0];
      const month = parseInt(parts[1]);
      const year = parts[2].substring(2);

      const monthNames = ["Oca", "Şub", "Mar", "Nis", "May", "Haz",
                          "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];

      return `${day}-${monthNames[month-1]}-${year}`;
    }

    return dateString;
  };

  // Kategori formatlaması - ilk harf büyük
  const formatCategory = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Görev adını büyük harfle başlatan fonksiyon
  const formatTaskName = (name: string) => {
    return name.split(' ').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };
  
  // Prepare table data with empty rows if needed
  const prepareTableData = () => {
    const tasksData = [...financialTasksAndReminders];
    
    // If less than 5 rows, add empty rows to maintain height
    if (tasksData.length < 5) {
      const emptyRowsNeeded = 5 - tasksData.length;
      for (let i = 0; i < emptyRowsNeeded; i++) {
        // Add empty placeholder row
        tasksData.push({} as FinancialTasksAndReminder);
      }
    }
    
    return tasksData;
  };

  return (
    <Col xs={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between">
          <Card.Title>Finansal Görevler ve Hatırlatmalar</Card.Title>
        </Card.Header>
        <Card.Body className="p-3">
          {/* Fixed height container with vertical scroll */}
          <div style={containerStyle}>
            <div style={scrollContainerStyle}>
              <SpkTablescomponent
                tableClass="text-wrap table-fixed mb-0"
                tBodyClass="table-group-divider"
                header={[
                  { title: "Görev Adı" },
                  { title: "Son Tarih" },
                  { title: "Durum" },
                  { title: "Kategori" },
                ]}
              >
                {prepareTableData().map((item, index) => {
                  // Check if this is an empty row
                  const isEmpty = !item.task_name;
                  
                  return isEmpty ? (
                    <tr key={`empty-${index}`} style={{ height: '48px' }}>
                      <td colSpan={4}>&nbsp;</td>
                    </tr>
                  ) : (
                    <tr key={`financial-task-${index}`}>
                      <td className="text-truncate" style={{ maxWidth: "200px" }} title={item.task_name}>
                        {formatTaskName(item.task_name)}
                      </td>
                      <td className="text-nowrap">{formatDate(item.last_date)}</td>
                      <td className="text-nowrap">{getStatusText(item.status)}</td>
                      <td className="text-nowrap">{formatCategory(item.categories)}</td>
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

export default FinancialTasksandRemindersTable;