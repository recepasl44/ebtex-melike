<?php

namespace App\Models\BookletTypes\Traits;

/**
 * Class BookletTypeAttribute.
 */
trait BookletTypeAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-booklettype", "admin.booklettypes.edit")}
                {$this->getDeleteButtonAttribute("delete-booklettype", "admin.booklettypes.destroy")}
                </div>";
    }
}
