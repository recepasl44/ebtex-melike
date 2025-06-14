<?php
namespace App\Models\Invoice\InvoiceDetail;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_id',
        'item_name',
        'item_description',
        'invoiced_quantity',
        'unit_code',
        'unit_price',
        'line_extension_amount',
        'tax_amount',
        'vat_rate',
    ];

    public function invoice()
    {
        return $this->belongsTo(\App\Models\Invoice\Invoice::class);
    }
}
