<?php

namespace App\Models\Students\Traits;

/**
 * Class StudentAttribute.
 */
trait StudentAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttributes(): string
    {
//        {$this->getModalButtonAttribute("create-appointment", "backend.appointments.form")}
//        {$this->getModalButtonAttribute("create-meeting", "backend.meetings.form", 'fi-calendar')}

        return "<div class=\"btn-list\"> 
                {$this->getEditButtonAttribute("edit-student", "admin.students.edit")}
                {$this->getDeleteButtonAttribute("delete-student", "admin.students.destroy")}
                {$this->getListButtonAttribute("view-appointment", "admin.students.appointments.get", 'ri-list-ordered', 'appointments')}
                {$this->getListButtonAttribute("view-meeting", "admin.students.meetings.get", 'ri-list-unordered', 'meetings')}
                {$this->getListButtonAttribute("view-userdiscount", "admin.students.userdiscounts.get", 'ri-list-unordered', 'userdiscounts')}
                </div>";
    }

    public function getActionButtonsAttribute() : string
    {
            return '<div class="btn-group">
                        <button type="button" class="btn btn-icon rounded-pill btn-sm btn-danger-light" data-bs-toggle="dropdown">
                            <span class="bi bi-three-dots-vertical"></span>
                        </button>
                        
                        <ul class="dropdown-menu dropdown-menu-end" style="width: 250px" data-popper-placement="bottom-end">
                            <li>'.$this->getEditButtonAttributex("edit-student", "admin.students.edit").'</li>
                            <li>'.$this->getDeleteButtonAttributex("delete-student", "admin.students.destroy").'</li>
                            <li>'.$this->getListButtonAttribute("view-appointment", "admin.students.appointments.get", 'ri-list-ordered', 'appointments', 'primary').'</li>
                            <li>'.$this->getListButtonAttribute("view-meeting", "admin.students.meetings.get", 'ri-list-unordered', 'meetings', 'warning').'</li>
                            <li>'.$this->getListButtonAttribute("view-userdiscount", "admin.students.userdiscounts.get", 'ri-list-unordered', 'userdiscounts', 'success').'</li>
                        </ul>
                        
                    </div>';
    }

    public function getEditButtonAttributex($permission, $route)
    {
        if (access()->allow($permission)) {
            return '<a href="'.route($route, $this).'" class="dropdown-item">
                    <span class="btn btn-icon rounded-pill btn-sm btn-info-light "><i data-toggle="tooltip" data-placement="top" title="'._tr('edit').'" class="ri-edit-line"></i></span>'._tr($permission).'
                </a>';
        }
    }

    public function getDeleteButtonAttributex($permission, $route)
    {
        if (access()->allow($permission)) {
            return '<a href="'.route($route, $this).'" 
                    class="dropdown-item" data-method="delete"
                    data-trans-button-cancel="'._tr('buttons.general.cancel').'"
                    data-trans-button-confirm="'._tr('buttons.general.crud.delete').'"
                    data-trans-title="'._tr('strings.backend.general.are_you_sure').'">
                        <span class="btn btn-icon rounded-pill btn-sm btn-danger-light"><i data-toggle="tooltip" data-placement="top" title="'._tr('delete').'" class="ri-delete-bin-5-line"></i></span>'._tr($permission).'
                </a>';
        }
    }

    public function getGenderAttribute(): string
    {

        if ($this->gender_id == 0) {
            return "<label class='badge bg-outline-primary'>"._tr('male').'</label>';
        }elseif ($this->gender_id == 1){
            return "<label class='badge bg-outline-info'>"._tr('female').'</label>';
        }

        return "<label class='badge bg-outline-primary2'>"._tr('labels.general.inactive').'</label>';
    }

    public function getNameAttribute(): string {
        return $this->first_name.' '.$this->last_name;
    }

    public function getPicture($size = false)
    {
        if (!$size) {
            $size = config('gravatar.default.size');
        }

        return gravatar()->get($this->identification_no.'@ebtek.com.tr', ['size' => $size]);
    }
}
