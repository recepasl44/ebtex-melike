<?php

namespace App\Models\QuizLevels\Traits;

/**
 * Class QuizLevelAttribute.
 */
trait QuizLevelAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-quizlevel", "admin.quizlevels.edit")}
                {$this->getDeleteButtonAttribute("delete-quizlevel", "admin.quizlevels.destroy")}
                </div>";
    }
}
