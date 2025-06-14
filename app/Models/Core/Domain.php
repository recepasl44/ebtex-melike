<?php

namespace App\Models\Core;

use Illuminate\Database\Eloquent\Model;

class Domain extends Model
{
    protected $table = 'core_domains';

    public function platform()
    {
        return $this->belongsTo(Platform::class, 'platform_id', 'id');
    }

    public function scopeOfDomain($query, $hostName)
    {
        return $query->where('domain', $hostName);
    }
}
