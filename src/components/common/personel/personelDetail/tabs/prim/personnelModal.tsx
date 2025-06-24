import { useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useDebounce } from "../../../../ReusableTable";
import { usePersonnelTable } from "../../../../../hooks/employee/personel/main_list";

interface PersonnelModalProps {
  show: boolean;
  onSelect: (id: number) => void;
  onClose: () => void;
}

export default function PersonnelModal({ show, onSelect, onClose }: PersonnelModalProps) {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 500);

  const { personnelData, loading } = usePersonnelTable({
    enabled: show,
    search: debounced,
    page: 1,
    paginate: 10,
  });

  const options = useMemo(
    () =>
      (personnelData || []).map(p => ({
        id: p.id,
        label: `${p.ad} ${p.soyad}`,
      })),
    [personnelData]
  );

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Personel Seç</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Typeahead
          id="personnel-search-box"
          options={options}
          labelKey="label"
          onInputChange={setQuery}
          onChange={selected => {
            const item = selected[0] as any;
            if (item && item.id) {
              onSelect(item.id);
            }
          }}
          placeholder="Personel ara..."
          isLoading={loading}
        />
      </Modal.Body>
    </Modal>
  );
}
