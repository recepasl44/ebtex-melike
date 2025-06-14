<?php

namespace App\Models\Districts\Traits;

/**
 * Class DistrictAttribute.
 */
trait DistrictAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-district", "admin.districts.edit")}
                {$this->getDeleteButtonAttribute("delete-district", "admin.districts.destroy")}
                </div>";
    }
}
