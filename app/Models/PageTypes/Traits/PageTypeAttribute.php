<?php

namespace App\Models\PageTypes\Traits;

/**
 * Class PageTypeAttribute.
 */
trait PageTypeAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-pagetype", "admin.pagetypes.edit")}
                {$this->getDeleteButtonAttribute("delete-pagetype", "admin.pagetypes.destroy")}
                </div>";
    }
}
