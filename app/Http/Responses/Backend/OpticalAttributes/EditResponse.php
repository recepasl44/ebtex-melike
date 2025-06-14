<?php

namespace App\Http\Responses\Backend\OpticalAttributes;

use Illuminate\Contracts\Support\Responsable;
use App\Models\OpticalForms\OpticalForm;
use App\Models\Lessons\Lesson;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\OpticalAttributes\OpticalAttribute
     */
    protected $opticalattributes;

    /**
     * @param App\Models\OpticalAttributes\OpticalAttribute $opticalattributes
     */
    public function __construct($opticalattributes)
    {
        $this->opticalattributes = $opticalattributes;
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
        $opticalforms= collect(OpticalForm::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$lessons= collect(Lesson::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.opticalattributes.edit',compact('opticalforms', 'lessons', ))->with([
            'opticalattributes' => $this->opticalattributes
        ]);
    }
}