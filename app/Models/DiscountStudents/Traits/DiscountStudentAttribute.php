<?php

namespace App\Models\DiscountStudents\Traits;

/**
 * Class DiscountStudentAttribute.
 */
trait DiscountStudentAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-discountstudent", "admin.discountstudents.edit")}
                {$this->getDeleteButtonAttribute("delete-discountstudent", "admin.discountstudents.destroy")}
                </div>";
    }
}
