<?php

namespace App\Models\Assignments\Traits;

/**
 * Class AssignmentAttribute.
 */
trait AssignmentAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-assignment", "admin.assignments.edit")}
                {$this->getDeleteButtonAttribute("delete-assignment", "admin.assignments.destroy")}
                </div>";
    }
}
