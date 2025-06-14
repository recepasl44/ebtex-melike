<?php
namespace App\Models\PersonelKesinti;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonelKesinti extends Model
{
    use HasFactory;

    protected $table = 'personel_kesinti';

    protected $fillable = [
        'personel_id', 'vade', 'miktar', 'aciklama', 'odeme_sekli', 'banka_hesap_adi,alinan'
    ];

    public function personel()
    {
        return $this->belongsTo(\App\Models\Personel\Personel::class);
    }
}
