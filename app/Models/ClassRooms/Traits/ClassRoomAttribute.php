<?php

namespace App\Models\ClassRooms\Traits;

/**
 * Class ClassRoomAttribute.
 */
trait ClassRoomAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-classroom", "admin.classrooms.edit")}
                {$this->getDeleteButtonAttribute("delete-classroom", "admin.classrooms.destroy")}
                </div>";
    }
}
