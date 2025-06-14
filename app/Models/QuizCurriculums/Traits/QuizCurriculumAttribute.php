<?php

namespace App\Models\QuizCurriculums\Traits;

/**
 * Class QuizCurriculumAttribute.
 */
trait QuizCurriculumAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-quizcurriculum", "admin.quizcurriculums.edit")}
                {$this->getDeleteButtonAttribute("delete-quizcurriculum", "admin.quizcurriculums.destroy")}
                </div>";
    }
}
