<?php

namespace App\Models\Seasons\Traits;

/**
 * Class SeasonAttribute.
 */
trait SeasonAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-season", "admin.seasons.edit")}
                {$this->getDeleteButtonAttribute("delete-season", "admin.seasons.destroy")}
                </div>";
    }
}
