<?php

namespace App\Models\Socials\Traits;

/**
 * Class SocialAttribute.
 */
trait SocialAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-social", "admin.socials.edit")}
                {$this->getDeleteButtonAttribute("delete-social", "admin.socials.destroy")}
                </div>";
    }
}
