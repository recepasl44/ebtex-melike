<?php

namespace App\Models\Tests\Traits;

/**
 * Class TestAttribute.
 */
trait TestAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-test", "admin.tests.edit")}
                {$this->getDeleteButtonAttribute("delete-test", "admin.tests.destroy")}
                </div>";
    }
}
