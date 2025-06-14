<?php

namespace App\Models\QuizTypes\Traits;

/**
 * Class QuizTypeAttribute.
 */
trait QuizTypeAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-quiztype", "admin.quiztypes.edit")}
                {$this->getDeleteButtonAttribute("delete-quiztype", "admin.quiztypes.destroy")}
                </div>";
    }
}
