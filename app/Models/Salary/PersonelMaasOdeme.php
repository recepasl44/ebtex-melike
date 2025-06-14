<?php
namespace App\Models\Salary;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonelMaasOdeme extends Model
{
    use HasFactory;

    protected $table = 'personel_maas_odeme';

    protected $fillable = [
        'borc_id',
        'miktar',
        'odeme_sekli',
        'aciklama'
    ];

    public function borc()
    {
        return $this->belongsTo(PersonelMaasBorc::class);
    }
}
