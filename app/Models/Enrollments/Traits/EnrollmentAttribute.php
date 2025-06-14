<?php

namespace App\Models\Enrollments\Traits;

/**
 * Class EnrollmentAttribute.
 */
trait EnrollmentAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-enrollment", "admin.enrollments.edit")}
                {$this->getDeleteButtonAttribute("delete-enrollment", "admin.enrollments.destroy")}
                </div>";
    }
}
