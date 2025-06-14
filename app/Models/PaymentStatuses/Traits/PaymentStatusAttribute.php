<?php

namespace App\Models\PaymentStatuses\Traits;

/**
 * Class PaymentStatusAttribute.
 */
trait PaymentStatusAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-paymentstatus", "admin.paymentstatuses.edit")}
                {$this->getDeleteButtonAttribute("delete-paymentstatus", "admin.paymentstatuses.destroy")}
                </div>";
    }
}
