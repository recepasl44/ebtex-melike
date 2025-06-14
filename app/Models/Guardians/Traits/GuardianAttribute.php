<?php

namespace App\Models\Guardians\Traits;

/**
 * Class GuardianAttribute.
 */
trait GuardianAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-guardian", "admin.guardians.edit")}
                {$this->getDeleteButtonAttribute("delete-guardian", "admin.guardians.destroy")}
                </div>";
    }
}
