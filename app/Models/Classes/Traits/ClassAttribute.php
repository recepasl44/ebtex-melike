<?php

namespace App\Models\Classes\Traits;

/**
 * Class ClassAttribute.
 */
trait ClassAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-class", "admin.classes.edit")}
                {$this->getDeleteButtonAttribute("delete-class", "admin.classes.destroy")}
                </div>";
    }
}
