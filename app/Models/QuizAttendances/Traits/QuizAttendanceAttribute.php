<?php

namespace App\Models\QuizAttendances\Traits;

/**
 * Class QuizAttendanceAttribute.
 */
trait QuizAttendanceAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-quizattendance", "admin.quizattendances.edit")}
                {$this->getDeleteButtonAttribute("delete-quizattendance", "admin.quizattendances.destroy")}
                </div>";
    }
}
