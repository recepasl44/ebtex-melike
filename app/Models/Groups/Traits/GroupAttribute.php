<?php

namespace App\Models\Groups\Traits;

/**
 * Class GroupAttribute.
 */
trait GroupAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-group", "admin.groups.edit")}
                {$this->getDeleteButtonAttribute("delete-group", "admin.groups.destroy")}
                </div>";
    }
}
