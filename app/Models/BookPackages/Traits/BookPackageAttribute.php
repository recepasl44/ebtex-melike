<?php

namespace App\Models\BookPackages\Traits;

/**
 * Class BookPackageAttribute.
 */
trait BookPackageAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-bookpackage", "admin.bookpackages.edit")}
                {$this->getDeleteButtonAttribute("delete-bookpackage", "admin.bookpackages.destroy")}
                </div>";
    }
}
