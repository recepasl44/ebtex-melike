<?php

namespace App\Models\Curriculum;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Topic extends Model
{
    protected $table = 'topics';

    protected $fillable = [
        'name',
        'numbering',
        'chapter_id',
    ];

    // Topic -> Chapter ilişkisi
    public function chapter(): BelongsTo
    {
        return $this->belongsTo(Chapter::class);
    }

    // Topic -> Achievements ilişkisi
    public function achievements(): HasMany
    {
        return $this->hasMany(Achievement::class);
    }
}
