<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class OpticalAttributeResource extends MainResources
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
                'form_id' => $this->form_id,
                'column_name' => $this->column_name,
                'column_start' => $this->column_start,
                'column_length' => $this->column_length,
                'lesson_id' => $this->lesson_id,
                ];
        }
}
