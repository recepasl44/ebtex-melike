<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class FaqsResource extends MainResource
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
            'id'            => $this->id,
            'question'      => $this->question,
            'answer'        => $this->answer,
            'status'        => ($this->isActive()) ? 'Active' : 'InActive',
            'created_at'    => $this->created_at->toDateString(),
        ];
    }
}
