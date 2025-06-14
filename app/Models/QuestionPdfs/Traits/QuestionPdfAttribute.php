<?php

namespace App\Models\QuestionPdfs\Traits;

/**
 * Class QuestionPdfAttribute.
 */
trait QuestionPdfAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-questionpdf", "admin.questionpdfs.edit")}
                {$this->getDeleteButtonAttribute("delete-questionpdf", "admin.questionpdfs.destroy")}
                </div>";
    }
}
