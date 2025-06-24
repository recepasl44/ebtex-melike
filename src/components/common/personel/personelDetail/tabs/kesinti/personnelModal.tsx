import { useEffect, useState } from "react";
import { Modal, Form, ListGroup, Spinner } from "react-bootstrap";
import { Personel } from "../../../../../../types/employee/personel/list";
import { useDebounce } from "../../../../ReusableTable";
import axiosInstance from "../../../../../../services/axiosClient";
import { PERSONEL_LIST_EMPLOYEE } from "../../../../../../helpers/url_helper";

export interface PersonnelModalProps {
  show: boolean;
  onSelect: (id: number) => void;
  onClose: () => void;
}

export async function fetchPersonnelSearch(q: string): Promise<Personel[]> {
  const params = new URLSearchParams();
  if (q) params.set("search", q);
  params.set("paginate", "10");
  try {
    const resp = await axiosInstance.get(
      `${PERSONEL_LIST_EMPLOYEE}?${params.toString()}`
    );
    return resp.data?.data || resp.data?.personeller?.data || [];
  } catch {
    return [];
  }
}

export default function PersonnelModal({ show, onSelect, onClose }: PersonnelModalProps) {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 300);
  const [results, setResults] = useState<Personel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!show) return;
    if (!debounced) {
      setResults([]);
      return;
    }
    setLoading(true);
    fetchPersonnelSearch(debounced)
      .then(setResults)
      .finally(() => setLoading(false));
  }, [debounced, show]);

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Personel Seç</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          placeholder="Personel Ara..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {loading && <div className="mt-2 text-center"><Spinner animation="border" size="sm" /></div>}
        {results.length > 0 && (
          <ListGroup className="mt-2">
            {results.map((p) => (
              <ListGroup.Item
                action
                key={p.id}
                onClick={() => onSelect(p.id)}
              >
                {p.ad} {p.soyad}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Modal.Body>
    </Modal>
  );
}

