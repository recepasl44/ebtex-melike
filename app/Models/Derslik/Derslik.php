<?php

namespace App\Models\Derslik;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Derslik extends Model
{
    use HasFactory;

    protected $table = 'derslikler';

    protected $fillable = [
        'name',
        'short_name',
        'ordered',
    ];
}
