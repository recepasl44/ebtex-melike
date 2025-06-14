<?php

namespace App\Models;

trait ModelTrait
{
    /**
     * @return string
     */
    public function getEditButtonAttribute($permission, $route)
    {
        if (access()->allow($permission)) {
            return '<a href="'.route($route, $this).'" class="btn btn-icon rounded-pill btn-sm btn-info-light">
                    <i data-toggle="tooltip" data-placement="top" title="'._tr('edit').'" class="ri-edit-line"></i>
                </a>';
        }
    }

    /**
     * @return string
     */
    public function getDeleteButtonAttribute($permission, $route)
    {
        if (access()->allow($permission)) {
            return '<a href="'.route($route, $this).'" 
                    class="btn btn-icon rounded-pill btn-sm btn-danger-light" data-method="delete"
                    data-trans-button-cancel="'._tr('buttons.general.cancel').'"
                    data-trans-button-confirm="'._tr('buttons.general.crud.delete').'"
                    data-trans-title="'._tr('strings.backend.general.are_you_sure').'">
                        <i data-toggle="tooltip" data-placement="top" title="'._tr('delete').'" class="ri-delete-bin-5-line"></i>
                </a>';
        }
    }

    public static function getByFilter($query = null){
        if($query){
            $q = $query;
        }else{
            $q = self::query();
        }
        if(access()->user()->workshop_id){
            return $q->where(function ($query) {
                $query->whereNull('workshop_id')
                    ->orWhere('workshop_id', access()->user()->workshop_id);
            })->get();
        }
        return $q->get();
    }

    public function getModalButtonAttribute($permission, $view, $icon = 'ri-calendar-check-fill')
    {
        if (access()->allow($permission)) {
            return '<a href="javascript:;" class="btn btn-icon rounded-pill btn-sm btn-info-light modal_create_button" data-url="'.route('admin.modals.create').'" data-view="'.$view.'" onclick=\'modalCreate("appointments", "'.$view.'", "'.$this->id.'")\'>
                    <i data-toggle="tooltip" data-placement="top" title="'._tr('edit').'" class="ri-calendar-check-fill"></i>
                </a>';
        }
    }

    public function getListButtonAttribute($permission, $route, $icon = 'ri-calendar-check-fill', $title = 'List', $color = 'primary')
    {
        if (access()->allow($permission)) {
            return '<a href="'.route($route, $this).'" class="modal_create_button dropdown-item" data-url="'.route('admin.modals.create').'">
                    <span class="btn btn-icon rounded-pill btn-sm btn-'.$color.'-light "><i data-toggle="tooltip" data-placement="top" title="'.$title.'" class="'.$icon.'"></i></span>'._tr($permission).'
                </a>';
        }
    }

    public function getStatusColor($status)
    {
        return $status == 0 ? 'primary' : 'info';
    }

    /**
     * @return string
     */
    public function getStatusLabelAttribute()
    {
        if ($this->isActive()) {
            return "<label class='badge bg-outline-success'>"._tr('labels.general.active').'</label>';
        }

        return "<label class='badge bg-outline-danger'>"._tr('labels.general.inactive').'</label>';
    }

    /**
     * @return bool
     */
    public function isActive()
    {
        return $this->status == 1;
    }

}
