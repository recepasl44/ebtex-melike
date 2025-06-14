<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class BookResource extends MainResources
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
                'institution_type_id' => $this->institution_type_id,
                'institution_type' => $this->institution_type,
                'institution_id' => $this->institution_id,
                'institution' => $this->institution,
                'group_id' => $this->group_id,
                'group' => $this->group,
                'book_package_id' => $this->book_package_id,
                'book_package' => $this->book_package,
                'period_id' => $this->period_id,
                'period' => $this->period,
                'program_id' => $this->program_id,
                'program' => $this->program,
                'level_id' => $this->level_id,
                'level' => $this->level,
                'classroom_id' => $this->classroom_id,
                'classroom' => $this->classroom,
                'date_range_start' => $this->date_range_start,
                'date_range_end' => $this->date_range_end,
                'relevance_id' => $this->relevance_id,
                'relevance' => $this->relevance,
                'quizzes' => $this->quizzes,
                'students' => $this->students ?? StudentResource::collection($this->students),
                'book_payments' => $this->book_payments,
                'book_productions' => $this->book_productions,
                'cover' => $this->cover,
                ];
        }
}
