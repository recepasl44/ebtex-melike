<?php

namespace App\Models\QuizNotes\Traits;

/**
 * Class QuizNoteAttribute.
 */
trait QuizNoteAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-quiznote", "admin.quiznotes.edit")}
                {$this->getDeleteButtonAttribute("delete-quiznote", "admin.quiznotes.destroy")}
                </div>";
    }
}
