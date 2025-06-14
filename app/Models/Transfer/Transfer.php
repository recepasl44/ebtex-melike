<?php

namespace App\Models\Transfer;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transfer extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_type',
        'branch_id',
        'amount',
        'bank_account',
        'description',
        'sender_branch_id',   // Yeni: Gönderici şube
        'receiver_branch_id', // Yeni: Alıcı şube
        'seassion_id',
    ];
}
