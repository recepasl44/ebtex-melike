<?php

namespace App\Models\TestTypes\Traits;

/**
 * Class TestTypeAttribute.
 */
trait TestTypeAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-testtype", "admin.testtypes.edit")}
                {$this->getDeleteButtonAttribute("delete-testtype", "admin.testtypes.destroy")}
                </div>";
    }
}
