<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'mail',
        'phone',
        'fax',
        'address',
        'register_no',
    ];

  public function invoices()
{
    return $this->hasMany(\App\Models\Invoice\Invoice::class, 'supplier_id');
}


 public function debts()
{
    return $this->hasMany(\App\Models\Debts\Debt::class, 'supplier_id');
}

    public function payments()
    {
        return $this->hasMany(\App\Models\SupplierPayment\SupplierPayment::class);
    }

    public function refunds()
    {
        return $this->hasMany(\App\Models\Refunds\Refund::class);
    }

    // Toplam borç
    public function getTotalDebtsAttribute()
    {
        return $this->debts()->sum('amount');
    }

    // Toplam ödeme
    public function getTotalPaymentsAttribute()
    {
        return $this->payments()->sum('amount');
    }

    // Kalan borç
    public function getRemainingDebtAttribute()
    {
        return $this->total_debts - $this->total_payments;
    }
     public function notes()
    {
        return $this->hasMany(\App\Models\SupplierNote\SupplierNote::class, 'supplier_id');
    }
}
