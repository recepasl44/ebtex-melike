<?php

namespace App\Models\QuizClassrooms\Traits;

/**
 * Class QuizClassroomAttribute.
 */
trait QuizClassroomAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-scholarshipclassroom", "admin.quizclassrooms.edit")}
                {$this->getDeleteButtonAttribute("delete-scholarshipclassroom", "admin.quizclassrooms.destroy")}
                </div>";
    }
}
