<?php

namespace App\Models\Lessons\Traits;

/**
 * Class LessonAttribute.
 */
trait LessonAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-lesson", "admin.lessons.edit")}
                {$this->getDeleteButtonAttribute("delete-lesson", "admin.lessons.destroy")}
                </div>";
    }
}
