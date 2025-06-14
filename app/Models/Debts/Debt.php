<?php

namespace App\Models\Debts;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Debt extends Model
{
    use HasFactory;

    protected $fillable = [
        'supplier_id',
        'amount',
        'due_date',
        'description',
    ];

    public function supplier()
    {
        return $this->belongsTo(\App\Models\Supplier::class);
    }
    public function debts()
    {
        return $this->hasMany(\App\Models\Debts\Debt::class, 'expense_category_id');
    }
    public function expenseCategory()
    {
        return $this->belongsTo(\App\Models\Expenses\ExpenseCategory::class, 'expense_category_id');
    }

    // Şube ilişkisi
    public function branch()
    {
        return $this->belongsTo(\App\Models\Branches\Branche::class, 'branch_id');
    }

    // Sezon ilişkisi
    public function season()
    {
        return $this->belongsTo(\App\Models\Seasons\Season::class, 'seasson_id');
    }
    public function paymentMethod()
    {
        return $this->belongsTo(\App\Models\PaymentMethods\PaymentMethod::class, 'payment_method_id');
    }
}
