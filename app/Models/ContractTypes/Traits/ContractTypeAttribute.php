<?php

namespace App\Models\ContractTypes\Traits;

/**
 * Class ContractTypeAttribute.
 */
trait ContractTypeAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-contracttype", "admin.contracttypes.edit")}
                {$this->getDeleteButtonAttribute("delete-contracttype", "admin.contracttypes.destroy")}
                </div>";
    }
}
