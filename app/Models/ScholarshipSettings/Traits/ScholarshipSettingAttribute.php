<?php

namespace App\Models\ScholarshipSettings\Traits;

/**
 * Class ScholarshipSettingAttribute.
 */
trait ScholarshipSettingAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-scholarshipsetting", "admin.scholarshipsettings.edit")}
                {$this->getDeleteButtonAttribute("delete-scholarshipsetting", "admin.scholarshipsettings.destroy")}
                </div>";
    }
}
