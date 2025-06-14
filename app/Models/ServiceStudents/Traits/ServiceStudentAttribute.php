<?php

namespace App\Models\ServiceStudents\Traits;

/**
 * Class ServiceStudentAttribute.
 */
trait ServiceStudentAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-servicestudent", "admin.servicestudents.edit")}
                {$this->getDeleteButtonAttribute("delete-servicestudent", "admin.servicestudents.destroy")}
                </div>";
    }
}
