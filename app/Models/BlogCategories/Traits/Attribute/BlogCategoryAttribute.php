<?php

namespace App\Models\BlogCategories\Traits\Attribute;

/**
 * Class BlogCategoryAttribute.
 */
trait BlogCategoryAttribute
{
    /**
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return '<div class="btn-list">
                    '.$this->getEditButtonAttribute('edit-blog-category', 'admin.blogCategories.edit').'
                    '.$this->getDeleteButtonAttribute('delete-blog-category', 'admin.blogCategories.destroy').'
                </div>';
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
