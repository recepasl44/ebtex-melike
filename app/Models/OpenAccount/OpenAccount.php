<?php

namespace App\Models\OpenAccount;

use Illuminate\Database\Eloquent\Model;

class OpenAccount extends Model
{
    protected $table = 'open_accounts';

    protected $fillable = [
        'amount',
        'customer_name',
        'some_description',
        'branch_id',
        'season_id',
        'description',
    ];

    // Örnek: İlişkiler veya accessorlara ihtiyaç varsa ekleyebilirsiniz.
}
