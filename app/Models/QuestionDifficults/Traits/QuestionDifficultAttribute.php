<?php

namespace App\Models\QuestionDifficults\Traits;

/**
 * Class QuestionDifficultAttribute.
 */
trait QuestionDifficultAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-questiondifficult", "admin.questiondifficults.edit")}
                {$this->getDeleteButtonAttribute("delete-questiondifficult", "admin.questiondifficults.destroy")}
                </div>";
    }
}
