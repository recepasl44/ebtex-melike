
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/** 
 * Tek satırda PDF export 
 * @param headers tablo başlıkları (ör: ["ID","Ad","Soyad"])
 * @param rows satırlar (ör: [["1","Ali","Kaya"],["2","Ayşe","Demir"]])
 * @param filename kaydedilecek dosya adı
*/
export function exportToPDF(headers: string[], rows: string[][], filename: string) {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: 10,
  });
  doc.save(filename);
}
