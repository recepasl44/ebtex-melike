<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class QuizTimeResource extends MainResources
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
                'session_id' => $this->session_id,
                'session_hour' => $this->session_hour,
                'session_minute' => $this->session_minute,
                'session_second' => $this->session_second,
                ];
        }
}
