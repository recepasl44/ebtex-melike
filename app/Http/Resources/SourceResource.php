<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class SourceResource extends MainResources
{
    /**
         * Transform the resource into an array.
         *
         * @param  \Illuminate\Http\Request
         *
         * @return array
         */
        public function fields($request)
        {
            return [
                'source_type_id' => $this->source_type_id,
                'source_type' => $this->source_type,
                'class_section' => $this->class_section,
                'subject' => $this->subject,
                'teacher_id' => $this->teacher_id,
                'teacher' => $this->teacher,
                'name' => $this->name,
                'planned_assignment_count' => $this->planned_assignment_count,
                'status' => $this->status,
                ];
        }
}
