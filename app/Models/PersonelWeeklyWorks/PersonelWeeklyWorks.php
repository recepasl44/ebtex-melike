<?php

namespace App\Models\PersonelWeeklyWorks;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonelWeeklyWorks extends Model
{
    use HasFactory;

    protected $table = 'haftalik_calisma';

    protected $fillable = [
        'personel_id',
        'hafta_kac_gun',
        'gunluk_ucret',
        'platform_id',
    ];

    public function personel()
    {
        return $this->belongsTo(\App\Models\Personel\Personel::class);
    }
}
