<?php

namespace App\Models\Notifications\Traits;

/**
 * Class NotificationAttribute.
 */
trait NotificationAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-notification", "admin.notifications.edit")}
                {$this->getDeleteButtonAttribute("delete-notification", "admin.notifications.destroy")}
                </div>";
    }
}
