<?php

namespace App\Models\Events\Traits;

/**
 * Class EventAttribute.
 */
trait EventAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-event", "admin.events.edit")}
                {$this->getDeleteButtonAttribute("delete-event", "admin.events.destroy")}
                </div>";
    }
}
