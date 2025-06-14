<?php

namespace App\Models\ServiceTypes\Traits;

/**
 * Class ServiceTypeAttribute.
 */
trait ServiceTypeAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-servicetype", "admin.servicetypes.edit")}
                {$this->getDeleteButtonAttribute("delete-servicetype", "admin.servicetypes.destroy")}
                </div>";
    }
}
