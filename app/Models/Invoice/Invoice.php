<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// Eklenmesi gereken 'use' ifadeleri:
use App\Models\Supplier; // <-- Tedarikçi modelinizin tam konumu
use App\Models\Invoice\InvoiceDetail\InvoiceDetail; // <-- InvoiceDetail'ın gerçek konumu/namespace'i

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'supplier_id',
        'issue_date',
        'invoice_type_code',
        'fis_seri_no',
        'gider_kalemi',
        'fatura_adi',
        'makbuz_no',
        'register_no',
        'tax_total',
        'pdf_content', 
        'payable_amount',
        'pdf_path',
        'is_sent',
        'sent_at',
        'platform_id',
        'student_id',
    ];

    public function supplier()
    {
        // Eğer Supplier modeli App\Models\Supplier dosyasında tanımlıysa:
        return $this->belongsTo(Supplier::class);
    }

    public function details()
    {
        // InvoiceDetail modeli App\Models\Invoice\InvoiceDetail\InvoiceDetail.php ise:
        return $this->hasMany(InvoiceDetail::class);
    }
}
