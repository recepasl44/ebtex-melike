<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        'payable_amount',
        'pdf_path',
        'is_sent',
        'sent_at',
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function details()
    {
        return $this->hasMany(InvoiceDetail::class);
    }
}
