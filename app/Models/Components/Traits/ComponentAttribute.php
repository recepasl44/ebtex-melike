<?php

namespace App\Models\Components\Traits;

/**
 * Class ComponentAttribute.
 */
trait ComponentAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-component", "admin.components.edit")}
                {$this->getDeleteButtonAttribute("delete-component", "admin.components.destroy")}
                </div>";
    }
}
