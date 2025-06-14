<?php

namespace App\Models\Writers\Traits;

/**
 * Class WriterAttribute.
 */
trait WriterAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-writer", "admin.writers.edit")}
                {$this->getDeleteButtonAttribute("delete-writer", "admin.writers.destroy")}
                </div>";
    }
}
