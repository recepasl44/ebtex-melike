import React, { useState } from "react";
import { Card, Col, Dropdown } from "react-bootstrap";
import { ThoseWhoPromiseToPay } from "../type.ts";
import SpkTablescomponent from "../../../../@spk-reusable-components/reusable-tables/tables-component.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

interface ThoseWhoPromisetoPayTableProps {
  data: ThoseWhoPromiseToPay[];
}

const ThoseWhoPromisetoPayTable: React.FC<ThoseWhoPromisetoPayTableProps> = ({ data }) => {
  const [timeFilter, setTimeFilter] = useState<"today" | "weekly" | "monthly">("today");
  // Get dark mode state from Redux
  const localVariable = useSelector((state: RootState) => state.ui);
  const isDark = localVariable.dataThemeMode === "dark";

  // Time filter display mapping
  const timeFilterText = {
    today: "Bugün",
    weekly: "Haftalık",
    monthly: "Aylık"
  };

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

  const formatCurrency = (amount: string) => {
    return `₺${parseFloat(amount).toLocaleString('tr-TR')}`;
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "ödendi":
      case "tamamlandı":
        return "text-success";
      case "ödenmedi":
        return "text-danger";
      case "günü gelmedi":
        return "text-info";
      default:
        return "";
    }
  };

  const formatStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case "tamamlandı":
        return "Ödendi";
      case "günü gelmedi":
        return "Günü Gelmedi";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  // Format description based on status
  const formatDescription = (status: string, description: string) => {
    if (status.toLowerCase() === "tamamlandı") {
      return "Tamamlandı.";
    } else if (status.toLowerCase() === "ödenmedi") {
      return "Hatırlatma gönderildi.";
    } else if (status.toLowerCase() === "günü gelmedi") {
      return "Ödeme tarihi bekleniyor.";
    } else {
      return description;
    }
  };

  // Prepare table data with empty rows if needed
  const prepareTableData = () => {
    const paymentData = [...data];
    
    // If less than 5 rows, add empty rows to maintain height
    if (paymentData.length < 5) {
      const emptyRowsNeeded = 5 - paymentData.length;
      for (let i = 0; i < emptyRowsNeeded; i++) {
        // Add empty placeholder row
        paymentData.push({} as ThoseWhoPromiseToPay);
      }
    }
    
    return paymentData;
  };

  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <Card.Title>Ödeme Vaadinde Bulunanlar</Card.Title>
          
          {/* Styled Dropdown replacing ButtonGroup */}
          <Dropdown align="end">
            <Dropdown.Toggle
              as="div"
              id="dropdown-filter"
              className="d-flex align-items-center"
              style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#8E8CF5',
                backgroundColor: isDark ? '#252530' : '#f5f5f5',
                border: 'none',
                borderRadius: '10px',
                padding: '8px 16px',
                cursor: 'pointer'
              }}
            >
              {timeFilterText[timeFilter]}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{
              minWidth: '120px',
              padding: '0.5rem 0',
              margin: '0.125rem 0 0',
              fontSize: '13px',
              backgroundColor: isDark ? '#252530' : '#ffffff',
              border: isDark ? 'none' : '1px solid rgba(0,0,0,0.15)',
              borderRadius: '8px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
              color: isDark ? '#fff' : '#212529'
            }}>
              <Dropdown.Item
                active={timeFilter === "today"}
                onClick={() => setTimeFilter("today")}
                style={{
                  color: timeFilter === "today" ? '#8E8CF5' : isDark ? '#fff' : '#212529',
                  backgroundColor: timeFilter === "today" ? 'rgba(142, 140, 245, 0.1)' : 'transparent',
                  padding: '8px 16px'
                }}
              >
                Bugün
              </Dropdown.Item>
              <Dropdown.Item
                active={timeFilter === "weekly"}
                onClick={() => setTimeFilter("weekly")}
                style={{
                  color: timeFilter === "weekly" ? '#8E8CF5' : isDark ? '#fff' : '#212529',
                  backgroundColor: timeFilter === "weekly" ? 'rgba(142, 140, 245, 0.1)' : 'transparent',
                  padding: '8px 16px'
                }}
              >
                Haftalık
              </Dropdown.Item>
              <Dropdown.Item
                active={timeFilter === "monthly"}
                onClick={() => setTimeFilter("monthly")}
                style={{
                  color: timeFilter === "monthly" ? '#8E8CF5' : isDark ? '#fff' : '#212529',
                  backgroundColor: timeFilter === "monthly" ? 'rgba(142, 140, 245, 0.1)' : 'transparent',
                  padding: '8px 16px'
                }}
              >
                Aylık
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <Card.Body className="p-3">
          {/* Fixed height container with vertical scroll */}
          <div style={containerStyle}>
            <div style={scrollContainerStyle}>
              <SpkTablescomponent
                tableClass="text-nowrap table-fixed mb-0"
                tBodyClass="table-group-divider"
                header={[
                  { title: "Dönem" },
                  { title: "Adı Soyadı" },
                  { title: "Telefon Numarası" },
                  { title: "Ödeme Tarihi" },
                  { title: "Miktar" },
                  { title: "Durum" },
                  { title: "Açıklama" },
                ]}
              >
                {prepareTableData().map((payment, index) => {
                  // Check if this is an empty row
                  const isEmpty = !payment.name;
                  
                  return isEmpty ? (
                    <tr key={`empty-${index}`} style={{ height: '48px' }}>
                      <td colSpan={7}>&nbsp;</td>
                    </tr>
                  ) : (
                    <tr key={`payment-${index}`}>
                      <td className="text-nowrap">{payment.seasson}</td>
                      <td className="text-nowrap">{payment.name}</td>
                      <td className="text-nowrap">{payment.phone?.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')}</td>
                      <td className="text-nowrap">{payment.payment_date?.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$1.$2.$3')}</td>
                      <td className="text-nowrap">{payment.amount ? formatCurrency(payment.amount) : ''}</td>
                      <td className={`text-nowrap ${getStatusClass(payment.status || '')}`}>
                        {payment.status ? formatStatus(payment.status) : ''}
                      </td>
                      <td className="text-truncate" style={{ maxWidth: "150px" }} title={formatDescription(payment.status || '', payment.description || '')}>
                        {payment.status ? formatDescription(payment.status, payment.description || '') : ''}
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

export default ThoseWhoPromisetoPayTable;