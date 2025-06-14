<?php

namespace App\Models\GuardianMeetings\Traits;

/**
 * Class GuardianMeetingAttribute.
 */
trait GuardianMeetingAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-guardianmeeting", "admin.guardianmeetings.edit")}
                {$this->getDeleteButtonAttribute("delete-guardianmeeting", "admin.guardianmeetings.destroy")}
                </div>";
    }
}
