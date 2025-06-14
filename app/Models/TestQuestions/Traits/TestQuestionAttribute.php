<?php

namespace App\Models\TestQuestions\Traits;

/**
 * Class TestQuestionAttribute.
 */
trait TestQuestionAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-testquestion", "admin.testquestions.edit")}
                {$this->getDeleteButtonAttribute("delete-testquestion", "admin.testquestions.destroy")}
                </div>";
    }
}
