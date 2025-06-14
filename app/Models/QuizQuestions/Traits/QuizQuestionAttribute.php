<?php

namespace App\Models\QuizQuestions\Traits;

/**
 * Class QuizQuestionAttribute.
 */
trait QuizQuestionAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-quizquestion", "admin.quizquestions.edit")}
                {$this->getDeleteButtonAttribute("delete-quizquestion", "admin.quizquestions.destroy")}
                </div>";
    }
}
