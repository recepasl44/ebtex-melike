<?php

namespace App\Models\OzelDers;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OzelDersUcreti extends Model
{
    use HasFactory;

    protected $table = 'ozel_ders_ucretleri';

    protected $fillable = [
        'personel_id',
        'tarih',
        'baslangic_saati',
        'bitis_saati',
        'ucret',
        'ogrenci_yuzdesi',
        'gelir',
    ];

    public function personel()
    {
        return $this->belongsTo(\App\Models\Personel\Personel::class);
    }
}
