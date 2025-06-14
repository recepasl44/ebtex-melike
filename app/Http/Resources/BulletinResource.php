<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class BulletinResource extends MainResources
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
                'title' => $this->title,
                'content' => $this->content,
                'category_id' => $this->category_id,
                'start_date' => $this->start_date,
                'end_date' => $this->end_date,
                'created_by' => $this->created_by,
                'createdby' => $this->created,
                'status' => $this->status,
                'group_id' => $this->group_id,
                'group' => $this->group,
                ];
        }
}
