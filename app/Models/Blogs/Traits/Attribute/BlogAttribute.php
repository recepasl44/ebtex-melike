<?php

namespace App\Models\Blogs\Traits\Attribute;

/**
 * Class BlogAttribute.
 */
trait BlogAttribute
{
    /**
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return '<div class="btn-list">'.
                $this->getEditButtonAttribute('edit-blog', 'admin.blogs.edit').
                $this->getDeleteButtonAttribute('delete-blog', 'admin.blogs.destroy').
                '</div>';
    }
}
