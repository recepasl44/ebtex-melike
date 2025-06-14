<?php

namespace App\Models\FieldManagers\Traits;

/**
 * Class FieldManagerAttribute.
 */
trait FieldManagerAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-fieldmanager", "admin.fieldmanagers.edit")}
                {$this->getDeleteButtonAttribute("delete-fieldmanager", "admin.fieldmanagers.destroy")}
                </div>";
    }
}
