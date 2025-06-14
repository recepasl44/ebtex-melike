<?php

namespace App\Models\ScholarshipDocuments\Traits;

/**
 * Class ScholarshipDocumentAttribute.
 */
trait ScholarshipDocumentAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-scholarshipdocument", "admin.scholarshipdocuments.edit")}
                {$this->getDeleteButtonAttribute("delete-scholarshipdocument", "admin.scholarshipdocuments.destroy")}
                </div>";
    }
}
