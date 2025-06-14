<?php

namespace App\Models\OpticalForms\Traits;

/**
 * Class OpticalFormAttribute.
 */
trait OpticalFormAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-opticalform", "admin.opticalforms.edit")}
                {$this->getDeleteButtonAttribute("delete-opticalform", "admin.opticalforms.destroy")}
                </div>";
    }
}
