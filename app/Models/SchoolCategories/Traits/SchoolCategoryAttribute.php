<?php

namespace App\Models\SchoolCategories\Traits;

/**
 * Class SchoolCategoryAttribute.
 */
trait SchoolCategoryAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-schoolcategory", "admin.schoolcategories.edit")}
                {$this->getDeleteButtonAttribute("delete-schoolcategory", "admin.schoolcategories.destroy")}
                </div>";
    }
}
