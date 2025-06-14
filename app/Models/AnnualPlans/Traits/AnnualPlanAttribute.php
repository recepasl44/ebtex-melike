<?php

namespace App\Models\AnnualPlans\Traits;

/**
 * Class AnnualPlanAttribute.
 */
trait AnnualPlanAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-annualplan", "admin.annualplans.edit")}
                {$this->getDeleteButtonAttribute("delete-annualplan", "admin.annualplans.destroy")}
                </div>";
    }
}
