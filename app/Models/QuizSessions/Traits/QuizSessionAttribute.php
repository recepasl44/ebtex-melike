<?php

namespace App\Models\QuizSessions\Traits;

/**
 * Class QuizSessionAttribute.
 */
trait QuizSessionAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-quizsession", "admin.quizsessions.edit")}
                {$this->getDeleteButtonAttribute("delete-quizsession", "admin.quizsessions.destroy")}
                </div>";
    }
}
