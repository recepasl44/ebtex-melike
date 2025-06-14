<?php

namespace App\Models\UsedAreas\Traits;

/**
 * Class UsedAreaAttribute.
 */
trait UsedAreaAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-usedarea", "admin.usedareas.edit")}
                {$this->getDeleteButtonAttribute("delete-usedarea", "admin.usedareas.destroy")}
                </div>";
    }
}
