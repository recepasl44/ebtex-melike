<?php

namespace App\Models\Platforms\Traits;

/**
 * Class PlatformAttribute.
 */
trait PlatformAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-platform", "admin.platforms.edit")}
                {$this->getDeleteButtonAttribute("delete-platform", "admin.platforms.destroy")}
                </div>";
    }
}
