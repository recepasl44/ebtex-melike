<?php

namespace App\Models\StudentGroups\Traits;

/**
 * Class StudentGroupAttribute.
 */
trait StudentGroupAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-studentgroup", "admin.studentgroups.edit")}
                {$this->getDeleteButtonAttribute("delete-studentgroup", "admin.studentgroups.destroy")}
                </div>";
    }
}
