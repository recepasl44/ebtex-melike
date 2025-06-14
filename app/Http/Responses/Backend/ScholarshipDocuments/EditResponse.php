<?php

namespace App\Http\Responses\Backend\ScholarshipDocuments;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Scholarships\Scholarship;
use App\Models\Programs\Program;
use App\Models\Levels\Level;
use App\Models\Schools\School;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\ScholarshipDocuments\ScholarshipDocument
     */
    protected $scholarshipdocuments;

    /**
     * @param App\Models\ScholarshipDocuments\ScholarshipDocument $scholarshipdocuments
     */
    public function __construct($scholarshipdocuments)
    {
        $this->scholarshipdocuments = $scholarshipdocuments;
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
        $scholarships= collect(Scholarship::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$programs= collect(Program::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$levels= collect(Level::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$schools= collect(School::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.scholarshipdocuments.edit',compact('scholarships', 'programs', 'levels', 'schools', ))->with([
            'scholarshipdocuments' => $this->scholarshipdocuments
        ]);
    }
}