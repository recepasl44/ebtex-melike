<?php

namespace App\Models\PersonelDailyData;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonelDailyData extends Model
{
    use HasFactory;

    // The table associated with the model
    protected $table = 'personel_daily_data';

    // Mass-assignable attributes
    protected $fillable = [
        'personel_id',
        'year',
        'month',
        'day',
        'ders_sayisi',
        'soru_sayisi',
        'ders_ucreti',
        'platform_id',
    ];

    /**
     * Relationship: each daily data record belongs to one Personel.
     */
    public function personel()
    {
        // If your Personel model is at \App\Models\Personel\Personel, adjust accordingly.
        return $this->belongsTo(\App\Models\Personel\Personel::class, 'personel_id');
    }
}
