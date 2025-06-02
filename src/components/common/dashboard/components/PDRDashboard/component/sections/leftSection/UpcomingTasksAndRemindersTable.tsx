import { Card } from "react-bootstrap";
import SpkTablescomponent from "../../../../../../../../@spk-reusable-components/reusable-tables/tables-component";
import { UpcomingTasksAndReminder } from "../../../../../type";

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

  // Format status
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

  return (
    <Card className="custom-card">
      <Card.Header className="justify-content-between">
        <Card.Title>Yaklaşan Görevler ve Hatırlatmalar</Card.Title>
      </Card.Header>
      <Card.Body className="p-2">
        <div className="table-responsive">
          <SpkTablescomponent
            tableClass="text-wrap text-nowrap"
            tBodyClass="table-group-divider"
            header={[
              { title: "Görev Başlığı" },
              { title: "Tarih ve Saat" },
              { title: "Kategori" },
              { title: "Durum" },
              { title: "Katılımcılar" },
            ]}
          >
            {upcomingTasksAndReminders.map((item, index) => (
              <tr key={`task-${index}`}>
                <td>{item.task_title.charAt(0).toUpperCase() + item.task_title.slice(1)}</td>
                <td>{formatDate(item.date)}</td>
                <td>{formatCategory(item.category)}</td>
                <td>{formatStatus(item.status)}</td>
                <td>{item.katılımcılar}</td>
              </tr>
            ))}
          </SpkTablescomponent>
        </div>
      </Card.Body>
    </Card>
  );
};

export default UpcomingTasksAndRemindersTable;