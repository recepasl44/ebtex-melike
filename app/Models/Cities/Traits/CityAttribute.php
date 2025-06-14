<?php

namespace App\Models\Cities\Traits;

/**
 * Class CityAttribute.
 */
trait CityAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-city", "admin.cities.edit")}
                {$this->getDeleteButtonAttribute("delete-city", "admin.cities.destroy")}
                </div>";
    }
}
