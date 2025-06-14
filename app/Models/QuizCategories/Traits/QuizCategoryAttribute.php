<?php

namespace App\Models\QuizCategories\Traits;

/**
 * Class QuizCategoryAttribute.
 */
trait QuizCategoryAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-quizcategory", "admin.quizcategories.edit")}
                {$this->getDeleteButtonAttribute("delete-quizcategory", "admin.quizcategories.destroy")}
                </div>";
    }
}
