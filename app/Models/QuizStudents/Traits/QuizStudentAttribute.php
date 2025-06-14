<?php

namespace App\Models\QuizStudents\Traits;

/**
 * Class QuizStudentAttribute.
 */
trait QuizStudentAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-quizstudent", "admin.quizstudents.edit")}
                {$this->getDeleteButtonAttribute("delete-quizstudent", "admin.quizstudents.destroy")}
                </div>";
    }
}
