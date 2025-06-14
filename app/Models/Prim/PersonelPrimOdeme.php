<?php

namespace App\Models\Prim;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonelPrimOdeme extends Model
{
    use HasFactory;

    protected $table = 'personel_prim_odeme';
    protected $fillable = ['prim_id', 'odeme_sekli', 'banka'];

    public function prim()
    {
        return $this->belongsTo(PersonelPrim::class, 'prim_id');
    }
}
