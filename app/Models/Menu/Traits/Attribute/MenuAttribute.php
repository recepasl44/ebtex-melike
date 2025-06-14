<?php

namespace App\Models\Menu\Traits\Attribute;

/**
 * Class MenuAttribute.
 */
trait MenuAttribute
{
    /**
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return '<div class="btn-list">
                    '.$this->getEditButtonAttribute('edit-menu', 'admin.menus.edit').'
                    '.$this->getDeleteButtonAttribute('delete-menu', 'admin.menus.destroy').'
                </div>';
    }
}
