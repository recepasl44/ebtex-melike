<?php

namespace App\Models\Kocluk;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KoclukUcreti extends Model
{
    use HasFactory;

    protected $table = 'kocluk_ucretleri';

    protected $fillable = [
        'personel_id',
        'tarih',
        'kisi_basi_ucret',
        'ogrenci_sayisi',
        'toplam_ucret',
    ];

    public function personel()
    {
        return $this->belongsTo(\App\Models\Personel\Personel::class);
    }
}
