<?php

namespace App\Http\Responses\Backend\ScholarshipApplications;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Students\Student;
use App\Models\Scholarships\Scholarship;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\ScholarshipApplications\ScholarshipApplication
     */
    protected $scholarshipapplications;

    /**
     * @param App\Models\ScholarshipApplications\ScholarshipApplication $scholarshipapplications
     */
    public function __construct($scholarshipapplications)
    {
        $this->scholarshipapplications = $scholarshipapplications;
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
        $students= collect(Student::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$scholarships= collect(Scholarship::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.scholarshipapplications.edit',compact('students', 'scholarships', ))->with([
            'scholarshipapplications' => $this->scholarshipapplications
        ]);
    }
}