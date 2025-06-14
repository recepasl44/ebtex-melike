<?php

namespace App\Models\Routes\Traits;

/**
 * Class RouteAttribute.
 */
trait RouteAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-route", "admin.routes.edit")}
                {$this->getDeleteButtonAttribute("delete-route", "admin.routes.destroy")}
                </div>";
    }
}
