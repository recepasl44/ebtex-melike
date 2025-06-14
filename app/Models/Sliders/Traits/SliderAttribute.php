<?php

namespace App\Models\Sliders\Traits;

/**
 * Class SliderAttribute.
 */
trait SliderAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-slider", "admin.sliders.edit")}
                {$this->getDeleteButtonAttribute("delete-slider", "admin.sliders.destroy")}
                </div>";
    }
}
