<?php

namespace App\Models\ScholarshipApplications\Traits;

/**
 * Class ScholarshipApplicationAttribute.
 */
trait ScholarshipApplicationAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-scholarshipapplication", "admin.scholarshipapplications.edit")}
                {$this->getDeleteButtonAttribute("delete-scholarshipapplication", "admin.scholarshipapplications.destroy")}
                </div>";
    }
}
