<?php

namespace App\Models\ConversationUsers\Traits;

/**
 * Class ConversationUserAttribute.
 */
trait ConversationUserAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-conversationuser", "admin.conversationusers.edit")}
                {$this->getDeleteButtonAttribute("delete-conversationuser", "admin.conversationusers.destroy")}
                </div>";
    }
}
