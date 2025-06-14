<?php

namespace App\Models\Refunds;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Refund extends Model
{
    use HasFactory;
    protected $fillable = [
        'supplier_id',
        'refund_type',   // "invoice" veya "debt"
        'invoice_id',
        'debt_id',       // yeni eklenen alan
        'amount',
        'refund_date',
        'description',
    ];

     public function supplier()
    {
        return $this->belongsTo(\App\Models\Supplier::class);
    }

    public function invoice()
    {
        return $this->belongsTo(\App\Models\Invoice\Invoice::class);
    }

    public function debt()
    {
        return $this->belongsTo(\App\Models\Debts\Debt::class);
    }

    public function payment()
    {
        return $this->belongsTo(\App\Models\SupplierPayment\SupplierPayment::class, 'payment_id');
    }
}
