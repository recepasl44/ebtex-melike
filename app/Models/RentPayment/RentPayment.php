<?php

namespace App\Models\RentPayment;

use App\Models\RentInstallment\RentInstallment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RentPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'rent_installment_id',
        'payment_no',
        'payment_date',
        'amount'
    ];

    public function installment()
    {
        return $this->belongsTo(RentInstallment::class, 'rent_installment_id');
    }
}
