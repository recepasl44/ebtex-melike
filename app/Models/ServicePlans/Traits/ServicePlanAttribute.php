<?php

namespace App\Models\ServicePlans\Traits;

/**
 * Class ServicePlanAttribute.
 */
trait ServicePlanAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-serviceplan", "admin.serviceplans.edit")}
                {$this->getDeleteButtonAttribute("delete-serviceplan", "admin.serviceplans.destroy")}
                </div>";
    }
}
