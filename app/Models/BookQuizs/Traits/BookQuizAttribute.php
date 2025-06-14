<?php

namespace App\Models\BookQuizs\Traits;

/**
 * Class BookQuizAttribute.
 */
trait BookQuizAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-bookquiz", "admin.bookquizzes.edit")}
                {$this->getDeleteButtonAttribute("delete-bookquiz", "admin.bookquizzes.destroy")}
                </div>";
    }
}
