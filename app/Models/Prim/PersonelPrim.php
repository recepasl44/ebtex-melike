<?php

namespace App\Models\Prim;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonelPrim extends Model
{
    use HasFactory;

    protected $table = 'personel_prim';
    protected $fillable = ['personel_id', 'vade', 'miktar', 'aciklama'];

    public function personel()
    {
        return $this->belongsTo(\App\Models\Personel\Personel::class);
    }

    public function odemeler()
    {
        return $this->hasMany(PersonelPrimOdeme::class, 'prim_id');
    }
}
