<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class StudentGroupResource extends MainResources
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
                'student_id' => $this->student_id,
                'student' => $this->student ? new StudentResource($this->student) : null,
                'group_id' => $this->group_id,
                'group' => $this->group ? new GroupResource($this->group) : null,
                ];
        }
}
