<?php

namespace App\Models\PointTypes\Traits;

/**
 * Class PointTypeAttribute.
 */
trait PointTypeAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-pointtype", "admin.pointtypes.edit")}
                {$this->getDeleteButtonAttribute("delete-pointtype", "admin.pointtypes.destroy")}
                </div>";
    }
}
