import { Card } from "react-bootstrap";
import SpkTablescomponent from "../../../../@spk-reusable-components/reusable-tables/tables-component.tsx";
import { UpcomingTasksAndReminder } from "../type.ts";

interface UpcomingTasksAndRemindersTableProps {
  upcomingTasksAndReminders: UpcomingTasksAndReminder[];
}

const UpcomingTasksAndRemindersTable: React.FC<UpcomingTasksAndRemindersTableProps> = ({
  upcomingTasksAndReminders
}) => {
  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const monthNames = [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
      "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];

    return `${day} ${monthNames[month-1]} ${year}, ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  // Format category
  const formatCategory = (category: string) => {
    switch(category.toLowerCase()) {
      case "sınav":
        return "Duyuru";
      default:
        return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  const formatStatus = (status: string) => {
    switch(status.toLowerCase()) {
      case "tamalandı":
        return "Tamamlandı";
      case "bekliyor":
        return "Bekliyor";
      case "devam ediyor":
        return "Devam Ediyor";
      case "planlandı":
        return "Planlandı";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  // Get color class for status
  const getStatusColorClass = (status: string) => {
    switch(status.toLowerCase()) {
      case "yaklaşan":
      case "planlandı":
        return "text-warning";
      case "tamamlandı":
      case "tamalandı":
        return "text-success";
      case "devam ediyor":
        return "text-primary";
      case "yapılmadı":
      case "bekliyor":
        return "text-danger";
      default:
        return "";
    }
  };

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
    const data = [...upcomingTasksAndReminders];
    
    // If less than 5 rows, add empty rows to maintain height
    if (data.length < 5) {
      const emptyRowsNeeded = 5 - data.length;
      for (let i = 0; i < emptyRowsNeeded; i++) {
        // Add empty placeholder row
        data.push({} as UpcomingTasksAndReminder);
      }
    }
    
    return data;
  };

  return (
    <Card className="custom-card">
      <Card.Header className="justify-content-between">
        <Card.Title>Yaklaşan Görevler ve Hatırlatmalar</Card.Title>
      </Card.Header>
      <Card.Body className="p-3">
        {/* Fixed height table container with vertical scroll */}
        <div className="table-responsive" style={tableContainerStyle}>
          <div style={scrollContainerStyle}>
            <SpkTablescomponent
              tableClass="text-wrap table-fixed"
              tBodyClass="table-group-divider"
              header={[
                { title: "Görev Başlığı" },
                { title: "Tarih ve Saat" },
                { title: "Kategori" },
                { title: "Durum" },
                { title: "Katılımcılar" },
              ]}
            >
              {prepareTableData().map((item, index) => {
                // Check if this is an empty row
                const isEmpty = !item.task_title;
                
                return isEmpty ? (
                  <tr key={`empty-${index}`} style={{ height: '48px' }}>
                    <td colSpan={5}>&nbsp;</td>
                  </tr>
                ) : (
                  <tr key={`task-${index}`}>
                    <td>{item.task_title.charAt(0).toUpperCase() + item.task_title.slice(1)}</td>
                    <td>{formatDate(item.date)}</td>
                    <td>{formatCategory(item.category)}</td>
                    <td className={getStatusColorClass(item.status)}>
                      {formatStatus(item.status)}
                    </td>
                    <td>{item.katılımcılar}</td>
                  </tr>
                );
              })}
            </SpkTablescomponent>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default UpcomingTasksAndRemindersTable;