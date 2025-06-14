<?php

namespace App\Models\Curriculum;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Achievement extends Model
{
    protected $table = 'achievements';

    protected $fillable = [
        'name',
        'numbering',
        'topic_id',
    ];

    // Achievement -> Topic
    public function topic(): BelongsTo
    {
        return $this->belongsTo(Topic::class);
    }

    // Achievement -> AchievementDetail (1-1)
    public function achievementDetail(): HasOne
    {
        return $this->hasOne(AchievementDetail::class);
    }
}
