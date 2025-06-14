<?php

namespace App\Models\Cards\Traits;

use App\Models\Cards\Card;

/**
 * Class CardRelationship
 */
trait CardRelationship
{
    public function parent()
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    public function children(){
        return $this->hasMany(self::class, 'parent_id');
    }

    public function getChildren()
    {
        $children = Card::with(['children'])
            ->whereHas('children', function ($q){
                $q->where('type', $this->type);
            })->get();
        return $children;
    }
}
