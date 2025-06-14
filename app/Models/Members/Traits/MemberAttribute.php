<?php

namespace App\Models\Members\Traits;

/**
 * Class MemberAttribute.
 */
trait MemberAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-member", "admin.members.edit")}
                {$this->getDeleteButtonAttribute("delete-member", "admin.members.destroy")}
                </div>";
    }
}
