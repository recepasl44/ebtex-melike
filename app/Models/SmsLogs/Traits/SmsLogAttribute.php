<?php

namespace App\Models\SmsLogs\Traits;

/**
 * Class SmsLogAttribute.
 */
trait SmsLogAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-smslog", "admin.smslogs.edit")}
                {$this->getDeleteButtonAttribute("delete-smslog", "admin.smslogs.destroy")}
                </div>";
    }
}
