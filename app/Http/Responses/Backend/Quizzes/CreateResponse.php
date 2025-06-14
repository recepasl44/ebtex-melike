<?php

namespace App\Http\Responses\Backend\Quizzes;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Branches\Branche;
use App\Models\QuizTypes\QuizType;
use App\Models\QuizCategories\QuizCategory;
use App\Models\PointTypes\PointType;
use App\Models\OpticalForms\OpticalForm;
use App\Models\Levels\Level;


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
        $branches= collect(Branche::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$quiztypes= collect(QuizType::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$quizcategories= collect(QuizCategory::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$pointtypes= collect(PointType::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$opticalforms= collect(OpticalForm::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$levels= collect(Level::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.quizzes.create',compact('branches', 'quiztypes', 'quizcategories', 'pointtypes', 'opticalforms', 'levels', ));
    }
}