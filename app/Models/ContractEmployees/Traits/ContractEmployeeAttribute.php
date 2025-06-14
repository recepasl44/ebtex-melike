<?php

namespace App\Models\ContractEmployees\Traits;

/**
 * Class ContractEmployeeAttribute.
 */
trait ContractEmployeeAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-contractemployee", "admin.contractemployees.edit")}
                {$this->getDeleteButtonAttribute("delete-contractemployee", "admin.contractemployees.destroy")}
                </div>";
    }
}
