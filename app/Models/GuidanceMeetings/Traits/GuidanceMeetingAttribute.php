<?php

namespace App\Models\GuidanceMeetings\Traits;

/**
 * Class GuidanceMeetingAttribute.
 */
trait GuidanceMeetingAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-guidancemeeting", "admin.guidancemeetings.edit")}
                {$this->getDeleteButtonAttribute("delete-guidancemeeting", "admin.guidancemeetings.destroy")}
                </div>";
    }
}
