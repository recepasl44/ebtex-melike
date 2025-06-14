<?php

namespace App\Models\Ders;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DersUcreti extends Model
{
    use HasFactory;

    protected $table = 'ders_ucretleri';

    protected $fillable = [
        'personel_id',
        'tarih',
        'ders_sayisi',
        'ders_ucreti',
        'toplam_ucret',
    ];

    public function personel()
    {
        return $this->belongsTo(\App\Models\Personel\Personel::class);
    }
}
