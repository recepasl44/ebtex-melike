<?php

namespace App\Models\Topics\Traits;

/**
 * Class TopicAttribute.
 */
trait TopicAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-topic", "admin.topics.edit")}
                {$this->getDeleteButtonAttribute("delete-topic", "admin.topics.destroy")}
                </div>";
    }
}
