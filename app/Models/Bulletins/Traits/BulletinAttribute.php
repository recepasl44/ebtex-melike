<?php

namespace App\Models\Bulletins\Traits;

/**
 * Class BulletinAttribute.
 */
trait BulletinAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-bulletin", "admin.bulletins.edit")}
                {$this->getDeleteButtonAttribute("delete-bulletin", "admin.bulletins.destroy")}
                </div>";
    }
}
