<?php

namespace App\Models\Colors\Traits;

/**
 * Class ColorAttribute.
 */
trait ColorAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-color", "admin.colors.edit")}
                {$this->getDeleteButtonAttribute("delete-color", "admin.colors.destroy")}
                </div>";
    }
}
