<?php

namespace App\Models\Branches\Traits;

/**
 * Class BrancheAttribute.
 */
trait BrancheAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-branche", "admin.branches.edit")}
                {$this->getDeleteButtonAttribute("delete-branche", "admin.branches.destroy")}
                </div>";
    }
}
