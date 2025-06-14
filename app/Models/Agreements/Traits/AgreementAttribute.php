<?php

namespace App\Models\Agreements\Traits;

/**
 * Class AgreementAttribute.
 */
trait AgreementAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-agreement", "admin.agreements.edit")}
                {$this->getDeleteButtonAttribute("delete-agreement", "admin.agreements.destroy")}
                </div>";
    }
}
