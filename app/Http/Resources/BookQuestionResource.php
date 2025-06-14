<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class BookQuestionResource extends MainResources
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
                'book' => $this->book ? new BookResource($this->book) : null,
                'question_id' => $this->question_id,
                'question' => $this->question ? new QuestionResource($this->question) : null,
                ];
        }
}
