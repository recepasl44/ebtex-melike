<?php

namespace App\Models\Bank;

use Illuminate\Database\Eloquent\Model;

class Bank extends Model
{
    protected $table = 'banks';

    protected $fillable = [
        'amount',
        'bank_name',
        'iban',
        'branch_id',
        'season_id',
        'description',
    ];

    // Örnek: İlişkiler veya accessorlara ihtiyaç varsa ekleyebilirsiniz.
}
