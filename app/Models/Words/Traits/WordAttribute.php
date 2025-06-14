<?php

namespace App\Models\Words\Traits;

/**
 * Class WordAttribute.
 */
trait WordAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-word", "admin.words.edit")}
                {$this->getDeleteButtonAttribute("delete-word", "admin.words.destroy")}
                </div>";
    }
}
