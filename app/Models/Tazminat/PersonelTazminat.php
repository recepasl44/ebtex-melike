<?php
namespace App\Models\Tazminat;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonelTazminat extends Model
{
    use HasFactory;

    protected $table = 'personel_tazminat';

    protected $fillable = [
        'personel_id',
        'tazminat_turu',
        'odeme_sekli',
        'miktar',
        'banka_hesap_adi',
        'aciklama',
    ];

    public function personel()
    {
        return $this->belongsTo(\App\Models\Personel\Personel::class, 'personel_id');
    }
}
