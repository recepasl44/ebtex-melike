<?php

namespace App\Models\AssignmentStudents\Traits;

/**
 * Class AssignmentStudentAttribute.
 */
trait AssignmentStudentAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-assignmentstudent", "admin.assignmentstudents.edit")}
                {$this->getDeleteButtonAttribute("delete-assignmentstudent", "admin.assignmentstudents.destroy")}
                </div>";
    }
}
