<?php

namespace App\Models\Navbars\Traits;
use App\Models\Navbars\Navbar;
/**
 * Class NavbarRelationship
 */
trait NavbarRelationship
{
    public function parent()
    {
        return $this->belongsTo(Navbar::class,'parent_id');
    }
    public function children()
    {
        return $this->hasMany(Navbar::class,'parent_id','id');
    }
}
