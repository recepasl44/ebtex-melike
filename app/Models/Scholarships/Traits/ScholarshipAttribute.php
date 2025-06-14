<?php

namespace App\Models\Scholarships\Traits;

/**
 * Class ScholarshipAttribute.
 */
trait ScholarshipAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-scholarship", "admin.scholarships.edit")}
                {$this->getDeleteButtonAttribute("delete-scholarship", "admin.scholarships.destroy")}
                </div>";
    }
}
