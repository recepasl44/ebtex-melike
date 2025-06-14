<?php

namespace App\Models\Vehicles\Traits;

/**
 * Class VehicleAttribute.
 */
trait VehicleAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-vehicle", "admin.vehicles.edit")}
                {$this->getDeleteButtonAttribute("delete-vehicle", "admin.vehicles.destroy")}
                </div>";
    }
}
