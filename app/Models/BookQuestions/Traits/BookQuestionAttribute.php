<?php

namespace App\Models\BookQuestions\Traits;

/**
 * Class BookQuestionAttribute.
 */
trait BookQuestionAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-bookquestion", "admin.bookquestions.edit")}
                {$this->getDeleteButtonAttribute("delete-bookquestion", "admin.bookquestions.destroy")}
                </div>";
    }
}
