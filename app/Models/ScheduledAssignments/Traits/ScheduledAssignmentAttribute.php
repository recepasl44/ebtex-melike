<?php

namespace App\Models\ScheduledAssignments\Traits;

/**
 * Class ScheduledAssignmentAttribute.
 */
trait ScheduledAssignmentAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-scheduledassignment", "admin.scheduledassignments.edit")}
                {$this->getDeleteButtonAttribute("delete-scheduledassignment", "admin.scheduledassignments.destroy")}
                </div>";
    }
}
