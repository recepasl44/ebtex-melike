<?php

namespace App\Models\Currencies\Traits;

/**
 * Class CurrencyAttribute.
 */
trait CurrencyAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-currency", "admin.currencies.edit")}
                {$this->getDeleteButtonAttribute("delete-currency", "admin.currencies.destroy")}
                </div>";
    }
}
