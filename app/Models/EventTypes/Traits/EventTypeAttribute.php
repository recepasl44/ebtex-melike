<?php

namespace App\Models\EventTypes\Traits;

/**
 * Class EventTypeAttribute.
 */
trait EventTypeAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-eventtype", "admin.eventtypes.edit")}
                {$this->getDeleteButtonAttribute("delete-eventtype", "admin.eventtypes.destroy")}
                </div>";
    }
}
