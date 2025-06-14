<?php

namespace App\Models\GroupTypes\Traits;

/**
 * Class GroupTypeAttribute.
 */
trait GroupTypeAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-grouptype", "admin.grouptypes.edit")}
                {$this->getDeleteButtonAttribute("delete-grouptype", "admin.grouptypes.destroy")}
                </div>";
    }
}
