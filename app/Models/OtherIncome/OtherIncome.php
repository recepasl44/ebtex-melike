<?php
namespace App\Models\OtherIncome;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OtherIncome extends Model
{
    use HasFactory;

    protected $table = 'other_incomes';

    protected $fillable = [
        'season',
        'date',
        'customer_id',
        'income_item',
        'payment_method',
        'amount',
        'description',
    ];

    public function customer()
    {
        return $this->belongsTo(\App\Models\CustomerOther\CustomerOther::class, 'customer_id');
    }
      public function category()
    {
        return $this->belongsTo(\App\Models\OtherIncome\OtherIncomeCategory::class, 'category_id');
    }
}
