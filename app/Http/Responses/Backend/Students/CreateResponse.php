<?php

namespace App\Http\Responses\Backend\Students;

use App\Models\Cities\City;
use App\Models\Counties\County;
use App\Models\Discounts\Discount;
use App\Models\Districts\District;
use App\Models\Neighborhoods\Neighborhood;
use App\Models\Seasons\Season;
use App\Models\Services\Service;
use App\Models\Students\Student;
use Illuminate\Contracts\Support\Responsable;
use App\Models\Branches\Branche;
use App\Models\Countries\Country;
use App\Models\Programs\Program;
use App\Models\Levels\Level;
use App\Models\Courses\Course;
use App\Models\Schools\School;
use App\Models\Addresses\Address;
use App\Models\Guardians\Guardian;
use App\Models\Access\User\User;


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
        });
        $programs= collect(Program::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
//        $levels= collect(Level::all()->toArray())->mapWithKeys(function ($item) {
//            return [$item['id'] => $item['name']];
//        });
//        $courses= collect(Course::all()->toArray())->mapWithKeys(function ($item) {
//            return [$item['id'] => $item['name']];
//        });
        $schools= collect(School::limit(5)->get()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        $guardians= collect(Guardian::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['full_name']];
        });
        $users= collect(User::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['first_name'].' '.$item['last_name']];
        });
        $services= Service::all();
        $discounts= Discount::all();

        $seasons= collect(Season::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        $countries= collect(Country::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
//        $cities= collect(City::all()->toArray())->mapWithKeys(function ($item) {
//            return [$item['id'] => $item['name']];
//        });
//        $counties= collect(County::all()->toArray())->mapWithKeys(function ($item) {
//            return [$item['id'] => $item['name']];
//        });
//        $districts= collect(District::all()->toArray())->mapWithKeys(function ($item) {
//            return [$item['id'] => $item['name']];
//        });
//        $neighborhoods= collect(Neighborhood::all()->toArray())->mapWithKeys(function ($item) {
//            return [$item['id'] => $item['name']];
//        });
        $cities = null;
        $counties = null;
        $districts = null;
        $neighborhoods = null;
//        $schools = null;

        return view('backend.students.create',compact('branches', 'services', 'discounts', 'seasons', 'countries','cities', 'counties', 'districts', 'neighborhoods', 'programs', 'schools', 'guardians', 'users'));
    }
}