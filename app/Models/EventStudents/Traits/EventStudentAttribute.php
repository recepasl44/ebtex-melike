<?php

namespace App\Models\EventStudents\Traits;

/**
 * Class EventStudentAttribute.
 */
trait EventStudentAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-eventstudent", "admin.eventstudents.edit")}
                {$this->getDeleteButtonAttribute("delete-eventstudent", "admin.eventstudents.destroy")}
                </div>";
    }
}
