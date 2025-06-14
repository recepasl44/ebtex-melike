<?php

namespace App\Models\WeightIndices\Traits;

/**
 * Class WeightIndexAttribute.
 */
trait WeightIndexAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-weightindex", "admin.weightindices.edit")}
                {$this->getDeleteButtonAttribute("delete-weightindex", "admin.weightindices.destroy")}
                </div>";
    }
}
