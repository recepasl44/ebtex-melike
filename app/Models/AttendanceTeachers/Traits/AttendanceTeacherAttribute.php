<?php

namespace App\Models\AttendanceTeachers\Traits;

/**
 * Class AttendanceTeacherAttribute.
 */
trait AttendanceTeacherAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-attendanceteacher", "admin.attendanceteachers.edit")}
                {$this->getDeleteButtonAttribute("delete-attendanceteacher", "admin.attendanceteachers.destroy")}
                </div>";
    }
}
