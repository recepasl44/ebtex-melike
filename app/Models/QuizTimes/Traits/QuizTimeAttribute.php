<?php

namespace App\Models\QuizTimes\Traits;

/**
 * Class QuizTimeAttribute.
 */
trait QuizTimeAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-quiztime", "admin.quiztimes.edit")}
                {$this->getDeleteButtonAttribute("delete-quiztime", "admin.quiztimes.destroy")}
                </div>";
    }
}
