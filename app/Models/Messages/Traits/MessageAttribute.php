<?php

namespace App\Models\Messages\Traits;

/**
 * Class MessageAttribute.
 */
trait MessageAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-message", "admin.messages.edit")}
                {$this->getDeleteButtonAttribute("delete-message", "admin.messages.destroy")}
                </div>";
    }
}
