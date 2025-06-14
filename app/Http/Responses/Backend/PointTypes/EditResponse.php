<?php

namespace App\Http\Responses\Backend\PointTypes;

use Illuminate\Contracts\Support\Responsable;
use App\Models\QuizCategories\QuizCategory;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\PointTypes\PointType
     */
    protected $pointtypes;

    /**
     * @param App\Models\PointTypes\PointType $pointtypes
     */
    public function __construct($pointtypes)
    {
        $this->pointtypes = $pointtypes;
    }

    /**
     * To Response
     *
     * @param \App\Http\Requests\Request $request
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function toResponse($request)
    {
        $quizcategories= collect(QuizCategory::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.pointtypes.edit',compact('quizcategories', ))->with([
            'pointtypes' => $this->pointtypes
        ]);
    }
}