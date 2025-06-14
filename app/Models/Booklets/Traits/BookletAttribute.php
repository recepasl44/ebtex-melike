<?php

namespace App\Models\Booklets\Traits;

/**
 * Class BookletAttribute.
 */
trait BookletAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-booklet", "admin.booklets.edit")}
                {$this->getDeleteButtonAttribute("delete-booklet", "admin.booklets.destroy")}
                </div>";
    }
}
