<?php

namespace App\Models\CorrectAnswers\Traits;

/**
 * Class CorrectAnswerAttribute.
 */
trait CorrectAnswerAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-correctanswer", "admin.correctanswers.edit")}
                {$this->getDeleteButtonAttribute("delete-correctanswer", "admin.correctanswers.destroy")}
                </div>";
    }
}
