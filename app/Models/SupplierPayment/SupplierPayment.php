<?php

namespace App\Models\SupplierPayment;

use Illuminate\Database\Eloquent\Model;

class SupplierPayment extends Model
{
    protected $table = 'supplier_payments';

    protected $fillable = [
        'supplier_id',
        'amount',
        'payment_date',
        'description',
        'season_id',
        'payment_method',
        'is_paid',
        'due_date',
        'pdf_path',
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }
}
