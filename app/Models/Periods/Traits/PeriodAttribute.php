<?php

namespace App\Models\Periods\Traits;

/**
 * Class PeriodAttribute.
 */
trait PeriodAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-period", "admin.periods.edit")}
                {$this->getDeleteButtonAttribute("delete-period", "admin.periods.destroy")}
                </div>";
    }
}
