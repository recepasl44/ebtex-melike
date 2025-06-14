<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class BookStudentResource extends MainResources
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
                'book_id' => $this->book_id,
                'student_id' => $this->student_id,
                ];
        }
}
