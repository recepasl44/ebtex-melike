<?php

namespace App\Http\Responses\Backend\EmployeeAcademics;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Employees\Employee;
use App\Models\EducationStatuses\EducationStatus;
use App\Models\Jobs\Job;
use App\Models\Professions\Profession;
use App\Models\AcademicTitles\AcademicTitle;
use App\Models\Programs\Program;
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
        $employees= collect(Employee::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$educationstatuses= collect(EducationStatus::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$jobs= collect(Job::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$professions= collect(Profession::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$academictitles= collect(AcademicTitle::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$programs= collect(Program::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$levels= collect(Level::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.employeeacademics.create',compact('employees', 'educationstatuses', 'jobs', 'professions', 'academictitles', 'programs', 'levels', ));
    }
}