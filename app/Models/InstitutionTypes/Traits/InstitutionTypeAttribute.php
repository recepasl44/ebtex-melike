<?php

namespace App\Models\InstitutionTypes\Traits;

/**
 * Class InstitutionTypeAttribute.
 */
trait InstitutionTypeAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-institutiontype", "admin.institutiontypes.edit")}
                {$this->getDeleteButtonAttribute("delete-institutiontype", "admin.institutiontypes.destroy")}
                </div>";
    }
}
