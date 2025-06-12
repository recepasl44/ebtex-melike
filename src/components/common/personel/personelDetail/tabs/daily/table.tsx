
import { useEffect, useState } from "react"
import { Card, Form, Table, Button, Spinner, InputGroup, FormControl, Alert } from "react-bootstrap"
import { useDailyDataList } from "../../../../../hooks/employee/dailydata/useDailyDataList"
import { useDailyDataAdd } from "../../../../../hooks/employee/dailydata/useAddDailyData"
import { DailyDataItem } from "../../../../../../types/employee/dailydata/list"

interface DailyTableProps {
  personelId: number
  enabled: boolean
}

export default function DailyTable({ personelId, enabled }: DailyTableProps) {
  const currentYear = new Date().getFullYear()
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1)
  const { dailyData, loading, error, loadList } = useDailyDataList({
    personel_id: personelId,
    year: currentYear,
    month,
  })
  const { addNewDailyData, loading: saveLoading, error: saveError } = useDailyDataAdd()

  const [rows, setRows] = useState<DailyDataItem[]>([])

  // Listeyi yükle
  useEffect(() => {
    if (enabled) {
      loadList({ personel_id: personelId, year: currentYear, month })
    }
  }, [enabled, personelId, month])

  // Gelen veriyi, seçili aya ait tüm günler olacak şekilde doldur
  useEffect(() => {
    const daysInMonth = new Date(currentYear, month, 0).getDate()
    // gün bazlı default satırlar
    const defaultRows: DailyDataItem[] = Array.from({ length: daysInMonth }, (_, i) => ({
      id: i + 1, // benzersiz key olarak gün sayısını kullandık
      personel_id: personelId,
      year: currentYear,
      month,
      day: i + 1,
      ders_sayisi: 0,
      soru_sayisi: 0,
      ders_ucreti: "0.00",
      platform_id: 0,
      created_at: "",
      updated_at: "",
    }))

    // API’den gelenleri eşleştir
    if (Array.isArray(dailyData)) {
      dailyData.forEach(apiRow => {
        const idx = apiRow.day - 1
        if (idx >= 0 && idx < defaultRows.length) {
          defaultRows[idx] = {
            ...defaultRows[idx],
            ...apiRow,
            id: apiRow.day, // key olarak yine gün
          }
        }
      })
    }

    setRows(defaultRows)
  }, [dailyData, personelId, currentYear, month])

  // Hücre güncelleme
  function handleCellChange(
    day: number,
    field: "ders_sayisi" | "soru_sayisi" | "ders_ucreti",
    value: string
  ) {
    setRows(prev =>
      prev.map(r =>
        r.day === day
          ? {
            ...r,
            [field]: field === "ders_ucreti" ? value : parseInt(value) || 0,
          }
          : r
      )
    )
  }

  // Kaydet
  async function handleSave() {
    await addNewDailyData({
      personel_id: personelId,
      year: currentYear,
      month,
      rows: rows.map(r => ({
        day: r.day,
        dersSayisi: r.ders_sayisi,
        soruSayisi: r.soru_sayisi,
        dersUcreti: parseFloat(String(r.ders_ucreti)),
      })),
    })
  }

  return (
    <Card className="mb-4">
      <Card.Header className="d-flex align-items-center">
        <h5 className="me-auto mb-0">Günlük Ders/Soru Verisi</h5>
        <Form.Select
          value={month}
          style={{ width: "120px" }}
          onChange={e => setMonth(Number(e.target.value))}
        >
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}. Ay
            </option>
          ))}
        </Form.Select>
      </Card.Header>

      <Card.Body>
        {loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" />
          </div>
        ) : error ? (
          <Alert variant="danger">{String(error)}</Alert>
        ) : (
          <>
            <Table striped bordered hover size="sm" className="text-nowrap">
              <thead>
                <tr>
                  <th>Gün</th>
                  <th>Ders Sayısı</th>
                  <th>Soru Çözüm</th>
                  <th>Ders Ücreti</th>
                  <th>Toplam</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => {
                  const toplam = r.ders_sayisi * Number(r.ders_ucreti)
                  return (
                    <tr key={r.id}>
                      <td>{r.day}</td>
                      <td>
                        <FormControl
                          type="number"
                          value={r.ders_sayisi}
                          onChange={e =>
                            handleCellChange(r.day, "ders_sayisi", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <FormControl
                          type="number"
                          value={r.soru_sayisi}
                          onChange={e =>
                            handleCellChange(r.day, "soru_sayisi", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <InputGroup>
                          <FormControl
                            type="number"
                            step="0.01"
                            value={r.ders_ucreti}
                            onChange={e =>
                              handleCellChange(r.day, "ders_ucreti", e.target.value)
                            }
                          />
                          <InputGroup.Text>₺</InputGroup.Text>
                        </InputGroup>
                      </td>
                      <td>{toplam.toFixed(2)} ₺</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>

            {saveError && <Alert variant="danger">{String(saveError)}</Alert>}

            <div className="text-end">
              <Button
                variant="primary"
                onClick={handleSave}
                disabled={saveLoading}
              >
                {saveLoading ? (
                  <Spinner as="span" animation="border" size="sm" />
                ) : (
                  "Kaydet"
                )}
              </Button>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  )
}
