<?php

namespace App\Models\Personel;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonelMaasBorc extends Model
{
    use HasFactory;

    protected $table = 'personel_maas_borc';

    protected $primaryKey = 'id';

    protected $fillable = [
        'personel_id',
        'aylik_ucret',
        'odeme_sekli',
        'maas_sayisi',
        'baslangic_tarihi',
        'platform_id',
        'maas_ayi',
    ];

    public $timestamps = true;

    const CREATED_AT = 'olusturulma_tarihi';
    const UPDATED_AT = 'guncellenme_tarihi';

    protected $casts = [
        'baslangic_tarihi' => 'date',
    ];

    public function personel()
    {
        return $this->belongsTo(Personel::class, 'personel_id');
    }

    public function odemeler()
    {
        return $this->hasMany(PersonelMaasOdeme::class, 'borc_id');
    }
}