<?php

namespace App\Models\Access\Role\Traits\Attribute;

/**
 * Class RoleAttribute.
 */
trait RoleAttribute
{
    /**
     * @return string
     */
    public function getEditButtonAttribute()
    {
        if (access()->allow('edit-role')) {
            return '<a class="btn btn-icon rounded-pill btn-sm btn-info-light" href="'.route('admin.access.role.edit', $this).'">
                    <i data-toggle="tooltip" data-placement="top" title="'._tr('edit').'" class="ri-edit-line"></i>
                </a>';
        }
    }

    /**
     * @return string
     */
    public function getDeleteButtonAttribute()
    {
        //Can't delete master admin role
        if ($this->id != 1 && access()->allow('delete-role')) {
            return '<a class="btn btn-icon rounded-pill btn-sm btn-danger-light" href="'.route('admin.access.role.destroy', $this).'" data-method="delete"
                        data-trans-button-cancel="'._tr('buttons.general.cancel').'"
                        data-trans-button-confirm="'._tr('buttons.general.crud.delete').'"
                        data-trans-title="'._tr('strings.backend.general.are_you_sure').'">
                            <i data-toggle="tooltip" data-placement="top" title="'._tr('delete').'" class="ri-delete-bin-5-line"></i>
                    </a>';
        }

        return '';
    }

    /**
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return '<div class="btn-list">
                    '.$this->getEditButtonAttribute('edit-role', 'admin.access.role.edit').'
                    '.$this->getDeleteButtonAttribute().'
                </div>';
    }
}
