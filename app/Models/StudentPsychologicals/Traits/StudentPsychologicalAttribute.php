<?php

namespace App\Models\StudentPsychologicals\Traits;

/**
 * Class StudentPsychologicalAttribute.
 */
trait StudentPsychologicalAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-studentpsychological", "admin.studentpsychologicals.edit")}
                {$this->getDeleteButtonAttribute("delete-studentpsychological", "admin.studentpsychologicals.destroy")}
                </div>";
    }
}
