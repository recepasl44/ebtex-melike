<?php

namespace App\Models\AttendanceDays\Traits;

/**
 * Class AttendanceDayAttribute.
 */
trait AttendanceDayAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-attendanceday", "admin.attendancedays.edit")}
                {$this->getDeleteButtonAttribute("delete-attendanceday", "admin.attendancedays.destroy")}
                </div>";
    }
}
