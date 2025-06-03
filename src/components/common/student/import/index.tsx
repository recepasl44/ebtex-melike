"use client";
import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { Link } from "@mui/material";

interface IRule {
  icon: string;
  type: "danger" | "warning" | "info" | "success";
  title: string;
  description: string;
}

export default function ExcelImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal + rules logic
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false);
  const [acceptedRules, setAcceptedRules] = useState<boolean>(false);

  // Spinners array
  const Colorspinner = [
    { color: "primary" },
    { color: "secondary" },
    { color: "success" },
    { color: "danger" },
    { color: "warning" },
    { color: "info" }
  ];

  // Validation / rule messages
  const rules: IRule[] = [
    {
      icon: "bi-exclamation-circle-fill",
      type: "danger",
      title: "[Kayıt Tarihi]",
      description:
        "Bu alan zorunludur. 28.06.2024 (Gün.Ay.Yıl) formatında yazılmalıdır."
    },
    {
      icon: "bi-exclamation-circle-fill",
      type: "danger",
      title: "[Öğrenci Tc Kimlik No]",
      description:
        "11 haneli ve geçerli bir TC Kimlik numarası yazılmalıdır."
    },
    {
      icon: "bi-exclamation-circle-fill",
      type: "danger",
      title: "[Öğrenci Cinsiyeti]",
      description:
        "Bu alan zorunludur. Yalnızca K veya E harfi yazılmalıdır."
    },
    {
      icon: "bi-exclamation-triangle-fill",
      type: "danger",
      title: "[Öğrenci Adı]",
      description:
        "Bu alan zorunludur. En fazla 30 karakter uzunluğunda yazılabilir."
    },
    {
      icon: "bi-exclamation-diamond-fill",
      type: "danger",
      title: "[Öğrenci Soyadı]",
      description:
        "Bu alan zorunludur. En fazla 30 karakter uzunluğunda yazılabilir."
    },
    {
      icon: "bi-exclamation-triangle-fill",
      type: "warning",
      title: "[Öğrenci Doğum Tarihi]",
      description:
        "16.02.2009 (Gün.Ay.Yıl) formatında yazılmalıdır."
    },
    {
      icon: "bi-exclamation-triangle-fill",
      type: "warning",
      title: "[Öğrenci E-Posta]",
      description:
        "Bu alan zorunludur. En fazla 60 karakter uzunluğunda, geçerli bir e-posta adresi."
    },
    {
      icon: "bi-exclamation-circle-fill",
      type: "warning",
      title: "[Öğrenci Ev Tel]",
      description:
        "Opsiyoneldir. Başında 0 olmadan, 10 haneli (örneğin, 3129999999) olacak şekilde yazılmalıdır."
    },
    {
      icon: "bi-exclamation-circle-fill",
      type: "warning",
      title: "[Öğrenci Cep Tel]",
      description:
        "Opsiyoneldir. Başında 0 olmadan, 10 haneli (örneğin, 5559999999) olacak şekilde yazılmalıdır."
    },
    {
      icon: "bi-exclamation-circle-fill",
      type: "danger",
      title: "[Veli Tc Kimlik No]",
      description:
        "Bu alan zorunludur. 11 haneli ve geçerli bir TC Kimlik numarası yazılmalıdır."
    },
    {
      icon: "bi-exclamation-circle-fill",
      type: "danger",
      title: "[Veli Ad-Soyad]",
      description:
        "Bu alan zorunludur. En fazla 50 karakter uzunluğunda yazılabilir."
    },
    {
      icon: "bi-exclamation-circle-fill",
      type: "danger",
      title: "[Veli Yakınlığı]",
      description:
        "Bu alan zorunludur. En fazla 20 karakter uzunluğunda yazılabilir."
    },
    {
      icon: "bi-exclamation-circle-fill",
      type: "danger",
      title: "[Veli Cep Tel]",
      description:
        "Başında 0 olmadan, 10 haneli olacak şekilde yazılmalıdır (örneğin, 5559999999)."
    },
    {
      icon: "bi-exclamation-circle-fill",
      type: "danger",
      title: "[Okul Seviyesi]",
      description: "Bu alan zorunludur."
    },
    {
      icon: "bi-exclamation-circle-fill",
      type: "danger",
      title: "[Sınıf Seviyesi]",
      description: "Bu alan zorunludur."
    },
    {
      icon: "bi-exclamation-circle-fill",
      type: "danger",
      title: "[Alan]",
      description: "Bu alan zorunludur."
    },
    {
      icon: "bi-exclamation-circle-fill",
      type: "danger",
      title: "[Okul]",
      description: "Bu alan zorunludur."
    },
    {
      icon: "bi-exclamation-circle-fill",
      type: "danger",
      title: "[Ülke]",
      description: "Bu alan zorunludur."
    },
    {
      icon: "bi-exclamation-circle-fill",
      type: "danger",
      title: "[İl]",
      description: "Bu alan zorunludur."
    },
    {
      icon: "bi-exclamation-circle-fill",
      type: "danger",
      title: "[İlçe]",
      description: "Bu alan zorunludur."
    },
    {
      icon: "bi-exclamation-circle-fill",
      type: "danger",
      title: "[Mahalle]",
      description: "Bu alan zorunludur."
    },
    {
      icon: "bi-exclamation-circle-fill",
      type: "danger",
      title: "[Açık Adres]",
      description: "Bu alan zorunludur."
    }
  ];

  /**
   * Handle clicks in the upload area
   * - If user hasn’t checked the “read rules” box, show rules modal
   * - Otherwise open file selector
   */
  const handleAreaClick = () => {
    if (!acceptedRules) {
      setShowRulesModal(true);
    } else {
      fileInputRef.current?.click();
    }
  };

  /**
   * Input file change
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      handleImport(selectedFile);
    }
  };

  /**
   * Import logic
   */
  const handleImport = async (selectedFile: File) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("student_import", selectedFile);

      // This is an example endpoint; adapt as needed
      const resp = await fetch("https://anlakogrenme.com/api/v1/students/imports", {
        method: "POST",
        headers: {
          // Replace with your real token logic
          Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJS..."
        },
        body: formData
      });
      if (!resp.ok) {
        const errorData = await resp.json();
        throw new Error(errorData.message || "İçe aktarma hatası");
      }
      toast.success("Dosya başarıyla içe aktarıldı.");
      setAcceptedRules(false);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Confirm reading rules
   */
  const handleRulesAccept = () => {
    if (acceptedRules) {
      setShowRulesModal(false);
      fileInputRef.current?.click();
    } else {
      toast.error("Lütfen tüm talimatları okuduğunuzu işaretleyin.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%"
      }}
    >
      {/* Content Area */}
      <div style={{ width: "100%", borderRadius: "8px" }}>
        <div style={{ marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <h5 style={{ marginTop: "3rem" }}>Önemli Kurallar</h5>
            <Link
              href="https://anlakogrenme.com/public/excel.xlsx"
              download
              className="btn btn-outline-secondary"
            >
              Örnek Dosya
            </Link>
          </div>
          <p style={{ fontSize: "0.9rem", color: "#444" }}>
            <strong>Not:</strong> Kırmızı ile işaretlenmiş alanlar zorunludur.
            Tüm veriler istenen formata uygun olmalıdır.
          </p>
          <div className="row">
            {rules.map((rule, idx) => (
              <div key={idx} className="col-md-6 mb-3 d-flex align-items-start">
                <i
                  className={`me-2 ${rule.icon} text-${rule.type}`}
                  style={{ fontSize: "1.2rem" }}
                />
                <div>
                  <strong className={`text-${rule.type}`}>{rule.title}</strong>
                  <div style={{ fontSize: "0.85rem", color: "#555" }}>
                    {rule.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drop area */}
        <div
          onClick={handleAreaClick}
          style={{
            border: "2px dashed #ccc",
            borderRadius: "8px",
            padding: "40px",
            textAlign: "center",
            cursor: "pointer",
            marginBottom: "2rem"
          }}
        >
          <i
            className="bi bi-upload"
            style={{ fontSize: "48px", color: "#007bff" }}
          />
          <p
            style={{
              marginTop: "16px",
              color: "#007bff",
              fontWeight: "bold"
            }}
          >
            Excel Dosyası Yükle
          </p>
          {file && (
            <p style={{ fontSize: "0.9rem", color: "#555", marginTop: "8px" }}>
              Seçilen: {file.name}
            </p>
          )}
        </div>
        <input
          type="file"
          accept=".xlsx, .xls"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {Colorspinner.map((obj, idx) => (
            <div
              key={idx}
              className={`spinner-border me-2 text-${obj.color}`}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          ))}
        </div>
      )}

      {/* Rules Modal */}
      <Modal
        show={showRulesModal}
        onHide={() => setShowRulesModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Talimatları Okudum</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Lütfen aşağıdaki talimatları dikkatlice okuyun:</p>
          <div
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              marginBottom: "1rem",
              border: "1px solid #dee2e6",
              padding: "1rem",
              borderRadius: "4px"
            }}
          >
            {rules.map((rule, idx) => (
              <div key={idx} className="d-flex align-items-start mb-2">
                <i
                  className={`me-2 ${rule.icon} text-${rule.type}`}
                  style={{ fontSize: "1.2rem" }}
                />
                <div>
                  <strong className={`text-${rule.type}`}>{rule.title}</strong>
                  <div style={{ fontSize: "0.85rem", color: "#555" }}>
                    {rule.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="form-check mb-2" style={{ marginLeft: 16 }}>
            <input
              type="checkbox"
              className="form-check-input form-checked-outline"
              id="rulesAccepted"
              checked={acceptedRules}
              onChange={(e) => setAcceptedRules(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="rulesAccepted">
              Tüm talimatları okudum, devam etmek istiyorum.
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowRulesModal(false)}
          >
            Vazgeç
          </Button>
          <Button variant="outline-secondary" onClick={handleRulesAccept}>
            Devam Et
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
