<?php

namespace App\Models\AcademicTitles\Traits;

/**
 * Class AcademicTitleAttribute.
 */
trait AcademicTitleAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-academictitle", "admin.academictitles.edit")}
                {$this->getDeleteButtonAttribute("delete-academictitle", "admin.academictitles.destroy")}
                </div>";
    }
}
