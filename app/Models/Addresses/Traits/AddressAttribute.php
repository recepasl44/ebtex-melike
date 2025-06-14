<?php

namespace App\Models\Addresses\Traits;

/**
 * Class AddressAttribute.
 */
trait AddressAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-address", "admin.addresses.edit")}
                {$this->getDeleteButtonAttribute("delete-address", "admin.addresses.destroy")}
                </div>";
    }
}
