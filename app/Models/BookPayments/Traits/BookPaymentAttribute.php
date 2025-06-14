<?php

namespace App\Models\BookPayments\Traits;

/**
 * Class BookPaymentAttribute.
 */
trait BookPaymentAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-bookpayment", "admin.bookpayments.edit")}
                {$this->getDeleteButtonAttribute("delete-bookpayment", "admin.bookpayments.destroy")}
                </div>";
    }
}
