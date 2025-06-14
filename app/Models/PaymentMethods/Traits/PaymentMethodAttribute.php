<?php

namespace App\Models\PaymentMethods\Traits;

/**
 * Class PaymentMethodAttribute.
 */
trait PaymentMethodAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-paymentmethod", "admin.paymentmethods.edit")}
                {$this->getDeleteButtonAttribute("delete-paymentmethod", "admin.paymentmethods.destroy")}
                </div>";
    }
}
