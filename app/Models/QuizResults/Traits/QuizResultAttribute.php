<?php

namespace App\Models\QuizResults\Traits;

/**
 * Class QuizResultAttribute.
 */
trait QuizResultAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-quizresult", "admin.quizresults.edit")}
                {$this->getDeleteButtonAttribute("delete-quizresult", "admin.quizresults.destroy")}
                </div>";
    }
}
