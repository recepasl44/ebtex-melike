<?php

namespace App\Models\Points\Traits;

/**
 * Class PointAttribute.
 */
trait PointAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-point", "admin.points.edit")}
                {$this->getDeleteButtonAttribute("delete-point", "admin.points.destroy")}
                </div>";
    }
}
