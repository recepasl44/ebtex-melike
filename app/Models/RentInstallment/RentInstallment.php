<?php

namespace App\Models\RentInstallment;

use App\Models\Rent\Rent;
use App\Models\RentPayment\RentPayment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RentInstallment extends Model
{
    use HasFactory;

    protected $fillable = [
        'rent_id',
        'installment_no',
        'due_date',
        'amount',
        'remaining_amount'
    ];

    public function rent()
    {
        return $this->belongsTo(Rent::class, 'rent_id');
    }

    public function payments()
    {
        return $this->hasMany(RentPayment::class, 'rent_installment_id');
    }
}
