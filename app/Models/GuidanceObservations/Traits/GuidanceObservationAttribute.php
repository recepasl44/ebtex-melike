<?php

namespace App\Models\GuidanceObservations\Traits;

/**
 * Class GuidanceObservationAttribute.
 */
trait GuidanceObservationAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-guidanceobservation", "admin.guidanceobservations.edit")}
                {$this->getDeleteButtonAttribute("delete-guidanceobservation", "admin.guidanceobservations.destroy")}
                </div>";
    }
}
