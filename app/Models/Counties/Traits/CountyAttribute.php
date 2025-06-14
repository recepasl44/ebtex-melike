<?php

namespace App\Models\Counties\Traits;

/**
 * Class CountyAttribute.
 */
trait CountyAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-county", "admin.counties.edit")}
                {$this->getDeleteButtonAttribute("delete-county", "admin.counties.destroy")}
                </div>";
    }
}
