<?php

namespace App\Models\Institutions\Traits;

/**
 * Class InstitutionAttribute.
 */
trait InstitutionAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-institution", "admin.institutions.edit")}
                {$this->getDeleteButtonAttribute("delete-institution", "admin.institutions.destroy")}
                </div>";
    }
}
