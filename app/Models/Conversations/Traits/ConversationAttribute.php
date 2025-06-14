<?php

namespace App\Models\Conversations\Traits;

/**
 * Class ConversationAttribute.
 */
trait ConversationAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-conversation", "admin.conversations.edit")}
                {$this->getDeleteButtonAttribute("delete-conversation", "admin.conversations.destroy")}
                </div>";
    }
}
