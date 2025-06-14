<?php

namespace App\Models\QuestionCurriculums\Traits;

/**
 * Class QuestionCurriculumAttribute.
 */
trait QuestionCurriculumAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-questioncurriculum", "admin.questioncurriculums.edit")}
                {$this->getDeleteButtonAttribute("delete-questioncurriculum", "admin.questioncurriculums.destroy")}
                </div>";
    }
}
