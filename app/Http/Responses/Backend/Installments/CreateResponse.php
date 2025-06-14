<?php

namespace App\Http\Responses\Backend\Installments;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Enrollments\Enrollment;


class CreateResponse implements Responsable
{
    /**
     * To Response
     *
     * @param \App\Http\Requests\Request $request
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function toResponse($request)
    {
        $enrollments= collect(Enrollment::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.installments.create',compact('enrollments', ));
    }
}