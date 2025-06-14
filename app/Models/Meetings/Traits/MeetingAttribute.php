<?php

namespace App\Models\Meetings\Traits;

/**
 * Class MeetingAttribute.
 */
trait MeetingAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-meeting", "admin.meetings.edit")}
                {$this->getDeleteButtonAttribute("delete-meeting", "admin.meetings.destroy")}
                </div>";
    }

    public function getTypeStatusAttribute(){
        $list = ['0' => _tr('face_to_face'), 1 => _tr('meeting_on_phone')];
        return '<label class="badge bg-outline-'.$this->getStatusColor($this->type_id).'">'.$list[$this->type_id] ?? $list[0].'</label>';
    }
}
