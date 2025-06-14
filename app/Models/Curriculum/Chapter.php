<?php

namespace App\Models\Curriculum;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Chapter extends Model
{
    protected $table = 'chapters';

    protected $fillable = [
        'name',
        'numbering',
        'unit_id',
    ];

    // Chapter -> Unit ilişkisi
    public function unit(): BelongsTo
    {
        return $this->belongsTo(Unit::class);
    }

    // Chapter -> Topics ilişkisi
    public function topics(): HasMany
    {
        return $this->hasMany(Topic::class);
    }
}
