<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;
use App\Services\CurriculumTreeBuilder;
use Illuminate\Database\Eloquent\Collection;

class AssignmentResource extends MainResources
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
                'id' => $this->id,
                'teacher_id' => $this->teacher_id,
                'teacher' => $this->teacher,
                'program_id' => $this->program_id,
                'program' => $this->program,
                'level_id' => $this->level_id,
                'level' => $this->level,
                'schooltype_id' => $this->schooltype_id,
                'schooltype' => $this->schooltype,
                'course_id' => $this->course_id,
                'course' => $this->course,
                'lessons' => app(CurriculumTreeBuilder::class)->build(new Collection([$this->resource])),
                'title' => $this->title,
                'source_id' => $this->source_id,
                'source' => $this->source,
                'start_date' => $this->start_date,
                'end_date' => $this->end_date,
                'description' => $this->description,
                'teacher_file' => $this->teacher_file,
                'category' => $this->category,
                'status' => $this->status,
                'teacher_planning_start_date' => $this->teacher_planning_start_date,
                'teacher_planning_end_date' => $this->teacher_planning_end_date,
                'special_permission' => $this->special_permission,
                ];
        }
}
