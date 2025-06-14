<?php

namespace App\Models\QuizBranches\Traits;

/**
 * Class QuizBrancheAttribute.
 */
trait QuizBrancheAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-quizbtanche", "admin.quizbranches.edit")}
                {$this->getDeleteButtonAttribute("delete-quizbtanche", "admin.quizbranches.destroy")}
                </div>";
    }
}
