<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class QuestionPdfResource extends MainResources
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
                'file_path' => $this->file_path,
                ];
        }
}
