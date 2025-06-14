<?php
namespace App\Models\PersonelIade;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonelIade extends Model
{
    use HasFactory;
     protected $table = 'personel_iadeler';
    protected $fillable = [
        'personel_id', 'tarih', 'miktar', 'odeme_sekli', 'banka_hesap_adi', 'gonderen_ad_soyad', 'aciklama'
    ];

    public function personel()
    {
        return $this->belongsTo(\App\Models\Personel\Personel::class);
    }
}
