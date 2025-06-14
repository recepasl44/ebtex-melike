<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class TestQuestionResource extends MainResources
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
                'test_id' => $this->test_id,
                'test' => $this->test ? new TestResource($this->test) : null,
                'question_id' => $this->question_id,
                'question' => $this->question ? new QuestionResource($this->question) : null,
                ];
        }
}
