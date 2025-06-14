<?php

namespace App\Models\Areas\Traits;

/**
 * Class AreaAttribute.
 */
trait AreaAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-area", "admin.areas.edit")}
                {$this->getDeleteButtonAttribute("delete-area", "admin.areas.destroy")}
                </div>";
    }
}
