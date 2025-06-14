<?php

namespace App\Models\UserDiscounts\Traits;

/**
 * Class UserDiscountAttribute.
 */
trait UserDiscountAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-userdiscount", "admin.userdiscounts.edit")}
                {$this->getDeleteButtonAttribute("delete-userdiscount", "admin.userdiscounts.destroy")}
                </div>";
    }
}
