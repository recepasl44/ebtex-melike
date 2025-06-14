<?php

namespace App\Models\TaskTypes\Traits;

/**
 * Class TaskTypeAttribute.
 */
trait TaskTypeAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-tasktype", "admin.tasktypes.edit")}
                {$this->getDeleteButtonAttribute("delete-tasktype", "admin.tasktypes.destroy")}
                </div>";
    }
}
