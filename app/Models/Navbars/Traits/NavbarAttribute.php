<?php

namespace App\Models\Navbars\Traits;

/**
 * Class NavbarAttribute.
 */
trait NavbarAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-navbar", "admin.navbars.edit")}
                {$this->getDeleteButtonAttribute("delete-navbar", "admin.navbars.destroy")}
                </div>";
    }
}
