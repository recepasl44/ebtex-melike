<?php

namespace App\Models\StudentInfos\Traits;

/**
 * Class StudentInfoAttribute.
 */
trait StudentInfoAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-studentinfo", "admin.studentinfos.edit")}
                {$this->getDeleteButtonAttribute("delete-studentinfo", "admin.studentinfos.destroy")}
                </div>";
    }
}
