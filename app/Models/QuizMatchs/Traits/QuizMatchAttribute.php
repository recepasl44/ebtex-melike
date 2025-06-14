<?php

namespace App\Models\QuizMatchs\Traits;

/**
 * Class QuizMatchAttribute.
 */
trait QuizMatchAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-quizmatch", "admin.quizmatches.edit")}
                {$this->getDeleteButtonAttribute("delete-quizmatch", "admin.quizmatches.destroy")}
                </div>";
    }
}
