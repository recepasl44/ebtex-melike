<?php
namespace App\Models\Salary;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonelMaasBorc extends Model
{
    use HasFactory;

    protected $table = 'personel_maas_borc';

    protected $fillable = [
        'personel_id',
        'aylik_ucret',
        'odeme_sekli',
        'maas_sayisi',
        'baslangic_tarihi'
    ];

    public function personel()
    {
        return $this->belongsTo(\App\Models\Personel\Personel::class);
    }

    public function odemeler()
    {
        return $this->hasMany(PersonelMaasOdeme::class, 'borc_id');
    }
}
