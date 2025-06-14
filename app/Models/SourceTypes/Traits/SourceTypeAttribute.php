<?php

namespace App\Models\SourceTypes\Traits;

/**
 * Class SourceTypeAttribute.
 */
trait SourceTypeAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-sourcetype", "admin.sourcetypes.edit")}
                {$this->getDeleteButtonAttribute("delete-sourcetype", "admin.sourcetypes.destroy")}
                </div>";
    }
}
