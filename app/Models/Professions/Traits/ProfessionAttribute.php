<?php

namespace App\Models\Professions\Traits;

/**
 * Class ProfessionAttribute.
 */
trait ProfessionAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-profession", "admin.professions.edit")}
                {$this->getDeleteButtonAttribute("delete-profession", "admin.professions.destroy")}
                </div>";
    }
}
