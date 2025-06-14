<?php

namespace App\Models\Models\Traits;

/**
 * Class ModelAttribute.
 */
trait ModelAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-model", "admin.models.edit")}
                {$this->getDeleteButtonAttribute("delete-model", "admin.models.destroy")}
                </div>";
    }
}
