<?php

namespace App\Models\Quizzes\Traits;

/**
 * Class QuizAttribute.
 */
trait QuizAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-quiz", "admin.quizzes.edit")}
                {$this->getDeleteButtonAttribute("delete-quiz", "admin.quizzes.destroy")}
                </div>";
    }
}
