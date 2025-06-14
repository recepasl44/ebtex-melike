<?php

namespace App\Models\Rent;

use App\Models\Expenses\ExpenseCategory;
use App\Models\RentInstallment\RentInstallment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Rent extends Model
{
    use HasFactory;

    protected $fillable = [
        'season_id',
        'branch_id',
        'rent_date',
        'total_rent'
    ];

    public function installments()
    {
        return $this->hasMany(RentInstallment::class, 'rent_id');
    }
    public function expenseCategory()
{
    return $this->belongsTo(ExpenseCategory::class, 'expense_category_id');
}
}
