<?php

namespace App\Models\ServiceStops\Traits;

/**
 * Class ServiceStopAttribute.
 */
trait ServiceStopAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-servicestop", "admin.servicestops.edit")}
                {$this->getDeleteButtonAttribute("delete-servicestop", "admin.servicestops.destroy")}
                </div>";
    }
}
