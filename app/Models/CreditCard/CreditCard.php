<?php

namespace App\Models\CreditCard;

use Illuminate\Database\Eloquent\Model;

class CreditCard extends Model
{
    protected $table = 'credit_cards';

    protected $fillable = [
        'amount',
        'card_holder_name',
        'card_number',
        'expire_month',
        'expire_year',
        'cvv',
        'branch_id',
        'season_id',
        'description',
    ];

    // Örnek: İlişkiler veya accessorlara ihtiyaç varsa ekleyebilirsiniz.
}
