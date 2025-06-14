<?php

namespace App\Models\Subscribes\Traits;

/**
 * Class SubscribeAttribute.
 */
trait SubscribeAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-subscribe", "admin.subscribes.edit")}
                {$this->getDeleteButtonAttribute("delete-subscribe", "admin.subscribes.destroy")}
                </div";
    }
}
