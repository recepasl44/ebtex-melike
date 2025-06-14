<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceSerial extends Model
{
    use HasFactory;

    protected $table = 'invoice_serials';

    protected $fillable = [
        'prefix',
        'current_number',
        'last_generated_date',
        'platform_id',
    ];
}
