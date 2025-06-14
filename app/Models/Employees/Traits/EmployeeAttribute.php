<?php

namespace App\Models\Employees\Traits;

/**
 * Class EmployeeAttribute.
 */
trait EmployeeAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-employee", "admin.employees.edit")}
                {$this->getDeleteButtonAttribute("delete-employee", "admin.employees.destroy")}
                </div>";
    }
}
