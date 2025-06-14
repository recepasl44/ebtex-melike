<?php

namespace App\Models\OpticalAttributes\Traits;

/**
 * Class OpticalAttributeAttribute.
 */
trait OpticalAttributeAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-opticalattribute", "admin.opticalattributes.edit")}
                {$this->getDeleteButtonAttribute("delete-opticalattribute", "admin.opticalattributes.destroy")}
                </div>";
    }
}
