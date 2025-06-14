<?php

namespace App\Models\Links\Traits;

/**
 * Class LinkAttribute.
 */
trait LinkAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-link", "admin.links.edit")}
                {$this->getDeleteButtonAttribute("delete-link", "admin.links.destroy")}
                </div>";
    }
}
