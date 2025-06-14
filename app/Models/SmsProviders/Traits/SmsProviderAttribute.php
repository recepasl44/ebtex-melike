<?php

namespace App\Models\SmsProviders\Traits;

/**
 * Class SmsProviderAttribute.
 */
trait SmsProviderAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-smsprovider", "admin.smsproviders.edit")}
                {$this->getDeleteButtonAttribute("delete-smsprovider", "admin.smsproviders.destroy")}
                </div>";
    }
}
