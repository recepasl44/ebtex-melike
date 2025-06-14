<?php

namespace App\Models\Sources\Traits;

/**
 * Class SourceAttribute.
 */
trait SourceAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-source", "admin.sources.edit")}
                {$this->getDeleteButtonAttribute("delete-source", "admin.sources.destroy")}
                </div>";
    }
}
