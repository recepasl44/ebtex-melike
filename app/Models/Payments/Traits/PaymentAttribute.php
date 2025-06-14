<?php

namespace App\Models\Payments\Traits;

/**
 * Class PaymentAttribute.
 */
trait PaymentAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-payment", "admin.payments.edit")}
                {$this->getDeleteButtonAttribute("delete-payment", "admin.payments.destroy")}
                </div>";
    }
}
