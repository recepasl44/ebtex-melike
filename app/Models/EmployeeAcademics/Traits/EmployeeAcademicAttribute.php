<?php

namespace App\Models\EmployeeAcademics\Traits;

/**
 * Class EmployeeAcademicAttribute.
 */
trait EmployeeAcademicAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-employeeacademic", "admin.employeeacademics.edit")}
                {$this->getDeleteButtonAttribute("delete-employeeacademic", "admin.employeeacademics.destroy")}
                </div>";
    }
}
