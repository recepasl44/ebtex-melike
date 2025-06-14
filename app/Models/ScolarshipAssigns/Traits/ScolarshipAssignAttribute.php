<?php

namespace App\Models\ScolarshipAssigns\Traits;

/**
 * Class ScolarshipAssignAttribute.
 */
trait ScolarshipAssignAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-scolarshipassign", "admin.scolarshipassigns.edit")}
                {$this->getDeleteButtonAttribute("delete-scolarshipassign", "admin.scolarshipassigns.destroy")}
                </div>";
    }
}
