<?php

namespace App\Models\ScholarshipDocuments\Traits;

use App\Models\Scholarships\Scholarship;

/**
 * Class ScholarshipDocumentRelationship
 */
trait ScholarshipDocumentRelationship
{
    public function scholarship()
    {
        return $this->belongsTo(Scholarship::class);
    }
}
