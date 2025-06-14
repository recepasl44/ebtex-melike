<?php

namespace App\Models\Kupon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KuponUcreti extends Model
{
    use HasFactory;

    protected $table = 'kupon_ucretleri';

    protected $fillable = [
        'personel_id',
        'tarih',
        'urun_turu',
        'urun_adi',
        'satis_ucreti',
        'kupon_yuzdesi',
        'gelir',
    ];

    public function personel()
    {
        return $this->belongsTo(\App\Models\Personel\Personel::class);
    }
}
