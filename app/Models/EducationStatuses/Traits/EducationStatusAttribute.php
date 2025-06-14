<?php

namespace App\Models\EducationStatuses\Traits;

/**
 * Class EducationStatusAttribute.
 */
trait EducationStatusAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-educationstatus", "admin.educationstatuses.edit")}
                {$this->getDeleteButtonAttribute("delete-educationstatus", "admin.educationstatuses.destroy")}
                </div>";
    }
}
