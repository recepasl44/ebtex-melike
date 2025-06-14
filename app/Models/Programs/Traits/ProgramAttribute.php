<?php

namespace App\Models\Programs\Traits;

/**
 * Class ProgramAttribute.
 */
trait ProgramAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-program", "admin.programs.edit")}
                {$this->getDeleteButtonAttribute("delete-program", "admin.programs.destroy")}
                </div>";
    }
}
