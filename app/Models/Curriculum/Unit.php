<?php

namespace App\Models\Curriculum;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Unit extends Model
{
    protected $table = 'units';

    // Doldurulabilir alanlar
    protected $fillable = [
        'name',
        'numbering',
        'curriculum_type',
    ];

    // Bir Unit birden fazla chapter'a sahip olabilir
    public function chapters(): HasMany
    {
        return $this->hasMany(Chapter::class);
    }
}
