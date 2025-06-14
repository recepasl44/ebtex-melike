<?php

namespace App\Models\OtherIncome;

use Illuminate\Database\Eloquent\Model;

class OtherIncomeCategory extends Model
{
    protected $table = 'other_income_categories';

    protected $fillable = [
        'name',
        'description'
    ];
}
