<?php

namespace App\Models\Page\Traits\Attribute;

/**
 * Class PageAttribute.
 */
trait PageAttribute
{
    /**
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return '<div class="btn-list">
                    '.$this->getEditButtonAttribute('edit-page', 'admin.pages.edit').'
                    '.$this->getViewButtonAttribute().'                    
                    '.$this->getDeleteButtonAttribute('delete-page', 'admin.pages.destroy').'
                </div>';
    }

    /**
     * @return string
     */
    public function getViewButtonAttribute()
    {
        return '<a target="_blank" href="'.route('frontend.pages.show', $this->page_slug).'" class="btn btn-icon rounded-pill btn-sm btn-primary-light">
                    <i data-toggle="tooltip" data-placement="top" title="View Page" class="bi bi-eye"></i>
                </a>';
    }

}
