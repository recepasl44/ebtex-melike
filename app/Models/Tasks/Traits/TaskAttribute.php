<?php

namespace App\Models\Tasks\Traits;

/**
 * Class TaskAttribute.
 */
trait TaskAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-task", "admin.tasks.edit")}
                {$this->getDeleteButtonAttribute("delete-task", "admin.tasks.destroy")}
                </div>";
    }
}
