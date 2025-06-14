<?php

namespace App\Models\References\Traits;

/**
 * Class ReferenceAttribute.
 */
trait ReferenceAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-reference", "admin.references.edit")}
                {$this->getDeleteButtonAttribute("delete-reference", "admin.references.destroy")}
                </div>";
    }
}
