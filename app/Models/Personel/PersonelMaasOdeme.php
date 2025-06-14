<?php

namespace App\Models\Personel;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonelMaasOdeme extends Model
{
    use HasFactory;

    protected $table = 'personel_maas_odeme';

    protected $primaryKey = 'id';

    protected $fillable = [
        'borc_id',
        'personel_id',
        'miktar',
        'odeme_sekli',
        'aciklama',
        'platform_id',
        'odeme_tarihi',
    ];

    public $timestamps = false;

    protected $casts = [
        'odeme_tarihi' => 'datetime',
    ];

    public function borc()
    {
        return $this->belongsTo(PersonelMaasBorc::class, 'borc_id');
    }

    public function personel()
    {
        return $this->belongsTo(Personel::class, 'personel_id');
    }
}
