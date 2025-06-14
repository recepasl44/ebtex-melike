<?php

namespace App\Models\AttendanceStudents\Traits;

/**
 * Class AttendanceStudentAttribute.
 */
trait AttendanceStudentAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-attendancestudent", "admin.attendancestudents.edit")}
                {$this->getDeleteButtonAttribute("delete-attendancestudent", "admin.attendancestudents.destroy")}
                </div>";
    }
}
