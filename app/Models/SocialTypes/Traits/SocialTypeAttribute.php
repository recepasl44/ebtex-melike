<?php

namespace App\Models\SocialTypes\Traits;

/**
 * Class SocialTypeAttribute.
 */
trait SocialTypeAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-socialtype", "admin.socialtypes.edit")}
                {$this->getDeleteButtonAttribute("delete-socialtype", "admin.socialtypes.destroy")}
                </div>";
    }
}
