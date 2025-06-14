<?php

namespace App\Models\BookStudents\Traits;

/**
 * Class BookStudentAttribute.
 */
trait BookStudentAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-bookstudent", "admin.bookstudents.edit")}
                {$this->getDeleteButtonAttribute("delete-bookstudent", "admin.bookstudents.destroy")}
                </div>";
    }
}
