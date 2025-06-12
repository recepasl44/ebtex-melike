import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { DiscountStudentData } from "../../../types/discountStudent/list";

export default function DiscountStudentReceipt() {
  const location = useLocation();
  const data = (location.state as { data?: DiscountStudentData })?.data;

  useEffect(() => {
    // Print automatically when component mounts
    setTimeout(() => window.print(), 300);
  }, []);

  if (!data) {
    return <div className="p-4">Veri bulunamadı</div>;
  }

  return (
    <div className="container p-4">
      <h2 className="text-center mb-4">İndirimli Öğrenci Makbuzu</h2>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>Sözleşme No</th>
            <td>{data.sozlesme_no}</td>
          </tr>
          <tr>
            <th>Okul No</th>
            <td>{data.okul_no}</td>
          </tr>
          <tr>
            <th>Ad Soyad</th>
            <td>
              {data.ad} {data.soyad}
            </td>
          </tr>
          <tr>
            <th>Program</th>
            <td>{data.program}</td>
          </tr>
          <tr>
            <th>Devre</th>
            <td>{data.devre}</td>
          </tr>
          <tr>
            <th>Sınıf</th>
            <td>{data.sinif}</td>
          </tr>
          <tr>
            <th>İndirim Adı</th>
            <td>{data.indirim_adi}</td>
          </tr>
          <tr>
            <th>Enrol. İndirim</th>
            <td>{data.enrollment_indirim}</td>
          </tr>
          <tr>
            <th>Toplam</th>
            <td>₺{data.toplam.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
