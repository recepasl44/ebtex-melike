<?php

namespace App\Models\Installments\Traits;

/**
 * Class InstallmentAttribute.
 */
trait InstallmentAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-installment", "admin.installments.edit")}
                {$this->getDeleteButtonAttribute("delete-installment", "admin.installments.destroy")}
                </div>";
    }
}
