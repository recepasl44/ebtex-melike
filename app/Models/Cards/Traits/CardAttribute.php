<?php

namespace App\Models\Cards\Traits;

/**
 * Class CardAttribute.
 */
trait CardAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-card", "admin.cards.edit")}
                {$this->getDeleteButtonAttribute("delete-card", "admin.cards.destroy")}
                </div>";
    }
}
