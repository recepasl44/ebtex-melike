<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class BookQuizResource extends MainResources
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
                'quiz_id' => $this->quiz_id,
                ];
        }
}
