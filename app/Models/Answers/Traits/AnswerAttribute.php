<?php

namespace App\Models\Answers\Traits;

/**
 * Class AnswerAttribute.
 */
trait AnswerAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-answer", "admin.answers.edit")}
                {$this->getDeleteButtonAttribute("delete-answer", "admin.answers.destroy")}
                </div>";
    }
}
