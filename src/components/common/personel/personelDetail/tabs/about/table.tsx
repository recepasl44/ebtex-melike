import { Table, Card } from "react-bootstrap";
import { Personel } from "../../../../../../types/employee/personel/list";

interface AboutTabProps {
  personel: Personel;
}

export default function PersonelAboutTab({ personel }: AboutTabProps) {
  const rows = [
    { label: "Ad", value: personel.ad },
    { label: "Soyad", value: personel.soyad },
    { label: "TC Kimlik No", value: personel.tc_kimlik_no },
    { label: "Görev", value: personel.gorev },
    { label: "Branş", value: personel.brans },
    { label: "Telefon", value: personel.telefon },
    { label: "Email", value: personel.email },
    { label: "Adres", value: personel.adres },
    {
      label: "Doğum Tarihi",
      value: personel.dogum_tarihi ? personel.dogum_tarihi.split("T")[0] : "-",
    },
    {
      label: "İşe Giriş Tarihi",
      value: personel.ise_giris_tarihi
        ? personel.ise_giris_tarihi.split("T")[0]
        : "-",
    },
  ];

  return (
    <Card>
      <Card.Body>
        <Table bordered hover size="sm" className="mb-0">
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx}>
                <th style={{ width: "200px" }}>{r.label}</th>
                <td>{r.value || "-"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
