<?php

namespace App\Models\Schools\Traits;

/**
 * Class SchoolAttribute.
 */
trait SchoolAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-school", "admin.schools.edit")}
                {$this->getDeleteButtonAttribute("delete-school", "admin.schools.destroy")}
                </div>";
    }
}
