<?php

namespace App\Models\PagePositions\Traits;

/**
 * Class PagePositionAttribute.
 */
trait PagePositionAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-pageposition", "admin.pagepositions.edit")}
                {$this->getDeleteButtonAttribute("delete-pageposition", "admin.pagepositions.destroy")}
                </div>";
    }
}
