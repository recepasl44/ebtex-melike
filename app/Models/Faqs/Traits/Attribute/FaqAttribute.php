<?php

namespace App\Models\Faqs\Traits\Attribute;

/**
 * Class FaqAttribute.
 */
trait FaqAttribute
{
    /**
     * @return string
     */
    public function getStatusButtonAttribute()
    {
        switch ($this->status && access()->allow('edit-faq')) {
            case 0:
                return '<a href="'.route('admin.faqs.mark', [$this, 1]).'" class="btn btn-flat btn-default"><i class="bi bi-check-square" data-toggle="tooltip" data-placement="top" title="'._tr('buttons.backend.access.users.activate').'"></i></a>';

            case 1:
                return '<a href="'.route('admin.faqs.mark', [$this, 0]).'" class="btn btn-flat btn-default"><i class="bi bi-square" data-toggle="tooltip" data-placement="top" title="'._tr('buttons.backend.access.users.deactivate').'"></i></a>';

            default:
                return '';
        }

        return '';
    }

    /**
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return '<div class="btn-list">'.
                $this->getEditButtonAttribute('edit-faq', 'admin.faqs.edit').
                $this->getDeleteButtonAttribute('delete-faq', 'admin.faqs.destroy').
                $this->getStatusButtonAttribute().
                '</div>';
    }
}
